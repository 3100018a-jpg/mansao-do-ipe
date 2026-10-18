/* =========================================================
   Ambientes sonoros da mansão: tons muito suaves e sons da
   natureza (vento, folhas, pássaros, grilos, água, céu noturno).

   Cada ambiente é sintetizado UMA vez, fora do tempo real
   (OfflineAudioContext), num trecho de 32 s que emenda sem
   costura. Depois toca como um único som em laço. Assim o
   celular não precisa calcular centenas de notas ao vivo, o que
   causava chiados e estalos em aparelhos mais modestos.
   ========================================================= */
(function () {
  'use strict';
  const MI = window.MI;
  const A = MI.A;

  MI.TRILHAS = {
    mansao: 'Jardim da mansão: brisa e sinos suaves',
    hall: 'Sinos suaves e o jardim pela porta',
    pier: 'Marolas no lago e vento nas árvores',
    escritorio: 'Tons calmos e folhas lá fora',
    biblioteca: 'Sinos suaves no silêncio da leitura',
    laboratorio: 'Porão: gotas d’água e tom grave',
    salao: 'Notas de harpa e brisa do jardim',
    horta: 'Córrego, folhagem e pássaros',
    mapas: 'Vento no alto da torre',
    jantar: 'Harpa suave e brisa',
  };
  // sons da natureza de cada período do dia
  MI.SONS_PERIODO = {
    aurora: { desc: 'coro de pássaros ao amanhecer e últimos grilos', passaros: 0.75, rolinhas: 0.35, grilos: 0.22, vento: 0.22, folhas: 0.15 },
    dia: { desc: 'sabiás, pardais e vento nas folhas', passaros: 0.8, vento: 0.3, folhas: 0.3 },
    entardecer: { desc: 'rolinhas, primeiros grilos e brisa', rolinhas: 0.55, passaros: 0.28, grilos: 0.4, vento: 0.25 },
    noite: { desc: 'grilos, coruja ao longe e céu noturno', grilos: 1, coruja: 0.6, vento: 0.25 },
  };

  // ---------- receitas de cada cômodo ----------
  // pad: acordes (MIDI) do tom suave de fundo · brilho: notas soltas (sino ou harpa)
  // nat: quanto da natureza de fora chega ao cômodo · os demais números: sons próprios do lugar
  const R = {
    mansao: { semente: 11, nat: 1, pad: [[53, 57, 60, 64], [50, 57, 60, 65], [46, 53, 57, 62], [48, 55, 60, 62]], padVol: 0.75, brilho: { escala: [65, 67, 69, 72, 74, 77], cada: 7, timbre: 'sino', vol: 0.45 }, folhas: 0.1 },
    hall: { semente: 23, interior: true, nat: 0.7, pad: [[51, 55, 58, 62], [48, 55, 58, 63], [44, 51, 55, 60], [46, 53, 58, 62]], padVol: 0.9, brilho: { escala: [63, 65, 67, 70, 72, 75], cada: 6, timbre: 'sino', vol: 0.45 } },
    pier: { semente: 37, nat: 1.1, pad: [[50, 57, 62, 66], [47, 54, 59, 62], [43, 50, 55, 59], [45, 52, 57, 61]], padVol: 0.5, brilho: { escala: [66, 69, 71, 74, 76], cada: 9, timbre: 'harpa', vol: 0.32 }, agua: 0.95, folhas: 0.2 },
    escritorio: { semente: 41, interior: true, nat: 0.8, pad: [[50, 54, 57, 61], [47, 54, 57, 62], [43, 50, 54, 59], [45, 52, 57, 61]], padVol: 0.85, brilho: { escala: [62, 66, 69, 71, 74], cada: 8, timbre: 'sino', vol: 0.35 } },
    biblioteca: { semente: 53, interior: true, nat: 0.8, pad: [[45, 52, 57, 60], [41, 48, 57, 60], [43, 50, 55, 59], [40, 47, 55, 59]], padVol: 0.85, brilho: { escala: [69, 72, 74, 76, 79, 81], cada: 6, timbre: 'sino', vol: 0.5 } },
    laboratorio: { semente: 67, interior: true, nat: 0.35, pad: [[38, 45, 50, 53], [38, 46, 50, 53], [36, 43, 48, 52], [37, 45, 49, 52]], padVol: 1, filtroPad: 650, brilho: { escala: [62, 65, 69, 72], cada: 11, timbre: 'sino', vol: 0.3 }, gotas: 0.9 },
    salao: { semente: 71, interior: true, nat: 0.65, pad: [[48, 55, 60, 64], [45, 52, 57, 60], [41, 48, 57, 60], [43, 50, 55, 59]], padVol: 0.8, brilho: { escala: [60, 64, 67, 69, 72, 76, 79], cada: 3.5, timbre: 'harpa', vol: 0.45 } },
    horta: { semente: 83, nat: 1.2, pad: [[43, 50, 55, 59], [40, 47, 55, 59], [36, 43, 52, 55], [38, 45, 50, 54]], padVol: 0.45, brilho: { escala: [67, 69, 71, 74, 76], cada: 10, timbre: 'harpa', vol: 0.3 }, corrego: 0.9, folhas: 0.35 },
    mapas: { semente: 97, interior: true, nat: 0.75, pad: [[45, 52, 57, 60], [41, 48, 53, 57], [43, 50, 55, 62], [40, 47, 52, 56]], padVol: 0.8, brilho: { escala: [69, 71, 72, 76, 77], cada: 8, timbre: 'sino', vol: 0.35 }, vento: 0.55, assobio: 0.5, andorinhas: 0.6 },
    jantar: { semente: 101, interior: true, nat: 0.75, pad: [[43, 50, 55, 59], [48, 52, 55, 60], [45, 52, 57, 60], [50, 54, 57, 62]], padVol: 0.85, brilho: { escala: [67, 71, 74, 76, 79], cada: 6, timbre: 'harpa', vol: 0.35 } },
  };
  // junta os sons do cômodo com os do período do dia
  function receita(nome, periodo) {
    const base = R[nome], camada = MI.SONS_PERIODO[periodo] || MI.SONS_PERIODO.dia;
    const rec = Object.assign({}, base);
    ['passaros', 'rolinhas', 'grilos', 'coruja', 'vento', 'folhas'].forEach((k) => { if (camada[k]) rec[k] = (base[k] || 0) + camada[k] * (base.nat || 1); });
    if (periodo === 'noite') { rec.andorinhas = 0; rec.filtroPad = Math.min(rec.filtroPad || 1100, 900); }
    if (periodo === 'dia') rec.filtroPad = rec.filtroPad || 1300;
    rec.semente = base.semente + ({ aurora: 1, dia: 2, entardecer: 3, noite: 4 }[periodo] || 0) * 1000;
    return rec;
  }

  const LACO = 32;        // duração do trecho em laço (s)
  const EMENDA = 4;       // trecho extra usado para a emenda sem costura (s)
  const TAXA = 24000;     // taxa de amostragem da síntese
  const RMS_ALVO = 0.085; // volume médio igual em todos os ambientes
  const PICO_MAX = 0.45;  // margem segura: nunca satura

  const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);

  // ---------- síntese de um ambiente ----------
  function sintetizar(nome, periodo) {
    const rec = receita(nome, periodo);
    const dur = LACO + EMENDA;
    const OAC = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    const oc = new OAC(2, Math.ceil(dur * TAXA), TAXA);
    let s = rec.semente * 7919 + 1;
    const rnd = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
    const entre = (a, b) => a + rnd() * (b - a);

    // barramentos: seco, reverberação e natureza (filtrada quando o som vem de fora)
    const saida = oc.createGain(); saida.connect(oc.destination);
    const ir = oc.createBuffer(2, Math.floor(TAXA * 3.2), TAXA);
    for (let c = 0; c < 2; c++) {
      const d = ir.getChannelData(c);
      for (let i = 0; i < d.length; i++) d[i] = (rnd() * 2 - 1) * Math.pow(1 - i / d.length, 3.5);
    }
    const conv = oc.createConvolver(); conv.buffer = ir;
    const rev = oc.createGain(); rev.gain.value = 0.55; conv.connect(rev); rev.connect(saida);
    // a natureza passa por um filtro que corta o chiado agudo (mais forte quando o som vem de fora da janela)
    const natureza = oc.createGain(); natureza.gain.value = rec.interior ? 0.6 : 1;
    const janela = oc.createBiquadFilter(); janela.type = 'lowpass'; janela.frequency.value = rec.interior ? 3000 : 5200; janela.Q.value = 0.4;
    const janela2 = oc.createBiquadFilter(); janela2.type = 'lowpass'; janela2.frequency.value = rec.interior ? 4200 : 7000; janela2.Q.value = 0.4;
    natureza.connect(janela); janela.connect(janela2); janela2.connect(saida);

    // ruído rosa (mais macio que o ruído branco, sem chiado)
    const ruido = oc.createBuffer(1, TAXA * 4, TAXA);
    const rd = ruido.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < rd.length; i++) {
      const w = rnd() * 2 - 1;
      b0 = 0.99886 * b0 + w * 0.0555179; b1 = 0.99332 * b1 + w * 0.0750759; b2 = 0.969 * b2 + w * 0.153852;
      b3 = 0.8665 * b3 + w * 0.3104856; b4 = 0.55 * b4 + w * 0.5329522; b5 = -0.7616 * b5 - w * 0.016898;
      rd[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11; b6 = w * 0.115926;
    }
    const fonteRuido = () => { const n = oc.createBufferSource(); n.buffer = ruido; n.loop = true; n.loopStart = 0; n.loopEnd = 4; return n; };
    const panor = (v, destino) => { const p = oc.createStereoPanner ? oc.createStereoPanner() : null; if (!p) return destino; p.pan.value = v; p.connect(destino); return p; };
    // curva suave e aleatória entre 0 e 1 (soma de ondas lentas)
    function curvaLenta(pontosPorSeg, periodos, base) {
      const n = Math.ceil(dur * pontosPorSeg), c = new Float32Array(n);
      const ondas = periodos.map((p) => ({ f: 1 / entre(p[0], p[1]), fase: rnd() * 6.283 }));
      for (let i = 0; i < n; i++) {
        const t = i / pontosPorSeg;
        let v = 0;
        ondas.forEach((o) => { v += Math.sin(6.283 * o.f * t + o.fase); });
        c[i] = Math.max(0, base + (1 - base) * (0.5 + 0.5 * v / ondas.length));
      }
      return c;
    }

    // ----- tom de fundo (pad muito suave) -----
    if (rec.pad) {
      const lp = oc.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = rec.filtroPad || 1100; lp.Q.value = 0.3;
      const padG = oc.createGain(); padG.gain.value = 0.05 * rec.padVol;
      lp.connect(padG); padG.connect(saida);
      const envia = oc.createGain(); envia.gain.value = 0.5; padG.connect(envia); envia.connect(conv);
      const C = LACO / rec.pad.length;
      for (let k = 0; k * C < dur; k++) {
        const t0 = k * C, t1 = t0 + C + 3; // acordes se sobrepõem 3 s
        rec.pad[k % rec.pad.length].forEach((m, j) => {
          const g = oc.createGain();
          g.gain.setValueAtTime(0.0001, t0);
          g.gain.linearRampToValueAtTime(j === 0 ? 0.9 : 0.6, t0 + 3);
          g.gain.setValueAtTime(j === 0 ? 0.9 : 0.6, t1 - 3);
          g.gain.linearRampToValueAtTime(0.0001, t1);
          g.connect(panor((j - 1.5) * 0.25, lp));
          [['sine', 1, 1], ['triangle', 1.0025, 0.3], ['sine', 2.002, 0.12]].forEach(([tipo, mult, vol]) => {
            const o = oc.createOscillator(); o.type = tipo; o.frequency.value = hz(m) * mult;
            const gv = oc.createGain(); gv.gain.value = vol; o.connect(gv); gv.connect(g);
            o.start(t0); o.stop(t1 + 0.05);
          });
        });
      }
    }

    // ----- notas soltas: sino suave ou harpa -----
    if (rec.brilho) {
      const b = rec.brilho;
      let t = entre(0.5, b.cada);
      while (t < dur - 0.5) {
        const m = b.escala[Math.floor(rnd() * b.escala.length)];
        const g = oc.createGain();
        const pico = 0.028 * b.vol * entre(0.7, 1);
        const decai = b.timbre === 'sino' ? 3.5 : 2.2;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.linearRampToValueAtTime(pico, t + (b.timbre === 'sino' ? 0.02 : 0.008));
        g.gain.exponentialRampToValueAtTime(0.0001, t + decai);
        const destino = panor(entre(-0.5, 0.5), g);
        const parciais = b.timbre === 'sino' ? [[1, 1], [2.76, 0.12], [5.4, 0.04]] : [[1, 1], [2, 0.25], [3, 0.08]];
        parciais.forEach(([mult, vol]) => {
          const o = oc.createOscillator(); o.type = 'sine'; o.frequency.value = hz(m) * mult;
          const gv = oc.createGain(); gv.gain.value = vol; o.connect(gv); gv.connect(destino);
          o.start(t); o.stop(t + decai + 0.05);
        });
        g.connect(saida);
        const env = oc.createGain(); env.gain.value = 0.9; g.connect(env); env.connect(conv);
        // às vezes, uma segunda nota responde
        t += rnd() < 0.3 ? entre(0.35, 0.9) : entre(b.cada * 0.6, b.cada * 1.5);
      }
    }

    // ----- vento -----
    if (rec.vento) {
      const n = fonteRuido();
      const bp = oc.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = 0.6;
      const fc = curvaLenta(20, [[7, 13], [11, 19], [17, 29]], 0);
      for (let i = 0; i < fc.length; i++) fc[i] = 260 + fc[i] * 420;
      bp.frequency.setValueCurveAtTime(fc, 0, dur);
      const g = oc.createGain();
      const amp = curvaLenta(20, [[6, 12], [9, 17], [15, 25]], 0.25);
      for (let i = 0; i < amp.length; i++) amp[i] *= 0.16 * rec.vento;
      g.gain.setValueCurveAtTime(amp, 0, dur);
      n.connect(bp); bp.connect(g); g.connect(natureza);
      n.start(0);
    }
    // assobio do vento na torre
    if (rec.assobio) {
      const n = fonteRuido();
      const bp = oc.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = 9;
      const fc = curvaLenta(20, [[9, 15], [13, 21]], 0);
      for (let i = 0; i < fc.length; i++) fc[i] = 700 + fc[i] * 500;
      bp.frequency.setValueCurveAtTime(fc, 0, dur);
      const g = oc.createGain();
      const amp = curvaLenta(20, [[7, 11], [10, 16]], 0);
      for (let i = 0; i < amp.length; i++) amp[i] = Math.pow(amp[i], 2.5) * 0.12 * rec.assobio;
      g.gain.setValueCurveAtTime(amp, 0, dur);
      n.connect(bp); bp.connect(g); g.connect(panor(0.3, natureza));
      n.start(0);
    }
    // ----- folhas ao vento -----
    if (rec.folhas) {
      [-0.45, 0.45].forEach((pan, k) => {
        const n = fonteRuido();
        const hp = oc.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 1300 + k * 400;
        const lp = oc.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 4200;
        const g = oc.createGain();
        const rajada = curvaLenta(60, [[5, 9], [8, 14], [12, 20]], 0);
        let tremor = 0.5;
        for (let i = 0; i < rajada.length; i++) {
          tremor += (rnd() - 0.5) * 0.5; tremor = Math.min(1, Math.max(0, tremor));
          rajada[i] = Math.pow(rajada[i], 2.2) * (0.45 + 0.55 * tremor) * 0.09 * rec.folhas;
        }
        g.gain.setValueCurveAtTime(rajada, 0, dur);
        n.connect(hp); hp.connect(lp); lp.connect(g); g.connect(panor(pan, natureza));
        n.start(0, k * 1.7);
      });
    }

    // ----- marolas no lago -----
    if (rec.agua) {
      const ondas = [];
      let t = entre(0, 1.5);
      while (t < dur) { ondas.push([t, entre(0.6, 1)]); t += entre(2.4, 4.6); }
      const pps = 50, nPts = Math.ceil(dur * pps);
      const env = new Float32Array(nPts);
      for (let i = 0; i < nPts; i++) {
        const tt = i / pps; let v = 0.18;
        ondas.forEach(([t0, a]) => { const d = tt - t0; if (d > 0 && d < 3) v += a * (d < 0.7 ? Math.sin((d / 0.7) * 1.5708) : Math.exp(-(d - 0.7) * 1.6)); });
        env[i] = v;
      }
      [[480, 0.6, 0.2, -0.2], [1100, 1.2, 0.04, 0.25]].forEach(([f, q, vol, pan]) => {
        const n = fonteRuido();
        const fl = oc.createBiquadFilter(); fl.type = f < 1000 ? 'lowpass' : 'bandpass'; fl.frequency.value = f; fl.Q.value = q;
        const g = oc.createGain();
        g.gain.setValueCurveAtTime(env.map((v) => v * vol * rec.agua), 0, dur);
        n.connect(fl); fl.connect(g); g.connect(panor(pan, natureza));
        n.start(0, f < 1000 ? 0 : 2.1);
      });
    }
    // ----- córrego: correnteza e borbulhas -----
    if (rec.corrego) {
      const n = fonteRuido();
      const bp = oc.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 1100; bp.Q.value = 0.5;
      const g = oc.createGain();
      const amp = curvaLenta(30, [[2, 4], [3, 6]], 0.6);
      for (let i = 0; i < amp.length; i++) amp[i] *= 0.1 * rec.corrego;
      g.gain.setValueCurveAtTime(amp, 0, dur);
      n.connect(bp); bp.connect(g); g.connect(panor(-0.3, natureza));
      n.start(0);
      let t = 0.1;
      while (t < dur - 0.2) {
        const o = oc.createOscillator(); o.type = 'sine';
        const f = entre(500, 1300);
        o.frequency.setValueAtTime(f, t); o.frequency.exponentialRampToValueAtTime(f * entre(1.4, 1.9), t + 0.045);
        const gb = oc.createGain();
        gb.gain.setValueAtTime(0.0001, t); gb.gain.linearRampToValueAtTime(0.012 * rec.corrego * entre(0.4, 1), t + 0.006); gb.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);
        o.connect(gb); gb.connect(panor(entre(-0.7, 0.1), natureza));
        o.start(t); o.stop(t + 0.08);
        t += entre(0.08, 0.45);
      }
    }
    // ----- gotas no porão -----
    if (rec.gotas) {
      let t = entre(0.5, 2);
      while (t < dur - 0.3) {
        const o = oc.createOscillator(); o.type = 'sine';
        const f = entre(850, 1500);
        o.frequency.setValueAtTime(f, t); o.frequency.exponentialRampToValueAtTime(f * 2.1, t + 0.035);
        const g = oc.createGain();
        g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.05 * rec.gotas * entre(0.5, 1), t + 0.004); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
        o.connect(g);
        const p = panor(entre(-0.6, 0.6), saida); g.connect(p);
        const e = oc.createGain(); e.gain.value = 1.4; g.connect(e); e.connect(conv);
        o.start(t); o.stop(t + 0.12);
        t += rnd() < 0.25 ? entre(0.25, 0.5) : entre(2.2, 5.5);
      }
    }

    // ----- grilos (céu noturno) -----
    if (rec.grilos) {
      const qtd = rec.grilos > 0.7 ? 3 : 2;
      for (let k = 0; k < qtd; k++) {
        const pps = 500, nPts = Math.ceil(dur * pps), c = new Float32Array(nPts);
        const periodo = entre(0.62, 1.05), pulsos = 2 + Math.floor(rnd() * 3), vol = 0.022 * rec.grilos * entre(0.5, 1) / (k + 1) * (k === 0 ? 1 : 1.6);
        let t = entre(0, periodo);
        while (t < dur) {
          if (rnd() > 0.12) {
            for (let p = 0; p < pulsos; p++) {
              const a = Math.floor((t + p * 0.045) * pps), b = a + Math.floor(0.028 * pps);
              for (let i = a; i < b && i < nPts; i++) c[i] = vol * Math.sin(((i - a) / (b - a)) * Math.PI);
            }
          }
          t += periodo * entre(0.95, 1.05);
        }
        const o = oc.createOscillator(); o.type = 'sine'; o.frequency.value = entre(3900, 4700);
        const o2 = oc.createOscillator(); o2.type = 'sine'; o2.frequency.value = o.frequency.value * 2;
        const g = oc.createGain(); g.gain.setValueCurveAtTime(c, 0, dur);
        const g2 = oc.createGain(); g2.gain.value = 0.06;
        o.connect(g); o2.connect(g2); g2.connect(g);
        g.connect(panor([-0.6, 0.55, -0.1][k], natureza));
        o.start(0); o2.start(0);
      }
    }
    // ----- coruja ao longe -----
    if (rec.coruja) {
      let t = entre(3, 8);
      while (t < dur - 2) {
        [[0, 0.5, 380], [0.75, 0.22, 400], [1.05, 0.6, 370]].forEach(([d, l, f]) => {
          const t0 = t + d;
          const o = oc.createOscillator(); o.type = 'sine';
          o.frequency.setValueAtTime(f, t0); o.frequency.linearRampToValueAtTime(f * 0.93, t0 + l);
          const g = oc.createGain();
          g.gain.setValueAtTime(0.0001, t0); g.gain.linearRampToValueAtTime(0.03 * rec.coruja, t0 + 0.08);
          g.gain.setValueAtTime(0.03 * rec.coruja, t0 + l - 0.12); g.gain.linearRampToValueAtTime(0.0001, t0 + l);
          o.connect(g); g.connect(panor(0.5, natureza));
          const e = oc.createGain(); e.gain.value = 0.8; g.connect(e); e.connect(conv);
          o.start(t0); o.stop(t0 + l + 0.05);
        });
        t += entre(11, 17);
      }
    }

    // ----- pássaros -----
    function assobio(t, notas, pan, vol, harm) {
      const o = oc.createOscillator(); o.type = 'sine';
      const g = oc.createGain(); g.gain.setValueAtTime(0.0001, t);
      let tt = t;
      notas.forEach(([f0, f1, d, pausa]) => {
        o.frequency.setValueAtTime(f0, tt); o.frequency.exponentialRampToValueAtTime(f1, tt + d);
        g.gain.setValueAtTime(0.0001, tt);
        g.gain.linearRampToValueAtTime(vol, tt + Math.min(0.012, d / 3));
        g.gain.setValueAtTime(vol, tt + d * 0.7);
        g.gain.linearRampToValueAtTime(0.0001, tt + d);
        tt += d + pausa;
      });
      const destino = panor(pan, natureza);
      o.connect(g); g.connect(destino);
      const e = oc.createGain(); e.gain.value = 0.25; g.connect(e); e.connect(conv);
      o.start(t); o.stop(tt + 0.05);
      return tt;
    }
    const sabia = (t, pan, vol) => {
      const n = 4 + Math.floor(rnd() * 4), notas = [];
      let f = entre(1900, 2800);
      for (let i = 0; i < n; i++) {
        const f1 = f * entre(0.82, 1.25);
        notas.push([f, f1, entre(0.09, 0.24), entre(0.05, 0.14)]);
        f = Math.min(3600, Math.max(1600, f1 * entre(0.9, 1.15)));
      }
      return assobio(t, notas, pan, vol);
    };
    const pardal = (t, pan, vol, alto) => {
      const n = 3 + Math.floor(rnd() * 6), notas = [], f = entre(alto ? 5200 : 4200, alto ? 6400 : 5200);
      for (let i = 0; i < n; i++) notas.push([f, f * 0.7, 0.04, entre(0.04, 0.08)]);
      return assobio(t, notas, pan, vol * 0.7);
    };
    const rolinha = (t, pan, vol) => {
      const o = oc.createOscillator(); o.type = 'triangle';
      const lp = oc.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 900;
      const g = oc.createGain(); g.gain.setValueAtTime(0.0001, t);
      let tt = t;
      for (let i = 0; i < 2 + Math.floor(rnd() * 2); i++) {
        o.frequency.setValueAtTime(560, tt); o.frequency.linearRampToValueAtTime(500, tt + 0.32);
        g.gain.linearRampToValueAtTime(vol, tt + 0.06); g.gain.setValueAtTime(vol, tt + 0.22); g.gain.linearRampToValueAtTime(0.0001, tt + 0.34);
        tt += 0.55;
      }
      o.connect(lp); lp.connect(g); g.connect(panor(pan, natureza));
      o.start(t); o.stop(tt + 0.05);
      return tt;
    };
    function revoada(nivel, tipos, intervalo) {
      let t = entre(0.3, 2);
      while (t < dur - 2) {
        const tipo = tipos[Math.floor(rnd() * tipos.length)];
        const pan = entre(-0.8, 0.8), vol = 0.05 * nivel * entre(0.35, 1);
        if (tipo === 'sabia') sabia(t, pan, vol);
        else if (tipo === 'pardal') pardal(t, pan, vol, false);
        else if (tipo === 'andorinha') pardal(t, pan, vol, true);
        else rolinha(t, pan, vol * 1.4);
        // às vezes outro pássaro responde do outro lado
        if (rnd() < 0.35 && tipo === 'sabia') sabia(t + entre(1.2, 2.2), -pan, vol * 0.6);
        t += entre(intervalo[0], intervalo[1]) / Math.max(0.4, nivel);
      }
    }
    if (rec.passaros) revoada(rec.passaros, ['sabia', 'sabia', 'pardal'], [2.2, 5]);
    if (rec.andorinhas) revoada(rec.andorinhas, ['andorinha', 'andorinha', 'sabia'], [3, 6]);
    if (rec.rolinhas) revoada(rec.rolinhas, ['rolinha', 'rolinha', 'sabia'], [5, 9]);

    return oc.startRendering().then((buf) => emendar(buf));
  }

  // Emenda sem costura: o começo do laço mistura (com potência igual)
  // o início da síntese com o trecho que vem logo depois do fim.
  function emendar(buf) {
    const L = Math.floor(LACO * TAXA), F = Math.floor(EMENDA * TAXA);
    const canais = [];
    let soma = 0, pico = 0;
    for (let c = 0; c < 2; c++) {
      const d = buf.getChannelData(c), o = new Float32Array(L);
      for (let i = 0; i < L; i++) {
        let v = d[i];
        if (i < F) { const x = i / F; v = d[i] * Math.sin(x * 1.5708) + d[L + i] * Math.cos(x * 1.5708); }
        o[i] = v; soma += v * v; const a = Math.abs(v); if (a > pico) pico = a;
      }
      canais.push(o);
    }
    const rms = Math.sqrt(soma / (2 * L)) || 1e-6;
    const k = Math.min(RMS_ALVO / rms, PICO_MAX / (pico || 1e-6));
    canais.forEach((o) => { for (let i = 0; i < L; i++) o[i] *= k; });
    return canais;
  }

  // ---------- reprodução ----------
  const cache = new Map();   // nome -> Promise<[Float32Array, Float32Array]>
  const MAX_CACHE = 3;       // poupa memória nos celulares
  const M = { nome: null, periodo: null, pendente: null, fonte: null, ganho: null, ped: 0 };

  function obter(nome, periodo) {
    const chave = nome + '|' + periodo;
    if (cache.has(chave)) { const p = cache.get(chave); cache.delete(chave); cache.set(chave, p); return p; }
    const p = sintetizar(nome, periodo).catch((e) => { cache.delete(chave); throw e; });
    cache.set(chave, p);
    while (cache.size > MAX_CACHE) cache.delete(cache.keys().next().value);
    return p;
  }
  function tocar(nome, canais) {
    const ctx = A.contexto();
    const buf = ctx.createBuffer(2, canais[0].length, TAXA);
    buf.getChannelData(0).set(canais[0]); buf.getChannelData(1).set(canais[1]);
    const fonte = ctx.createBufferSource(); fonte.buffer = buf; fonte.loop = true;
    const g = ctx.createGain(); g.gain.value = 0;
    fonte.connect(g); g.connect(A.barramentoMusica());
    const t = ctx.currentTime;
    // começa num ponto diferente a cada vez, para não soar repetitivo
    fonte.start(t + 0.02, Math.random() * LACO);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(1, t + 2.5);
    if (M.fonte) {
      const velha = M.fonte, gv = M.ganho;
      gv.gain.cancelScheduledValues(t); gv.gain.setValueAtTime(gv.gain.value, t); gv.gain.linearRampToValueAtTime(0, t + 2);
      try { velha.stop(t + 2.1); } catch (e) {}
      setTimeout(() => { try { gv.disconnect(); } catch (e) {} }, 2400);
    }
    M.fonte = fonte; M.ganho = g;
    MI.bus.emit('trilha', nome);
  }

  A.musica = function (nome, periodo) {
    nome = R[nome] ? nome : 'mansao';
    periodo = MI.SONS_PERIODO[periodo] ? periodo : (M.periodo || 'dia');
    M.pendente = [nome, periodo];
    const ctx = A.contexto();
    if (!ctx || (M.nome === nome && M.periodo === periodo)) return;
    M.nome = nome; M.periodo = periodo;
    const pedido = ++M.ped;
    obter(nome, periodo).then((canais) => { if (pedido === M.ped) tocar(nome, canais); }).catch((e) => console.error('ambiente', nome, e));
  };
  A.trilhaAtual = () => M.nome;
  A.periodoAtual = () => M.periodo;
  MI.bus.on('audio-pronto', () => { if (M.pendente) { const [n, p] = M.pendente; M.nome = null; A.musica(n, p); } });

  // ganchos para testes e para gerar amostras
  MI._ambientes = R;
  MI._sintetizarAmbiente = (nome, periodo) => sintetizar(nome, periodo || 'dia');
})();
