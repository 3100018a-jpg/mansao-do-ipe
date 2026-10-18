/* =========================================================
   Mistério na Mansão do Ipê — motor do jogo
   Telas: início, mansão (mapa), cena de objetos ocultos.
   Camadas: diálogo, janelas (capítulo, desafio, diário,
   restauração, configurações, professor, certificado).
   ========================================================= */
(function () {
  'use strict';
  const MI = window.MI;
  const U = MI.U;
  const A = MI.A;
  const $ = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));
  const esc = U.esc;

  // =========================================================
  // Estado salvo
  // =========================================================
  const ESTADO_PADRAO = () => ({
    nome: '', estrelas: 0, estrelasTotal: 0,
    caps: {}, rest: {}, cartoes: {}, glossario: {}, evidencias: {},
    tutorial: false, professor: false, novidades: {},
  });
  let E = Object.assign(ESTADO_PADRAO(), MI.S.get('estado', {}));
  const salvar = () => MI.S.set('estado', E);
  const cap = (id) => (E.caps[id] = E.caps[id] || { fase: 0, dominio: 0, melhor: 0, estrelasMelhor: 0, desafio: null });
  const capDados = (id) => MI.CAPITULOS.find((c) => c.id === id);
  const indiceCap = (id) => MI.CAPITULOS.findIndex((c) => c.id === id);
  const completo = (id) => !!(E.caps[id] && E.caps[id].fase >= 3);
  const liberado = (id) => {
    if (E.professor) return true;
    const i = indiceCap(id);
    return i === 0 || completo(MI.CAPITULOS[i - 1].id);
  };
  const nome = () => E.nome || 'investigador(a)';
  // a última missão encerra o caso e libera o certificado
  const ultimo = () => MI.CAPITULOS[MI.CAPITULOS.length - 1].id;
  const fmt = (t) => String(t).replace(/\{nome\}/g, nome());
  // período do dia na fachada: o do próximo capítulo; com o caso encerrado, um novo dia amanhece
  const periodoMansao = () => { const prox = MI.CAPITULOS.find((c) => !completo(c.id)); return prox ? MI.periodoDe(prox.id) : 'aurora'; };
  const rotuloPeriodo = (p) => { const P = MI.PERIODOS[p]; return P ? `${P.icone} ${P.nome}` : ''; };

  // =========================================================
  // Utilidades de interface
  // =========================================================
  function trocarTela(id) {
    $$('.tela').forEach((t) => t.classList.toggle('ativa', t.id === id));
  }
  function toast(msg, tipo) {
    const t = document.createElement('div');
    t.className = 'toast ' + (tipo || '');
    t.innerHTML = msg;
    $('#toasts').appendChild(t);
    setTimeout(() => t.classList.add('sair'), 2600);
    setTimeout(() => t.remove(), 3200);
  }
  // janela modal genérica
  let fecharModalAtual = null;
  function abrirModal(html, op) {
    op = op || {};
    const m = $('#modal');
    m.className = 'modal ativo ' + (op.classe || '');
    m.innerHTML = `<div class="modal-caixa ${op.caixa || ''}" role="dialog" aria-modal="true">${op.fechar === false ? '' : '<button class="btn-fechar" aria-label="Fechar">×</button>'}${html}</div>`;
    const fechar = () => {
      m.className = 'modal';
      m.innerHTML = '';
      fecharModalAtual = null;
      A.parar();
      if (op.aoFechar) op.aoFechar();
    };
    fecharModalAtual = op.fechar === false ? null : fechar;
    const bf = $('.btn-fechar', m);
    if (bf) bf.onclick = () => { A.sfx('clique'); fechar(); };
    m.onclick = (e) => { if (e.target === m && op.fechar !== false && op.fundoFecha !== false) fechar(); };
    return { el: $('.modal-caixa', m), fechar };
  }
  function fecharModal() { const m = $('#modal'); m.className = 'modal'; m.innerHTML = ''; fecharModalAtual = null; }

  // ---------- tela cheia (celular e tablet) ----------
  const toqueGrosso = () => window.matchMedia && matchMedia('(pointer: coarse)').matches;
  const telaCheiaPossivel = () => !!(document.fullscreenEnabled || document.webkitFullscreenEnabled);
  const emTelaCheia = () => !!(document.fullscreenElement || document.webkitFullscreenElement);
  function alternarTelaCheia(ligar) {
    if (!telaCheiaPossivel()) return;
    if (ligar == null) ligar = !emTelaCheia();
    try {
      const el = document.documentElement;
      const r = ligar
        ? (el.requestFullscreen ? el.requestFullscreen({ navigationUI: 'hide' }) : el.webkitRequestFullscreen())
        : (document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen());
      if (r && r.catch) r.catch(() => {});
    } catch (e) { /* o navegador recusou */ }
  }
  function telaCheiaAutomatica() {
    if (toqueGrosso() && telaCheiaPossivel() && !emTelaCheia() && MI.S.get('telaCheia', true)) alternarTelaCheia(true);
  }
  function atualizarBotoesTelaCheia() {
    const ok = telaCheiaPossivel();
    $$('#btn-tela-cheia, #btn-tela-cheia-inicio').forEach((b) => { b.hidden = !ok; });
    const on = emTelaCheia();
    const b = $('#btn-tela-cheia');
    if (b) { b.textContent = on ? '🗗' : '⛶'; b.title = on ? 'Sair da tela cheia' : 'Tela cheia'; b.setAttribute('aria-label', b.title); }
    const bi = $('#btn-tela-cheia-inicio');
    if (bi) bi.textContent = on ? '🗗 Sair da tela cheia' : '⛶ Tela cheia';
  }

  function estrelasHTML(n, max, classe) {
    max = max || 3;
    let s = '';
    for (let i = 0; i < max; i++) s += `<span class="estrela ${i < n ? 'cheia' : ''} ${classe || ''}" style="--i:${i}">★</span>`;
    return s;
  }
  function atualizarContadores() {
    $$('.cont-estrelas').forEach((el) => (el.textContent = E.estrelas));
  }

  // =========================================================
  // Tela inicial
  // =========================================================
  function telaInicio() {
    trocarTela('tela-inicio');
    $('#inicio-fundo').innerHTML = `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">${U.isolarIds(MI.desenharMansao({ feitos: {}, rest: { lampioes: true }, periodo: 'noite' }), 'ini')}</svg>`;
    const temJogo = Object.keys(E.caps).length > 0;
    $('#inicio-nome').value = E.nome || '';
    $('#btn-continuar').hidden = !temJogo;
    $('#btn-comecar').textContent = temJogo ? 'Novo jogo' : 'Começar a investigação';
  }
  function definirNomeFalado() {
    A.nomeJogador = E.nome && E.nome !== 'Investigador(a)' ? E.nome : '';
  }
  async function ouvirNome() {
    iniciarAudioUmaVez();
    const n = $('#inicio-nome').value.trim();
    const info = $('#inicio-nome-info');
    if (!n) { info.className = 'inicio-nome-info'; info.textContent = 'Digite o seu nome para ouvir como ele será lido.'; return; }
    info.className = 'inicio-nome-info';
    info.textContent = 'Ouvindo…';
    const modo = await A.ouvirNome(n, MI.PERSONAGENS.marta.voz);
    if (modo === 'gravado') { info.className = 'inicio-nome-info ok'; info.textContent = 'Seu nome foi gravado com a voz neural da Profa. Marta.'; }
    else if (modo === 'navegador') info.textContent = 'Seu nome será lido pela voz natural em português do navegador. Para gravá-lo com a voz da Profa. Marta, peça ao professor que o inclua em nomes-turma.txt.';
    else info.textContent = 'Seu nome aparecerá escrito nas falas. Para ouvi-lo, peça ao professor que o inclua em nomes-turma.txt, ou use o Microsoft Edge.';
  }
  function iniciarAudioUmaVez() {
    A.iniciarAudio();
    A.musica('mansao', periodoMansao());
  }
  function comecar(novo) {
    iniciarAudioUmaVez();
    telaCheiaAutomatica();
    const n = $('#inicio-nome').value.trim().slice(0, 30);
    if (novo && Object.keys(E.caps).length && !confirm('Começar um novo jogo apaga o progresso atual. Deseja continuar?')) return;
    if (novo) { const prof = E.professor; E = ESTADO_PADRAO(); E.professor = prof; }
    if (n) E.nome = n;
    if (!E.nome) E.nome = 'Investigador(a)';
    salvar();
    definirNomeFalado();
    const primeiro = novo || !E.caps.hall;
    telaMansao();
    // a Profa. Marta recebe o jogador chamando-o pelo nome
    dialogo([primeiro ? MI.SAUDACAO.novo : MI.SAUDACAO.volta], {}, () => { if (primeiro) setTimeout(() => abrirCapitulo('hall'), 250); });
  }

  // =========================================================
  // Mansão (mapa principal)
  // =========================================================
  function telaMansao(destaque) {
    trocarTela('tela-mansao');
    $('#inicio-fundo').innerHTML = '';
    const per = periodoMansao();
    A.musica('mansao', per);
    const feitos = {};
    MI.CAPITULOS.forEach((c) => { if (completo(c.id)) feitos[c.id] = true; });
    $('#mansao-svg').innerHTML = `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Fachada da Mansão do Ipê">${U.isolarIds(MI.desenharMansao({ feitos, rest: E.rest, periodo: per }), 'man')}</svg>`;
    // medalhões dos capítulos
    const box = $('#mansao-pontos');
    box.innerHTML = '';
    MI.CAPITULOS.forEach((c) => {
      const p = MI.PONTOS_MANSAO[c.id];
      const st = cap(c.id);
      const lib = liberado(c.id);
      const b = document.createElement('button');
      b.className = 'ponto ' + (completo(c.id) ? 'feito' : lib ? 'aberto' : 'trancado');
      b.style.left = (p.x / 16) + '%';
      b.style.top = (p.y / 9) + '%';
      b.setAttribute('aria-label', `Capítulo ${c.num}: ${c.titulo}, ${c.comodo}` + (lib ? '' : ' (bloqueado)'));
      b.innerHTML = `<span class="ponto-num">${lib ? c.num : '🔒'}</span><span class="ponto-nome">${esc(c.comodo)}</span>` +
        (completo(c.id) ? `<span class="ponto-est">${estrelasHTML(st.estrelasMelhor)}</span>` : '');
      b.onclick = () => { A.sfx('clique'); abrirCapitulo(c.id); };
      box.appendChild(b);
    });
    $('#mansao-nome').textContent = nome();
    atualizarContadores();
    const fim = completo(ultimo());
    $('#btn-certificado').hidden = !fim;
    // aviso de restauração disponível
    const barata = MI.RESTAURACAO.filter((r) => !E.rest[r.id]).reduce((m, r) => Math.min(m, r.custo), 99);
    $('#btn-restaurar').classList.toggle('pulsar', E.estrelas >= barata);
    if (destaque) toast(destaque, 'ouro');
    centralizarPontoAtual();
  }
  // no celular em pé, a fachada fica larga e desliza para os lados:
  // começa mostrando o próximo cômodo a investigar
  let avisouDeslize = false;
  function centralizarPontoAtual() {
    requestAnimationFrame(() => {
      const palco = $('.mansao-palco');
      if (!palco || palco.scrollWidth <= palco.clientWidth + 4) return;
      const alvo = $('.ponto.aberto', palco) || $$('.ponto.feito', palco).pop();
      if (alvo) {
        const r = alvo.getBoundingClientRect(), pr = palco.getBoundingClientRect();
        palco.scrollLeft += (r.left + r.width / 2) - (pr.left + pr.width / 2);
      }
      if (!avisouDeslize) setTimeout(() => { if (!avisouDeslize && $('#tela-mansao').classList.contains('ativa') && !$('#dialogo').classList.contains('ativo') && !$('#modal').classList.contains('ativo')) { avisouDeslize = true; toast('Deslize para os lados para ver toda a mansão.'); } }, 400);
    });
  }

  // ---------- cartão do capítulo ----------
  function abrirCapitulo(id) {
    const c = capDados(id);
    const st = cap(id);
    if (!liberado(id)) {
      const ant = MI.CAPITULOS[indiceCap(id) - 1];
      toast(`Conclua primeiro o capítulo ${ant.num}: ${esc(ant.titulo)}.`);
      return;
    }
    const modoAtual = MI.MODOS[Math.min(st.dominio, 4)];
    let acoes = '';
    if (!completo(id)) {
      if (st.fase === 0 || st.fase === 1) acoes = `<button class="btn grande ouro" data-a="historia">${st.fase === 0 ? 'Começar capítulo' : 'Procurar objetos'}</button>`;
      else if (st.fase === 2) acoes = `<button class="btn grande ouro" data-a="desafio">Continuar: analisar a frase</button>`;
    } else {
      const modos = MI.MODOS.slice(0, Math.min(st.dominio, 4) + 1)
        .map((m, i) => `<option value="${i}" ${m.id === modoAtual.id ? 'selected' : ''}>${esc(m.nome)}</option>`).join('');
      acoes = `<div class="linha-modo"><label for="sel-modo">Modo da cena</label><select id="sel-modo">${modos}</select></div>
        <button class="btn grande ouro" data-a="jogar">Jogar a cena</button>
        <div class="acoes-sec"><button class="btn" data-a="desafio">Refazer a análise</button><button class="btn" data-a="rever">Rever a história</button></div>`;
    }
    const dominio = `<div class="dominio" title="Domínio da cena">${Array.from({ length: 5 }, (_, i) => `<span class="${i < st.dominio ? 'on' : ''}"></span>`).join('')}<em>Domínio ${st.dominio}/5</em></div>`;
    const prev = `<div class="cap-prev"><svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">${U.isolarIds(MI.cenaCompleta(c.cena, MI.periodoDe(id)), 'prev')}</svg></div>`;
    const { el, fechar } = abrirModal(`
      ${prev}
      <div class="cap-corpo">
        <div class="cap-rot">Capítulo ${c.num} · ${esc(c.comodo)}${c.cartao ? ` · <b>${esc(c.cartao)}</b>` : ''}</div>
        <h2>${esc(c.titulo)}</h2>
        <p class="cap-ctx">${esc(c.contexto)}</p>
        <p class="cap-trilha"><b>${rotuloPeriodo(MI.periodoDe(id))}</b> · ♪ ${esc(MI.TRILHAS[c.musica] || '')}, com ${esc((MI.SONS_PERIODO[MI.periodoDe(id)] || {}).desc || '')}</p>
        <p>${esc(c.resumo)}</p>
        ${completo(id) ? `<div class="cap-info"><span>${estrelasHTML(st.estrelasMelhor)}</span><span>Melhor pontuação: <b>${st.melhor}</b></span>${dominio}</div>` : ''}
        <div class="cap-acoes">${acoes}</div>
      </div>`, { caixa: 'caixa-cap' });
    $$('[data-a]', el).forEach((b) => (b.onclick = () => {
      A.sfx('clique');
      const a = b.dataset.a;
      const modoSel = $('#sel-modo', el) ? +$('#sel-modo', el).value : 0;
      fechar();
      if (a === 'historia') fluxoCapitulo(id);
      else if (a === 'desafio') fluxoDesafio(id, completo(id));
      else if (a === 'jogar') iniciarCena(id, modoSel, (res) => posReplay(id, res));
      else if (a === 'rever') dialogo([].concat(c.intro, c.meio, c.fim), { fundo: c.cena }, () => telaMansao());
    }));
  }

  // fluxo completo do capítulo pela primeira vez
  function fluxoCapitulo(id) {
    const c = capDados(id);
    const st = cap(id);
    const hog = () => iniciarCena(id, 0, (res) => {
      st.fase = 2;
      registrarResultado(id, res);
      salvar();
      dialogo(c.meio, { fundo: c.cena }, () => fluxoDesafio(id, false));
    });
    if (st.fase === 0) {
      st.fase = 1; salvar();
      dialogo(c.intro, { fundo: c.cena }, hog);
    } else hog();
  }

  function registrarResultado(id, res) {
    const st = cap(id);
    st.melhor = Math.max(st.melhor, res.pontos);
    st.estrelasMelhor = Math.max(st.estrelasMelhor, res.estrelas);
    st.dominio = Math.min(5, st.dominio + 1);
    E.estrelas += res.estrelas;
    E.estrelasTotal += res.estrelas;
  }

  function posReplay(id, res) {
    const st = cap(id);
    const antes = st.dominio;
    registrarResultado(id, res);
    salvar();
    let msg = `+${res.estrelas} ★ para restaurar a mansão`;
    if (st.dominio > antes && st.dominio <= 4) msg += ` · Novo modo liberado: ${MI.MODOS[st.dominio].nome}`;
    if (st.dominio === 5 && antes < 5) msg += ' · Cena dominada!';
    telaMansao(msg);
  }

  // =========================================================
  // Diálogos
  // =========================================================
  let dlg = null;
  function dialogo(linhas, op, aoFim) {
    op = op || {};
    const el = $('#dialogo');
    const fundo = $('#dialogo-fundo');
    fundo.classList.toggle('transparente', !op.fundo);
    if (op.fundo && MI.CENAS[op.fundo]) {
      const c = MI.CENAS[op.fundo];
      const capF = MI.CAPITULOS.find((x) => x.cena === op.fundo);
      const perF = capF ? MI.periodoDe(capF.id) : 'dia';
      if (capF) A.musica(capF.musica, perF);
      fundo.innerHTML = `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">${U.isolarIds(MI.cenaCompleta(op.fundo, perF), 'dlg')}</svg>`;
    } else fundo.innerHTML = '';
    el.classList.add('ativo');
    dlg = { linhas, i: -1, aoFim, digitando: false, timer: null };
    A.precarregar(linhas.slice(0, 3).map((l) => ({ texto: l.t, perfil: MI.PERSONAGENS[l.p].voz })));
    proxFala();
  }
  function proxFala() {
    if (!dlg) return;
    if (dlg.digitando) { terminarDigitacao(); return; }
    A.parar();
    dlg.i++;
    if (dlg.i >= dlg.linhas.length) { encerrarDialogo(); return; }
    const l = dlg.linhas[dlg.i];
    const p = MI.PERSONAGENS[l.p];
    const lado = ['marta', 'tiago'].includes(l.p) ? 'esq' : 'dir';
    const caixa = $('#dialogo-caixa');
    caixa.className = 'dialogo-caixa lado-' + lado;
    $('#dialogo-retrato').innerHTML = MI.retrato(l.p);
    $('#dialogo-nome').innerHTML = `${esc(p.nome)} <small>${esc(p.papel)}</small>`;
    const texto = fmt(l.t);
    const alvo = $('#dialogo-texto');
    alvo.textContent = '';
    dlg.digitando = true;
    let n = 0;
    clearInterval(dlg.timer);
    dlg.timer = setInterval(() => {
      n += 2;
      alvo.textContent = texto.slice(0, n);
      if (n >= texto.length) terminarDigitacao();
    }, 22);
    dlg.texto = texto;
    A.sfx('pagina');
    A.falar(l.t, p.voz);
    const prox = dlg.linhas.slice(dlg.i + 1, dlg.i + 3).map((x) => ({ texto: x.t, perfil: MI.PERSONAGENS[x.p].voz }));
    A.precarregar(prox);
    $('#dialogo-prog').textContent = `${dlg.i + 1}/${dlg.linhas.length}`;
  }
  function terminarDigitacao() {
    if (!dlg) return;
    clearInterval(dlg.timer);
    dlg.digitando = false;
    $('#dialogo-texto').textContent = dlg.texto;
  }
  function encerrarDialogo() {
    if (!dlg) return;
    clearInterval(dlg.timer);
    A.parar();
    const f = dlg.aoFim;
    dlg = null;
    $('#dialogo').classList.remove('ativo');
    $('#dialogo-fundo').innerHTML = '';
    if (f) f();
  }

  // =========================================================
  // Cena de objetos ocultos
  // =========================================================
  let J = null; // estado da partida
  const ESC_OBJ = (s) => s * (s < 0.55 ? 1.22 : 1.08);

  function iniciarCena(capId, modoIdx, aoFim) {
    const c = capDados(capId);
    const cena = MI.CENAS[c.cena];
    const modo = MI.MODOS[modoIdx] || MI.MODOS[0];
    trocarTela('tela-cena');
    const periodo = MI.periodoDe(capId);
    A.musica(c.musica, periodo);
    const slots = cena.slots.map((s, i) => Object.assign({ i, achado: false }, s, { se: ESC_OBJ(s.s) }));
    const alvos = U.embaralhar(slots).slice(0, cena.alvos).map((s) => s.i);
    J = {
      capId, cena, modo, slots, alvos: new Set(alvos), ordem: alvos, aoFim,
      achados: 0, pontos: 0, combo: 0, ultimoAchado: 0, erros: 0, errosRecentes: [], dicas: 0,
      inicio: performance.now(), travadoAte: 0, dicaPronta: 0, fim: false,
      vb: { x: 0, y: 0, w: 1600, h: 900 },
      luz: { x: 800, y: 450 },
    };
    $('#cena-titulo').textContent = `${c.num}. ${cena.nome}`;
    $('#cena-modo').textContent = `${modo.nome} · ${rotuloPeriodo(periodo)}`;
    // monta o SVG
    let objs = '';
    slots.forEach((s) => {
      const o = MI.OBJETOS[s.o];
      const sombra = s.sb ? MI.DESENHO.sombra(s.x, s.y + 44 * s.se, s.sb * (s.se / s.s), s.sb * 0.25) : '';
      objs += `<g class="obj" data-i="${s.i}">${sombra}<g transform="translate(${s.x} ${s.y}) rotate(${s.r || 0}) scale(${s.se})">${o.svg}</g></g>`;
    });
    const noturno = modo.id === 'noturno' || modo.id === 'mestre';
    const raioLuz = modo.id === 'mestre' ? 150 : 175;
    $('#cena-area').innerHTML = `<svg id="cena-svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Cena: ${esc(cena.nome)}">
      <defs><clipPath id="clipCena"><rect width="1600" height="900"/></clipPath></defs>
      <g clip-path="url(#clipCena)">${U.isolarIds(MI.comPeriodo(periodo, () => cena.bg()), 'cena')}<g id="c-obj">${U.isolarIds(objs, 'cena')}</g><g id="c-fg" pointer-events="none">${U.isolarIds(MI.comPeriodo(periodo, () => cena.fg()), 'cena')}</g>${noturno ? '' : `<g id="c-periodo" pointer-events="none">${U.isolarIds(MI.luzPeriodo(periodo, cena.luzes), 'cena')}</g>`}</g>
      <g id="c-fx" pointer-events="none"></g>
      ${noturno ? `<defs><radialGradient id="gMascLuz"><stop offset="0" stop-color="#000"/><stop offset=".62" stop-color="#000"/><stop offset="1" stop-color="#fff"/></radialGradient>
        <mask id="mNoite" maskUnits="userSpaceOnUse" x="0" y="0" width="1600" height="900"><rect width="1600" height="900" fill="#fff"/><circle id="luz" cx="800" cy="450" r="${raioLuz}" fill="url(#gMascLuz)"/></mask></defs>
        <rect width="1600" height="900" fill="#03050c" opacity=".94" mask="url(#mNoite)" pointer-events="none"/>` : ''}
    </svg>`;
    montarLista();
    atualizarHud();
    configurarEntrada();
    clearInterval(J.relogio);
    J.relogio = setInterval(atualizarHud, 250);
    if (!E.tutorial) {
      E.tutorial = true; salvar();
      ajudaCena(true);
    } else if (modo.id !== 'palavras') toast(`<b>${esc(modo.nome)}</b>: ${esc(modo.desc)}`);
    if (J.vistaParcial() && !avisouArrasto) { avisouArrasto = true; toast('Arraste para os lados para ver o cômodo inteiro. Com dois dedos, você aproxima ou afasta.'); }
  }

  function ajudaCena(primeira) {
    const { el, fechar } = abrirModal(`<h2>${primeira ? 'Como investigar' : 'Ajuda'}</h2>
      <ul class="lista-ajuda">
        <li><b>Toque nos objetos da lista</b> quando encontrá-los na cena.</li>
        <li>Achados seguidos e rápidos valem <b>combo</b>. Toques ao acaso tiram pontos e podem travar a busca por alguns segundos.</li>
        <li>A <b>lupa</b> mostra onde está um objeto, mas custa pontos e precisa recarregar.</li>
        <li>Use a <b>roda do mouse</b>, os botões <b>+</b> e <b>−</b> ou <b>dois dedos</b> para aproximar. Arraste ou toque nas <b>setas das bordas</b> para ver o resto do cômodo.</li>
        <li>Rejogue as cenas para ganhar estrelas, subir o <b>domínio</b> e liberar novos modos: silhuetas, definições e lanterna.</li>
      </ul>
      <button class="btn grande ouro" id="ok-ajuda">Entendi</button>`, { caixa: 'caixa-media' });
    $('#ok-ajuda', el).onclick = () => { A.sfx('clique'); fechar(); };
  }

  function montarLista() {
    const lista = $('#cena-lista');
    lista.className = 'cena-lista modo-' + J.modo.id;
    lista.innerHTML = J.ordem.map((i) => {
      const s = J.slots[i];
      const o = MI.OBJETOS[s.o];
      let conteudo;
      if (J.modo.id === 'silhuetas') conteudo = `<span class="silhueta">${MI.svgObjeto(s.o, 44)}</span><span class="sr">${esc(o.nome)}</span>`;
      else if (J.modo.id === 'definicoes' || J.modo.id === 'mestre') conteudo = `<span class="def">${esc(o.def)}</span>`;
      else conteudo = `<span class="nome">${esc(o.nome)}</span>`;
      return `<li class="item" data-i="${i}" title="${esc(o.nome)}">${conteudo}</li>`;
    }).join('');
  }

  function atualizarHud() {
    if (!J) return;
    const t = (performance.now() - J.inicio) / 1000;
    $('#hud-tempo').textContent = U.fmtTempo(t);
    $('#hud-pontos').textContent = J.pontos;
    $('#hud-achados').textContent = `${J.achados}/${J.alvos.size}`;
    const agora = performance.now();
    const btn = $('#btn-dica');
    const falta = Math.max(0, J.dicaPronta - agora);
    btn.disabled = falta > 0 || J.fim;
    btn.style.setProperty('--carga', falta > 0 ? 1 - falta / 20000 : 1);
    const trava = $('#cena-trava');
    if (J.travadoAte > agora) {
      trava.classList.add('ativo');
      $('#trava-seg').textContent = Math.ceil((J.travadoAte - agora) / 1000);
    } else trava.classList.remove('ativo');
  }

  // ---------- zoom, arraste e toques ----------
  let roCena = null, avisouArrasto = false;
  function configurarEntrada() {
    const area = $('#cena-area');
    const svg = $('#cena-svg');
    const ptrs = new Map();
    let inicioToque = null, pinca = null, arrasto = null;

    const paraSvg = (cx, cy) => {
      const r = svg.getBoundingClientRect();
      // preserveAspectRatio meet: calcula a área útil
      const esc = Math.min(r.width / J.vb.w, r.height / J.vb.h);
      const ox = r.left + (r.width - J.vb.w * esc) / 2, oy = r.top + (r.height - J.vb.h * esc) / 2;
      return { x: J.vb.x + (cx - ox) / esc, y: J.vb.y + (cy - oy) / esc, esc };
    };
    // A janela de visão acompanha o formato da tela. Em telas largas, o cômodo
    // aparece inteiro; em celulares em pé, ocupa toda a altura e se arrasta para os lados.
    const geometria = () => {
      const r = area.getBoundingClientRect();
      const a = r.width > 20 && r.height > 20 ? r.width / r.height : 16 / 9;
      const wMax = Math.max(1600, 900 * a);          // cômodo inteiro (com margens)
      const wIni = a < 1.42 ? 900 * a : wMax;        // em pé: preenche a altura
      const wMin = Math.min(wIni, 315 * a);          // aproximação máxima
      return { a, wMax, wIni, wMin, real: r.width > 20 && r.height > 20 };
    };
    let G = geometria();
    const podeMover = () => J.vb.w < 1599 || J.vb.h < 899;
    const aplicarVb = () => {
      const v = J.vb;
      v.w = U.clamp(v.w, G.wMin, G.wMax); v.h = v.w / G.a;
      v.x = v.w <= 1600 ? U.clamp(v.x, 0, 1600 - v.w) : (1600 - v.w) / 2;
      v.y = v.h <= 900 ? U.clamp(v.y, 0, 900 - v.h) : (900 - v.h) / 2;
      svg.setAttribute('viewBox', `${v.x.toFixed(1)} ${v.y.toFixed(1)} ${v.w.toFixed(1)} ${v.h.toFixed(1)}`);
      $('#cena-zoom-nivel').textContent = Math.round((G.wIni / v.w) * 100) + '%';
      // setas que mostram que o cômodo continua fora da tela
      const mostra = { esq: v.x > 2, dir: v.x + v.w < 1598, cima: v.y > 2, baixo: v.y + v.h < 898 };
      $$('.cena-seta').forEach((b) => b.classList.toggle('ativa', !!mostra[b.dataset.dir]));
      area.classList.toggle('movel', podeMover());
    };
    const vistaInicial = () => {
      const v = J.vb;
      v.w = G.wIni; v.h = v.w / G.a;
      v.x = (1600 - v.w) / 2; v.y = (900 - v.h) / 2;
      aplicarVb();
    };
    J.zoom = (fator, cx, cy) => {
      const v = J.vb;
      const p = cx == null ? { x: v.x + v.w / 2, y: v.y + v.h / 2 } : paraSvg(cx, cy);
      const nw = U.clamp(v.w / fator, G.wMin, G.wMax);
      const k = nw / v.w;
      v.x = p.x - (p.x - v.x) * k; v.y = p.y - (p.y - v.y) * k; v.w = nw;
      aplicarVb();
    };
    J.irPara = (x, y) => {
      const v = J.vb;
      if (!podeMover()) return;
      v.x = x - v.w / 2; v.y = y - v.h / 2; aplicarVb();
    };
    J.mover = (dx, dy) => {
      const v = J.vb;
      v.x += dx * v.w * 0.6; v.y += dy * v.h * 0.6; aplicarVb();
    };
    J.vistaParcial = () => G.wIni < 1599;
    // girar o celular ou redimensionar a janela recalcula a vista
    if (roCena) roCena.disconnect();
    roCena = new ResizeObserver(() => {
      if (!J || !document.body.contains(svg)) return;
      const antes = G;
      G = geometria();
      if (Math.abs(G.a - antes.a) < 0.01 && antes.real) return;
      if (!antes.real) { vistaInicial(); return; }
      const v = J.vb, cx = v.x + v.w / 2, cy = v.y + v.h / 2;
      v.w = G.wIni * (v.w / antes.wIni); v.h = v.w / G.a;
      v.x = cx - v.w / 2; v.y = cy - v.h / 2;
      aplicarVb();
    });
    roCena.observe(area);
    const moverLuz = (cx, cy) => {
      const luz = $('#luz');
      if (!luz) return;
      const p = paraSvg(cx, cy);
      luz.setAttribute('cx', p.x.toFixed(0)); luz.setAttribute('cy', p.y.toFixed(0));
    };

    area.onwheel = (e) => { e.preventDefault(); J.zoom(e.deltaY < 0 ? 1.15 : 1 / 1.15, e.clientX, e.clientY); };
    area.onpointerdown = (e) => {
      if (J.fim) return;
      try { area.setPointerCapture(e.pointerId); } catch (err) { /* ponteiro sintético */ }
      ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (ptrs.size === 1) {
        inicioToque = { x: e.clientX, y: e.clientY, t: performance.now() };
        arrasto = { x: e.clientX, y: e.clientY, vx: J.vb.x, vy: J.vb.y };
        moverLuz(e.clientX, e.clientY);
      } else if (ptrs.size === 2) {
        const [a, b] = [...ptrs.values()];
        pinca = { d: Math.hypot(a.x - b.x, a.y - b.y), w: J.vb.w, cx: (a.x + b.x) / 2, cy: (a.y + b.y) / 2 };
        inicioToque = null; arrasto = null;
      }
    };
    area.onpointermove = (e) => {
      if (!J || J.fim) return;
      if (e.pointerType === 'mouse' && !ptrs.size) { moverLuz(e.clientX, e.clientY); return; }
      if (!ptrs.has(e.pointerId)) return;
      ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pinca && ptrs.size === 2) {
        const [a, b] = [...ptrs.values()];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        const alvoW = U.clamp(pinca.w * (pinca.d / d), G.wMin, G.wMax);
        J.zoom(J.vb.w / alvoW, pinca.cx, pinca.cy);
      } else if (arrasto && ptrs.size === 1) {
        moverLuz(e.clientX, e.clientY);
        const dx = e.clientX - arrasto.x, dy = e.clientY - arrasto.y;
        if (inicioToque && Math.hypot(dx, dy) > 10) inicioToque = null;
        if (!inicioToque && podeMover()) {
          const r = svg.getBoundingClientRect();
          const k = Math.min(r.width / J.vb.w, r.height / J.vb.h);
          J.vb.x = arrasto.vx - dx / k; J.vb.y = arrasto.vy - dy / k; aplicarVb();
        }
      }
    };
    const soltar = (e) => {
      if (!ptrs.has(e.pointerId)) return;
      ptrs.delete(e.pointerId);
      if (ptrs.size < 2) pinca = null;
      if (inicioToque && ptrs.size === 0 && performance.now() - inicioToque.t < 600) {
        tocar(paraSvg(e.clientX, e.clientY));
      }
      if (ptrs.size === 0) { inicioToque = null; arrasto = null; }
    };
    area.onpointerup = soltar;
    area.onpointercancel = (e) => { ptrs.delete(e.pointerId); inicioToque = null; pinca = null; arrasto = null; };
    vistaInicial();
  }

  function tocar(p) {
    if (!J || J.fim) return;
    const agora = performance.now();
    if (J.travadoAte > agora) { A.sfx('trava'); return; }
    // objeto mais próximo cujo raio contém o toque
    let melhor = null, melhorD = 1e9;
    J.slots.forEach((s) => {
      if (s.achado) return;
      const raio = MI.OBJETOS[s.o].r * s.se * 1.15 + 8;
      const d = Math.hypot(p.x - s.x, p.y - s.y);
      if (d < raio && d < melhorD) { melhor = s; melhorD = d; }
    });
    if (melhor && J.alvos.has(melhor.i)) achou(melhor);
    else errou(p);
  }

  function efeito(html) {
    const fx = $('#c-fx');
    if (!fx) return;
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.innerHTML = html.replace(/<animate /g, '<animate begin="indefinite" ');
    fx.appendChild(g);
    // animações inseridas depois do carregamento precisam ser disparadas
    g.querySelectorAll('animate').forEach((an) => { try { an.beginElement(); } catch (e) {} });
    setTimeout(() => g.remove(), 1600);
  }

  function achou(s) {
    const agora = performance.now();
    s.achado = true;
    J.achados++;
    J.combo = agora - J.ultimoAchado < 5000 && J.ultimoAchado ? Math.min(5, J.combo + 1) : 1;
    J.ultimoAchado = agora;
    const ganho = 100 * J.combo;
    J.pontos += ganho;
    A.sfx('achou', J.achados);
    const g = $(`#c-obj .obj[data-i="${s.i}"]`);
    if (g) g.classList.add('achado');
    // brilho
    let raios = '';
    for (let k = 0; k < 10; k++) {
      const a = (k / 10) * Math.PI * 2;
      raios += `<line x1="${s.x}" y1="${s.y}" x2="${s.x + Math.cos(a) * 20}" y2="${s.y + Math.sin(a) * 20}" stroke="#ffe27a" stroke-width="5" stroke-linecap="round">
        <animate attributeName="x2" to="${s.x + Math.cos(a) * 80}" dur=".6s" fill="freeze"/><animate attributeName="y2" to="${s.y + Math.sin(a) * 80}" dur=".6s" fill="freeze"/>
        <animate attributeName="opacity" from="1" to="0" dur=".7s" fill="freeze"/></line>`;
    }
    efeito(`<circle cx="${s.x}" cy="${s.y}" r="20" fill="none" stroke="#fff3b0" stroke-width="6"><animate attributeName="r" to="90" dur=".7s" fill="freeze"/><animate attributeName="opacity" from="1" to="0" dur=".7s" fill="freeze"/></circle>${raios}
      <text x="${s.x}" y="${s.y - 30}" text-anchor="middle" class="fx-texto">+${ganho}${J.combo > 1 ? ` combo ×${J.combo}` : ''}<animate attributeName="y" to="${s.y - 110}" dur="1.2s" fill="freeze"/><animate attributeName="opacity" values="1;1;0" dur="1.3s" fill="freeze"/></text>`);
    const li = $(`#cena-lista .item[data-i="${s.i}"]`);
    if (li) {
      li.classList.add('achado');
      if (J.modo.id === 'definicoes' || J.modo.id === 'mestre') li.innerHTML += `<span class="revela">${esc(MI.OBJETOS[s.o].nome)}</span>`;
      if (J.modo.id === 'silhuetas') li.innerHTML += `<span class="revela">${esc(MI.OBJETOS[s.o].nome)}</span>`;
    }
    atualizarHud();
    if (J.achados >= J.alvos.size) setTimeout(terminarCena, 900);
  }

  function errou(p) {
    const agora = performance.now();
    J.erros++;
    J.combo = 0;
    J.pontos = Math.max(0, J.pontos - 20);
    A.sfx('erro');
    efeito(`<circle cx="${p.x}" cy="${p.y}" r="10" fill="none" stroke="#ff5a4a" stroke-width="5"><animate attributeName="r" to="44" dur=".45s" fill="freeze"/><animate attributeName="opacity" from="1" to="0" dur=".5s" fill="freeze"/></circle>
      <path d="M${p.x - 12} ${p.y - 12} L${p.x + 12} ${p.y + 12} M${p.x + 12} ${p.y - 12} L${p.x - 12} ${p.y + 12}" stroke="#ff5a4a" stroke-width="6" stroke-linecap="round"><animate attributeName="opacity" from="1" to="0" dur=".6s" fill="freeze"/></path>`);
    J.errosRecentes = J.errosRecentes.filter((t) => agora - t < 5000).concat(agora);
    if (J.errosRecentes.length >= 4) {
      J.errosRecentes = [];
      J.travadoAte = agora + 6000;
      A.sfx('trava');
    }
    atualizarHud();
  }

  function usarDica() {
    if (!J || J.fim) return;
    const agora = performance.now();
    if (J.dicaPronta > agora) return;
    const resta = J.ordem.map((i) => J.slots[i]).filter((s) => !s.achado);
    if (!resta.length) return;
    const s = resta[Math.floor(Math.random() * resta.length)];
    J.dicas++;
    J.pontos = Math.max(0, J.pontos - 50);
    J.dicaPronta = agora + 20000;
    A.sfx('dica');
    J.irPara(s.x, s.y);
    const r = MI.OBJETOS[s.o].r * s.se + 30;
    efeito(`<circle cx="${s.x}" cy="${s.y}" r="${r + 60}" fill="none" stroke="#ffe27a" stroke-width="8"><animate attributeName="r" values="${r + 60};${r};${r + 14};${r}" dur="1.4s" fill="freeze"/><animate attributeName="opacity" values="0;1;1;0" dur="1.6s" fill="freeze"/></circle>
      <circle cx="${s.x}" cy="${s.y}" r="${r}" fill="#ffe27a" opacity=".18"><animate attributeName="opacity" values=".3;0" dur="1.6s" fill="freeze"/></circle>`);
    // se estiver no escuro, leva a lanterna até lá
    const luz = $('#luz');
    if (luz) { luz.setAttribute('cx', s.x); luz.setAttribute('cy', s.y); }
    atualizarHud();
  }

  function terminarCena() {
    if (!J || J.fim) return;
    J.fim = true;
    clearInterval(J.relogio);
    const t = (performance.now() - J.inicio) / 1000;
    const bonusTempo = Math.max(0, Math.round((240 - t) * 4));
    const bonusPrecisao = J.erros === 0 ? 300 : J.erros <= 3 ? 150 : 0;
    const total = J.pontos + bonusTempo + bonusPrecisao;
    const fator = { palavras: 1, silhuetas: 0.95, definicoes: 0.85, noturno: 0.85, mestre: 0.75 }[J.modo.id];
    const est = total >= 2100 * fator ? 3 : total >= 1400 * fator ? 2 : 1;
    const precisao = Math.round((J.achados / (J.achados + J.erros)) * 100);
    const res = { pontos: total, estrelas: est, tempo: t, erros: J.erros, dicas: J.dicas, modo: J.modo.id };
    A.sfx('vitoria');
    const aoFim = J.aoFim;
    const c = capDados(J.capId);
    setTimeout(() => {
      const { el, fechar } = abrirModal(`
        <div class="resultado">
          <div class="res-rot">${esc(c.comodo)} · ${esc(J.modo.nome)}</div>
          <h2>Todos os objetos encontrados!</h2>
          <div class="res-estrelas">${estrelasHTML(est, 3, 'anim')}</div>
          <table class="res-tabela">
            <tr><td>Objetos e combos</td><td>${J.pontos}</td></tr>
            <tr><td>Bônus de tempo (${U.fmtTempo(t)})</td><td>+${bonusTempo}</td></tr>
            <tr><td>Bônus de precisão (${precisao}%)</td><td>+${bonusPrecisao}</td></tr>
            <tr class="total"><td>Total</td><td>${total}</td></tr>
          </table>
          <p class="res-dica">${est < 3 ? 'Dica: achados rápidos em sequência valem combo, e toques ao acaso tiram pontos.' : 'Investigação impecável!'}</p>
          <button class="btn grande ouro" id="res-ok">Continuar</button>
        </div>`, { caixa: 'caixa-media', fechar: false });
      setTimeout(() => A.sfx('estrela'), 300);
      $('#res-ok', el).onclick = () => {
        A.sfx('clique');
        fechar();
        $('#cena-area').innerHTML = '';
        J = null;
        if (aoFim) aoFim(res);
      };
    }, 300);
  }

  function sairCena() {
    if (!J) return;
    if (!J.fim && !confirm('Sair da cena? O progresso desta busca será perdido.')) return;
    clearInterval(J.relogio);
    J = null;
    $('#cena-area').innerHTML = '';
    telaMansao();
  }

  // =========================================================
  // Desafio: análise das frases (protocolo das quatro decisões)
  // =========================================================
  function fluxoDesafio(id, refazendo) {
    const c = capDados(id);
    abrirDesafio(c, (resumo) => {
      const st = cap(id);
      const jaFeito = completo(id);
      st.desafio = resumo;
      const bonus = !jaFeito && resumo.acertos / resumo.total >= 0.7 ? 1 : 0;
      if (jaFeito || refazendo) {
        salvar();
        telaMansao(`Análise refeita: ${resumo.acertos} de ${resumo.total} decisões certas de primeira.`);
        return;
      }
      // recompensas
      st.fase = 3;
      E.estrelas += bonus; E.estrelasTotal += bonus;
      c.cartoes.forEach((k) => (E.cartoes[k] = true));
      c.glossario.forEach((k) => (E.glossario[k] = true));
      E.evidencias[id] = true;
      E.novidades.diario = true;
      salvar();
      recompensa(c, resumo, bonus, () => dialogo(c.fim, { fundo: c.cena }, () => {
        if (id === ultimo()) finalJogo();
        else {
          const prox = MI.CAPITULOS[indiceCap(id) + 1];
          telaMansao(`Novo cômodo liberado: ${prox.comodo}`);
        }
      }));
    });
  }

  function abrirDesafio(c, aoFim) {
    const D = c.desafio;
    const passos = D.passos;
    let atual = 0, acertos = 0, total = 0;
    const { el } = abrirModal(`
      <div class="desafio">
        <div class="des-topo">
          <div class="des-rot">Caderno de análise · Capítulo ${c.num}${c.cartao ? ' · ' + esc(c.cartao) : ''}</div>
          <h2>${esc(D.titulo)}</h2>
          ${D.frase ? `<div class="des-frase"><span>Frase em análise</span>“${esc(D.frase)}”</div>` : ''}
          <ol class="des-passos">${passos.map((p, i) => `<li data-i="${i}"><span>${i + 1}</span><em>${esc(MI.PROTOCOLO[p.rotulo] || '')}</em></li>`).join('')}</ol>
        </div>
        <div class="des-corpo" id="des-corpo"></div>
      </div>`, { caixa: 'caixa-desafio', fechar: false });

    const corpo = $('#des-corpo', el);
    const narra = (t) => A.falar(t, MI.PERSONAGENS[MI.NARRADOR].voz);
    // interrompe a narração em andamento (enunciado e leitura das alternativas)
    const calar = () => A.parar();
    const narraLista = async (textos) => {
      A.parar();
      const tok = A._token;
      for (const t of textos) {
        if (A._token !== tok) return;
        await A.falar(t, MI.PERSONAGENS[MI.NARRADOR].voz, { continuar: true });
      }
    };

    function marcarPasso() {
      $$('.des-passos li', el).forEach((li, i) => li.className = i < atual ? 'feito' : i === atual ? 'atual' : '');
    }
    function feedback(html, tipo, textoVoz) {
      const f = $('.des-feedback', corpo);
      f.className = 'des-feedback ativo ' + tipo;
      f.innerHTML = html;
      if (textoVoz) narra(textoVoz);
    }
    function botaoContinuar(rotulo, acao) {
      const b = $('.des-cont', corpo);
      b.hidden = false;
      b.textContent = rotulo || 'Continuar';
      b.onclick = () => { A.sfx('clique'); calar(); acao(); };
      b.focus({ preventScroll: true });
      setTimeout(() => b.scrollIntoView({ block: 'nearest', behavior: 'smooth' }), 50);
    }
    const cabecalho = (p, texto) => `<div class="des-prot">${esc(MI.PROTOCOLO[p.rotulo] || '')}</div><p class="des-enun">${esc(fmt(texto))}</p>`;
    const rodape = `<div class="des-feedback"></div><button class="btn grande ouro des-cont" hidden>Continuar</button>`;

    function proximo() {
      atual++;
      if (atual >= passos.length) return concluir();
      render();
    }

    function render() {
      marcarPasso();
      const p = passos[atual];
      corpo.scrollTop = 0;
      // em telas pequenas a janela inteira rola: volta ao início da nova pergunta
      const jan = $('#modal');
      if (jan && jan.scrollTop > 0) {
        const topo = corpo.getBoundingClientRect().top - jan.getBoundingClientRect().top + jan.scrollTop - 8;
        if (jan.scrollTop > topo) jan.scrollTop = Math.max(0, topo);
      }
      if (p.tipo === 'marcar') return rMarcar(p);
      if (p.tipo === 'classificar') return rClassificar(p);
      if (p.tipo === 'multi') return rMulti(p);
      return rEscolha(p, p.opcoes, p.enunciado, () => {
        if (p.justificativa) {
          feedback('<b>Boa!</b> Agora justifique a sua escolha.', 'certo', 'Boa! Agora justifique a sua escolha.');
          botaoContinuar('Justificar', () => rEscolha(p, p.justificativa.opcoes, p.justificativa.enunciado, () => {
            feedback('<b>Certo é certo:</b> resposta precisa e justificada.', 'certo', 'Certo é certo: resposta precisa e justificada.');
            botaoContinuar('Continuar', proximo);
          }, true));
        } else {
          feedback('<b>Isso mesmo!</b>', 'certo');
          botaoContinuar('Continuar', proximo);
        }
      });
    }

    // escolha simples (com retentativa e explicação de cada erro)
    function rEscolha(p, opcoes, enunciado, aoAcertar, ehJust) {
      const ops = U.embaralhar(opcoes.map((o, i) => Object.assign({ k: i }, o)));
      corpo.innerHTML = cabecalho(p, enunciado) + (ehJust ? `<div class="des-escolhida">Sua escolha: “${esc(fmt(p.opcoes.find((o) => o.ok).t))}”</div>` : '') +
        `<div class="des-opcoes">${ops.map((o, i) => `<button class="opcao" data-k="${o.k}"><span class="letra">${'ABCD'[i]}</span><span>${esc(fmt(o.t))}</span></button>`).join('')}</div>` + rodape;
      let primeira = true;
      if (A.lerAlternativas) narraLista([enunciado].concat(ops.map((o, i) => o.t)));
      else narra(enunciado);
      $$('.opcao', corpo).forEach((b) => (b.onclick = () => {
        const o = opcoes[+b.dataset.k];
        if (b.disabled) return;
        calar(); // a leitura das alternativas para assim que o jogador responde
        if (o.ok) {
          A.sfx('certo');
          total++; if (primeira) acertos++;
          b.classList.add('certa');
          $$('.opcao', corpo).forEach((x) => (x.disabled = true));
          aoAcertar();
        } else {
          A.sfx('errado');
          if (primeira) { total++; primeira = false; }
          b.classList.add('errada'); b.disabled = true;
          feedback(`<b>Ainda não.</b> ${esc(o.porque)}`, 'errado', o.porque);
        }
      }));
    }

    // escolha múltipla (n corretas)
    function rMulti(p) {
      const ops = U.embaralhar(p.opcoes.map((o, i) => Object.assign({ k: i }, o)));
      corpo.innerHTML = cabecalho(p, p.enunciado) + `<div class="des-opcoes">${ops.map((o, i) => `<button class="opcao" data-k="${o.k}"><span class="letra">${'ABCD'[i]}</span><span>${esc(o.t)}</span></button>`).join('')}</div>` + rodape;
      if (A.lerAlternativas) narraLista([p.enunciado].concat(ops.map((o) => o.t))); else narra(p.enunciado);
      let certas = 0, errou = false;
      total++;
      $$('.opcao', corpo).forEach((b) => (b.onclick = () => {
        const o = p.opcoes[+b.dataset.k];
        if (b.disabled) return;
        calar();
        b.disabled = true;
        if (o.ok) {
          A.sfx('certo'); b.classList.add('certa'); certas++;
          if (certas >= p.n) {
            if (!errou) acertos++;
            $$('.opcao', corpo).forEach((x) => (x.disabled = true));
            feedback('<b>Isso!</b> Cada área contribui com conhecimentos e procedimentos próprios para a mesma aprendizagem.', 'certo');
            botaoContinuar('Continuar', proximo);
          } else feedback('<b>Boa!</b> Escolha mais uma alternativa.', 'certo', 'Escolha mais uma alternativa.');
        } else {
          A.sfx('errado'); errou = true; b.classList.add('errada');
          feedback(`<b>Ainda não.</b> ${esc(o.porque)}`, 'errado', o.porque);
        }
      }));
    }

    // tocar nas expressões de uma frase
    function rMarcar(p) {
      corpo.innerHTML = cabecalho(p, p.enunciado) + `<div class="des-frase-chips">${p.partes.map((t, i) => `<button class="chip" data-i="${i}">${esc(t)}</button>`).join(' ')}</div>` + rodape;
      narra(p.enunciado);
      const faltam = new Set(p.corretas);
      let errou = false;
      total++;
      $$('.chip', corpo).forEach((b) => (b.onclick = () => {
        const i = +b.dataset.i;
        if (b.disabled) return;
        calar();
        if (faltam.has(i)) {
          A.sfx('certo'); b.classList.add('certa'); b.disabled = true; faltam.delete(i);
          if (!faltam.size) {
            if (!errou) acertos++;
            $$('.chip', corpo).forEach((x) => (x.disabled = true));
            feedback(`<b>Exato.</b> ${esc(p.explica)}`, 'certo', p.explica);
            botaoContinuar('Continuar', proximo);
          } else feedback('<b>Boa!</b> Há mais uma expressão a marcar.', 'certo');
        } else {
          A.sfx('errado'); errou = true;
          b.classList.add('errada'); setTimeout(() => b.classList.remove('errada'), 700);
          const msg = (p.erros && p.erros[i]) || p.erro;
          feedback(`<b>Ainda não.</b> ${esc(msg)}`, 'errado', msg);
        }
      }));
    }

    // classificar frases em categorias
    function rClassificar(p) {
      const itens = U.embaralhar(p.itens.map((o, i) => Object.assign({ k: i }, o)));
      corpo.innerHTML = cabecalho(p, p.enunciado) + `<div class="des-classif">${itens.map((o) => `
        <div class="classif-item" data-k="${o.k}"><p>${esc(o.t)}</p>
          <div class="classif-cats">${p.categorias.map((c) => `<button class="cat" data-c="${c.id}">${esc(c.nome)}</button>`).join('')}</div>
          <div class="classif-porque"></div></div>`).join('')}</div>` + rodape;
      narra(p.enunciado);
      let resolvidos = 0;
      $$('.classif-item', corpo).forEach((box) => {
        const o = p.itens[+box.dataset.k];
        let primeira = true;
        $$('.cat', box).forEach((b) => (b.onclick = () => {
          if (box.classList.contains('ok') || b.disabled) return;
          calar();
          if (b.dataset.c === o.c) {
            A.sfx('certo');
            total++; if (primeira) acertos++;
            box.classList.add('ok');
            b.classList.add('certa');
            $$('.cat', box).forEach((x) => (x.disabled = true));
            $('.classif-porque', box).textContent = o.porque;
            resolvidos++;
            if (resolvidos >= p.itens.length) {
              feedback('<b>Tudo classificado!</b> Perceba como o contexto define o sentido e o peso de cada frase.', 'certo');
              botaoContinuar('Continuar', proximo);
            } else {
              const prox = $('.classif-item:not(.ok)', corpo);
              if (prox) setTimeout(() => prox.scrollIntoView({ block: 'nearest', behavior: 'smooth' }), 150);
            }
          } else {
            A.sfx('errado');
            primeira = false;
            b.classList.add('errada'); b.disabled = true;
            box.classList.add('tremer'); setTimeout(() => box.classList.remove('tremer'), 500);
            $('.classif-porque', box).textContent = 'Ainda não. Releia a frase: ela relata, descreve, conclui? Em que contexto a palavra aparece?';
          }
        }));
      });
    }

    function concluir() {
      marcarPasso();
      const taxa = total ? acertos / total : 1;
      corpo.innerHTML = `<div class="des-fim">
        <h3>Análise concluída</h3>
        <p class="grande-num">${acertos}<small>/${total}</small></p>
        <p>decisões certas na primeira tentativa</p>
        <p class="des-msg">${taxa >= 0.85 ? 'Rigor de especialista: você escolheu e justificou com precisão.' : taxa >= 0.6 ? 'Muito bem! Errar e revisar faz parte de qualquer investigação técnica.' : 'Cada erro revisado é uma aprendizagem. Vale refazer a análise depois para fixar.'}</p>
        <button class="btn grande ouro" id="des-ok">Continuar</button></div>`;
      A.sfx('vitoria');
      $('#des-ok', corpo).onclick = () => { A.sfx('clique'); fecharModal(); A.parar(); aoFim({ acertos, total }); };
    }

    render();
  }

  // ---------- recompensas do capítulo ----------
  function cartaoHTML(k, pequeno) {
    const c = MI.CARTOES[k];
    return `<div class="cartao ${pequeno ? 'peq' : ''}" style="--cor:${c.cor}"><div class="cartao-sigla">${esc(c.sigla)}</div><div class="cartao-area">${esc(c.area)}</div>${pequeno ? '' : `<p>${esc(c.texto)}</p><em>${esc(c.pergunta)}</em>`}</div>`;
  }
  function recompensa(c, resumo, bonus, aoFim) {
    A.sfx('estrela');
    const { el, fechar } = abrirModal(`
      <div class="recompensa">
        <div class="res-rot">Capítulo ${c.num} concluído</div>
        <h2>${esc(c.titulo)}</h2>
        ${bonus ? `<p class="bonus">+1 ★ de rigor pela análise precisa</p>` : ''}
        <h3>Cartões interdisciplinares</h3>
        <div class="rec-cartoes">${c.cartoes.map((k) => cartaoHTML(k)).join('')}</div>
        <h3>Novos termos no diário</h3>
        <div class="rec-termos">${c.glossario.map((k) => `<span>${esc(MI.GLOSSARIO[k].termo)}</span>`).join('')}</div>
        <h3>Evidências registradas</h3>
        <ul class="rec-evid">${c.evidencias.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
        <button class="btn grande ouro" id="rec-ok">Continuar</button>
      </div>`, { caixa: 'caixa-larga', fechar: false });
    $('#rec-ok', el).onclick = () => { A.sfx('clique'); fechar(); aoFim(); };
  }

  // ---------- final ----------
  function finalJogo() {
    telaMansao();
    A.sfx('vitoria');
    setTimeout(() => certificado(true), 500);
  }

  // =========================================================
  // Diário de investigação
  // =========================================================
  function diario(aba) {
    E.novidades.diario = false; salvar();
    $('#btn-diario').classList.remove('novo');
    aba = aba || 'evidencias';
    const ctxs = ['Todos', 'Campo', 'Escritório', 'Pesquisa', 'Laboratório', 'Comunicação'];
    const glos = Object.entries(MI.GLOSSARIO);
    const abas = {
      evidencias: () => {
        const caps = MI.CAPITULOS.filter((c) => E.evidencias[c.id]);
        if (!caps.length) return '<p class="vazio">Conclua o primeiro capítulo para registrar evidências.</p>';
        return caps.map((c) => `<section class="ev-cap"><h4>${c.num}. ${esc(c.comodo)} <small>${esc(c.contexto)}</small></h4><ul>${c.evidencias.map((t) => `<li>${esc(t)}</li>`).join('')}</ul></section>`).join('') +
          (completo(ultimo()) ? '' : '<p class="vazio">Novas evidências aparecem a cada capítulo.</p>');
      },
      glossario: () => {
        const n = glos.filter(([k]) => E.glossario[k]).length;
        return `<div class="glos-filtro">${ctxs.map((x, i) => `<button class="filtro ${i === 0 ? 'on' : ''}" data-f="${x}">${x === 'Todos' ? 'Todos' : x}</button>`).join('')}</div>
          <p class="glos-cont">${n} de ${glos.length} termos desbloqueados</p>
          <div class="glos-lista">${glos.map(([k, g]) => E.glossario[k]
            ? `<article class="termo" data-ctx="${esc(g.ctx)}"><h4>${esc(g.termo)} <span class="ctx">${esc(g.ctx)}</span></h4><p>${esc(g.def)}</p><p class="ex"><b>Exemplo:</b> ${esc(g.ex)}</p><p class="en">🇬🇧 <i>${esc(g.ingles)}</i></p></article>`
            : `<article class="termo trancado" data-ctx="${esc(g.ctx)}"><h4>? ? ?</h4><p>Termo ainda não descoberto.</p></article>`).join('')}</div>`;
      },
      cartoes: () => `<p class="glos-cont">${Object.keys(E.cartoes).length} de ${Object.keys(MI.CARTOES).length} cartões. Cada área contribui com uma produção para avaliar a mesma aprendizagem: compreender, usar e justificar a linguagem técnica.</p>
        <div class="col-cartoes">${Object.keys(MI.CARTOES).map((k) => E.cartoes[k] ? cartaoHTML(k) : `<div class="cartao trancado"><div class="cartao-sigla">?</div><div class="cartao-area">${esc(MI.CARTOES[k].area)}</div><p>Ainda não conquistado.</p></div>`).join('')}</div>`,
      personagens: () => `<div class="pers-lista">${Object.entries(MI.PERSONAGENS).map(([k, p]) => `<div class="pers">${MI.retrato(k)}<div><b>${esc(p.nome)}</b><span>${esc(p.papel)}</span></div></div>`).join('')}</div>`,
    };
    const nomes = { evidencias: 'Evidências', glossario: 'Glossário', cartoes: 'Cartões', personagens: 'Personagens' };
    const { el } = abrirModal(`<div class="diario"><h2>Diário de investigação</h2>
      <div class="abas" role="tablist">${Object.keys(abas).map((k) => `<button role="tab" class="aba ${k === aba ? 'on' : ''}" data-aba="${k}">${nomes[k]}</button>`).join('')}</div>
      <div class="diario-corpo">${abas[aba]()}</div></div>`, { caixa: 'caixa-larga' });
    $$('.aba', el).forEach((b) => (b.onclick = () => { A.sfx('pagina'); diario(b.dataset.aba); }));
    $$('.filtro', el).forEach((b) => (b.onclick = () => {
      $$('.filtro', el).forEach((x) => x.classList.toggle('on', x === b));
      const f = b.dataset.f;
      $$('.termo', el).forEach((t) => (t.hidden = f !== 'Todos' && t.dataset.ctx !== f));
    }));
  }

  // =========================================================
  // Restauração da mansão
  // =========================================================
  function restaurar() {
    const { el, fechar } = abrirModal(`<div class="restauro"><h2>Restaurar a mansão</h2>
      <p>Use as estrelas conquistadas nas cenas para recuperar o Solar do Ipê e o entorno do lago. Você tem <b class="cont-estrelas">${E.estrelas}</b> ★.</p>
      <div class="rest-lista">${MI.RESTAURACAO.map((r) => {
        const feito = E.rest[r.id];
        return `<div class="rest-item ${feito ? 'feito' : ''}"><div><h4>${esc(r.nome)}</h4><p>${esc(r.desc)}</p></div>
          ${feito ? '<span class="rest-ok">Restaurado ✓</span>' : `<button class="btn ${E.estrelas >= r.custo ? 'ouro' : ''}" data-r="${r.id}" ${E.estrelas >= r.custo ? '' : 'disabled'}>${r.custo} ★</button>`}</div>`;
      }).join('')}</div>
      <p class="rest-dica">Faltam estrelas? Rejogue as cenas: cada partida rende de 1 a 3 ★ e libera novos modos.</p></div>`, { caixa: 'caixa-larga' });
    $$('[data-r]', el).forEach((b) => (b.onclick = () => {
      const r = MI.RESTAURACAO.find((x) => x.id === b.dataset.r);
      if (E.estrelas < r.custo) return;
      E.estrelas -= r.custo;
      E.rest[r.id] = true;
      salvar();
      A.sfx('construir');
      fechar();
      telaMansao(`${r.nome} restaurado!`);
    }));
  }

  // =========================================================
  // Configurações
  // =========================================================
  function configuracoes() {
    const vn = A.vozes.length, mp3 = window.MI_VOZES ? Object.keys(window.MI_VOZES).length : 0;
    const infoVoz = mp3 ? `Vozes neurais gravadas em português do Brasil: ${mp3} falas.` : vn ? `Usando ${vn} voz(es) natural(is) do navegador em português do Brasil.` : 'Nenhuma voz natural em português do Brasil disponível neste navegador; as falas aparecem só em texto.';
    const { el } = abrirModal(`<div class="config"><h2>Configurações</h2>
      <label class="linha"><span>Nome do investigador</span><input id="cfg-nome" maxlength="30" value="${esc(E.nome)}"></label>
      <label class="linha chk"><input type="checkbox" id="cfg-voz" ${A.vozLigada ? 'checked' : ''}><span>Vozes dos personagens</span></label>
      <label class="linha chk"><input type="checkbox" id="cfg-alt" ${A.lerAlternativas ? 'checked' : ''}><span>Ler as alternativas dos desafios</span></label>
      <label class="linha"><span>Volume das vozes</span><input type="range" id="cfg-vv" min="0" max="1" step="0.05" value="${A.volVoz}"></label>
      <label class="linha"><span>Volume da música</span><input type="range" id="cfg-vm" min="0" max="1" step="0.05" value="${A.volMusica}"></label>
      <p class="cfg-info">♪ Tocando agora: ${esc(MI.TRILHAS[A.trilhaAtual && A.trilhaAtual()] || 'nenhum ambiente')}${A.periodoAtual && A.periodoAtual() ? ' · ' + rotuloPeriodo(A.periodoAtual()) : ''}</p>
      <label class="linha"><span>Volume dos efeitos</span><input type="range" id="cfg-ve" min="0" max="1" step="0.05" value="${A.volEfeitos}"></label>
      <p class="cfg-info">${esc(infoVoz)}</p>
      ${telaCheiaPossivel() ? `<label class="linha chk"><input type="checkbox" id="cfg-tc" ${MI.S.get('telaCheia', true) ? 'checked' : ''}><span>Abrir em tela cheia no celular e no tablet</span></label>` : ''}
      <div class="cfg-acoes"><button class="btn perigo" id="cfg-reset">Apagar progresso</button></div></div>`, { caixa: 'caixa-media' });
    const sv = () => { A.salvar(); A.atualizarVolumes(); };
    $('#cfg-nome', el).onchange = (e) => { E.nome = e.target.value.trim() || 'Investigador(a)'; salvar(); definirNomeFalado(); $('#mansao-nome').textContent = nome(); };
    $('#cfg-voz', el).onchange = (e) => { A.vozLigada = e.target.checked; if (!A.vozLigada) A.parar(); sv(); };
    $('#cfg-alt', el).onchange = (e) => { A.lerAlternativas = e.target.checked; sv(); };
    const tc = $('#cfg-tc', el);
    if (tc) tc.onchange = (e) => { MI.S.set('telaCheia', e.target.checked); alternarTelaCheia(e.target.checked && toqueGrosso() ? true : e.target.checked ? undefined : false); };
    $('#cfg-vv', el).oninput = (e) => { A.volVoz = +e.target.value; sv(); };
    $('#cfg-vm', el).oninput = (e) => { A.volMusica = +e.target.value; sv(); };
    $('#cfg-ve', el).oninput = (e) => { A.volEfeitos = +e.target.value; sv(); A.sfx('clique'); };
    $('#cfg-reset', el).onclick = () => {
      if (!confirm('Apagar todo o progresso deste navegador?')) return;
      const prof = E.professor;
      E = ESTADO_PADRAO(); E.professor = prof; salvar();
      fecharModal(); telaInicio();
    };
  }

  // =========================================================
  // Para o professor
  // =========================================================
  function professor() {
    const linhas = MI.CAPITULOS.map((c) => `<tr><td><b>${c.num}. ${esc(c.comodo)}</b></td><td>${esc(c.contexto)}</td><td>${esc(c.desafio.titulo)}</td><td>${c.cartoes.map((k) => esc(MI.CARTOES[k].area)).join(', ')}</td></tr>`).join('');
    const { el } = abrirModal(`<div class="prof"><h2>Para o professor</h2>
      <p>Jogo de objetos ocultos baseado na <b>Pauta Formativa 9 — Técnico em Meio Ambiente: Vocabulário em diferentes contextos profissionais</b>. A investigação simulada do Lago do Ipê leva os estudantes a <b>escolher e justificar termos técnicos</b> em registros de campo, sistematização em escritório, pesquisa, laboratório e comunicação com moradores, preservando dados, métodos e incertezas.</p>
      <h3>Percurso</h3>
      <div class="tabela-rol"><table><thead><tr><th>Cômodo</th><th>Contexto</th><th>Análise</th><th>Cartões</th></tr></thead><tbody>${linhas}</tbody></table></div>
      <h3>O protocolo das quatro decisões</h3>
      <p>Nos capítulos 2, 3 e 4 (cartões 1 a 3: Campo, Escritório e Pesquisa) e 7, 8 e 9 (cartões 4 a 6: amostragem no córrego, mapas e relatório final), cada frase é analisada em quatro etapas: <b>termo + contexto</b>, <b>ajuste + justificativa</b>, <b>conexão interdisciplinar</b> e <b>mediação pedagógica</b>. As alternativas incorretas trazem uma explicação, para que o erro vire aprendizagem.</p>
      <h3>Sugestões de condução</h3>
      <ul>
        <li><b>Virem e conversem:</b> após cada análise, as duplas comparam escolhas e justificativas antes de seguir.</li>
        <li><b>Cultura do erro:</b> peça que leiam em voz alta a explicação de uma alternativa errada e digam o que ela ensina.</li>
        <li><b>Certo é certo:</b> aceite a resposta só quando vier acompanhada da evidência que a sustenta.</li>
        <li><b>Produção final:</b> use o diário (glossário bilíngue e evidências) como base para o glossário colaborativo da Pauta 10.</li>
      </ul>
      <h3>Perguntas para levar</h3>
      <p>O que foi observado? Em qual contexto? Que evidências sustentam a escolha? Como comunicar com clareza e precisão?</p>
      <p class="aviso">Os dados do Lago do Ipê são fictícios. A referência da Resolução CONAMA 357/2005 (águas doces classe 2: OD não inferior a 5 mg/L) é usada apenas para comparação, como na pauta.</p>
      <label class="linha chk"><input type="checkbox" id="prof-lib" ${E.professor ? 'checked' : ''}><span>Modo demonstração: liberar todos os capítulos neste navegador</span></label>
      </div>`, { caixa: 'caixa-larga' });
    $('#prof-lib', el).onchange = (e) => { E.professor = e.target.checked; salvar(); if ($('#tela-mansao').classList.contains('ativa')) telaMansao(); };
  }

  // =========================================================
  // Certificado
  // =========================================================
  function certificado(festa) {
    const data = new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
    const est = MI.CAPITULOS.reduce((s, c) => s + cap(c.id).estrelasMelhor, 0);
    const acertos = MI.CAPITULOS.reduce((s, c) => s + (cap(c.id).desafio ? cap(c.id).desafio.acertos : 0), 0);
    const totais = MI.CAPITULOS.reduce((s, c) => s + (cap(c.id).desafio ? cap(c.id).desafio.total : 0), 0);
    const { el } = abrirModal(`<div class="certificado" id="certificado">
        <div class="cert-borda">
          <div class="cert-selo">★</div>
          <p class="cert-sup">Solar do Ipê · Técnico em Meio Ambiente</p>
          <h2>Certificado de Investigação</h2>
          <p>Certificamos que</p>
          <p class="cert-nome">${esc(nome())}</p>
          <p>concluiu o caso <b>Mistério na Mansão do Ipê</b>, demonstrando rigor no uso do vocabulário técnico ambiental: <b>observar, contextualizar, justificar e comunicar</b>.</p>
          <div class="cert-dados"><span>${est} de ${MI.CAPITULOS.length * 3} ★ nas cenas</span><span>${acertos}/${totais} decisões certas de primeira</span><span>${Object.keys(E.cartoes).length} cartões interdisciplinares</span></div>
          <p class="cert-data">${data}</p>
          <div class="cert-ass"><div>${MI.retrato('marta')}<span>Profa. Marta Siqueira</span></div><div>${MI.retrato('helena')}<span>Dona Helena Ipê</span></div></div>
        </div>
      </div>
      <div class="cert-acoes"><button class="btn ouro" id="cert-print">Imprimir ou salvar em PDF</button></div>`, { caixa: 'caixa-larga caixa-cert' });
    if (festa) { A.sfx('vitoria'); confete(); }
    $('#cert-print', el).onclick = () => window.print();
  }
  function confete() {
    const c = document.createElement('div');
    c.className = 'confete';
    for (let i = 0; i < 70; i++) {
      const p = document.createElement('i');
      p.style.left = Math.random() * 100 + '%';
      p.style.background = ['#f2c230', '#e2533e', '#3f86c8', '#3c8a3f', '#d9567c'][i % 5];
      p.style.animationDelay = Math.random() * 1.5 + 's';
      p.style.animationDuration = 2.5 + Math.random() * 2 + 's';
      c.appendChild(p);
    }
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 6000);
  }

  // =========================================================
  // Inicialização e atalhos
  // =========================================================
  function ligar() {
    $('#btn-comecar').onclick = () => { A.sfx('clique'); comecar(true); };
    $('#btn-continuar').onclick = () => { A.sfx('clique'); comecar(false); };
    $('#inicio-nome').onkeydown = (e) => { if (e.key === 'Enter') comecar(!Object.keys(E.caps).length); };
    $('#btn-prof-inicio').onclick = () => { iniciarAudioUmaVez(); professor(); };
    $('#btn-ouvir-nome').onclick = () => ouvirNome();
    definirNomeFalado();
    $('#btn-diario').onclick = () => { A.sfx('pagina'); diario(); };
    $('#btn-restaurar').onclick = () => { A.sfx('clique'); restaurar(); };
    $('#btn-config').onclick = () => { A.sfx('clique'); configuracoes(); };
    $('#btn-prof').onclick = () => { A.sfx('clique'); professor(); };
    $('#btn-certificado').onclick = () => { A.sfx('clique'); certificado(false); };
    $('#btn-sair-mansao').onclick = () => { A.sfx('clique'); telaInicio(); };
    $('#btn-sair-cena').onclick = () => { A.sfx('clique'); sairCena(); };
    $('#btn-dica').onclick = () => usarDica();
    $('#btn-ajuda-cena').onclick = () => ajudaCena(false);
    $('#btn-zoom-mais').onclick = () => J && J.zoom(1.3);
    $('#btn-zoom-menos').onclick = () => J && J.zoom(1 / 1.3);
    const dirs = { esq: [-1, 0], dir: [1, 0], cima: [0, -1], baixo: [0, 1] };
    $$('.cena-seta').forEach((b) => { b.onclick = () => { if (J && !J.fim) { A.sfx('clique'); J.mover(...dirs[b.dataset.dir]); } }; });
    $('#btn-tela-cheia').onclick = () => { A.sfx('clique'); alternarTelaCheia(); };
    $('#btn-tela-cheia-inicio').onclick = () => alternarTelaCheia();
    ['fullscreenchange', 'webkitfullscreenchange'].forEach((ev) => document.addEventListener(ev, () => { atualizarBotoesTelaCheia(); if ($('#tela-mansao').classList.contains('ativa')) centralizarPontoAtual(); }));
    atualizarBotoesTelaCheia();
    // ao girar o aparelho, a fachada volta a mostrar o cômodo atual
    window.addEventListener('orientationchange', () => setTimeout(() => { if ($('#tela-mansao').classList.contains('ativa')) centralizarPontoAtual(); }, 350));
    $('#dialogo').onclick = (e) => { if (e.target.closest('#dialogo-pular')) return; proxFala(); };
    $('#dialogo-pular').onclick = (e) => { e.stopPropagation(); A.sfx('clique'); encerrarDialogo(); };
    document.addEventListener('keydown', (e) => {
      if (dlg && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight')) { e.preventDefault(); proxFala(); return; }
      if (e.key === 'Escape') {
        if (dlg) { encerrarDialogo(); return; }
        if (fecharModalAtual) fecharModalAtual();
      }
    });
    document.addEventListener('pointerdown', () => A.iniciarAudio(), { once: true });
    if (E.novidades.diario) $('#btn-diario').classList.add('novo');
    telaInicio();
  }

  // ganchos para testes automatizados
  MI.jogo = { E: () => E, abrirCapitulo, iniciarCena, fluxoDesafio, telaMansao, diario, restaurar, certificado, J: () => J, achouTodos: () => { if (J) J.ordem.forEach((i) => { if (!J.slots[i].achado) achou(J.slots[i]); }); } };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ligar);
  else ligar();
})();
