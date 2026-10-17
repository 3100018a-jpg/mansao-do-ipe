/* =========================================================
   Áudio: vozes neurais em português do Brasil + efeitos + trilha
   1) Usa MP3 neurais pré-gerados (audio/vozes/*.mp3, ver tools/gerar_vozes.py)
   2) Na falta deles, usa somente vozes pt-BR do navegador que sejam neurais ou
      naturais (Edge: Francisca/Antonio/Thalita Online Natural; Chrome: Google
      português do Brasil; Safari: vozes aprimoradas). Vozes multilíngues, de
      outros países ou robóticas são descartadas: nesse caso, só legenda.
   ========================================================= */
(function () {
  'use strict';
  const MI = window.MI;
  const U = MI.U;

  const A = (MI.A = {
    vozLigada: MI.S.get('vozLigada', true),
    lerAlternativas: MI.S.get('lerAlternativas', true),
    volVoz: MI.S.get('volVoz', 1),
    volMusica: MI.S.get('volMusica', 0.3),
    volEfeitos: MI.S.get('volEfeitos', 0.7),
    vozes: [],
    falando: false,
    _token: 0,
    _audio: null,
  });

  // ---------- identificação das falas ----------
  A.chaveVoz = function (p) {
    return (p.azure || p.edge || 'pt-BR-FranciscaNeural') + '|' + (p.rate || '+0%');
  };
  A.idFala = function (texto, perfil) {
    return U.hash(A.chaveVoz(perfil || {}) + '|' + texto);
  };
  A.limparTexto = function (t) {
    return String(t)
      .replace(/<[^>]+>/g, '')
      // o nome do estudante aparece na legenda, mas não entra na gravação
      .replace(/,\s*\{nome\}/g, '')
      .replace(/(^|[.!?]\s+)\{nome\},\s*(\S)/g, (m, a, c) => a + c.toUpperCase())
      .replace(/\{nome\},\s*/g, '')
      .replace(/\{nome\}/g, 'você')
      .replace(/\s+/g, ' ')
      .trim();
  };
  // texto falado: siglas, unidades e símbolos lidos de forma natural
  A.textoFalado = function (t) {
    const MESES = ['', 'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    return A.limparTexto(t)
      .replace(/\s?mg\/L/g, ' miligramas por litro')
      .replace(/\s?mol\/L/g, ' mol por litro')
      .replace(/\bOD\b/g, 'ó dê')
      .replace(/\bCONAMA\b/g, 'Conama')
      .replace(/(\d{3})\/(\d{4})/g, '$1 de $2')
      .replace(/\bP(\d)\b/g, 'pê $1')
      .replace(/(\d+)h(\d\d)/g, '$1 e $2')
      .replace(/\b(\d{1,2})\/(\d{1,2})(?:\/(\d{4}))?\b/g, (m, d, mes, ano) => (MESES[+mes] ? `${d} de ${MESES[+mes]}${ano ? ' de ' + ano : ''}` : m))
      .replace(/2x \+ 4 = 14/g, 'dois xis mais quatro igual a catorze')
      .replace(/\bx = 5\b/g, 'xis igual a cinco')
      .replace(/\bnº\s?/g, 'número ')
      .replace(/\s·\s/g, ', ')
      .replace(/°C/g, ' graus Celsius')
      .replace(/(\d+)\s?%/g, '$1 por cento')
      .replace(/ +\./g, '.');
  };

  // ---------- vozes do navegador (somente neurais/naturais pt-BR) ----------
  const NOMES_F = /francisca|thalita|luciana|maria|fernanda|vit[oó]ria|brenda|elza|giovanna|leila|let[ií]cia|manuela|yara|raquel|google portugu[eê]s|\bfemale\b|feminina/i;
  const NOMES_M = /ant[oô]nio|daniel|felipe|donato|f[aá]bio|humberto|j[uú]lio|nicolau|val[eé]rio|\bmale\b|masculin/i;
  function pontuar(v) {
    let s = 0;
    const n = v.name;
    if (/natural|neural|online/i.test(n)) s += 10;
    if (/premium|enhanced|aprimorad|superior/i.test(n)) s += 8;
    if (/google/i.test(n)) s += 6;
    if (/compact|espeak|eloquence|novelty/i.test(n)) s -= 12;
    return s;
  }
  A.carregarVozes = function () {
    if (!('speechSynthesis' in window)) { A.vozes = []; return; }
    const todas = speechSynthesis.getVoices() || [];
    A.vozes = todas
      .filter((v) => /^pt[-_]BR$/i.test(v.lang) || /portugu[eê]s.*brasil/i.test(v.name))
      .filter((v) => !/multiling/i.test(v.name))
      .filter((v) => /natural|neural|online|premium|enhanced|aprimorad|superior|google/i.test(v.name))
      .map((v) => ({ v, nota: pontuar(v), genero: NOMES_M.test(v.name) ? 'M' : NOMES_F.test(v.name) ? 'F' : '?' }))
      .sort((a, b) => b.nota - a.nota);
    MI.bus.emit('vozes', A.vozes);
  };
  if (typeof window.speechSynthesis !== 'undefined') {
    A.carregarVozes();
    speechSynthesis.onvoiceschanged = A.carregarVozes;
  }
  A.escolherVoz = function (genero, chave) {
    const doGenero = A.vozes.filter((x) => x.genero === genero);
    if (!doGenero.length) return null; // nunca uma voz do gênero errado
    const melhores = doGenero.filter((x) => x.nota >= doGenero[0].nota - 6);
    const ORDEM = genero === 'M' ? ['Antonio', 'Donato', 'Fabio', 'Julio'] : ['Francisca', 'Thalita', 'Brenda', 'Giovanna'];
    const nome = String(chave || '').replace('pt-BR-', '').replace('Neural', '');
    const exata = melhores.find((x) => x.v.name.indexOf(nome) >= 0);
    if (exata) return exata;
    const pos = Math.max(0, ORDEM.indexOf(nome));
    return melhores[pos % melhores.length];
  };

  A.temMp3 = (id) => !!(window.MI_VOZES && window.MI_VOZES[id]);
  A.disponivel = () => !!((window.MI_VOZES && Object.keys(window.MI_VOZES).length) || A.vozes.length);

  A.parar = function () {
    A._token++;
    A.falando = false;
    try { if (A._audio) { A._audio.pause(); A._audio = null; } } catch (e) {}
    try { if ('speechSynthesis' in window) speechSynthesis.cancel(); } catch (e) {}
    A.musicaDuck(false);
  };

  function dividir(t) {
    const partes = t.match(/[^.!?;:]+[.!?;:]*/g) || [t];
    const out = [];
    let buf = '';
    partes.forEach((p) => {
      if ((buf + p).length > 180 && buf) { out.push(buf.trim()); buf = p; } else buf += p;
    });
    if (buf.trim()) out.push(buf.trim());
    return out;
  }

  function falarSintese(texto, perfil, token) {
    return new Promise((res) => {
      if (!('speechSynthesis' in window)) return res();
      const voz = A.escolherVoz(perfil.genero || 'F', perfil.azure || perfil.edge);
      if (!voz) return res();
      const pedacos = dividir(A.textoFalado(texto));
      let i = 0;
      const prox = () => {
        if (token !== A._token || i >= pedacos.length) return res();
        const u = new SpeechSynthesisUtterance(pedacos[i++]);
        u.voice = voz.v;
        u.lang = 'pt-BR';
        u.pitch = 1;
        u.rate = U.clamp(perfil.ritmo || 1, 0.75, 1.25);
        u.volume = A.volVoz;
        let fim = false;
        const terminar = () => { if (fim) return; fim = true; clearTimeout(guarda); prox(); };
        u.onend = terminar;
        u.onerror = terminar;
        const guarda = setTimeout(terminar, 1500 + u.text.length * 95);
        speechSynthesis.speak(u);
      };
      try { speechSynthesis.cancel(); } catch (e) {}
      setTimeout(prox, 30);
    });
  }

  const cacheAudio = new Map();
  function audioDe(id) {
    let au = cacheAudio.get(id);
    if (!au) {
      au = new Audio('audio/vozes/' + id + '.mp3');
      au.preload = 'auto';
      cacheAudio.set(id, au);
      if (cacheAudio.size > 40) cacheAudio.delete(cacheAudio.keys().next().value);
    }
    return au;
  }
  A.precarregar = function (itens) {
    (itens || []).forEach((it) => {
      if (!it || !it.texto) return;
      const id = A.idFala(A.limparTexto(it.texto), it.perfil || {});
      if (A.temMp3(id)) audioDe(id);
    });
  };
  function tocarMp3(id, token, texto) {
    return new Promise((res) => {
      const au = audioDe(id);
      let fim = false;
      const ok = () => { if (!fim) { fim = true; res(true); } };
      const falhou = () => { if (!fim) { fim = true; res(false); } };
      try { au.pause(); au.currentTime = 0; } catch (e) {}
      au.volume = A.volVoz;
      A._audio = au;
      const conferir = () => {
        if (texto && isFinite(au.duration) && au.duration < Math.max(0.6, texto.length / 40)) {
          cacheAudio.delete(id); try { au.pause(); } catch (e) {} falhou();
        }
      };
      au.onloadedmetadata = conferir;
      au.onended = ok;
      au.onerror = falhou;
      if (au.readyState >= 1) conferir();
      if (!fim) au.play().catch(falhou);
      const verif = setInterval(() => {
        if (token !== A._token) { clearInterval(verif); try { au.pause(); } catch (e) {} ok(); }
        if (fim) clearInterval(verif);
      }, 120);
    });
  }

  // fala um texto com o perfil do personagem; resolve ao terminar
  A.falar = async function (texto, perfil, opts) {
    opts = opts || {};
    if (!opts.continuar) A.parar();
    if (!A.vozLigada || !texto) return;
    const token = A._token;
    perfil = perfil || {};
    const limpo = A.limparTexto(texto);
    A.falando = true;
    A.musicaDuck(true);
    const id = A.idFala(limpo, perfil);
    let feito = false;
    if (A.temMp3(id)) feito = await tocarMp3(id, token, limpo);
    if (!feito && token === A._token) await falarSintese(limpo, perfil, token);
    if (token === A._token) { A.falando = false; A.musicaDuck(false); }
  };

  A.salvar = function () {
    ['vozLigada', 'lerAlternativas', 'volVoz', 'volMusica', 'volEfeitos'].forEach((k) => MI.S.set(k, A[k]));
  };

  // ---------- efeitos sonoros sintetizados ----------
  let ctx = null, mestre = null, busMus = null, busFx = null;
  A.iniciarAudio = function () {
    if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return; }
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      mestre = ctx.createGain(); mestre.gain.value = 0.9; mestre.connect(ctx.destination);
      busMus = ctx.createGain(); busMus.gain.value = A.volMusica * 0.5; busMus.connect(mestre);
      busFx = ctx.createGain(); busFx.gain.value = A.volEfeitos; busFx.connect(mestre);
    } catch (e) { ctx = null; }
  };
  A.atualizarVolumes = function () {
    if (!ctx) return;
    busMus.gain.setTargetAtTime(A.volMusica * (A._duck ? 0.15 : 0.5), ctx.currentTime, 0.2);
    busFx.gain.setTargetAtTime(A.volEfeitos, ctx.currentTime, 0.05);
  };
  A.musicaDuck = function (on) { A._duck = on; A.atualizarVolumes(); };

  function tom(freq, dur, tipo, vol, quando, destino, glide) {
    if (!ctx) return;
    const t = ctx.currentTime + (quando || 0);
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = tipo || 'sine';
    o.frequency.setValueAtTime(freq, t);
    if (glide) o.frequency.exponentialRampToValueAtTime(glide, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol || 0.2, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(destino || busFx);
    o.start(t); o.stop(t + dur + 0.05);
  }
  function ruido(dur, vol, freq, quando) {
    if (!ctx) return;
    const t = ctx.currentTime + (quando || 0);
    const n = Math.floor(ctx.sampleRate * dur);
    const buf = ctx.createBuffer(1, n, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
    const s = ctx.createBufferSource(); s.buffer = buf;
    const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = freq || 1000; f.Q.value = 0.8;
    const g = ctx.createGain(); g.gain.value = vol || 0.2;
    s.connect(f); f.connect(g); g.connect(busFx); s.start(t);
  }
  A.sfx = function (nome, extra) {
    if (!ctx) return;
    switch (nome) {
      case 'clique': tom(880, 0.05, 'triangle', 0.1); break;
      case 'achou': {
        const base = 660 * Math.pow(1.06, Math.min(8, extra || 0));
        tom(base, 0.12, 'triangle', 0.16); tom(base * 1.5, 0.22, 'sine', 0.12, 0.06);
        break;
      }
      case 'erro': tom(200, 0.22, 'sawtooth', 0.06, 0, null, 140); break;
      case 'trava': tom(300, 0.18, 'square', 0.05); tom(220, 0.3, 'square', 0.05, 0.16); break;
      case 'dica': tom(1200, 0.4, 'sine', 0.08, 0, null, 1800); tom(1800, 0.5, 'sine', 0.05, 0.1, null, 2400); break;
      case 'pagina': ruido(0.18, 0.18, 2600); break;
      case 'certo': [523, 659, 784].forEach((f, i) => tom(f, 0.22, 'triangle', 0.14, i * 0.07)); break;
      case 'errado': tom(330, 0.16, 'triangle', 0.1); tom(262, 0.28, 'triangle', 0.1, 0.12); break;
      case 'estrela': [784, 988, 1175, 1568].forEach((f, i) => tom(f, 0.3, 'triangle', 0.13, i * 0.09)); break;
      case 'vitoria':
        [523, 659, 784, 1047, 784, 1047, 1319].forEach((f, i) => tom(f, 0.35, 'triangle', 0.13, i * 0.11));
        tom(262, 1.4, 'sine', 0.1, 0); tom(392, 1.2, 'sine', 0.07, 0.3);
        break;
      case 'construir':
        for (let i = 0; i < 3; i++) { ruido(0.06, 0.2, 1800, i * 0.16); tom(160, 0.07, 'square', 0.05, i * 0.16); }
        [392, 523, 659, 784].forEach((f, i) => tom(f, 0.3, 'triangle', 0.1, 0.55 + i * 0.08));
        break;
    }
  };

  // ---------- trilha suave de mistério (gerada) ----------
  let musTimer = null;
  const ESCALAS = {
    mansao: [220.0, 261.6, 293.7, 329.6, 392.0],
    lago: [246.9, 293.7, 329.6, 370.0, 440.0],
    misterio: [196.0, 233.1, 261.6, 293.7, 349.2],
  };
  const ACORDES = [[0, 2, 4], [1, 3, 0], [4, 1, 3], [2, 4, 0]];
  A.musica = function (tema) {
    if (!ctx) return;
    if (musTimer) clearInterval(musTimer);
    let passo = 0;
    const tocar = () => {
      if (A.volMusica <= 0.001) return;
      const esc = ESCALAS[tema] || ESCALAS.mansao;
      const ac = ACORDES[Math.floor(passo / 6) % ACORDES.length];
      if (passo % 6 === 0) ac.forEach((g, i) => tom(esc[g] / 2, 3.2, 'sine', 0.045, i * 0.03, busMus));
      if (passo % 3 !== 1 && Math.random() < 0.6) {
        const n = esc[ac[Math.floor(Math.random() * 3)]] * (Math.random() < 0.5 ? 1 : 2);
        tom(n, 0.8, 'triangle', 0.03, 0, busMus);
      }
      passo++;
    };
    tocar();
    musTimer = setInterval(tocar, 520);
  };
})();
