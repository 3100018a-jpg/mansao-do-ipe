#!/usr/bin/env python3
"""
Gera as vozes neurais do jogo em português do Brasil (MP3), com o serviço
gratuito de leitura em voz alta da Microsoft (biblioteca edge-tts), sem chave.

- Só vozes pt-BR monolíngues: vozes multilíngues e de outros países são descartadas.
- Sem ajuste artificial de tom; só o ritmo varia com o personagem.
- Cada personagem usa a própria voz quando o serviço a oferece; senão, a voz
  do mesmo gênero (hoje: Francisca ou Thalita para personagens femininas,
  Antonio para masculinos).
- Gravações incompletas são descartadas e refeitas; falas que já têm áudio
  com a voz certa são mantidas.

Uso:
    node tools/exportar_falas.js
    pip install edge-tts
    python tools/gerar_vozes.py
"""
import asyncio, json, os, sys, random

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FALAS = os.path.join(RAIZ, 'audio', 'falas.json')
PASTA = os.path.join(RAIZ, 'audio', 'vozes')
MOTORES = os.path.join(PASTA, 'motores.json')
PADRAO = {'F': 'pt-BR-FranciscaNeural', 'M': 'pt-BR-AntonioNeural'}
BYTES_POR_SEG = 6000  # mp3 mono de 48 kbit/s


def aviso(titulo, texto):
    print(f'::warning title={titulo}::{texto}')
    print(f'{titulo}: {texto}')


def bytes_minimos(item):
    return int(max(0.7, len(item['texto']) / 30) * BYTES_POR_SEG)


def destino(item):
    return os.path.join(PASTA, item['id'] + '.mp3')


def existe(item):
    d = destino(item)
    return os.path.exists(d) and os.path.getsize(d) >= bytes_minimos(item)


def resolver(item, ok):
    for voz in (item.get('azure'), item['voz'], PADRAO.get(item.get('genero'), 'pt-BR-FranciscaNeural')):
        if voz and voz in ok and voz.startswith('pt-BR-') and 'Multilingual' not in voz:
            return voz
    return None


async def disponiveis(edge_tts):
    try:
        vozes = await edge_tts.list_voices()
        return {v['ShortName'] for v in vozes if v['Locale'] == 'pt-BR' and 'Multilingual' not in v['ShortName']}
    except Exception as e:
        print('Aviso: não consegui listar as vozes:', e)
        return set(PADRAO.values())


async def gerar(item, edge_tts, ok, sem):
    voz = resolver(item, ok)
    if not voz:
        return None
    async with sem:
        for tentativa in range(5):
            tmp = destino(item) + '.tmp'
            try:
                await edge_tts.Communicate(item['texto'], voz, rate=item.get('rate') or '+0%').save(tmp)
                if os.path.getsize(tmp) < bytes_minimos(item):
                    raise RuntimeError('áudio incompleto')
                os.replace(tmp, destino(item))
                return voz
            except Exception as e:
                if os.path.exists(tmp):
                    os.remove(tmp)
                espera = 2 ** tentativa + random.random()
                print(f'  tentativa {tentativa + 1} falhou ({item["id"]}): {e}; nova tentativa em {espera:.0f}s')
                await asyncio.sleep(espera)
    return None


def salvar_estado(falas, motores):
    por_id = {f['id']: f for f in falas}
    validos = {k: v for k, v in motores.items() if k in por_id and existe(por_id[k])}
    with open(MOTORES, 'w', encoding='utf-8') as fh:
        json.dump(validos, fh, separators=(',', ':'), sort_keys=True)
    ids = sorted(f['id'] for f in falas if existe(f))
    with open(os.path.join(PASTA, 'manifest.js'), 'w', encoding='utf-8') as fh:
        fh.write('/* Gerado por tools/gerar_vozes.py — falas gravadas com vozes neurais pt-BR. */\n')
        fh.write('window.MI_VOZES = ' + json.dumps({i: 1 for i in ids}, separators=(',', ':')) + ';\n')
    return validos, ids


async def main():
    if not os.path.exists(FALAS):
        sys.exit('Rode antes: node tools/exportar_falas.js')
    os.makedirs(PASTA, exist_ok=True)
    falas = json.load(open(FALAS, encoding='utf-8'))
    try:
        motores = json.load(open(MOTORES, encoding='utf-8'))
    except Exception:
        motores = {}
    for nome in os.listdir(PASTA):
        if nome.endswith('.tmp'):
            os.remove(os.path.join(PASTA, nome))
    for f in falas:
        if os.path.exists(destino(f)) and not existe(f):
            os.remove(destino(f)); motores.pop(f['id'], None)

    try:
        import edge_tts
    except ImportError:
        sys.exit('Instale a biblioteca: pip install edge-tts')
    ok = await disponiveis(edge_tts)
    print('Vozes pt-BR monolíngues disponíveis:', ', '.join(sorted(ok)))
    teste = os.path.join(PASTA, '_teste.mp3')
    try:
        await asyncio.wait_for(edge_tts.Communicate('Olá, tudo bem?', 'pt-BR-FranciscaNeural').save(teste), 40)
        servico_ok = os.path.getsize(teste) > 2000
    except Exception as e:
        print('Teste do serviço falhou:', e)
        servico_ok = False
    if os.path.exists(teste):
        os.remove(teste)
    if not servico_ok:
        aviso('Serviço de vozes indisponível', 'O serviço gratuito de vozes não devolveu áudio. Nada foi gravado agora; o jogo usa as vozes naturais do navegador ou mostra só o texto. Rode o fluxo de novo mais tarde.')
        salvar_estado(falas, motores)
        return

    pendentes = [f for f in falas if not existe(f) or motores.get(f['id']) != resolver(f, ok)]
    print(f'{len(pendentes)} falas para gravar ({sum(len(f["texto"]) for f in pendentes)} caracteres).')
    sem = asyncio.Semaphore(int(os.environ.get('PARALELO', '4')))

    async def rodar(f):
        return f, await gerar(f, edge_tts, ok, sem)

    feitas = 0
    for i, t in enumerate(asyncio.as_completed([rodar(f) for f in pendentes]), 1):
        f, voz = await t
        if voz:
            motores[f['id']] = voz
            feitas += 1
        if i % 50 == 0:
            print(f'{i}/{len(pendentes)} processadas')
            motores, _ = salvar_estado(falas, motores)

    validos = {f['id'] for f in falas}
    for nome in os.listdir(PASTA):
        if nome.endswith('.mp3') and nome[:-4] not in validos:
            os.remove(os.path.join(PASTA, nome))
    motores, ids = salvar_estado(falas, motores)
    print(f'Concluído: {feitas} gravadas agora; {len(ids)} de {len(falas)} falas com áudio neural.')


asyncio.run(main())
