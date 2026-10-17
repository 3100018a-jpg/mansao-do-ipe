/* =========================================================
   Trilhas sonoras suaves, geradas no navegador (Web Audio).
   Cada ambiente da mansão tem um estilo próprio:
   mansão: valsa de caixinha de música · hall: jazz de salão
   dos anos 1920 · píer: bossa nova ao violão · escritório:
   piano calmo · biblioteca: noturno com harpa e cordas ·
   laboratório: minimalismo com marimba e vibrafone ·
   salão: valsa de salão com cordas.
   ========================================================= */
(function () {
  'use strict';
  const MI = window.MI;
  const A = MI.A;

  MI.TRILHAS = {
    mansao: 'Valsa de caixinha de música',
    hall: 'Jazz de salão dos anos 1920',
    pier: 'Bossa nova ao violão',
    escritorio: 'Piano calmo',
    biblioteca: 'Noturno com harpa e cordas',
    laboratorio: 'Minimalismo com marimba e vibrafone',
    salao: 'Valsa de salão com cordas',
    horta: 'Choro ao violão e flauta',
    mapas: 'Barroco ao cravo',
    jantar: 'Minueto para quarteto de cordas',
  };

  let ctx = null, saidaGeral = null, revEntrada = null;
  const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);
  const cacheKS = new Map();
  let ruidoBuf = null;

  function preparar() {
    ctx = A.contexto();
    if (!ctx || saidaGeral) return !!ctx;
    saidaGeral = ctx.createGain();
    saidaGeral.gain.value = 1;
    saidaGeral.connect(A.barramentoMusica());
    // reverberação suave (resposta ao impulso gerada)
    const dur = 2.6, n = Math.floor(ctx.sampleRate * dur);
    const ir = ctx.createBuffer(2, n, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = ir.getChannelData(c);
      for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 3.2);
    }
    const conv = ctx.createConvolver();
    conv.buffer = ir;
    revEntrada = ctx.createGain();
    revEntrada.gain.value = 1;
    const revSaida = ctx.createGain();
    revSaida.gain.value = 0.32;
    revEntrada.connect(conv); conv.connect(revSaida); revSaida.connect(saidaGeral);
    ruidoBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const r = ruidoBuf.getChannelData(0);
    for (let i = 0; i < r.length; i++) r[i] = Math.random() * 2 - 1;
    return true;
  }

  // ---------- instrumentos ----------
  function env(g, t, ataque, pico, dur, sustento) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(pico, t + ataque);
    if (sustento) {
      g.gain.setValueAtTime(pico, t + Math.max(ataque, dur - sustento));
      g.gain.linearRampToValueAtTime(0.0001, t + dur);
    } else g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  }
  function osc(tipo, f, t, fim, destino, ganho) {
    const o = ctx.createOscillator();
    o.type = tipo; o.frequency.setValueAtTime(f, t);
    if (ganho != null && ganho !== 1) { const g = ctx.createGain(); g.gain.value = ganho; o.connect(g); g.connect(destino); }
    else o.connect(destino);
    o.start(t); o.stop(fim);
    return o;
  }
  const I = {};
  I.piano = (out, t, m, dur, vel) => {
    const f = hz(m), fim = t + dur + 0.9;
    const g = ctx.createGain(), lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(Math.min(7000, f * 7), t);
    lp.frequency.exponentialRampToValueAtTime(Math.max(400, f * 1.6), t + dur + 0.6);
    lp.connect(g); g.connect(out);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vel, t + 0.006);
    g.gain.exponentialRampToValueAtTime(vel * 0.45, t + 0.3);
    g.gain.exponentialRampToValueAtTime(0.0001, fim);
    osc('triangle', f, t, fim, lp, 1); osc('sine', f * 2, t, fim, lp, 0.22); osc('sine', f * 3.01, t, t + 0.5, lp, 0.06);
  };
  I.rhodes = (out, t, m, dur, vel) => {
    const f = hz(m), fim = t + dur + 0.6;
    const g = ctx.createGain(); g.connect(out);
    env(g, t, 0.01, vel, dur + 0.6);
    const trem = ctx.createGain(); trem.gain.value = 1; trem.connect(g);
    const lfo = ctx.createOscillator(), lg = ctx.createGain(); lfo.frequency.value = 4.5; lg.gain.value = 0.18;
    lfo.connect(lg); lg.connect(trem.gain); lfo.start(t); lfo.stop(fim);
    osc('sine', f, t, fim, trem, 1); osc('sine', f * 2, t, t + 0.4, trem, 0.12); osc('triangle', f, t, fim, trem, 0.25);
  };
  I.celesta = (out, t, m, dur, vel) => {
    const f = hz(m), fim = t + Math.max(1.2, dur) + 0.4;
    const g = ctx.createGain(); g.connect(out);
    env(g, t, 0.004, vel, fim - t);
    osc('sine', f, t, fim, g, 1); osc('sine', f * 4, t, t + 0.35, g, 0.12); osc('triangle', f * 2, t, t + 0.6, g, 0.1);
  };
  I.vibrafone = (out, t, m, dur, vel) => {
    const f = hz(m), fim = t + Math.max(2.2, dur) + 0.3;
    const g = ctx.createGain(); g.connect(out);
    env(g, t, 0.005, vel, fim - t);
    const trem = ctx.createGain(); trem.gain.value = 1; trem.connect(g);
    const lfo = ctx.createOscillator(), lg = ctx.createGain(); lfo.frequency.value = 5.2; lg.gain.value = 0.25;
    lfo.connect(lg); lg.connect(trem.gain); lfo.start(t); lfo.stop(fim);
    osc('sine', f, t, fim, trem, 1); osc('sine', f * 4, t, t + 0.8, trem, 0.08);
  };
  I.marimba = (out, t, m, dur, vel) => {
    const f = hz(m), fim = t + 0.7;
    const g = ctx.createGain(); g.connect(out);
    env(g, t, 0.003, vel, 0.7);
    osc('sine', f, t, fim, g, 1); osc('sine', f * 4, t, t + 0.12, g, 0.18); osc('sine', f * 10, t, t + 0.04, g, 0.05);
  };
  I.contrabaixo = (out, t, m, dur, vel) => {
    const f = hz(m), fim = t + dur + 0.25;
    const g = ctx.createGain(), lp = ctx.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = 650; lp.connect(g); g.connect(out);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vel, t + 0.012);
    g.gain.exponentialRampToValueAtTime(vel * 0.35, t + dur * 0.7);
    g.gain.exponentialRampToValueAtTime(0.0001, fim);
    osc('triangle', f, t, fim, lp, 1); osc('sine', f, t, fim, lp, 0.6);
  };
  I.cordas = (out, t, m, dur, vel) => {
    const f = hz(m), fim = t + dur + 1.2;
    const g = ctx.createGain(), lp = ctx.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = 1300; lp.Q.value = 0.4; lp.connect(g); g.connect(out);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vel, t + 0.9);
    g.gain.setValueAtTime(vel, t + dur);
    g.gain.linearRampToValueAtTime(0.0001, fim);
    [-7, 6].forEach((c) => { const o = osc('sawtooth', f, t, fim, lp, 0.5); o.detune.value = c; });
  };
  I.violino = (out, t, m, dur, vel) => {
    const f = hz(m), fim = t + dur + 0.35;
    const g = ctx.createGain(), lp = ctx.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = 2400; lp.connect(g); g.connect(out);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vel, t + 0.14);
    g.gain.setValueAtTime(vel * 0.9, t + dur);
    g.gain.linearRampToValueAtTime(0.0001, fim);
    const o = osc('sawtooth', f, t, fim, lp, 0.7);
    const o2 = osc('triangle', f, t, fim, lp, 0.5);
    const lfo = ctx.createOscillator(), lg = ctx.createGain(); lfo.frequency.value = 5.4; lg.gain.setValueAtTime(0, t); lg.gain.linearRampToValueAtTime(9, t + 0.35);
    lfo.connect(lg); lg.connect(o.detune); lg.connect(o2.detune); lfo.start(t); lfo.stop(fim);
  };
  I.flauta = (out, t, m, dur, vel) => {
    const f = hz(m), fim = t + dur + 0.25;
    const g = ctx.createGain(); g.connect(out);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vel, t + 0.09);
    g.gain.setValueAtTime(vel * 0.85, t + dur);
    g.gain.linearRampToValueAtTime(0.0001, fim);
    const o = osc('sine', f, t, fim, g, 1); osc('triangle', f * 2, t, fim, g, 0.06);
    const lfo = ctx.createOscillator(), lg = ctx.createGain(); lfo.frequency.value = 5; lg.gain.setValueAtTime(0, t); lg.gain.linearRampToValueAtTime(7, t + 0.4);
    lfo.connect(lg); lg.connect(o.detune); lfo.start(t); lfo.stop(fim);
  };
  // cordas dedilhadas (Karplus-Strong): violão de náilon e harpa
  function bufferKS(m, dur, brilho) {
    const chave = m + ':' + brilho;
    if (cacheKS.has(chave)) return cacheKS.get(chave);
    const sr = ctx.sampleRate, f = hz(m), N = Math.max(2, Math.round(sr / f)), len = Math.floor(sr * dur);
    const buf = ctx.createBuffer(1, len, sr), d = buf.getChannelData(0);
    let ant = 0;
    for (let i = 0; i < N; i++) { const r = Math.random() * 2 - 1; ant = ant + brilho * (r - ant); d[i] = ant; }
    const amort = 0.5 * (0.9985 - (m > 72 ? 0.002 : 0));
    for (let i = N; i < len; i++) d[i] = amort * (d[i - N] + d[i - N + 1]);
    let pico = 0; for (let i = 0; i < N * 4 && i < len; i++) pico = Math.max(pico, Math.abs(d[i]));
    if (pico > 0) for (let i = 0; i < len; i++) d[i] /= pico;
    cacheKS.set(chave, buf);
    return buf;
  }
  function dedilhar(out, t, m, vel, dur, brilho, corte) {
    const s = ctx.createBufferSource(); s.buffer = bufferKS(m, dur, brilho);
    const g = ctx.createGain(); g.gain.value = vel;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = corte;
    s.connect(lp); lp.connect(g); g.connect(out); s.start(t);
  }
  I.violao = (out, t, m, dur, vel) => dedilhar(out, t, m, vel, 1.8, 0.45, 3200);
  I.harpa = (out, t, m, dur, vel) => dedilhar(out, t, m, vel, 2.6, 0.75, 5200);
  I.cravo = (out, t, m, dur, vel) => dedilhar(out, t, m, vel, 1.1, 0.95, 6500);
  I.cavaquinho = (out, t, m, dur, vel) => dedilhar(out, t, m, vel, 0.9, 0.7, 5000);
  function ruido(out, t, dur, vel, tipo, freq, q) {
    const s = ctx.createBufferSource(); s.buffer = ruidoBuf;
    const f = ctx.createBiquadFilter(); f.type = tipo; f.frequency.value = freq; f.Q.value = q || 0.7;
    const g = ctx.createGain(); env(g, t, Math.min(0.03, dur / 3), vel, dur);
    s.connect(f); f.connect(g); g.connect(out);
    s.start(t, Math.random() * 0.5); s.stop(t + dur + 0.05);
  }
  I.escovinha = (out, t, dur, vel) => ruido(out, t, dur, vel, 'bandpass', 4200, 0.6);
  I.chocalho = (out, t, dur, vel) => ruido(out, t, dur, vel, 'highpass', 7000, 0.7);

  // ---------- harmonia e melodia ----------
  const TIPOS = {
    maj: [0, 4, 7], min: [0, 3, 7], m: [0, 3, 7], maj7: [0, 4, 7, 11], m7: [0, 3, 7, 10], 7: [0, 4, 7, 10], m9: [0, 3, 7, 10, 14],
    maj9: [0, 4, 7, 11, 14], 69: [0, 4, 7, 9, 14], '7b9': [0, 4, 7, 10, 13], 9: [0, 4, 7, 10, 14], add9: [0, 4, 7, 14], madd9: [0, 3, 7, 14], 6: [0, 4, 7, 9],
  };
  const NOTAS = { C: 0, Db: 1, D: 2, Eb: 3, E: 4, F: 5, Gb: 6, G: 7, Ab: 8, A: 9, Bb: 10, B: 11 };
  function ac(nome) {
    const mm = nome.match(/^([A-G]b?)(.*)$/);
    return { raiz: NOTAS[mm[1]], tipo: TIPOS[mm[2] || 'maj'] };
  }
  const notasDe = (a, base) => a.tipo.map((iv) => base + a.raiz + iv);
  const classes = (a) => a.tipo.map((iv) => (a.raiz + iv) % 12);
  const voicing = (a, centro) => a.tipo.map((iv) => { let m = a.raiz + iv; while (m < centro - 6) m += 12; while (m > centro + 6) m -= 12; return m; }).sort((x, y) => x - y);
  function escolher(arr, rnd) { return arr[Math.floor(rnd() * arr.length)]; }
  // próxima nota da melodia: passos curtos, notas do acorde nos tempos fortes
  function proxNota(st, a, escala, faixa, rnd, forte) {
    const alvo = classes(a);
    let soma = 0;
    const cand = [];
    for (let m = faixa[0]; m <= faixa[1]; m++) {
      const pc = ((m % 12) + 12) % 12;
      if (!escala.includes(pc) && !alvo.includes(pc)) continue;
      let w = 1 / Math.pow(1 + Math.abs(m - st.ult), 1.6);
      if (alvo.includes(pc)) w *= forte ? 4 : 1.5;
      if (m === st.ult) w *= 0.35;
      cand.push([m, w]); soma += w;
    }
    let r = rnd() * soma;
    for (const [m, w] of cand) { r -= w; if (r <= 0) { st.ult = m; return m; } }
    st.ult = cand.length ? cand[0][0] : st.ult;
    return st.ult;
  }
  const ESC_MAIOR = (t) => [0, 2, 4, 5, 7, 9, 11].map((x) => (x + t) % 12);
  const ESC_MENOR = (t) => [0, 2, 3, 5, 7, 8, 10].map((x) => (x + t) % 12);

  // ---------- estilos ----------
  const E = {};

  // Valsa de caixinha de música (mansão / tela inicial)
  E.mansao = {
    ganho: 5.5,
    bpm: 84, tempos: 3,
    prog: ['C', 'Am', 'F', 'G7', 'C', 'Em', 'Dm7', 'G7', 'F', 'G', 'Em', 'Am', 'Dm7', 'G7', 'C', 'C'].map(ac),
    compasso(o, t, n, b, rnd, st) {
      const a = this.prog[n % this.prog.length];
      I.piano(o.seco, t, notasDe(a, 36)[0], b * 2.8, 0.07);
      voicing(a, 60).forEach((m) => { I.piano(o.seco, t + b, m, b * 0.8, 0.028); I.piano(o.seco, t + 2 * b, m, b * 0.8, 0.024); });
      const ritmos = [[0, 1, 2], [0, 2], [0, 1.5, 2], [0], [0, 1, 1.5, 2]];
      escolher(ritmos, rnd).forEach((p, i) => I.celesta(o.molhado, t + p * b, proxNota(st, a, ESC_MAIOR(0), [76, 91], rnd, p === 0), b, 0.05));
    },
  };

  // Jazz de salão dos anos 1920, balada com swing (hall)
  E.hall = {
    ganho: 2.2,
    bpm: 72, tempos: 4,
    prog: ['Fmaj7', 'Dm7', 'Gm7', 'C7', 'Am7', 'D7b9', 'Gm7', 'C9'].map(ac),
    compasso(o, t, n, b, rnd, st) {
      const a = this.prog[n % this.prog.length], prox = this.prog[(n + 1) % this.prog.length];
      const r = 36 + a.raiz;
      const andando = [r, r + a.tipo[1], r + a.tipo[2], 36 + prox.raiz + (rnd() < 0.5 ? 1 : -1)];
      andando.forEach((m, i) => I.contrabaixo(o.seco, t + i * b, m, b * 0.9, 0.11));
      const v = voicing(a, 62).slice(-4);
      v.forEach((m) => I.rhodes(o.molhado, t + 0.02, m, b * 1.6, 0.03));
      if (rnd() < 0.6) v.forEach((m) => I.rhodes(o.molhado, t + b * 2.66, m, b * 0.7, 0.022));
      for (let i = 0; i < 4; i++) { I.escovinha(o.seco, t + i * b, b * 0.6, i % 2 ? 0.035 : 0.022); I.escovinha(o.seco, t + i * b + b * 0.66, 0.08, 0.012); }
      const esc = ESC_MAIOR(5);
      [0, 0.66, 1, 1.66, 2, 2.66, 3, 3.66].forEach((p) => { if (rnd() < (p % 1 ? 0.25 : 0.4)) I.piano(o.molhado, t + p * b, proxNota(st, a, esc, [65, 81], rnd, p % 1 === 0), b * 0.7, 0.045); });
    },
  };

  // Bossa nova ao violão de náilon, com flauta (píer)
  E.pier = {
    ganho: 1.1,
    bpm: 118, tempos: 4,
    prog: ['Fmaj7', 'Fmaj7', 'G9', 'G9', 'Gm7', 'C7', 'Fmaj7', 'C9', 'Am7', 'D7b9', 'Gm7', 'C7'].map(ac),
    compasso(o, t, n, b, rnd, st) {
      const a = this.prog[n % this.prog.length], e = b / 2;
      const raiz = 40 + ((a.raiz + 8) % 12);
      I.violao(o.seco, t, raiz, b, 0.32);
      I.violao(o.seco, t + 4 * e, raiz + 7 <= 52 ? raiz + 7 : raiz - 5, b, 0.26);
      const v = voicing(a, 60).slice(-4);
      const padrao = n % 2 ? [2, 4, 7] : [0, 3, 6];
      padrao.forEach((p) => v.forEach((m, i) => I.violao(o.seco, t + p * e + i * 0.012, m, b, 0.13)));
      for (let i = 0; i < 8; i++) I.chocalho(o.seco, t + i * e, 0.06, i % 2 ? 0.02 : 0.011);
      if (n % 4 < 2) {
        const esc = ESC_MAIOR(5);
        [0, 3, 5, 6].forEach((p) => { if (rnd() < 0.55) I.flauta(o.molhado, t + p * e, proxNota(st, a, esc, [72, 86], rnd, p === 0), e * (p === 6 ? 3 : 1.8), 0.04); });
      }
    },
  };

  // Piano calmo e contemplativo, em compasso ternário (escritório)
  E.escritorio = {
    ganho: 7,
    bpm: 68, tempos: 3,
    prog: ['Gmaj7', 'Dmaj7', 'Gmaj7', 'Dmaj7', 'Em7', 'Bm7', 'Cmaj7', 'D'].map(ac),
    compasso(o, t, n, b, rnd, st) {
      const a = this.prog[n % this.prog.length];
      I.piano(o.molhado, t, notasDe(a, 36)[0], b * 3, 0.07);
      voicing(a, 62).slice(-3).forEach((m) => I.piano(o.molhado, t + b, m, b * 2, 0.03));
      if (rnd() < 0.8) {
        const m = proxNota(st, a, ESC_MAIOR(7), [69, 81], rnd, true);
        I.piano(o.molhado, t + (rnd() < 0.5 ? 0 : b), m, b * 2.5, 0.05);
        if (rnd() < 0.35) I.piano(o.molhado, t + 2 * b, proxNota(st, a, ESC_MAIOR(7), [69, 81], rnd, false), b, 0.04);
      }
    },
  };

  // Noturno com harpa, cordas e celesta (biblioteca)
  E.biblioteca = {
    ganho: 4.2,
    bpm: 58, tempos: 4,
    prog: ['Dmadd9', 'Bbmaj7', 'Gm7', 'A7', 'Dm', 'F', 'C', 'A7'].map(ac),
    compasso(o, t, n, b, rnd, st) {
      const a = this.prog[n % this.prog.length], e = b / 2;
      const base = notasDe(a, 48).slice(0, 4);
      const arp = base.concat(base.slice(0, 3).map((m) => m + 12));
      const seq = arp.slice(0, 4).concat(arp.slice(4, 6), arp.slice(2, 4).reverse());
      seq.forEach((m, i) => I.harpa(o.molhado, t + i * e, m, e, i === 0 ? 0.13 : 0.08));
      voicing(a, 64).forEach((m) => I.cordas(o.molhado, t, m, b * 4, 0.016));
      I.cordas(o.molhado, t, notasDe(a, 36)[0], b * 4, 0.02);
      if (n % 2 === 1) [1, 2.5].forEach((p) => { if (rnd() < 0.7) I.celesta(o.molhado, t + p * b, proxNota(st, a, ESC_MENOR(2), [74, 86], rnd, true), b, 0.04); });
    },
  };

  // Minimalismo com marimba e vibrafone (laboratório)
  E.laboratorio = {
    ganho: 5,
    bpm: 96, tempos: 4,
    prog: ['Am9', 'Am9', 'Fmaj9', 'Fmaj9', 'Cmaj9', 'Cmaj9', 'G6', 'G6'].map(ac),
    padrao: [0, 2, 1, 3, 2, 4, 1, 3],
    compasso(o, t, n, b, rnd, st) {
      const a = this.prog[n % this.prog.length], e = b / 2;
      const notas = voicing(a, 68);
      this.padrao.forEach((k, i) => I.marimba(o.molhado, t + i * e, notas[k % notas.length] + (k >= notas.length ? 12 : 0), e, i % 4 === 0 ? 0.075 : 0.05));
      I.marimba(o.seco, t, notasDe(a, 36)[0], b, 0.09);
      I.marimba(o.seco, t + 2 * b, notasDe(a, 36)[0] + 7, b, 0.06);
      if (n % 2 === 0) voicing(a, 76).slice(-2).forEach((m) => I.vibrafone(o.molhado, t, m, b * 4, 0.035));
      voicing(a, 57).forEach((m) => I.cordas(o.molhado, t, m, b * 4, 0.01));
    },
  };

  // Valsa de salão com cordas, piano e violino (salão de baile)
  E.salao = {
    ganho: 4.8,
    bpm: 100, tempos: 3,
    prog: ['G', 'G', 'Em', 'Em', 'Am7', 'D7', 'G', 'D7', 'G', 'B7', 'Em', 'A7', 'Am7', 'D7', 'G', 'G'].map(ac),
    compasso(o, t, n, b, rnd, st) {
      const a = this.prog[n % this.prog.length];
      I.piano(o.molhado, t, notasDe(a, 36)[0] + (a.raiz > 6 ? -12 : 0) + 12, b * 0.9, 0.08);
      voicing(a, 62).forEach((m) => { I.piano(o.molhado, t + b, m, b * 0.5, 0.026); I.piano(o.molhado, t + 2 * b, m, b * 0.5, 0.022); });
      voicing(a, 67).forEach((m) => I.cordas(o.molhado, t, m, b * 3, 0.012));
      const ritmos = [[[0, 3]], [[0, 2], [2, 1]], [[0, 1], [1, 1], [2, 1]], [[0, 1.5], [1.5, 0.5], [2, 1]]];
      escolher(ritmos, rnd).forEach(([p, d]) => I.violino(o.molhado, t + p * b, proxNota(st, a, ESC_MAIOR(7), [67, 84], rnd, p === 0), d * b * 0.95, 0.03));
    },
  };

  // Choro suave ao violão de sete cordas, cavaquinho e flauta (horta e córrego)
  E.horta = {
    ganho: 1.6,
    bpm: 80, tempos: 4,
    prog: ['D', 'D', 'A7', 'A7', 'A7', 'A7', 'D', '7', 'G', 'G', 'D', 'B7', 'E7', 'E7', 'A7', 'A7'].map((n, i) => (n === '7' ? ac('D7') : ac(n))),
    compasso(o, t, n, b, rnd, st) {
      const a = this.prog[n % this.prog.length], prox = this.prog[(n + 1) % this.prog.length], e = b / 2;
      // baixaria do violão de sete cordas: tônica, quinta e uma passagem até o próximo acorde
      const r = 38 + ((a.raiz + 10) % 12);
      I.violao(o.seco, t, r, b, 0.3);
      I.violao(o.seco, t + 2 * b, r + 7 <= 50 ? r + 7 : r - 5, b, 0.24);
      const alvo = 38 + ((prox.raiz + 10) % 12);
      [alvo + 2, alvo + 1].forEach((m, i) => { if (rnd() < 0.7) I.violao(o.seco, t + 3 * b + i * e, m, e, 0.2); });
      // cavaquinho com a levada sincopada do choro
      const v = voicing(a, 67).slice(-3);
      [0, 0.75, 1.5, 2, 2.75, 3.5].forEach((p, k) => v.forEach((m, i) => I.cavaquinho(o.seco, t + p * b + i * 0.01, m, e, k % 2 ? 0.07 : 0.1)));
      for (let i = 0; i < 8; i++) I.chocalho(o.seco, t + i * e, 0.05, i % 2 ? 0.014 : 0.009);
      // flauta com frases em colcheias
      const esc = ESC_MAIOR(2);
      for (let i = 0; i < 8; i++) if (rnd() < (i % 2 ? 0.45 : 0.65)) I.flauta(o.molhado, t + i * e, proxNota(st, a, esc, [74, 88], rnd, i % 2 === 0), e * 0.95, 0.035);
    },
  };

  // Barroco ao cravo, com violoncelo no baixo contínuo (sala de mapas)
  E.mapas = {
    ganho: 2.8,
    bpm: 72, tempos: 4,
    prog: ['Am', 'Dm', 'G', 'C', 'F', 'Dm', 'E7', 'Am', 'C', 'G', 'Am', 'Em', 'F', 'C', 'Dm', 'E7'].map(ac),
    compasso(o, t, n, b, rnd, st) {
      const a = this.prog[n % this.prog.length], s16 = b / 4;
      const base = notasDe(a, 57).slice(0, 3);
      const figura = [0, 2, 1, 2, 0, 2, 1, 2];
      for (let i = 0; i < 16; i++) {
        const nota = base[figura[i % 8]] + (i >= 8 ? 12 : 0);
        I.cravo(o.molhado, t + i * s16, nota, s16, i % 4 === 0 ? 0.12 : 0.075);
      }
      const r = 36 + a.raiz;
      [r, r + 12, r + a.tipo[2], r + 12].forEach((m, i) => I.contrabaixo(o.seco, t + i * b, m, b * 0.85, 0.08));
      if (n % 2 === 1 && rnd() < 0.8) [0, 1, 2].forEach((p) => I.cravo(o.molhado, t + p * b + b * 0.5, proxNota(st, a, ESC_MENOR(9), [76, 88], rnd, true), b, 0.06));
    },
  };

  // Minueto para quarteto de cordas (sala de jantar)
  E.jantar = {
    ganho: 2.9,
    bpm: 104, tempos: 3,
    prog: ['G', 'D7', 'G', 'C', 'G', 'D', 'Em', 'A7', 'D', 'D7', 'G', 'C', 'G', 'D7', 'G', 'G'].map(ac),
    compasso(o, t, n, b, rnd, st) {
      const a = this.prog[n % this.prog.length];
      I.contrabaixo(o.seco, t, 36 + a.raiz + (a.raiz < 5 ? 12 : 0), b * 1.6, 0.1);
      voicing(a, 60).forEach((m) => { I.violino(o.molhado, t + b, m, b * 0.8, 0.012); I.violino(o.molhado, t + 2 * b, m, b * 0.8, 0.011); });
      voicing(a, 64).forEach((m) => I.cordas(o.molhado, t, m, b * 3, 0.008));
      const ritmos = [[[0, 1], [1, 1], [2, 1]], [[0, 2], [2, 1]], [[0, 1.5], [1.5, 0.5], [2, 1]], [[0, 0.5], [0.5, 0.5], [1, 1], [2, 1]]];
      escolher(ritmos, rnd).forEach(([p, d]) => I.violino(o.molhado, t + p * b, proxNota(st, a, ESC_MAIOR(7), [69, 86], rnd, p === 0), d * b * 0.92, 0.032));
    },
  };

  // ---------- sequenciador ----------
  const M = { nome: null, est: null, saida: null, prox: 0, n: 0, st: null, timer: null, pendente: null };
  let semente = 12345;
  const rnd = () => { semente = (semente * 1664525 + 1013904223) >>> 0; return semente / 4294967296; };

  function criarSaida() {
    const seco = ctx.createGain(), molhado = ctx.createGain();
    seco.gain.value = 0; molhado.gain.value = 0;
    seco.connect(saidaGeral);
    molhado.connect(saidaGeral); molhado.connect(revEntrada);
    return { seco, molhado };
  }
  function rampa(saida, alvo, dur) {
    const t = ctx.currentTime;
    [saida.seco, saida.molhado].forEach((g) => { g.gain.cancelScheduledValues(t); g.gain.setValueAtTime(g.gain.value, t); g.gain.linearRampToValueAtTime(alvo, t + dur); });
  }
  function agendar() {
    if (!M.est || !ctx) return;
    const agora = ctx.currentTime;
    if (M.prox < agora - 0.2) M.prox = agora + 0.05; // aba voltou do segundo plano
    if (A.volMusica <= 0.001) { M.prox = agora + 0.1; return; }
    const b = 60 / M.est.bpm;
    while (M.prox < agora + 0.5) {
      try { M.est.compasso(M.saida, M.prox, M.n, b, rnd, M.st); } catch (e) { console.error(e); }
      M.prox += b * M.est.tempos;
      M.n++;
    }
  }

  A.musica = function (nome) {
    nome = E[nome] ? nome : 'mansao';
    M.pendente = nome;
    if (!preparar()) return;
    if (M.nome === nome) return;
    if (M.saida) { const velha = M.saida; rampa(velha, 0, 1.4); setTimeout(() => { try { velha.seco.disconnect(); velha.molhado.disconnect(); } catch (e) {} }, 1700); }
    M.nome = nome;
    M.est = E[nome];
    M.saida = criarSaida();
    rampa(M.saida, M.est.ganho || 1, 1.8); // ganho iguala o volume entre os estilos
    M.n = 0;
    M.st = { ult: 76 };
    M.prox = ctx.currentTime + 0.12;
    if (!M.timer) M.timer = setInterval(agendar, 60);
    agendar();
    MI.bus.emit('trilha', nome);
  };
  A.trilhaAtual = () => M.nome;
  MI.bus.on('audio-pronto', () => { if (M.pendente) { const p = M.pendente; M.nome = null; A.musica(p); } });

  // ganchos para testes automatizados (renderização fora do tempo real)
  MI._estilosMusica = E;
  MI._agendarCompassos = (n) => { const b = 60 / M.est.bpm; for (let i = 0; i < n; i++) { M.est.compasso(M.saida, M.prox, M.n, b, rnd, M.st); M.prox += b * M.est.tempos; M.n++; } };
})();
