/* =========================================================
   Cenários dos cômodos (SVG 1600 × 900) e posições dos objetos.
   Cada cena: fundo (bg), objetos (slots) e primeiro plano (fg),
   que esconde parte dos objetos, como nos jogos de objetos ocultos.
   ========================================================= */
(function () {
  'use strict';
  const MI = window.MI;
  const U = MI.U;
  const K = 'stroke="#2b1d12" stroke-width="2" stroke-linejoin="round"';
  const W = 1600, H = 900;

  // ---------- auxiliares de desenho ----------
  const D = (MI.DESENHO = {});

  D.periodo = 'dia';
  const PER = () => (MI.PERIODOS && MI.PERIODOS[D.periodo]) || { ceu: ['#cfe6f2', '#cfe6f2', '#a7cfe0', '#cfe6f2'], vidroBase: '#8fbf8a' };
  D.defs = function () {
    const P = PER();
    return `<defs>
      <linearGradient id="gMadeira" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a5a33"/><stop offset="1" stop-color="#5e3a1f"/></linearGradient>
      <linearGradient id="gMadeiraClara" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b98654"/><stop offset="1" stop-color="#8a5f38"/></linearGradient>
      <linearGradient id="gOuro" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f3d27a"/><stop offset=".5" stop-color="#c99a3a"/><stop offset="1" stop-color="#8e6420"/></linearGradient>
      <linearGradient id="gCortina" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5a1424"/><stop offset=".25" stop-color="#8e2a3c"/><stop offset=".5" stop-color="#5a1424"/><stop offset=".75" stop-color="#8e2a3c"/><stop offset="1" stop-color="#5a1424"/></linearGradient>
      <linearGradient id="gVidroDia" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${P.ceu[1]}"/><stop offset=".6" stop-color="${P.ceu[2]}"/><stop offset="1" stop-color="${P.vidroBase}"/></linearGradient>
      <linearGradient id="gVidroNoite" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${P.ceu[0]}"/><stop offset="1" stop-color="${P.ceu[2]}"/></linearGradient>
      <linearGradient id="gReflexo" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".28"/><stop offset=".35" stop-color="#fff" stop-opacity="0"/><stop offset=".55" stop-color="#fff" stop-opacity=".12"/><stop offset=".62" stop-color="#fff" stop-opacity="0"/></linearGradient>
      <linearGradient id="gSombraPrat" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".55"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>
      <linearGradient id="gSombraTeto" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#140a04" stop-opacity=".45"/><stop offset="1" stop-color="#140a04" stop-opacity="0"/></linearGradient>
      <linearGradient id="gSombraPiso" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#140a04" stop-opacity=".4"/><stop offset="1" stop-color="#140a04" stop-opacity="0"/></linearGradient>
      <linearGradient id="gLombada" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".25" stop-color="#fff" stop-opacity=".05"/><stop offset=".7" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></linearGradient>
      <linearGradient id="gPilastra" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#4a2c16"/><stop offset=".35" stop-color="#9a6a3c"/><stop offset=".65" stop-color="#7a4a24"/><stop offset="1" stop-color="#3a2414"/></linearGradient>
      <linearGradient id="gFundoEstante" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a180c"/><stop offset="1" stop-color="#3e2716"/></linearGradient>
      <pattern id="pTela" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M0 4 L4 0" stroke="#fff" stroke-opacity=".035" stroke-width=".8"/></pattern>
      <pattern id="pVeio" width="160" height="40" patternUnits="userSpaceOnUse"><path d="M0 10 Q40 4 80 12 T160 10 M0 28 Q50 22 100 30 T160 26" stroke="#000" stroke-opacity=".12" stroke-width="2" fill="none"/></pattern>
      <radialGradient id="gLuz" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff2c4" stop-opacity=".55"/><stop offset="1" stop-color="#fff2c4" stop-opacity="0"/></radialGradient>
      <radialGradient id="gVinheta" cx=".5" cy=".45" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#140a04" stop-opacity=".55"/></radialGradient>
      <radialGradient id="gSombra" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".35"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
      <pattern id="pDamasco" width="80" height="100" patternUnits="userSpaceOnUse">
        <path d="M40 8 C52 24 60 34 40 50 C20 34 28 24 40 8 Z M40 50 C54 62 58 78 40 92 C22 78 26 62 40 50 Z" fill="#ffffff" fill-opacity=".07"/>
        <circle cx="0" cy="50" r="5" fill="#ffffff" fill-opacity=".06"/><circle cx="80" cy="50" r="5" fill="#ffffff" fill-opacity=".06"/>
      </pattern>
      <pattern id="pListras" width="44" height="10" patternUnits="userSpaceOnUse"><rect width="22" height="10" fill="#ffffff" fill-opacity=".06"/><rect x="30" width="3" height="10" fill="#ffffff" fill-opacity=".05"/></pattern>
      <pattern id="pTijolo" width="120" height="60" patternUnits="userSpaceOnUse">
        <rect width="120" height="60" fill="#6f7a78"/>
        <g fill="#7d8886" stroke="#4d5654" stroke-width="3"><rect x="2" y="2" width="56" height="26" rx="4"/><rect x="62" y="2" width="56" height="26" rx="4"/><rect x="-28" y="32" width="56" height="26" rx="4"/><rect x="32" y="32" width="56" height="26" rx="4"/><rect x="92" y="32" width="56" height="26" rx="4"/></g>
      </pattern>
      <pattern id="pAzulejo" width="40" height="40" patternUnits="userSpaceOnUse"><rect width="40" height="40" fill="#e9f1ef"/><rect width="40" height="40" fill="none" stroke="#b7c9c5" stroke-width="2"/></pattern>
      <filter id="fSuave"><feGaussianBlur stdDeviation="6"/></filter>
    </defs>`;
  };

  // piso em perspectiva (xadrez ou tábuas)
  D.piso = function (y0, y1, vpx, vpy, op) {
    op = Object.assign({ cols: 16, rows: 7, c1: '#efe6d2', c2: '#2a2522', x0: -500, x1: 2100, tipo: 'xadrez' }, op || {});
    const xs = [];
    for (let j = 0; j <= op.cols; j++) xs.push(op.x0 + ((op.x1 - op.x0) * j) / op.cols);
    const ys = [];
    for (let i = 0; i <= op.rows; i++) ys.push(y0 + (y1 - y0) * Math.pow(i / op.rows, 1.55));
    const xAt = (xb, y) => vpx + ((xb - vpx) * (y - vpy)) / (y1 - vpy);
    let s = `<rect x="0" y="${y0}" width="${W}" height="${y1 - y0}" fill="${op.c1}"/>`;
    if (op.tipo === 'xadrez') {
      for (let i = 0; i < op.rows; i++)
        for (let j = 0; j < op.cols; j++) {
          if ((i + j) % 2) continue;
          const a = ys[i], b = ys[i + 1];
          s += `<path d="M${xAt(xs[j], a).toFixed(1)} ${a.toFixed(1)} L${xAt(xs[j + 1], a).toFixed(1)} ${a.toFixed(1)} L${xAt(xs[j + 1], b).toFixed(1)} ${b.toFixed(1)} L${xAt(xs[j], b).toFixed(1)} ${b.toFixed(1)} Z" fill="${op.c2}"/>`;
        }
    } else {
      const rnd = U.semente(op.seed || 7);
      for (let j = 0; j <= op.cols; j++) s += `<line x1="${xAt(xs[j], y0).toFixed(1)}" y1="${y0}" x2="${xs[j].toFixed(1)}" y2="${y1}" stroke="${op.c2}" stroke-width="2" stroke-opacity=".6"/>`;
      for (let i = 1; i < op.rows; i++)
        for (let j = 0; j < op.cols; j++) {
          if (rnd() < 0.5) continue;
          const y = ys[i];
          s += `<line x1="${xAt(xs[j], y).toFixed(1)}" y1="${y.toFixed(1)}" x2="${xAt(xs[j + 1], y).toFixed(1)}" y2="${y.toFixed(1)}" stroke="${op.c2}" stroke-width="1.5" stroke-opacity=".45"/>`;
        }
    }
    return s;
  };

  // fileira de livros numa prateleira
  D.livros = function (x, y, w, h, seed, paleta) {
    const rnd = U.semente(seed);
    paleta = paleta || ['#7a2335', '#2f5d7a', '#3f6b3c', '#8a5a2f', '#b8902e', '#4a3a6a', '#a8471f', '#1f4a4a', '#6b2a1f', '#2b3a5a', '#5a3a28', '#3a5a4a'];
    const cor = () => paleta[Math.floor(rnd() * paleta.length)];
    let s = '';
    let cx = x;
    while (cx < x + w - 8) {
      const r = rnd();
      // pilha de livros deitados
      if (r < 0.06 && cx + 70 < x + w) {
        let py = y;
        const n = 2 + Math.floor(rnd() * 3);
        for (let i = 0; i < n; i++) {
          const lw = 54 + rnd() * 16, lh = 9 + rnd() * 5, c = cor();
          const lx = cx + (rnd() * 8 - 4);
          s += `<rect x="${lx.toFixed(1)}" y="${(py - lh).toFixed(1)}" width="${lw.toFixed(1)}" height="${lh.toFixed(1)}" rx="1.5" fill="${c}" stroke="#1a120b" stroke-width="1.1"/>`;
          s += `<rect x="${(lx + lw - 6).toFixed(1)}" y="${(py - lh + 1.5).toFixed(1)}" width="5" height="${(lh - 3).toFixed(1)}" fill="#efe2c4" fill-opacity=".85"/>`;
          s += `<rect x="${(lx + 6).toFixed(1)}" y="${(py - lh / 2 - 1).toFixed(1)}" width="${(lw * 0.4).toFixed(1)}" height="2" fill="#e8c46a" fill-opacity=".75"/>`;
          py -= lh;
        }
        cx += 74;
        continue;
      }
      const bw = 9 + rnd() * 14;
      if (cx + bw > x + w) break;
      const bh = h * (0.6 + rnd() * 0.36);
      const c = cor();
      const top = y - bh;
      // livro inclinado
      if (r > 0.94 && cx + 30 < x + w) {
        s += `<g transform="rotate(14 ${(cx + 4).toFixed(1)} ${y})"><rect x="${(cx + 4).toFixed(1)}" y="${top.toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" rx="1.5" fill="${c}" stroke="#1a120b" stroke-width="1.2"/><rect x="${(cx + 4).toFixed(1)}" y="${top.toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" fill="url(#gLombada)"/></g>`;
        cx += bw + 14;
        continue;
      }
      s += `<rect x="${cx.toFixed(1)}" y="${top.toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" rx="1.5" fill="${c}" stroke="#1a120b" stroke-width="1.2"/>`;
      s += `<rect x="${cx.toFixed(1)}" y="${top.toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" rx="1.5" fill="url(#gLombada)"/>`;
      const estilo = rnd();
      if (estilo < 0.35) {
        // encadernação de couro com nervuras
        for (let k = 0; k < 4; k++) { const ny = top + 8 + k * (bh - 16) / 3; s += `<rect x="${(cx + 0.8).toFixed(1)}" y="${ny.toFixed(1)}" width="${(bw - 1.6).toFixed(1)}" height="2.2" fill="#000" fill-opacity=".25"/><rect x="${(cx + 0.8).toFixed(1)}" y="${(ny - 1.2).toFixed(1)}" width="${(bw - 1.6).toFixed(1)}" height="1.2" fill="#e8c46a" fill-opacity=".6"/>`; }
      } else if (estilo < 0.7) {
        // faixas douradas e etiqueta do título
        s += `<rect x="${(cx + 1).toFixed(1)}" y="${(top + 6).toFixed(1)}" width="${(bw - 2).toFixed(1)}" height="2.6" fill="#e8c46a" fill-opacity=".85"/>`;
        s += `<rect x="${(cx + 1).toFixed(1)}" y="${(y - 12).toFixed(1)}" width="${(bw - 2).toFixed(1)}" height="2.4" fill="#e8c46a" fill-opacity=".7"/>`;
        if (bw > 12) s += `<rect x="${(cx + 2.5).toFixed(1)}" y="${(top + bh * 0.28).toFixed(1)}" width="${(bw - 5).toFixed(1)}" height="${(bh * 0.18).toFixed(1)}" rx="1" fill="#1a120b" fill-opacity=".45"/><rect x="${(cx + 4).toFixed(1)}" y="${(top + bh * 0.33).toFixed(1)}" width="${(bw - 8).toFixed(1)}" height="1.6" fill="#e8c46a" fill-opacity=".8"/>`;
      } else {
        // capa de tecido com rótulo claro
        if (bw > 11) s += `<rect x="${(cx + 2).toFixed(1)}" y="${(top + bh * 0.2).toFixed(1)}" width="${(bw - 4).toFixed(1)}" height="${(bh * 0.14).toFixed(1)}" rx="1" fill="#efe2c4" fill-opacity=".85"/><line x1="${(cx + 3.5).toFixed(1)}" y1="${(top + bh * 0.27).toFixed(1)}" x2="${(cx + bw - 3.5).toFixed(1)}" y2="${(top + bh * 0.27).toFixed(1)}" stroke="#3a2a1a" stroke-width="1"/>`;
      }
      cx += bw + 0.6;
    }
    return s;
  };

  D.estante = function (x, y, w, h, prateleiras, seed, op) {
    op = op || {};
    const lado = 16;
    let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#gMadeira)" ${K}/>`;
    // fundo de tábuas verticais
    s += `<rect x="${x + lado}" y="${y + 14}" width="${w - lado * 2}" height="${h - 28}" fill="url(#gFundoEstante)"/>`;
    for (let px = x + lado + 38; px < x + w - lado; px += 38) s += `<line x1="${px}" y1="${y + 14}" x2="${px}" y2="${y + h - 14}" stroke="#1e1108" stroke-width="2" stroke-opacity=".7"/>`;
    const passo = (h - 28) / prateleiras;
    for (let i = 1; i <= prateleiras; i++) {
      const py = y + 14 + passo * i;
      // sombra da prateleira de cima sobre os livros
      s += `<rect x="${x + lado}" y="${(py - passo + 6).toFixed(1)}" width="${w - lado * 2}" height="${Math.min(26, passo * 0.3).toFixed(1)}" fill="url(#gSombraPrat)"/>`;
      if (!(op.vazias || []).includes(i)) s += D.livros(x + lado + 4 + (op.recuo && op.recuo[i] ? op.recuo[i] : 0), py - 6, w - lado * 2 - 8 - (op.corte && op.corte[i] ? op.corte[i] : 0), passo - 14, seed + i * 31);
      s += `<rect x="${x + 8}" y="${(py - 6).toFixed(1)}" width="${w - 16}" height="13" fill="#6e4524" stroke="#2b1d12" stroke-width="1.5"/>`;
      s += `<rect x="${x + 9}" y="${(py - 5).toFixed(1)}" width="${w - 18}" height="2.5" fill="#b07a48" fill-opacity=".7"/>`;
    }
    // laterais com caneluras
    [x, x + w - lado].forEach((lx) => {
      s += `<rect x="${lx}" y="${y}" width="${lado}" height="${h}" fill="url(#gPilastra)" stroke="#2b1d12" stroke-width="1.5"/>`;
      s += `<line x1="${lx + 5}" y1="${y + 30}" x2="${lx + 5}" y2="${y + h - 40}" stroke="#2b1d12" stroke-opacity=".5" stroke-width="1.5"/><line x1="${lx + 11}" y1="${y + 30}" x2="${lx + 11}" y2="${y + h - 40}" stroke="#2b1d12" stroke-opacity=".5" stroke-width="1.5"/>`;
    });
    // cornija com dentículos e rodapé
    s += `<rect x="${x - 8}" y="${y - 16}" width="${w + 16}" height="22" fill="#6e4524" ${K}/><rect x="${x - 14}" y="${y - 28}" width="${w + 28}" height="14" fill="#7a4e2a" ${K}/>`;
    s += `<rect x="${x - 13}" y="${y - 27}" width="${w + 26}" height="3" fill="#c08850" fill-opacity=".6"/>`;
    for (let dx = x - 2; dx < x + w + 2; dx += 16) s += `<rect x="${dx}" y="${y - 12}" width="8" height="8" fill="#5a3a1c"/>`;
    s += `<rect x="${x - 4}" y="${y + h - 16}" width="${w + 8}" height="18" fill="#5a3a1c" ${K}/>`;
    return s;
  };

  // quadro com moldura entalhada, passe-partout, textura de tela e reflexo
  D.quadro = function (x, y, w, h, conteudo, moldura, op) {
    op = op || {};
    const m = Math.max(10, Math.min(18, Math.min(w, h) * 0.09));
    const ouro = !moldura || moldura.indexOf('gOuro') >= 0;
    const X0 = x - m, Y0 = y - m, X1 = x + w + m, Y1 = y + h + m;
    let s = '';
    // fio, prego e sombra na parede
    if (!op.semFio) s += `<path d="M${x + w * 0.22} ${Y0 + 2} L${x + w / 2} ${Y0 - 30} L${x + w * 0.78} ${Y0 + 2}" stroke="#3a2a1a" stroke-width="1.6" fill="none"/><circle cx="${x + w / 2}" cy="${Y0 - 30}" r="3.5" fill="#c99a3a" stroke="#2b1d12" stroke-width="1"/>`;
    s += `<rect x="${X0 + 7}" y="${Y0 + 9}" width="${w + 2 * m}" height="${h + 2 * m}" fill="#000" opacity=".28"/>`;
    s += `<rect x="${X0}" y="${Y0}" width="${w + 2 * m}" height="${h + 2 * m}" fill="${moldura || 'url(#gOuro)'}" ${K}/>`;
    // chanfro: luz no alto e à esquerda, sombra embaixo e à direita
    s += `<path d="M${X0} ${Y0} L${X1} ${Y0} L${X1 - m} ${Y0 + m} L${X0 + m} ${Y0 + m} L${X0 + m} ${Y1 - m} L${X0} ${Y1} Z" fill="#fff" opacity=".2"/>`;
    s += `<path d="M${X1} ${Y1} L${X0} ${Y1} L${X0 + m} ${Y1 - m} L${X1 - m} ${Y1 - m} L${X1 - m} ${Y0 + m} L${X1} ${Y0} Z" fill="#000" opacity=".22"/>`;
    s += `<rect x="${X0 + m * 0.42}" y="${Y0 + m * 0.42}" width="${w + m * 1.16}" height="${h + m * 1.16}" fill="none" stroke="#2b1d12" stroke-opacity=".55" stroke-width="1.6"/>`;
    s += `<rect x="${X0 + m * 0.42 + 2}" y="${Y0 + m * 0.42 + 2}" width="${w + m * 1.16 - 4}" height="${h + m * 1.16 - 4}" fill="none" stroke="#fff" stroke-opacity=".25" stroke-width="1"/>`;
    // ornamentos nos cantos
    if (ouro) [[X0, Y0], [X1, Y0], [X0, Y1], [X1, Y1]].forEach(([cx, cy]) => {
      const dx = cx === X0 ? m * 0.5 : -m * 0.5, dy = cy === Y0 ? m * 0.5 : -m * 0.5;
      s += `<circle cx="${cx + dx}" cy="${cy + dy}" r="${m * 0.42}" fill="#f6dc8a" stroke="#8e6420" stroke-width="1.4"/><circle cx="${cx + dx}" cy="${cy + dy}" r="${m * 0.16}" fill="#8e6420"/>`;
    });
    else [[X0, Y0], [X1, Y0], [X0, Y1], [X1, Y1]].forEach(([cx, cy]) => { s += `<rect x="${cx + (cx === X0 ? 2 : -m + 2)}" y="${cy + (cy === Y0 ? 2 : -m + 2)}" width="${m - 4}" height="${m - 4}" fill="none" stroke="#2b1d12" stroke-opacity=".4"/>`; });
    // filete escuro (passe-partout) e a pintura
    s += `<rect x="${x - 4}" y="${y - 4}" width="${w + 8}" height="${h + 8}" fill="#3a2414"/>`;
    s += `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">${conteudo}<rect width="${w}" height="${h}" fill="url(#pTela)"/></svg>`;
    // verniz: reflexo diagonal e sombra interna
    s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#gReflexo)"/>`;
    s += `<rect x="${x}" y="${y}" width="${w}" height="${Math.min(14, h * 0.08)}" fill="#000" opacity=".18"/>`;
    // placa com o título
    if (op.placa) s += `<rect x="${x + w / 2 - 50}" y="${Y1 + 8}" width="100" height="18" rx="3" fill="url(#gOuro)" ${K}/><text x="${x + w / 2}" y="${Y1 + 21}" font-size="10.5" text-anchor="middle" font-family="Georgia,serif" fill="#3a2414">${op.placa}</text>`;
    return s;
  };

  // feixe de luz entrando por uma janela (cor conforme o período)
  D.feixe = function (pontos) {
    const P = { aurora: ['#ffc0a0', 0.14], dia: ['#fff6d8', 0.13], entardecer: ['#ffb060', 0.2], noite: ['#bcd0ff', 0.05] }[D.periodo] || ['#fff6d8', 0.12];
    const id = 'gFeixe' + Math.floor(Math.random() * 1e6);
    const ys = pontos.map((p) => p[1]);
    return `<defs><linearGradient id="${id}" x1="0" y1="${Math.min(...ys)}" x2="0" y2="${Math.max(...ys)}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${P[0]}" stop-opacity="${P[1]}"/><stop offset="1" stop-color="${P[0]}" stop-opacity="0"/></linearGradient></defs><path d="M${pontos.map((p) => p.join(' ')).join(' L')} Z" fill="url(#${id})"/>`;
  };
  // sombras de canto: junto ao teto e ao piso dão profundidade ao cômodo
  D.cantos = (yTeto, yPiso) => `<rect y="${yTeto}" width="${W}" height="70" fill="url(#gSombraTeto)"/><rect y="${yPiso - 60}" width="${W}" height="60" fill="url(#gSombraPiso)"/>`;
  // céu visto por uma janela retangular, com morros ao longe
  D.vista = (x, y, w, h, op) => (MI.ceuSVG ? `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${MI.ceuSVG(w, h, D.periodo, Object.assign({ horizonte: 0.62, nuvens: 1 }, op || {}))}</svg>` : '');

  D.lustre = function (cx, y, esc) {
    esc = esc || 1;
    const braco = (dx) => `<path d="M0 60 Q${dx * 0.6} 70 ${dx} 46" fill="none" stroke="url(#gOuro)" stroke-width="5"/><rect x="${dx - 5}" y="30" width="10" height="16" fill="#fbf3dc"/><path d="M${dx} 18 Q${dx - 6} 26 ${dx} 30 Q${dx + 6} 26 ${dx} 18 Z" fill="#ffcf5a"/><circle cx="${dx}" cy="24" r="22" fill="url(#gLuz)"/>`;
    return `<g transform="translate(${cx} ${y}) scale(${esc})">
      <line x1="0" y1="-200" x2="0" y2="40" stroke="#5a3a1c" stroke-width="3"/>
      <circle cx="0" cy="0" r="160" fill="url(#gLuz)"/>
      ${[-110, -66, -22, 22, 66, 110].map(braco).join('')}
      <ellipse cx="0" cy="60" rx="34" ry="14" fill="url(#gOuro)" stroke="#5a3a1c" stroke-width="2"/>
      ${[-24, -8, 8, 24].map((dx) => `<path d="M${dx} 70 L${dx - 3} 96 L${dx} 104 L${dx + 3} 96 Z" fill="#dff1fb" fill-opacity=".8" stroke="#9fb8c4" stroke-width="1"/>`).join('')}
    </g>`;
  };

  D.planta = function (x, y, esc, seed, vira) {
    const rnd = U.semente(seed || 3);
    let folhas = '';
    for (let i = 0; i < 9; i++) {
      const a = -150 + i * 15 + rnd() * 10;
      const len = 150 + rnd() * 90;
      const rad = (a * Math.PI) / 180;
      const ex = Math.cos(rad) * len, ey = Math.sin(rad) * len;
      const cor = ['#2f6b3a', '#3c8248', '#265a30', '#4a9152'][i % 4];
      folhas += `<path d="M0 0 Q${(ex * 0.4 - ey * 0.25).toFixed(0)} ${(ey * 0.4 + ex * 0.25).toFixed(0)} ${ex.toFixed(0)} ${ey.toFixed(0)} Q${(ex * 0.55 + ey * 0.2).toFixed(0)} ${(ey * 0.55 - ex * 0.2).toFixed(0)} 0 0 Z" fill="${cor}" stroke="#173a1e" stroke-width="2"/>`;
      folhas += `<path d="M0 0 L${(ex * 0.9).toFixed(0)} ${(ey * 0.9).toFixed(0)}" stroke="#173a1e" stroke-width="1.4" opacity=".6"/>`;
    }
    return `<g transform="translate(${x} ${y}) scale(${vira ? -esc : esc} ${esc})">
      <g transform="translate(0 -70)">${folhas}</g>
      <path d="M-60 -70 L60 -70 L46 40 L-46 40 Z" fill="#a8562c" ${K}/>
      <rect x="-68" y="-86" width="136" height="22" rx="4" fill="#c06a36" ${K}/>
      <path d="M-50 -30 L50 -30" stroke="#7a3a18" stroke-width="3"/>
    </g>`;
  };

  D.cortina = function (x, y, w, h, lado) {
    const dir = lado === 'dir' ? -1 : 1;
    const x2 = x + w;
    return `<path d="M${x} ${y} L${x2} ${y} Q${x2 - dir * 10} ${y + h * 0.4} ${dir > 0 ? x + w * 0.45 : x + w * 0.55} ${y + h * 0.55} Q${dir > 0 ? x + w * 0.8 : x + w * 0.2} ${y + h * 0.75} ${dir > 0 ? x + w * 0.7 : x + w * 0.3} ${y + h} L${dir > 0 ? x : x2} ${y + h} Z" fill="url(#gCortina)" ${K}/>
      ${[0.22, 0.5, 0.78].map((f) => { const xt = x + w * f, xb = dir > 0 ? x + w * f * 0.7 : x2 - w * (1 - f) * 0.7; return `<path d="M${xt.toFixed(0)} ${y + 4} Q${(xt + (xb - xt) * 0.3).toFixed(0)} ${(y + h * 0.35).toFixed(0)} ${(x + w / 2 + (xt - x - w / 2) * 0.3).toFixed(0)} ${(y + h * 0.52).toFixed(0)} M${(x + w / 2 + (xt - x - w / 2) * 0.3).toFixed(0)} ${(y + h * 0.56).toFixed(0)} Q${((xt + xb) / 2).toFixed(0)} ${(y + h * 0.8).toFixed(0)} ${xb.toFixed(0)} ${y + h - 2}" stroke="#2a0810" stroke-opacity=".35" stroke-width="2.5" fill="none"/>`; }).join('')}
      <path d="M${x} ${y} L${x2} ${y} L${x2} ${y + 14} L${x} ${y + 14} Z" fill="#4a0f1c" opacity=".55"/>
      <path d="M${dir > 0 ? x + w * 0.42 : x + w * 0.58} ${y + h * 0.5} q${dir * 20} 14 ${dir * 30} 4" stroke="url(#gOuro)" stroke-width="7" fill="none"/>
      <path d="M${dir > 0 ? x + w * 0.42 + dir * 30 : x + w * 0.58 + dir * 30} ${y + h * 0.5 + 4} l${dir * 4} 26 l${dir * -8} 0 Z" fill="url(#gOuro)" stroke="#5a3a1c" stroke-width="1"/>`;
  };

  // sombra suave sob objetos apoiados
  D.sombra = (x, y, rx, ry) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry || rx * 0.22}" fill="url(#gSombra)"/>`;

  // ---------- retrato pendurado (pai de Dona Helena) ----------
  const retratoAntigo = (w, h) => `<defs><radialGradient id="gFundoRet" cx=".45" cy=".35" r=".8"><stop offset="0" stop-color="#6a5a40"/><stop offset="1" stop-color="#241c14"/></radialGradient></defs>
    <rect width="${w}" height="${h}" fill="url(#gFundoRet)"/>
    <path d="M0 0 L${w * 0.32} 0 Q${w * 0.2} ${h * 0.5} ${w * 0.3} ${h} L0 ${h} Z" fill="#5a1c24" opacity=".75"/>
    <path d="M${w * 0.12} 0 Q${w * 0.06} ${h * 0.5} ${w * 0.14} ${h}" stroke="#3a0e16" stroke-width="3" fill="none" opacity=".6"/>
    <path d="M${w * 0.06} ${h} Q${w * 0.12} ${h * 0.7} ${w * 0.32} ${h * 0.64} L${w * 0.68} ${h * 0.64} Q${w * 0.88} ${h * 0.7} ${w * 0.94} ${h} Z" fill="#1f1a16"/>
    <path d="M${w * 0.4} ${h * 0.64} L${w / 2} ${h * 0.86} L${w * 0.6} ${h * 0.64} Z" fill="#efe6d2"/>
    <path d="M${w * 0.46} ${h * 0.66} L${w / 2} ${h * 0.74} L${w * 0.54} ${h * 0.66} L${w / 2} ${h * 0.7} Z" fill="#5a1c24"/>
    <path d="M${w * 0.32} ${h * 0.66} L${w * 0.44} ${h * 0.9} M${w * 0.68} ${h * 0.66} L${w * 0.56} ${h * 0.9}" stroke="#0e0b09" stroke-width="2"/>
    <circle cx="${w * 0.62}" cy="${h * 0.8}" r="2.5" fill="#c99a3a"/><path d="M${w * 0.62} ${h * 0.8} Q${w * 0.7} ${h * 0.84} ${w * 0.66} ${h * 0.9}" stroke="#c99a3a" stroke-width="1.4" fill="none"/>
    <rect x="${w * 0.44}" y="${h * 0.54}" width="${w * 0.12}" height="${h * 0.1}" fill="#c9a07c"/>
    <ellipse cx="${w / 2}" cy="${h * 0.42}" rx="${w * 0.17}" ry="${h * 0.16}" fill="#d9b08c"/>
    <ellipse cx="${w * 0.45}" cy="${h * 0.38}" rx="${w * 0.07}" ry="${h * 0.07}" fill="#f0cfa8" opacity=".55"/>
    <path d="M${w * 0.33} ${h * 0.38} Q${w * 0.34} ${h * 0.2} ${w / 2} ${h * 0.21} Q${w * 0.66} ${h * 0.2} ${w * 0.67} ${h * 0.38} Q${w * 0.62} ${h * 0.28} ${w / 2} ${h * 0.29} Q${w * 0.38} ${h * 0.28} ${w * 0.33} ${h * 0.38} Z" fill="#cfcac2"/>
    <path d="M${w * 0.38} ${h * 0.36} L${w * 0.47} ${h * 0.35} M${w * 0.53} ${h * 0.35} L${w * 0.62} ${h * 0.36}" stroke="#8a8278" stroke-width="2.5"/>
    <path d="M${w * 0.42} ${h * 0.5} Q${w / 2} ${h * 0.46} ${w * 0.58} ${h * 0.5} Q${w / 2} ${h * 0.49} ${w * 0.42} ${h * 0.5} Z" stroke="#8a8278" stroke-width="4" fill="#8a8278"/>
    <path d="M${w / 2} ${h * 0.4} L${w * 0.48} ${h * 0.46} L${w * 0.52} ${h * 0.46}" stroke="#a8805c" stroke-width="1.5" fill="none"/>
    <circle cx="${w * 0.44}" cy="${h * 0.4}" r="2.6" fill="#2b1d12"/><circle cx="${w * 0.56}" cy="${h * 0.4}" r="2.6" fill="#2b1d12"/>
    <circle cx="${w * 0.445}" cy="${h * 0.395}" r=".9" fill="#fff"/><circle cx="${w * 0.565}" cy="${h * 0.395}" r=".9" fill="#fff"/>
    <rect width="${w}" height="${h}" fill="url(#gVinheta)"/>`;

  const paisagemLago = (w, h, verde) => {
    const P = PER();
    let s = MI.ceuSVG ? MI.ceuSVG(w, h, D.periodo, { horizonte: 0.52, nuvens: 1, astroX: 0.78 }) : `<rect width="${w}" height="${h}" fill="#f2d9a8"/>`;
    s += `<rect y="${h * 0.6}" width="${w}" height="${h * 0.4}" fill="${verde ? '#6f9a5a' : '#6fa8c9'}"/>
      <path d="M${w * 0.1} ${h * 0.72} L${w * 0.25} ${h * 0.72} M${w * 0.5} ${h * 0.84} L${w * 0.7} ${h * 0.84}" stroke="#fff" stroke-opacity=".45" stroke-width="3"/>`;
    (P.tinta || []).forEach(([cor, op]) => { s += `<rect y="${h * 0.6}" width="${w}" height="${h * 0.4}" fill="${cor}" opacity="${op}"/>`; });
    return s;
  };

  // =========================================================
  // CENA 1 — HALL DE ENTRADA
  // =========================================================
  function hallBg() {
    let s = D.defs();
    s += `<rect width="${W}" height="${H}" fill="#24413a"/><rect width="${W}" height="640" fill="url(#pDamasco)"/>`;
    // sanca
    s += `<rect width="${W}" height="46" fill="#e9dcc0"/><rect y="40" width="${W}" height="10" fill="url(#gOuro)"/>`;
    // lambri
    s += `<rect y="470" width="${W}" height="175" fill="url(#gMadeira)" ${K}/>`;
    for (let x = 20; x < W; x += 150) s += `<rect x="${x}" y="492" width="126" height="128" rx="4" fill="none" stroke="#3a2414" stroke-width="3"/>`;
    s += `<rect y="462" width="${W}" height="14" fill="#6e4524" ${K}/>`;
    // piso de mármore
    s += D.piso(640, 900, 800, 250, { cols: 18, rows: 6, c1: '#efe6d2', c2: '#2c2724' });
    s += `<rect y="636" width="${W}" height="10" fill="#3a2414"/>`;
    // porta principal em arco
    s += `<path d="M630 640 L630 260 Q630 140 800 140 Q970 140 970 260 L970 640 Z" fill="#4a2c16" ${K}/>
      <path d="M660 250 Q660 168 800 168 Q940 168 940 250 Z" fill="url(#gVidroDia)" ${K}/>
      ${[0, 1, 2, 3, 4].map((i) => `<line x1="800" y1="250" x2="${660 + i * 70}" y2="${i === 0 || i === 4 ? 250 : 180}" stroke="#4a2c16" stroke-width="5"/>`).join('')}
      <rect x="660" y="262" width="132" height="370" fill="#6b4022" ${K}/><rect x="808" y="262" width="132" height="370" fill="#6b4022" ${K}/>
      <rect x="680" y="284" width="92" height="170" fill="url(#gVidroDia)" ${K}/><rect x="828" y="284" width="92" height="170" fill="url(#gVidroDia)" ${K}/>
      <path d="M680 400 Q720 360 772 392 L772 454 L680 454 Z M828 392 Q880 360 920 400 L920 454 L828 454 Z" fill="#6f9a5a" opacity=".85"/>
      <rect x="680" y="474" width="92" height="140" fill="none" stroke="#3a2414" stroke-width="3"/><rect x="828" y="474" width="92" height="140" fill="none" stroke="#3a2414" stroke-width="3"/>
      <circle cx="782" cy="470" r="7" fill="url(#gOuro)" ${K}/><circle cx="818" cy="470" r="7" fill="url(#gOuro)" ${K}/>`;
    // retrato
    s += D.quadro(300, 140, 170, 220, retratoAntigo(170, 220));
    s += `<rect x="330" y="372" width="110" height="20" rx="3" fill="url(#gOuro)" ${K}/><text x="385" y="386" font-size="11" text-anchor="middle" font-family="serif" fill="#3a2414">A. Ipê · 1928</text>`;
    // espelho e aparador
    s += `<ellipse cx="490" cy="420" rx="70" ry="40" fill="url(#gOuro)" ${K}/><ellipse cx="490" cy="420" rx="58" ry="30" fill="#b9d3d8" opacity=".8"/>`;
    s += `<rect x="370" y="505" width="240" height="24" rx="4" fill="#7a4a24" ${K}/><rect x="384" y="529" width="212" height="34" fill="#5e3a1f" ${K}/>
      <path d="M392 563 L384 640 M588 563 L596 640" stroke="#3a2414" stroke-width="9" stroke-linecap="round"/>`;
    // cabideiro
    s += `<rect x="176" y="210" width="12" height="430" fill="#4a2c16" ${K}/>
      <path d="M182 230 Q150 226 140 250 M182 230 Q214 226 224 250 M182 270 Q156 268 148 290 M182 270 Q208 268 216 290" stroke="#4a2c16" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M140 640 L182 600 L224 640" stroke="#4a2c16" stroke-width="10" fill="none" stroke-linecap="round"/>
      <path d="M150 300 Q120 330 130 470 L230 470 Q240 330 214 300 Q182 290 150 300 Z" fill="#5a4a7a" ${K}/>
      <path d="M182 300 L182 470" stroke="#3f3460" stroke-width="3"/>`;
    // porta-guarda-chuva
    s += `<path d="M196 548 L250 548 L244 640 L202 640 Z" fill="#2f5d7a" ${K}/><ellipse cx="223" cy="548" rx="27" ry="7" fill="#24485f" ${K}/>`;
    // relógio de pé
    s += `<rect x="986" y="250" width="70" height="390" fill="url(#gMadeira)" ${K}/>
      <path d="M980 250 Q1021 204 1062 250 Z" fill="#6e4524" ${K}/>
      <circle cx="1021" cy="300" r="28" fill="#fbf3dc" ${K}/><line x1="1021" y1="300" x2="1021" y2="282" stroke="#2b1d12" stroke-width="3"/><line x1="1021" y1="300" x2="1034" y2="306" stroke="#2b1d12" stroke-width="2.4"/>
      <rect x="998" y="350" width="46" height="180" rx="4" fill="#2a1a0e" ${K}/><line x1="1021" y1="356" x2="1021" y2="480" stroke="url(#gOuro)" stroke-width="3"/><circle cx="1021" cy="486" r="14" fill="url(#gOuro)" ${K}/>
      <rect x="980" y="560" width="82" height="80" fill="#5e3a1f" ${K}/>`;
    // escadaria
    let deg = '';
    for (let i = 0; i < 9; i++) {
      const x0 = 1080 + i * 58, y0 = 640 - i * 46;
      deg += `<path d="M${x0} ${y0} L${W} ${y0} L${W} ${y0 - 46} L${x0 + 58} ${y0 - 46} Z" fill="${i % 2 ? '#7a4a24' : '#83522a'}" stroke="#2b1d12" stroke-width="1.6"/>`;
      deg += `<path d="M${x0 + 20} ${y0} L${x0 + 160} ${y0} L${x0 + 196} ${y0 - 46} L${x0 + 78} ${y0 - 46} Z" fill="#8e2a3c" opacity=".9"/>`;
      deg += `<rect x="${x0}" y="${y0 - 8}" width="${W - x0}" height="8" fill="#4a2c16" opacity=".55"/>`;
    }
    s += `<path d="M1080 640 L1600 226 L1600 640 Z" fill="#3a2414"/>` + deg;
    s += D.feixe([[680, 300], [920, 300], [1090, 900], [520, 900]]);
    s += D.cantos(50, 640);
    // tapete
    s += `<ellipse cx="800" cy="770" rx="330" ry="80" fill="#7a2335" ${K}/><ellipse cx="800" cy="770" rx="290" ry="62" fill="none" stroke="#e2bd5a" stroke-width="4"/><ellipse cx="800" cy="770" rx="150" ry="30" fill="#5a1626" stroke="#e2bd5a" stroke-width="3"/>`;
    // pedestal com vaso
    s += `<rect x="1098" y="470" width="44" height="170" fill="#e9dcc0" ${K}/><rect x="1086" y="458" width="68" height="16" fill="#d8c9a8" ${K}/><rect x="1086" y="626" width="68" height="16" fill="#d8c9a8" ${K}/>`;
    s += D.lustre(800, 30, 0.9);
    return s;
  }
  function hallFg() {
    let s = '';
    // corrimão e balaústres da escada (escondem objetos nos degraus)
    let bal = '';
    for (let i = 0; i < 18; i++) {
      const x = 1092 + i * 29, y = 632 - i * 23;
      bal += `<rect x="${x}" y="${y - 120}" width="9" height="120" rx="3" fill="#5e3a1f" stroke="#2b1d12" stroke-width="1.5"/>`;
    }
    s += bal + `<path d="M1076 510 L1610 86" stroke="#4a2c16" stroke-width="16" stroke-linecap="round"/><path d="M1076 510 L1610 86" stroke="#7a4a24" stroke-width="8" stroke-linecap="round"/>
      <rect x="1062" y="480" width="34" height="164" fill="#4a2c16" ${K}/><circle cx="1079" cy="470" r="18" fill="url(#gOuro)" ${K}/>`;
    s += D.planta(80, 840, 1.15, 5);
    s += D.planta(1540, 860, 1.0, 9, true);
    s += `<rect width="${W}" height="${H}" fill="url(#gVinheta)" pointer-events="none"/>`;
    return s;
  }

  // =========================================================
  // CENA 2 — VARANDA E PÍER (campo)
  // =========================================================
  function pierBg() {
    let s = D.defs();
    s += `<linearGradient id="gCeu" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fc9e4"/><stop offset=".7" stop-color="#f6dcae"/><stop offset="1" stop-color="#f3c78e"/></linearGradient>
      <linearGradient id="gLago" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#86a868"/><stop offset=".5" stop-color="#5f8a4c"/><stop offset="1" stop-color="#3f6a3a"/></linearGradient>`;
    s += `<rect width="${W}" height="420" fill="url(#gCeu)"/>${D.vista(0, 0, W, 420, { horizonte: false, nuvens: 3, astroX: 0.74 })}
      <path d="M0 340 Q200 260 420 320 Q640 250 860 312 Q1100 240 1300 300 Q1460 260 1600 300 L1600 420 L0 420 Z" fill="#7a9a6a"/>
      <path d="M0 380 Q240 320 480 370 Q760 320 1000 372 Q1260 330 1600 360 L1600 420 L0 420 Z" fill="#4f7a46"/>`;
    // árvores distantes
    for (let i = 0; i < 22; i++) {
      const x = 380 + i * 58 + (i % 3) * 7, y = 372 - (i % 4) * 6;
      s += `<ellipse cx="${x}" cy="${y}" rx="${30 + (i % 3) * 6}" ry="${38 + (i % 2) * 8}" fill="${i % 2 ? '#3f6b3c' : '#4a7a45'}"/>`;
    }
    // lago
    s += `<rect y="408" width="${W}" height="${H - 408}" fill="url(#gLago)"/>`;
    const rnd = U.semente(41);
    for (let i = 0; i < 26; i++) s += `<ellipse cx="${(600 + rnd() * 1000).toFixed(0)}" cy="${(440 + rnd() * 440).toFixed(0)}" rx="${(30 + rnd() * 90).toFixed(0)}" ry="${(6 + rnd() * 14).toFixed(0)}" fill="#a3b84a" fill-opacity="${(0.18 + rnd() * 0.25).toFixed(2)}"/>`;
    for (let i = 0; i < 18; i++) s += `<path d="M${(560 + rnd() * 1040).toFixed(0)} ${(430 + rnd() * 450).toFixed(0)} q20 -5 40 0" stroke="#e9f2d0" stroke-opacity=".45" stroke-width="2.5" fill="none"/>`;
    // vitórias-régias / aguapés
    [[1220, 720], [1320, 640], [1150, 820], [1460, 760], [980, 860]].forEach(([x, y], i) => {
      s += `<path d="M${x} ${y} m-38 0 a38 13 0 1 0 76 0 a38 13 0 1 0 -76 0 Z M${x} ${y} L${x + 36} ${y - 5}" fill="#4f8a3a" stroke="#2b4d20" stroke-width="2"/>`;
      if (i % 2 === 0) s += `<circle cx="${x - 10}" cy="${y - 8}" r="7" fill="#f2b8c8" stroke="#a3577a" stroke-width="1.5"/>`;
    });
    // barco amarrado
    s += `<path d="M1120 600 Q1200 640 1320 600 L1300 580 L1140 580 Z" fill="#8a4a24" ${K}/><path d="M1140 584 L1300 584" stroke="#e9dcc0" stroke-width="4"/><path d="M1124 596 Q1100 560 1060 540" stroke="#c9b48a" stroke-width="2" fill="none"/>`;
    // píer (perspectiva)
    s += `<path d="M540 900 L760 900 L1110 536 L1010 536 Z" fill="#9a6a3c" ${K}/>`;
    for (let i = 0; i < 22; i++) {
      const t = i / 22, t2 = (i + 1) / 22;
      const yA = 900 - (900 - 536) * Math.pow(t, 0.8), yB = 900 - (900 - 536) * Math.pow(t2, 0.8);
      const xl = (y) => 540 + (1010 - 540) * ((900 - y) / 364), xr = (y) => 760 + (1110 - 760) * ((900 - y) / 364);
      s += `<path d="M${xl(yA).toFixed(0)} ${yA.toFixed(0)} L${xr(yA).toFixed(0)} ${yA.toFixed(0)} L${xr(yB).toFixed(0)} ${yB.toFixed(0)} L${xl(yB).toFixed(0)} ${yB.toFixed(0)} Z" fill="${i % 2 ? '#a8774a' : '#9a6a3c'}" stroke="#5a3a1c" stroke-width="1.2"/>`;
    }
    [[600, 880], [760, 880], [860, 700], [960, 700], [1000, 600], [1100, 600]].forEach(([x, y], i) => {
      s += `<rect x="${x - (i < 2 ? 10 : 7)}" y="${y - (i < 2 ? 40 : 26)}" width="${i < 2 ? 20 : 14}" height="${i < 2 ? 70 : 48}" fill="#6b4322" ${K}/>`;
    });
    // varanda (deck + teto)
    s += D.piso(600, 900, 300, 300, { tipo: 'tabuas', cols: 12, rows: 6, c1: '#b98654', c2: '#6b4322', x0: -600, x1: 1000, seed: 3 }).replace(`<rect x="0" y="600" width="${W}" height="300"`, `<rect x="0" y="600" width="640" height="300"`);
    s += `<path d="M640 600 L560 900" stroke="#5a3a1c" stroke-width="4"/>`;
    s += `<rect x="0" y="0" width="660" height="70" fill="#e9dcc0" ${K}/><path d="M0 70 L660 70 L640 96 L0 96 Z" fill="#c9b48a" ${K}/>`;
    s += `<rect x="40" y="96" width="34" height="510" fill="#efe6d2" ${K}/><rect x="560" y="96" width="34" height="510" fill="#efe6d2" ${K}/>`;
    // grade da varanda (no fundo do deck)
    s += `<rect x="0" y="520" width="600" height="14" fill="#efe6d2" ${K}/>`;
    for (let x = 10; x < 600; x += 34) s += `<rect x="${x}" y="534" width="12" height="72" rx="4" fill="#efe6d2" stroke="#2b1d12" stroke-width="1.5"/>`;
    s += `<rect x="0" y="600" width="600" height="10" fill="#d8c9a8" ${K}/>`;
    // cadeira de vime e mesinha
    s += `<path d="M150 560 Q140 470 230 466 Q320 470 310 560 L320 690 L140 690 Z" fill="#c99a5a" ${K}/>
      <g stroke="#9a6a3c" stroke-width="2" fill="none">${[490, 520, 550].map((y) => `<path d="M160 ${y} Q230 ${y - 12} 300 ${y}"/>`).join('')}</g>
      <rect x="140" y="660" width="180" height="34" rx="10" fill="#e3c286" ${K}/>
      <path d="M150 694 L140 780 M310 694 L320 780" stroke="#9a6a3c" stroke-width="8" stroke-linecap="round"/>`;
    s += `<ellipse cx="440" cy="640" rx="78" ry="18" fill="#efe6d2" ${K}/><path d="M440 658 L440 760 M410 770 L470 770" stroke="#8a5a2f" stroke-width="8" stroke-linecap="round"/>`;
    return s;
  }
  function pierFg() {
    let s = '';
    // samambaia pendurada no beiral e vaso no canto (escondem parte dos objetos)
    s += `<path d="M300 96 L300 190" stroke="#5a3a1c" stroke-width="3"/><path d="M262 190 L338 190 L326 236 L274 236 Z" fill="#a8562c" ${K}/>`;
    const rf = U.semente(12);
    for (let i = 0; i < 16; i++) { const a = (-170 + i * 22) * Math.PI / 180, l = 70 + rf() * 60; s += `<path d="M300 200 Q${(300 + Math.cos(a) * l * 0.6).toFixed(0)} ${(200 + Math.abs(Math.sin(a)) * l * 0.2).toFixed(0)} ${(300 + Math.cos(a) * l).toFixed(0)} ${(240 + Math.abs(Math.sin(a)) * l).toFixed(0)}" stroke="${i % 2 ? '#3c8248' : '#2f6b3a'}" stroke-width="7" fill="none" stroke-linecap="round"/>`; }
    s += D.planta(40, 880, 0.9, 61);
    // taboas e juncos no primeiro plano
    const rnd = U.semente(77);
    for (let i = 0; i < 34; i++) {
      const x = 1180 + rnd() * 440, h = 160 + rnd() * 240, b = 900 + rnd() * 20;
      s += `<path d="M${x.toFixed(0)} ${b} Q${(x + 18 - rnd() * 36).toFixed(0)} ${(b - h / 2).toFixed(0)} ${(x + 20 - rnd() * 40).toFixed(0)} ${(b - h).toFixed(0)}" stroke="${i % 3 ? '#4f7a2e' : '#6a9a3a'}" stroke-width="${(4 + rnd() * 4).toFixed(1)}" fill="none" stroke-linecap="round"/>`;
      if (i % 4 === 0) s += `<rect x="${(x - 6).toFixed(0)}" y="${(b - h + 10).toFixed(0)}" width="12" height="42" rx="6" fill="#6b4322" transform="rotate(${(rnd() * 16 - 8).toFixed(0)} ${x.toFixed(0)} ${(b - h + 30).toFixed(0)})"/>`;
    }
    for (let i = 0; i < 14; i++) {
      const x = 760 + rnd() * 260, h = 60 + rnd() * 90;
      s += `<path d="M${x.toFixed(0)} 905 Q${(x + 10).toFixed(0)} ${(905 - h / 2).toFixed(0)} ${(x + 14 - rnd() * 28).toFixed(0)} ${(905 - h).toFixed(0)}" stroke="#5a8a34" stroke-width="5" fill="none" stroke-linecap="round"/>`;
    }
    // ipê-amarelo pendendo no canto
    s += `<path d="M1600 0 Q1500 60 1440 140 M1600 80 Q1520 120 1470 200" stroke="#4a2c16" stroke-width="16" fill="none" stroke-linecap="round"/>`;
    for (let i = 0; i < 60; i++) s += `<circle cx="${(1380 + rnd() * 230).toFixed(0)}" cy="${(rnd() * 240).toFixed(0)}" r="${(10 + rnd() * 16).toFixed(0)}" fill="${['#f2c230', '#f7d54a', '#e0a81f'][i % 3]}" opacity=".95"/>`;
    s += `<rect width="${W}" height="${H}" fill="url(#gVinheta)" opacity=".7" pointer-events="none"/>`;
    return s;
  }

  // =========================================================
  // CENA 3 — ESCRITÓRIO
  // =========================================================
  function escritorioBg() {
    let s = D.defs();
    s += `<rect width="${W}" height="${H}" fill="#5e1f2a"/><rect width="${W}" height="640" fill="url(#pListras)"/>`;
    s += `<rect width="${W}" height="40" fill="#3a2414"/><rect y="36" width="${W}" height="8" fill="url(#gOuro)"/>`;
    s += `<rect y="430" width="${W}" height="215" fill="url(#gMadeira)" ${K}/>`;
    for (let x = 30; x < W; x += 170) s += `<rect x="${x}" y="452" width="146" height="170" rx="3" fill="none" stroke="#3a2414" stroke-width="3"/>`;
    s += D.piso(640, 900, 900, 260, { tipo: 'tabuas', cols: 22, rows: 7, c1: '#7a4a24', c2: '#3a2414', seed: 11 });
    s += D.feixe([[528, 440], [832, 440], [1120, 900], [300, 900]]);
    // tapete persa
    s += `<path d="M380 700 L1380 700 L1520 900 L240 900 Z" fill="#6b1f2a" ${K}/><path d="M420 716 L1350 716 L1470 892 L300 892 Z" fill="none" stroke="#e2bd5a" stroke-width="4"/><path d="M560 760 L1220 760 L1290 860 L480 860 Z" fill="#1f3a5a" stroke="#e2bd5a" stroke-width="3"/>`;
    // estante
    s += D.estante(40, 110, 340, 530, 4, 13, { vazias: [], corte: { 2: 120, 3: 80 }, recuo: { 1: 0 } });
    // janela
    s += `<rect x="520" y="110" width="320" height="330" fill="url(#gVidroDia)" ${K}/>
      <svg x="520" y="110" width="320" height="330" viewBox="0 0 320 330">${paisagemLago(320, 330, true)}</svg>
      <path d="M680 110 L680 440 M520 275 L840 275" stroke="#efe6d2" stroke-width="10"/>
      <rect x="520" y="110" width="320" height="330" fill="none" stroke="#efe6d2" stroke-width="12"/>
      <rect x="500" y="440" width="360" height="20" fill="#d8c9a8" ${K}/>`;
    s += D.cortina(460, 90, 90, 380, 'esq') + D.cortina(810, 90, 90, 380, 'dir');
    s += D.cantos(44, 640);
    s += D.quadro(1404, 96, 120, 150, `<rect width="120" height="150" fill="#f3ead2"/><path d="M60 140 Q56 90 64 40" stroke="#5a3a1c" stroke-width="3" fill="none"/><path d="M62 96 Q40 80 30 60 M63 70 Q86 56 94 36" stroke="#5a3a1c" stroke-width="2" fill="none"/>${[[30, 58], [40, 50], [26, 48], [94, 34], [84, 28], [98, 24], [64, 38], [56, 30], [70, 30]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${5 + (i % 3)}" fill="${['#f2c230', '#e0a81f', '#f7d54a'][i % 3]}" stroke="#a87a10" stroke-width=".8"/>`).join('')}<path d="M64 120 q14 -8 24 -2 q-12 8 -24 2 Z M60 108 q-14 -8 -22 0 q10 6 22 0 Z" fill="#6f9a5a" stroke="#3f6a34" stroke-width=".8"/><text x="60" y="146" font-size="9" text-anchor="middle" font-family="Georgia,serif" font-style="italic" fill="#5a3a1c">Handroanthus albus</text>`, '#5e3a1f');
    s += `<rect x="440" y="80" width="480" height="18" rx="8" fill="url(#gOuro)" ${K}/>`;
    // quadros: mapa do lago e gráfico antigo
    s += D.quadro(920, 130, 200, 140, `<rect width="200" height="140" fill="#efe2b8"/><path d="M20 30 Q60 70 90 80 Q110 90 100 130" stroke="#3f86c8" stroke-width="5" fill="none"/><ellipse cx="130" cy="78" rx="52" ry="34" fill="#7fb6df" stroke="#2b1d12" stroke-width="2"/><text x="136" y="96" font-size="13" text-anchor="middle" font-family="serif" fill="#1f3a5a">Lago do Ipê</text><circle cx="88" cy="70" r="5" fill="#c0392b"/><circle cx="130" cy="66" r="5" fill="#c0392b"/><circle cx="160" cy="76" r="5" fill="#c0392b"/>`, '#5e3a1f');
    s += `<circle cx="1260" cy="190" r="50" fill="url(#gOuro)" ${K}/><circle cx="1260" cy="190" r="40" fill="#fbf3dc" ${K}/><line x1="1260" y1="190" x2="1260" y2="162" stroke="#2b1d12" stroke-width="4"/><line x1="1260" y1="190" x2="1280" y2="200" stroke="#2b1d12" stroke-width="3"/>`;
    // arquivo de aço
    s += `<rect x="1360" y="330" width="210" height="330" fill="#6b7a74" ${K}/>`;
    [0, 1, 2, 3].forEach((i) => { s += `<rect x="1374" y="${344 + i * 78}" width="182" height="66" rx="3" fill="#7e8d87" ${K}/><rect x="1440" y="${368 + i * 78}" width="50" height="10" rx="4" fill="url(#gOuro)" stroke="#2b1d12" stroke-width="1.4"/><rect x="1452" y="${352 + i * 78}" width="26" height="12" fill="#efe6d2" stroke="#2b1d12" stroke-width="1"/>`; });
    // mesa de trabalho
    s += `<rect x="640" y="548" width="680" height="30" rx="4" fill="#6e4524" ${K}/>
      <rect x="660" y="578" width="640" height="180" fill="url(#gMadeira)" ${K}/>
      <rect x="680" y="596" width="180" height="140" fill="none" stroke="#3a2414" stroke-width="3"/><rect x="1100" y="596" width="180" height="140" fill="none" stroke="#3a2414" stroke-width="3"/>
      <circle cx="770" cy="666" r="6" fill="url(#gOuro)"/><circle cx="1190" cy="666" r="6" fill="url(#gOuro)"/>
      <rect x="740" y="540" width="200" height="12" fill="#2f5d3a" opacity=".85"/>`;
    // papéis espalhados na mesa
    s += `<rect x="960" y="530" width="90" height="20" fill="#fbf8ee" transform="rotate(-4 960 530)" stroke="#9a948a" stroke-width="1"/><rect x="1180" y="532" width="80" height="16" fill="#fbf8ee" transform="rotate(5 1180 532)" stroke="#9a948a" stroke-width="1"/>`;
    return s;
  }
  function escritorioFg() {
    // cadeira de couro de costas para o jogador
    let s = `<path d="M880 900 L880 720 Q880 650 980 646 Q1080 650 1080 720 L1080 900 Z" fill="#4a1f16" ${K}/>
      <g fill="url(#gOuro)">${[0, 1, 2, 3, 4, 5, 6].map((i) => `<circle cx="${896 + i * 28}" cy="${700 - Math.sin((i / 6) * Math.PI) * 30}" r="4"/>`).join('')}</g>
      <path d="M900 760 L1060 760" stroke="#2e110b" stroke-width="3"/>`;
    s += D.planta(1540, 880, 0.95, 21, true);
    s += `<rect width="${W}" height="${H}" fill="url(#gVinheta)" pointer-events="none"/>`;
    return s;
  }

  // =========================================================
  // CENA 4 — BIBLIOTECA
  // =========================================================
  function bibliotecaBg() {
    let s = D.defs();
    s += `<rect width="${W}" height="${H}" fill="#4a3346"/><rect width="${W}" height="${H}" fill="url(#pDamasco)"/>`;
    s += D.piso(660, 900, 800, 300, { tipo: 'tabuas', cols: 24, rows: 7, c1: '#5e3a1f', c2: '#2b1d12', seed: 19 });
    // estantes altas
    s += D.estante(0, 40, 470, 620, 6, 101, { corte: { 2: 150, 4: 90 } });
    s += D.estante(1130, 40, 470, 620, 6, 211, { corte: { 3: 140, 5: 110 }, recuo: { 1: 60 } });
    // janela em arco com luar
    const arco = 'M580 600 L580 220 Q580 70 800 70 Q1020 70 1020 220 L1020 600 Z';
    s += `<path d="${arco}" fill="url(#gVidroNoite)" ${K}/>`;
    s += MI.ceuEm ? MI.ceuEm(`<path d="${arco}"/>`, 580, 70, 440, 530, D.periodo, { horizonte: 0.8, astroX: 0.72, astroY: 0.22, nuvens: 1, semente: 29 }) : '';
    s += `<path d="M580 520 Q700 480 800 500 Q900 470 1020 500 L1020 600 L580 600 Z" fill="${(PER().morros || ['#162a22', '#162a22'])[1]}"/>
      <path d="${arco}" fill="url(#gReflexo)" opacity=".5"/>
      <path d="M800 70 L800 600 M580 330 L1020 330" stroke="#3a2414" stroke-width="10"/>
      <path d="M580 600 L580 220 Q580 70 800 70 Q1020 70 1020 220 L1020 600" fill="none" stroke="#5e3a1f" stroke-width="16"/>`;
    s += `<rect x="560" y="560" width="480" height="60" fill="#5e3a1f" ${K}/><rect x="570" y="540" width="460" height="24" rx="10" fill="#2f5d7a" ${K}/>`;
    s += D.cortina(500, 40, 110, 560, 'esq') + D.cortina(990, 40, 110, 560, 'dir');
    // escada de biblioteca encostada
    s += `<path d="M1180 660 L1270 60 M1260 660 L1350 60" stroke="#8a5a2f" stroke-width="10"/>${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<line x1="${1186 + i * 11}" y1="${620 - i * 74}" x2="${1266 + i * 11}" y2="${620 - i * 74}" stroke="#8a5a2f" stroke-width="7"/>`).join('')}`;
    // mesa de leitura
    s += `<rect x="470" y="640" width="660" height="28" rx="4" fill="#6e4524" ${K}/><rect x="480" y="612" width="640" height="30" fill="#2f5d3a" ${K}/>
      <path d="M500 668 L490 860 M1100 668 L1110 860 M560 668 L560 820 M1040 668 L1040 820" stroke="#3a2414" stroke-width="14" stroke-linecap="round"/>`;
    s += D.feixe([[600, 340], [1000, 340], [1180, 900], [420, 900]]);
    s += D.cantos(30, 660);
    // luz da vela sobre a mesa
    s += `<circle cx="760" cy="580" r="340" fill="url(#gLuz)" opacity=".8"/><circle cx="300" cy="380" r="300" fill="url(#gLuz)" opacity=".4"/><circle cx="1360" cy="380" r="300" fill="url(#gLuz)" opacity=".4"/>`;
    // suporte do globo
    s += `<path d="M260 820 L300 740 L340 820 M300 740 L300 700" stroke="#5e3a1f" stroke-width="10" stroke-linecap="round" fill="none"/>`;
    return s;
  }
  function bibliotecaFg() {
    let s = `<path d="M1180 900 L1200 720 Q1200 640 1300 640 L1460 640 Q1560 640 1560 720 L1580 900 Z" fill="#6b1f2a" ${K}/>
      <path d="M1160 760 Q1150 700 1210 700 Q1250 700 1240 760 L1240 900 L1170 900 Z M1500 760 Q1500 700 1550 700 Q1600 700 1600 760 L1600 900 L1520 900 Z" fill="#7d2633" ${K}/>
      <g fill="url(#gOuro)">${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<circle cx="${1230 + i * 40}" cy="656" r="4"/>`).join('')}</g>`;
    s += D.planta(70, 890, 1.0, 33);
    s += `<rect width="${W}" height="${H}" fill="#0a1030" opacity=".06" pointer-events="none"/><rect width="${W}" height="${H}" fill="url(#gVinheta)" opacity=".75" pointer-events="none"/>`;
    return s;
  }

  // =========================================================
  // CENA 5 — LABORATÓRIO NO PORÃO
  // =========================================================
  function laboratorioBg() {
    let s = D.defs();
    s += `<rect width="${W}" height="${H}" fill="url(#pTijolo)"/>`;
    // abóbadas e canos
    s += `<path d="M0 0 L${W} 0 L${W} 60 Q1200 130 800 60 Q400 130 0 60 Z" fill="#4d5654"/>
      <path d="M0 96 L${W} 96" stroke="#b87333" stroke-width="12"/><path d="M0 120 L${W} 120" stroke="#8e9a98" stroke-width="8"/>
      ${[300, 700, 1100, 1500].map((x) => `<rect x="${x - 10}" y="86" width="20" height="44" fill="#9c5f26"/>`).join('')}`;
    // janela basculante (nível do chão lá fora)
    s += `<rect x="660" y="150" width="280" height="110" fill="#6fa070" ${K}/><rect x="660" y="150" width="280" height="56" fill="url(#gVidroDia)"/>${D.vista(660, 150, 280, 56, { horizonte: false, nuvens: 1, astroX: 0.72, astroY: 0.45 })}
      ${Array.from({ length: 14 }, (_, i) => `<path d="M${670 + i * 20} 206 l4 -18 l4 18" fill="#3f7a3a"/>`).join('')}
      <path d="M800 150 L800 260 M660 205 L940 205" stroke="#3a3f3e" stroke-width="7"/><rect x="660" y="150" width="280" height="110" fill="none" stroke="#3a3f3e" stroke-width="10"/>
`;
    s += D.feixe([[660, 260], [940, 260], [1060, 900], [560, 900]]);
    // quadro-negro
    s += `<rect x="60" y="170" width="380" height="230" fill="#24402f" stroke="#7a4a24" stroke-width="14"/>
      <g font-family="'Comic Sans MS','Segoe Print',cursive" fill="#eaf2e4" font-size="22"><text x="84" y="214">OD (P1) = 2,1 mg/L</text><text x="84" y="252">P total: P2 × P3</text><text x="84" y="290">C = m / V</text><text x="84" y="328" font-size="18">amostra ≠ solução ≠ laudo</text></g>
      <path d="M84 350 Q200 340 300 360" stroke="#eaf2e4" stroke-width="2" fill="none"/><rect x="300" y="396" width="60" height="10" fill="#efe6d2"/>`;
    // armário de vidraria
    s += `<rect x="470" y="300" width="160" height="220" fill="#d8dfdd" ${K}/><rect x="482" y="312" width="136" height="196" fill="#cfe6ef" opacity=".55" ${K}/>
      <line x1="482" y1="380" x2="618" y2="380" stroke="#8e9a98" stroke-width="5"/><line x1="482" y1="446" x2="618" y2="446" stroke="#8e9a98" stroke-width="5"/>
      ${[[500, 378], [530, 378], [570, 378], [600, 378], [505, 444], [545, 444], [590, 444]].map(([x, y], i) => `<path d="M${x - 8} ${y} L${x - 8} ${y - 34 - (i % 3) * 6} L${x + 8} ${y - 34 - (i % 3) * 6} L${x + 8} ${y} Z" fill="${['#a8621f', '#e7f3f9', '#7aa16a', '#e7f3f9'][i % 4]}" fill-opacity=".85" stroke="#2b1d12" stroke-width="1.2"/>`).join('')}`;
    // bancada com azulejos
    s += `<rect x="100" y="400" width="1400" height="130" fill="url(#pAzulejo)" ${K}/>
      <rect x="80" y="520" width="1440" height="26" fill="#2f3a3e" ${K}/><rect x="100" y="546" width="1400" height="200" fill="#6e8a86" ${K}/>
      ${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${120 + i * 232}" y="566" width="210" height="160" rx="4" fill="#7e9a96" ${K}/><rect x="${205 + i * 232}" y="580" width="40" height="8" rx="3" fill="#cfd8d6"/>`).join('')}`;
    // capela de exaustão
    s += `<rect x="1120" y="200" width="360" height="320" fill="#d8dfdd" ${K}/><rect x="1140" y="240" width="320" height="240" fill="#cfe6ef" opacity=".5" ${K}/>
      <rect x="1120" y="200" width="360" height="40" fill="#9aa6a4" ${K}/><text x="1300" y="227" font-size="18" text-anchor="middle" font-family="sans-serif" font-weight="700" fill="#2f3a3e">CAPELA</text>`;
    // pia e torneira
    s += `<rect x="760" y="508" width="200" height="22" rx="6" fill="#c9d3d6" ${K}/><path d="M860 508 L860 450 Q860 430 884 430 L900 430" fill="none" stroke="#9aa6a4" stroke-width="9" stroke-linecap="round"/>`;
    // lâmpada pendente
    s += `<line x1="800" y1="120" x2="800" y2="280" stroke="#2b2b2b" stroke-width="3"/><path d="M760 280 L840 280 L820 250 L780 250 Z" fill="#2f5d5a" ${K}/><circle cx="800" cy="286" r="12" fill="#fff6c4"/><circle cx="800" cy="400" r="380" fill="url(#gLuz)" opacity=".7"/>`;
    // gancho do jaleco
    s += `<rect x="1520" y="230" width="40" height="12" rx="3" fill="#9aa6a4" ${K}/>`;
    // piso
    s += `<rect y="746" width="${W}" height="154" fill="#5a6462"/><path d="M0 760 L${W} 760" stroke="#3f4746" stroke-width="4"/>`;
    for (let x = -200; x < 1800; x += 160) s += `<line x1="${x}" y1="760" x2="${x + (x - 800) * 0.4}" y2="900" stroke="#3f4746" stroke-width="3"/>`;
    s += `<path d="M0 830 L${W} 830" stroke="#3f4746" stroke-width="3"/>`;
    // tabela periódica e prateleira de reagentes
    s += `<rect x="962" y="140" width="140" height="150" fill="#fbf8ee" ${K}/><text x="1032" y="160" font-size="11" text-anchor="middle" font-family="sans-serif" font-weight="700" fill="#2b1d12">TABELA PERIÓDICA</text>`;
    for (let r = 0; r < 6; r++) for (let c = 0; c < 9; c++) { if (r < 2 && c > 0 && c < 8) continue; s += `<rect x="${970 + c * 14}" y="${170 + r * 18}" width="12" height="15" fill="${['#f2b8a8', '#bfe0c4', '#bcd6f0', '#f2e2a0'][(r + c) % 4]}" stroke="#7a6a50" stroke-width=".8"/>`; }
    s += `<rect x="170" y="440" width="230" height="10" fill="#8a5a2f" ${K}/>`;
    // mesa central (bancada de apoio)
    s += `<path d="M330 900 L380 790 L1220 790 L1270 900 Z" fill="#2f3a3e" ${K}/><path d="M380 790 L1220 790 L1226 806 L374 806 Z" fill="#46565a"/>
      <rect x="460" y="776" width="160" height="16" rx="4" fill="#d8dfdd" ${K}/>`;
    return s;
  }
  function laboratorioFg() {
    // banqueta alta e cabo de energia em primeiro plano
    let s = `<path d="M1420 900 L1440 700 M1560 900 L1540 700 M1430 800 L1550 800" stroke="#3a3f3e" stroke-width="10" stroke-linecap="round"/>
      <ellipse cx="1490" cy="696" rx="80" ry="22" fill="#2f5d5a" ${K}/>
      <path d="M0 610 Q120 700 90 900" stroke="#1f1f1f" stroke-width="7" fill="none"/>`;
    s += `<rect width="${W}" height="${H}" fill="#0e2a2a" opacity=".08" pointer-events="none"/><rect width="${W}" height="${H}" fill="url(#gVinheta)" opacity=".8" pointer-events="none"/>`;
    return s;
  }

  // =========================================================
  // CENA 6 — SALÃO DE BAILE
  // =========================================================
  function salaoBg() {
    let s = D.defs();
    s += `<rect width="${W}" height="${H}" fill="#efe0c4"/><rect width="${W}" height="620" fill="url(#pDamasco)" opacity=".7"/>`;
    s += `<rect width="${W}" height="60" fill="#e2cfa6"/><rect y="54" width="${W}" height="12" fill="url(#gOuro)"/>`;
    s += D.cantos(66, 560);
    // pilastras
    [60, 440, 1160, 1540].forEach((x) => { s += `<rect x="${x - 22}" y="66" width="44" height="560" fill="#f6ead2" ${K}/><rect x="${x - 30}" y="66" width="60" height="26" fill="url(#gOuro)" ${K}/>`; });
    // janelões com cortinas
    [[110, 300], [1210, 300]].forEach(([x, w]) => {
      const arco = `M${x} 600 L${x} 230 Q${x} 110 ${x + w / 2} 110 Q${x + w} 110 ${x + w} 230 L${x + w} 600 Z`;
      s += `<path d="${arco}" fill="url(#gVidroDia)" ${K}/>`;
      if (MI.ceuEm) s += MI.ceuEm(`<path d="${arco}"/>`, x, 110, w, 490, D.periodo, { horizonte: 0.78, nuvens: 1, astroX: x < 800 ? 0.3 : 0.7, semente: x });
      s += `<path d="${arco}" fill="url(#gReflexo)" opacity=".6"/>
        <path d="M${x + w / 2} 110 L${x + w / 2} 600 M${x} 360 L${x + w} 360" stroke="#efe6d2" stroke-width="10"/>`;
      s += D.feixe([[x + 10, 600], [x + w - 10, 600], [x + w + 160, 900], [x - 160, 900]]);
      s += D.cortina(x - 50, 90, 110, 530, 'esq') + D.cortina(x + w - 60, 90, 110, 530, 'dir');
    });
    // palco
    s += `<rect x="480" y="150" width="640" height="290" fill="#fbfaf4" ${K}/><rect x="480" y="150" width="640" height="290" fill="none" stroke="url(#gOuro)" stroke-width="10"/>
      <text x="800" y="230" font-size="34" text-anchor="middle" font-family="'Playfair Display',Georgia,serif" fill="#7a2335">Reunião com a comunidade</text>
      <text x="800" y="276" font-size="22" text-anchor="middle" font-family="Georgia,serif" fill="#3a2414">O que sabemos sobre o Lago do Ipê</text>
      <rect x="580" y="300" width="440" height="110" fill="#e8f2ef" stroke="#2a8a86" stroke-width="3"/>
      <text x="800" y="344" font-size="20" text-anchor="middle" font-family="sans-serif" fill="#1f3a5a">OD no P1: 2,1 mg/L (14/10)</text><text x="800" y="380" font-size="18" text-anchor="middle" font-family="sans-serif" fill="#1f3a5a">Causas: em investigação</text>`;
    s += `<path d="M440 440 L1160 440 L1200 520 L400 520 Z" fill="#7a4a24" ${K}/><rect x="400" y="520" width="800" height="40" fill="#5e3a1f" ${K}/>`;
    s += D.cortina(400, 120, 120, 400, 'esq') + D.cortina(1080, 120, 120, 400, 'dir');
    s += `<path d="M400 110 Q800 170 1200 110 L1200 140 Q800 200 400 140 Z" fill="#7a2335" ${K}/>`;
    // tribuna
    s += `<path d="M740 470 L860 470 L850 540 L750 540 Z" fill="#6e4524" ${K}/><rect x="730" y="460" width="140" height="14" fill="url(#gOuro)" ${K}/>`;
    // piso de tacos em perspectiva
    s += D.piso(560, 900, 800, 240, { cols: 28, rows: 8, c1: '#b98654', c2: '#9a6a3c' });
    s += `<rect y="556" width="${W}" height="8" fill="#5e3a1f"/>`;
    // piano de cauda
    s += `<path d="M60 600 L380 600 Q470 600 470 660 Q470 720 380 720 L60 720 Z" fill="#1a1a1a" ${K}/>
      <path d="M60 600 L60 470 L300 520 L380 600 Z" fill="#262626" ${K}/>
      <rect x="60" y="700" width="300" height="24" fill="#f4f1ea" ${K}/>${Array.from({ length: 20 }, (_, i) => `<rect x="${66 + i * 15}" y="700" width="8" height="14" fill="#111"/>`).join('')}
      <path d="M90 724 L84 860 M350 724 L356 860 M430 700 L436 840" stroke="#111" stroke-width="12" stroke-linecap="round"/>`;
    // mesas redondas com toalha
    [[1300, 700], [1060, 640]].forEach(([x, y]) => { s += `<path d="M${x - 110} ${y} Q${x} ${y - 30} ${x + 110} ${y} L${x + 130} ${y + 130} Q${x} ${y + 160} ${x - 130} ${y + 130} Z" fill="#fbf8ee" ${K}/><ellipse cx="${x}" cy="${y}" rx="110" ry="26" fill="#fff" ${K}/>`; });
    // cavalete do infográfico
    s += `<path d="M1500 620 L1470 860 M1540 620 L1570 860 M1520 620 L1520 840" stroke="#5e3a1f" stroke-width="8" stroke-linecap="round"/>`;
    s += D.lustre(560, 40, 0.75) + D.lustre(1040, 40, 0.75);
    return s;
  }
  function salaoFg() {
    // cadeiras da plateia em primeiro plano
    let s = '';
    [[460, 800], [620, 820], [780, 830], [940, 820], [1100, 800]].forEach(([x, y]) => {
      s += `<path d="M${x - 50} ${y + 100} L${x - 50} ${y - 40} Q${x - 50} ${y - 90} ${x} ${y - 92} Q${x + 50} ${y - 90} ${x + 50} ${y - 40} L${x + 50} ${y + 100}" fill="url(#gOuro)" ${K}/>
        <path d="M${x - 38} ${y + 100} L${x - 38} ${y - 36} Q${x - 38} ${y - 76} ${x} ${y - 78} Q${x + 38} ${y - 76} ${x + 38} ${y - 36} L${x + 38} ${y + 100} Z" fill="#8e2a3c"/>`;
    });
    s += `<path d="M0 0 Q200 60 420 0" stroke="#3f7a3a" stroke-width="18" fill="none"/><path d="M1180 0 Q1400 60 1600 0" stroke="#3f7a3a" stroke-width="18" fill="none"/>
      ${[60, 140, 220, 300, 380, 1220, 1300, 1380, 1460, 1540].map((x, i) => `<circle cx="${x}" cy="${26 + Math.sin(i) * 6}" r="11" fill="${i % 2 ? '#f2b8c8' : '#fff4cf'}" stroke="#a3577a" stroke-width="1.5"/>`).join('')}`;
    s += `<rect width="${W}" height="${H}" fill="url(#gVinheta)" opacity=".8" pointer-events="none"/>`;
    return s;
  }

  // ---------- posições dos objetos ----------
  // o: id do objeto · x,y: centro · s: escala · r: rotação · sb: sombra (raio)
  MI.CENAS = {
    hall: {
      nome: 'Hall de Entrada', bg: hallBg, fg: hallFg, alvos: 10, luzes: [[800, 90, 380], [470, 420, 120]],
      slots: [
        { o: 'guardaChuva', x: 214, y: 520, s: 0.72, r: 12 },
        { o: 'chapeu', x: 140, y: 252, s: 0.6, r: -6 },
        { o: 'mala', x: 290, y: 748, s: 0.85, sb: 46 },
        { o: 'carta', x: 450, y: 498, s: 0.48, r: -10 },
        { o: 'relogioBolso', x: 566, y: 494, s: 0.42 },
        { o: 'castical', x: 398, y: 482, s: 0.5 },
        { o: 'binoculo', x: 512, y: 492, s: 0.36 },
        { o: 'chave', x: 1020, y: 598, s: 0.5 },
        { o: 'caderneta', x: 1196, y: 562, s: 0.5, r: 18 },
        { o: 'luvas', x: 1350, y: 456, s: 0.46, r: -10 },
        { o: 'leque', x: 1488, y: 360, s: 0.46, r: 20 },
        { o: 'prancheta', x: 612, y: 598, s: 0.52, r: -8 },
        { o: 'botas', x: 975, y: 684, s: 0.62, sb: 40 },
        { o: 'lanterna', x: 700, y: 798, s: 0.55, r: 12 },
        { o: 'bussola', x: 908, y: 768, s: 0.42 },
        { o: 'mapa', x: 1210, y: 808, s: 0.7, r: -12 },
        { o: 'vaso', x: 1120, y: 424, s: 0.64 },
        { o: 'lupa', x: 1390, y: 846, s: 0.5, r: 30 },
      ],
    },
    pier: {
      nome: 'Varanda e Píer', bg: pierBg, fg: pierFg, alvos: 10, luzes: [[300, 120, 260]],
      slots: [
        { o: 'oximetro', x: 432, y: 608, s: 0.5, r: -8 },
        { o: 'termometro', x: 852, y: 652, s: 0.5, r: 62 },
        { o: 'frascoColeta', x: 960, y: 574, s: 0.48, sb: 16 },
        { o: 'discoSecchi', x: 1062, y: 548, s: 0.5 },
        { o: 'gps', x: 216, y: 650, s: 0.42, r: 20 },
        { o: 'camera', x: 274, y: 640, s: 0.4, r: -10 },
        { o: 'caderneta', x: 92, y: 506, s: 0.42, r: -6 },
        { o: 'binoculo', x: 330, y: 500, s: 0.38 },
        { o: 'chapeuPalha', x: 576, y: 504, s: 0.5, r: 8 },
        { o: 'etiqueta', x: 500, y: 830, s: 0.5, r: -20 },
        { o: 'trena', x: 344, y: 862, s: 0.52 },
        { o: 'caixaTermica', x: 600, y: 760, s: 0.62, sb: 30 },
        { o: 'balde', x: 760, y: 724, s: 0.55, sb: 20 },
        { o: 'puca', x: 46, y: 640, s: 0.72, r: 30 },
        { o: 'botas', x: 120, y: 828, s: 0.55, sb: 30 },
        { o: 'luvas', x: 900, y: 610, s: 0.42, r: 70 },
        { o: 'regador', x: 410, y: 742, s: 0.5 },
        { o: 'sapo', x: 1222, y: 704, s: 0.42 },
        { o: 'libelula', x: 1380, y: 520, s: 0.46, r: 18 },
      ],
    },
    escritorio: {
      nome: 'Escritório', bg: escritorioBg, fg: escritorioFg, alvos: 10, luzes: [[680, 280, 420], [1260, 190, 140]],
      slots: [
        { o: 'abajur', x: 740, y: 510, s: 0.62 },
        { o: 'maquinaEscrever', x: 880, y: 518, s: 0.6 },
        { o: 'telefone', x: 1240, y: 520, s: 0.52 },
        { o: 'xicara', x: 1076, y: 534, s: 0.4 },
        { o: 'tinteiro', x: 1144, y: 530, s: 0.42 },
        { o: 'oculos', x: 1010, y: 544, s: 0.36, r: -8 },
        { o: 'carimbo', x: 1300, y: 532, s: 0.4 },
        { o: 'calculadora', x: 690, y: 540, s: 0.36, r: -12 },
        { o: 'grafico', x: 1020, y: 156, s: 0.0001 },
        { o: 'pluviometro', x: 790, y: 410, s: 0.62 },
        { o: 'pasta', x: 1466, y: 304, s: 0.62 },
        { o: 'relogioBolso', x: 276, y: 312, s: 0.38 },
        { o: 'caderneta', x: 316, y: 438, s: 0.46, r: 4 },
        { o: 'lupa', x: 1174, y: 668, s: 0.44, r: -30 },
        { o: 'chave', x: 1526, y: 490, s: 0.4 },
        { o: 'lapis', x: 960, y: 548, s: 0.42 },
        { o: 'prancheta', x: 1340, y: 760, s: 0.58, r: 14 },
        { o: 'mapa', x: 470, y: 820, s: 0.6, r: 10 },
      ],
    },
    biblioteca: {
      nome: 'Biblioteca', bg: bibliotecaBg, fg: bibliotecaFg, alvos: 10, luzes: [[760, 560, 280], [1021, 300, 1]],
      slots: [
        { o: 'livro', x: 640, y: 600, s: 0.6, r: -6 },
        { o: 'globo', x: 300, y: 688, s: 0.85 },
        { o: 'microscopio', x: 1000, y: 584, s: 0.6 },
        { o: 'ampulheta', x: 420, y: 232, s: 0.42 },
        { o: 'castical', x: 760, y: 584, s: 0.56 },
        { o: 'pergaminho', x: 880, y: 612, s: 0.5, r: 6 },
        { o: 'revista', x: 690, y: 528, s: 0.44, r: 70 },
        { o: 'herbario', x: 1494, y: 330, s: 0.4 },
        { o: 'concha', x: 1440, y: 538, s: 0.34 },
        { o: 'coruja', x: 1180, y: 112, s: 0.4 },
        { o: 'telescopio', x: 1060, y: 500, s: 0.62, r: -6 },
        { o: 'tinteiro', x: 1076, y: 594, s: 0.38 },
        { o: 'oculos', x: 368, y: 434, s: 0.32 },
        { o: 'bussola', x: 1462, y: 742, s: 0.4 },
        { o: 'lupa', x: 540, y: 606, s: 0.44, r: 40 },
        { o: 'mapa', x: 900, y: 532, s: 0.44, r: -8 },
        { o: 'chave', x: 182, y: 538, s: 0.34 },
        { o: 'relogioBolso', x: 150, y: 128, s: 0.3 },
      ],
    },
    laboratorio: {
      nome: 'Laboratório', bg: laboratorioBg, fg: laboratorioFg, alvos: 10, luzes: [[800, 300, 480]],
      slots: [
        { o: 'tuboEnsaio', x: 330, y: 494, s: 0.58 },
        { o: 'bequer', x: 690, y: 498, s: 0.48 },
        { o: 'erlenmeyer', x: 1010, y: 494, s: 0.5 },
        { o: 'pipeta', x: 1250, y: 450, s: 0.52 },
        { o: 'balanca', x: 1380, y: 488, s: 0.56 },
        { o: 'oculosProtecao', x: 290, y: 426, s: 0.44 },
        { o: 'contaGotas', x: 520, y: 500, s: 0.42, r: 30 },
        { o: 'bicoBunsen', x: 1100, y: 488, s: 0.5 },
        { o: 'funil', x: 560, y: 278, s: 0.42 },
        { o: 'fichaCustodia', x: 660, y: 812, s: 0.52, r: -8 },
        { o: 'jaleco', x: 1540, y: 290, s: 0.82 },
        { o: 'caixaTermica', x: 210, y: 806, s: 0.72, sb: 38 },
        { o: 'frascoColeta', x: 930, y: 790, s: 0.5, sb: 16 },
        { o: 'etiqueta', x: 1090, y: 822, s: 0.48, r: 12 },
        { o: 'luvas', x: 800, y: 816, s: 0.44, r: -20 },
        { o: 'termometro', x: 870, y: 494, s: 0.42, r: 30 },
        { o: 'microscopio', x: 1340, y: 340, s: 0.56 },
        { o: 'prancheta', x: 1430, y: 806, s: 0.6, r: 10 },
      ],
    },
    salao: {
      nome: 'Salão de Baile', bg: salaoBg, fg: salaoFg, alvos: 10, luzes: [[560, 90, 420], [1040, 90, 420]],
      slots: [
        { o: 'microfone', x: 800, y: 436, s: 0.5 },
        { o: 'cartaz', x: 1520, y: 588, s: 0.82 },
        { o: 'convite', x: 1260, y: 694, s: 0.42, r: 10 },
        { o: 'leque', x: 540, y: 868, s: 0.42, r: -30 },
        { o: 'gramofone', x: 1080, y: 606, s: 0.56 },
        { o: 'violino', x: 240, y: 560, s: 0.5 },
        { o: 'taca', x: 1336, y: 684, s: 0.38 },
        { o: 'partitura', x: 190, y: 500, s: 0.46, r: -20 },
        { o: 'megafone', x: 1000, y: 494, s: 0.44, r: -10 },
        { o: 'projetor', x: 560, y: 494, s: 0.5 },
        { o: 'mascara', x: 860, y: 872, s: 0.4, r: 10 },
        { o: 'metronomo', x: 380, y: 582, s: 0.42 },
        { o: 'vaso', x: 1010, y: 610, s: 0.0001 },
        { o: 'castical', x: 110, y: 580, s: 0.5 },
        { o: 'chapeu', x: 1390, y: 868, s: 0.5, r: -10 },
        { o: 'relogioBolso', x: 1170, y: 470, s: 0.34 },
        { o: 'carta', x: 690, y: 488, s: 0.4, r: 8 },
        { o: 'lanterna', x: 300, y: 820, s: 0.48, r: -16 },
      ],
    },
  };
  // remove posições desativadas (escala mínima)
  Object.values(MI.CENAS).forEach((c) => { c.slots = c.slots.filter((s) => s.s > 0.01); });
})();
