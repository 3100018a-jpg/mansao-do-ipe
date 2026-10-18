/* =========================================================
   Aurora, dia, entardecer e noite.
   Cada capítulo acontece num período do dia: o céu das janelas,
   a luz dos cômodos, a fachada da mansão e os sons da natureza
   acompanham esse período.
   ========================================================= */
(function () {
  'use strict';
  const MI = window.MI;
  const U = MI.U;

  MI.PERIODOS = {
    aurora: {
      nome: 'Aurora', icone: '🌅', desc: 'o dia amanhece',
      ceu: ['#2e3470', '#7d5f9a', '#e48f86', '#f9c98f'],
      astro: { tipo: 'sol', x: 0.18, y: 0.9, r: 0.075, cor: '#ffe0a8', halo: '#ffb07a' },
      estrelas: 0.3, nuvem: '#f4b7a6', morros: ['#5d5f80', '#47506a'],
      tinta: [['#ff9f8f', 0.07], ['#2c2f6e', 0.12]], luzes: 0.45, vidroBase: '#8d8fa8',
    },
    dia: {
      nome: 'Dia', icone: '☀️', desc: 'sol alto e céu claro',
      ceu: ['#5ea6dc', '#8cc2e6', '#c8e3f1', '#eaf4ef'],
      astro: { tipo: 'sol', x: 0.78, y: 0.2, r: 0.06, cor: '#fff6d4', halo: '#fff2b8' },
      estrelas: 0, nuvem: '#ffffff', morros: ['#7a9a6a', '#4f7a46'],
      tinta: [], luzes: 0, vidroBase: '#8fbf8a',
    },
    entardecer: {
      nome: 'Entardecer', icone: '🌇', desc: 'o sol se põe',
      ceu: ['#2d3a6b', '#b5627a', '#f0a160', '#f9d593'],
      astro: { tipo: 'sol', x: 0.74, y: 0.86, r: 0.085, cor: '#ffd27a', halo: '#ff9a4a' },
      estrelas: 0.12, nuvem: '#f19a82', morros: ['#6a6a5a', '#4a5a40'],
      tinta: [['#ff8a3d', 0.11], ['#3a1a40', 0.07]], luzes: 0.6, vidroBase: '#a08a6a',
    },
    noite: {
      nome: 'Noite', icone: '🌙', desc: 'céu estrelado e luar',
      ceu: ['#060a20', '#0f1a42', '#1f2d5a', '#2f4268'],
      astro: { tipo: 'lua', x: 0.76, y: 0.22, r: 0.05, cor: '#f4f0d8', halo: '#c8d4ff' },
      estrelas: 1, nuvem: '#28335a', morros: ['#1f2c3a', '#16212c'],
      tinta: [['#0b1238', 0.36]], luzes: 1, vidroBase: '#1c2a40',
    },
  };

  // período de cada capítulo: a investigação dura três dias
  // dia 1: hall e píer (dia), escritório (entardecer), biblioteca e laboratório (noite)
  // dia 2: reunião no salão (entardecer) · dia 3: coleta ao amanhecer, mapas, jantar
  MI.PERIODO_CAP = {
    hall: 'dia', pier: 'dia', escritorio: 'entardecer', biblioteca: 'noite', laboratorio: 'noite',
    salao: 'entardecer', horta: 'aurora', mapas: 'dia', jantar: 'noite',
  };
  MI.periodoDe = (capId) => MI.PERIODO_CAP[capId] || 'dia';

  let seq = 0;
  // céu desenhado num retângulo w×h (coordenadas locais).
  // op: { horizonte: fração da altura onde ficam os morros (ou false), astroX, astroY, semente }
  MI.ceuSVG = function (w, h, periodo, op) {
    op = op || {};
    const P = MI.PERIODOS[periodo] || MI.PERIODOS.dia;
    const id = 'gCeuP' + (++seq);
    const rnd = U.semente(op.semente || 17);
    let s = `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${P.ceu.map((c, i) => `<stop offset="${(i / (P.ceu.length - 1)).toFixed(2)}" stop-color="${c}"/>`).join('')}</linearGradient>
      <radialGradient id="${id}h"><stop offset="0" stop-color="${P.astro.halo}" stop-opacity=".55"/><stop offset="1" stop-color="${P.astro.halo}" stop-opacity="0"/></radialGradient></defs>`;
    s += `<rect width="${w}" height="${h}" fill="url(#${id})"/>`;
    // estrelas (algumas cintilam)
    const nEst = Math.round(P.estrelas * (w * h) / 4200);
    for (let i = 0; i < nEst; i++) {
      const x = rnd() * w, y = rnd() * h * 0.75, r = 0.7 + rnd() * 1.6, o = (0.35 + rnd() * 0.65) * Math.min(1, P.estrelas * 1.4);
      s += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(1)}" fill="#fff" opacity="${o.toFixed(2)}">${op.cintilar && i % 7 === 0 ? `<animate attributeName="opacity" values="${o.toFixed(2)};.15;${o.toFixed(2)}" dur="${(2.5 + rnd() * 3).toFixed(1)}s" repeatCount="indefinite"/>` : ''}</circle>`;
    }
    // sol ou lua
    let ayf = op.astroY != null ? op.astroY : P.astro.y;
    if (op.horizonte) ayf = Math.min(ayf, op.horizonte - 0.12);
    const ax = (op.astroX != null ? op.astroX : P.astro.x) * w, ay = ayf * h;
    const ar = P.astro.r * Math.min(w, h * 1.6);
    s += `<circle cx="${ax.toFixed(0)}" cy="${ay.toFixed(0)}" r="${(ar * 3.2).toFixed(0)}" fill="url(#${id}h)"/>`;
    if (P.astro.tipo === 'lua') {
      s += `<circle cx="${ax.toFixed(0)}" cy="${ay.toFixed(0)}" r="${ar.toFixed(1)}" fill="${P.astro.cor}"/>
        <circle cx="${(ax - ar * 0.3).toFixed(1)}" cy="${(ay - ar * 0.2).toFixed(1)}" r="${(ar * 0.18).toFixed(1)}" fill="#d8d2b4" opacity=".7"/>
        <circle cx="${(ax + ar * 0.25).toFixed(1)}" cy="${(ay + ar * 0.3).toFixed(1)}" r="${(ar * 0.12).toFixed(1)}" fill="#d8d2b4" opacity=".6"/>`;
    } else s += `<circle cx="${ax.toFixed(0)}" cy="${ay.toFixed(0)}" r="${ar.toFixed(1)}" fill="${P.astro.cor}"/>`;
    // nuvens
    const nNuv = op.nuvens != null ? op.nuvens : Math.max(1, Math.round(w / 420));
    for (let i = 0; i < nNuv; i++) {
      const x = (i + 0.3 + rnd() * 0.4) * (w / nNuv), y = h * (0.12 + rnd() * 0.3), e = Math.max(0.35, Math.min(1.3, w / 1200)) * (0.7 + rnd() * 0.5);
      s += `<g transform="translate(${x.toFixed(0)} ${y.toFixed(0)}) scale(${e.toFixed(2)})" fill="${P.nuvem}" opacity="${periodo === 'noite' ? 0.55 : 0.85}"><ellipse rx="70" ry="20"/><ellipse cx="-42" cy="7" rx="44" ry="15"/><ellipse cx="44" cy="8" rx="52" ry="15"/><ellipse cx="6" cy="-10" rx="40" ry="16"/></g>`;
    }
    // pássaros voando de dia, morcego ao anoitecer
    if (periodo === 'dia' || periodo === 'aurora') for (let i = 0; i < 3; i++) { const x = w * (0.2 + rnd() * 0.5), y = h * (0.2 + rnd() * 0.25), k = Math.max(0.5, w / 900); s += `<path d="M${x.toFixed(0)} ${y.toFixed(0)} q${(6 * k).toFixed(1)} ${(-6 * k).toFixed(1)} ${(12 * k).toFixed(1)} 0 q${(6 * k).toFixed(1)} ${(-6 * k).toFixed(1)} ${(12 * k).toFixed(1)} 0" stroke="#2b2b3a" stroke-width="${(1.8 * k).toFixed(1)}" fill="none" opacity=".6"/>`; }
    if (op.horizonte) {
      const y0 = h * op.horizonte;
      s += `<path d="M0 ${y0.toFixed(0)} Q${(w * 0.25).toFixed(0)} ${(y0 - h * 0.12).toFixed(0)} ${(w * 0.5).toFixed(0)} ${(y0 - h * 0.03).toFixed(0)} Q${(w * 0.75).toFixed(0)} ${(y0 - h * 0.14).toFixed(0)} ${w} ${(y0 - h * 0.02).toFixed(0)} L${w} ${h} L0 ${h} Z" fill="${P.morros[0]}"/>
        <path d="M0 ${(y0 + h * 0.08).toFixed(0)} Q${(w * 0.3).toFixed(0)} ${(y0 - h * 0.02).toFixed(0)} ${(w * 0.6).toFixed(0)} ${(y0 + h * 0.06).toFixed(0)} Q${(w * 0.85).toFixed(0)} ${y0.toFixed(0)} ${w} ${(y0 + h * 0.05).toFixed(0)} L${w} ${h} L0 ${h} Z" fill="${P.morros[1]}"/>`;
    }
    return s;
  };

  // céu recortado numa forma (janela em arco, óculo...)
  MI.ceuEm = function (forma, x, y, w, h, periodo, op) {
    const id = 'clCeu' + (++seq);
    return `<defs><clipPath id="${id}">${forma}</clipPath></defs><g clip-path="url(#${id})"><svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${MI.ceuSVG(w, h, periodo, op)}</svg></g>`;
  };

  // luz do período sobre o cômodo: véu de cor + lâmpadas e velas acesas
  MI.luzPeriodo = function (periodo, luzes) {
    const P = MI.PERIODOS[periodo] || MI.PERIODOS.dia;
    let s = '';
    P.tinta.forEach(([cor, op]) => { s += `<rect width="1600" height="900" fill="${cor}" opacity="${op}"/>`; });
    if (P.luzes > 0 && luzes && luzes.length) {
      const id = 'gLuzP' + (++seq);
      s += `<defs><radialGradient id="${id}"><stop offset="0" stop-color="#ffe2a0" stop-opacity="${(0.34 * P.luzes).toFixed(2)}"/><stop offset=".45" stop-color="#ffc870" stop-opacity="${(0.16 * P.luzes).toFixed(2)}"/><stop offset="1" stop-color="#ffc870" stop-opacity="0"/></radialGradient></defs>`;
      luzes.forEach(([x, y, r]) => { s += `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#${id})"/>`; });
    }
    return s;
  };

  // desenha bg/fg de uma cena com o período escolhido
  MI.comPeriodo = function (periodo, fn) {
    const D = MI.DESENHO, antes = D.periodo;
    D.periodo = periodo || 'dia';
    try { return fn(); } finally { D.periodo = antes; }
  };
  MI.cenaCompleta = function (cenaId, periodo) {
    const c = MI.CENAS[cenaId];
    return MI.comPeriodo(periodo, () => c.bg() + c.fg()) + MI.luzPeriodo(periodo, c.luzes);
  };
})();
