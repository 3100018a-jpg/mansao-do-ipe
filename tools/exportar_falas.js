#!/usr/bin/env node
/* Exporta todas as falas do jogo para audio/falas.json e cria a página
   amostras-vozes.html, para ouvir a voz de cada personagem no site publicado.
   Uso: node tools/exportar_falas.js
   Cada item: { id, voz, azure, rate, genero, texto } — o id é o mesmo calculado
   pelo jogo (hash da voz + texto), então o MP3 gerado é encontrado automaticamente. */
const fs = require('fs');
const path = require('path');
global.window = global;
const raiz = path.join(__dirname, '..');
['js/nucleo.js', 'js/audio.js', 'js/dados.js', 'js/dados2.js'].forEach((f) => require(path.join(raiz, f)));
const MI = global.MI;

const lista = [];
MI.listaFalas().forEach((f) => {
  const perfil = MI.PERSONAGENS[f.p].voz;
  const add = (limpo) => {
    const item = { id: MI.A.idFala(limpo, perfil), voz: perfil.edge, rate: perfil.rate || '+0%', genero: perfil.genero, texto: MI.A.textoFalado(limpo) };
    if (perfil.azure) item.azure = perfil.azure;
    lista.push(item);
  };
  add(MI.A.limparTexto(f.t));
});
const unicos = [...new Map(lista.map((f) => [f.id, f])).values()];
fs.mkdirSync(path.join(raiz, 'audio', 'vozes'), { recursive: true });
fs.writeFileSync(path.join(raiz, 'audio', 'falas.json'), JSON.stringify(unicos, null, 1));
console.log('Falas exportadas:', unicos.length, '·', unicos.reduce((s, f) => s + f.texto.length, 0), 'caracteres');

// o jogo não usa mais o nome do jogador: apaga a lista antiga de nomes, se existir
const antigaNomes = path.join(raiz, 'audio', 'nomes.json');
if (fs.existsSync(antigaNomes)) fs.unlinkSync(antigaNomes);

// ---------- página de amostras ----------
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const primeira = {};
MI.CAPITULOS.forEach((c) => [].concat(c.intro, c.meio, c.fim).forEach((l) => { if (!primeira[l.p]) primeira[l.p] = l.t; }));
const itens = Object.entries(MI.PERSONAGENS).map(([k, p]) => {
  const t = primeira[k];
  const id = MI.A.idFala(MI.A.limparTexto(t), p.voz);
  const desc = (p.voz.genero === 'M' ? 'personagem masculino' : 'personagem feminina') + ' · voz preferida: ' + (p.voz.azure || p.voz.edge).replace('pt-BR-', '').replace('Neural', '');
  return `<li data-id="${id}"><div class="q"><b>${esc(p.nome)}</b> <span>${esc(p.papel)}</span></div><div class="v">${esc(desc)} <em class="st"></em></div><p>${esc(MI.A.limparTexto(t))}</p><audio controls preload="none" src="audio/vozes/${id}.mp3"></audio></li>`;
}).join('');
const html = `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Vozes dos personagens</title>
<style>
:root{--fundo:#f4efe4;--cartao:#fff;--texto:#2b1d12;--suave:#6b5a45;--borda:#e0d4bb;--ok:#1f7a4d}
@media (prefers-color-scheme:dark){:root{--fundo:#1f1416;--cartao:#2b1e20;--texto:#f3e9d8;--suave:#bfae96;--borda:#4a3436;--ok:#5fd39a}}
body{margin:0;background:var(--fundo);color:var(--texto);font:16px/1.45 system-ui,sans-serif}
main{max-width:980px;margin:0 auto;padding:24px 16px 48px}h1{margin:0 0 6px}
ul{list-style:none;margin:16px 0 0;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px}
li{background:var(--cartao);border:1px solid var(--borda);border-radius:12px;padding:12px 14px}
.q span,.v{color:var(--suave);font-size:.9rem}p{margin:8px 0}audio{width:100%;height:36px}.st{font-style:normal;font-weight:600;color:var(--ok)}a{color:inherit}
</style></head><body><main>
<h1>Vozes dos personagens</h1>
<p>Vozes neurais da Microsoft em português do Brasil, sem vozes multilíngues ou estrangeiras e sem ajuste artificial de tom. Abaixo, a primeira fala de cada personagem.</p>
<p><a href="./">Voltar ao jogo</a></p>
<ul>${itens}</ul>
</main>
<script>
fetch('audio/vozes/motores.json').then(function(r){return r.ok?r.json():{}}).catch(function(){return {}}).then(function(m){
  document.querySelectorAll('li').forEach(function(li){var st=li.querySelector('.st'),v=m[li.dataset.id];st.textContent=v?'· gravada com '+v.replace('pt-BR-','').replace('Neural',''):'· ainda não gravada';});
});
</script>
</body></html>
`;
fs.writeFileSync(path.join(raiz, 'amostras-vozes.html'), html);
console.log('Página de amostras: amostras-vozes.html');
