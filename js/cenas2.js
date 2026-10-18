/* =========================================================
   Cenários das missões 7, 8 e 9 e objetos extras nas cenas
   das missões 1 a 6 (cada partida sorteia 12 objetos).
   ========================================================= */
(function () {
  'use strict';
  const MI = window.MI;
  const U = MI.U;
  const D = MI.DESENHO;
  const K = 'stroke="#2b1d12" stroke-width="2" stroke-linejoin="round"';
  const W = 1600, H = 900;

  // =========================================================
  // CENA 7 — HORTA E CÓRREGO
  // =========================================================
  function hortaBg() {
    let s = D.defs();
    s += `<linearGradient id="gCeuH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fc3e8"/><stop offset="1" stop-color="#e9f3e0"/></linearGradient>
      <linearGradient id="gAguaH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fa9a0"/><stop offset="1" stop-color="#4f8a7c"/></linearGradient>
      <linearGradient id="gGramaH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ab45a"/><stop offset="1" stop-color="#5f8f3a"/></linearGradient>`;
    s += `<rect width="${W}" height="400" fill="url(#gCeuH)"/>${D.vista(0, 0, W, 400, { horizonte: false, nuvens: 3, semente: 71 })}`;
    s += `<path d="M0 330 Q240 250 520 300 Q820 240 1100 300 Q1360 250 1600 290 L1600 420 L0 420 Z" fill="#7aa36a"/>`;
    const rnd = U.semente(91);
    for (let i = 0; i < 26; i++) { const x = i * 64 + rnd() * 20, y = 330 - (i % 3) * 8; s += `<ellipse cx="${x}" cy="${y}" rx="${34 + rnd() * 14}" ry="${40 + rnd() * 14}" fill="${i % 2 ? '#3f6b3c' : '#4f7f45'}"/>`; }
    s += `<rect y="380" width="${W}" height="${H - 380}" fill="url(#gGramaH)"/>`;
    // galpão de ferramentas
    s += `<rect x="40" y="290" width="230" height="170" fill="#a8743f" ${K}/><path d="M24 296 L155 220 L286 296 Z" fill="#7a2335" ${K}/>
      ${[70, 110, 150, 190, 230].map((x) => `<line x1="${x}" y1="300" x2="${x}" y2="460" stroke="#7a4a24" stroke-width="2"/>`).join('')}
      <rect x="120" y="360" width="70" height="100" fill="#5e3a1f" ${K}/><rect x="60" y="320" width="40" height="30" fill="#cfe6f2" ${K}/>`;
    // cerca
    s += `<path d="M0 455 L700 455 M0 485 L700 485" stroke="#c9a46a" stroke-width="8"/>`;
    for (let x = 10; x < 700; x += 46) s += `<path d="M${x} 500 L${x} 432 L${x + 7} 424 L${x + 14} 432 L${x + 14} 500 Z" fill="#e2c28a" stroke="#8a6a3a" stroke-width="1.5"/>`;
    // córrego em perspectiva
    s += `<path d="M1240 380 Q1180 470 1250 560 Q1320 660 1140 760 Q980 840 960 900 L620 900 Q700 820 900 740 Q1100 660 1080 560 Q1060 470 1200 380 Z" fill="url(#gAguaH)" ${K}/>`;
    for (let i = 0; i < 16; i++) s += `<path d="M${(900 + rnd() * 320).toFixed(0)} ${(460 + rnd() * 420).toFixed(0)} q14 -4 28 0" stroke="#e6f4ef" stroke-opacity=".6" stroke-width="2.5" fill="none"/>`;
    // pedras das margens
    [[1080, 600], [1240, 640], [1290, 590], [900, 760], [1180, 760], [1010, 820], [700, 880], [980, 880]].forEach(([x, y], i) => {
      s += `<ellipse cx="${x}" cy="${y}" rx="${20 + (i % 3) * 8}" ry="${11 + (i % 2) * 4}" fill="${i % 2 ? '#9a9a90' : '#b5b2a6'}" ${K}/>`;
    });
    // galeria pluvial do bairro (fonte pontual) com espuma
    s += `<rect x="1290" y="470" width="160" height="100" fill="#a9aaa4" ${K}/><rect x="1290" y="470" width="160" height="16" fill="#8f908a"/>
      <circle cx="1340" cy="530" r="30" fill="#2f3335" ${K}/><path d="M1312 540 Q1290 580 1250 600" stroke="#9fb7ae" stroke-width="16" fill="none" opacity=".9"/>
      ${[0, 1, 2, 3, 4, 5].map((i) => `<circle cx="${1250 + i * 9}" cy="${600 - i * 3}" r="${6 - i * 0.6}" fill="#fff" opacity=".85"/>`).join('')}
      <rect x="1460" y="380" width="120" height="70" fill="#e9e3d2" ${K}/><path d="M1452 384 L1520 340 L1588 384 Z" fill="#b5473a" ${K}/>
      <rect x="1500" y="410" width="20" height="40" fill="#5e3a1f"/>`;
    // canteiros em perspectiva
    const canteiro = (x1, x2, y1, y2, cor) => `<path d="M${x1} ${y1} L${x2} ${y1} L${x2 + 30} ${y2} L${x1 - 30} ${y2} Z" fill="#6b4a2a" ${K}/><path d="M${x1 - 30} ${y2} L${x2 + 30} ${y2} L${x2 + 30} ${y2 + 12} L${x1 - 30} ${y2 + 12} Z" fill="#8a5a2f" ${K}/>`;
    s += canteiro(80, 600, 520, 590) + canteiro(60, 620, 640, 720) + canteiro(40, 640, 780, 870);
    const plantas = (y, n, tipo) => { let t = ''; for (let i = 0; i < n; i++) { const x = 80 + i * (540 / n) + 20; t += tipo === 'alface' ? `<g transform="translate(${x} ${y})"><ellipse cx="0" cy="0" rx="18" ry="11" fill="#7cc04a" ${K}/><ellipse cx="0" cy="-4" rx="10" ry="7" fill="#a6d86a"/></g>` : tipo === 'cenoura' ? `<path d="M${x} ${y} l-8 -24 M${x} ${y} l0 -28 M${x} ${y} l8 -24" stroke="#3f8a3f" stroke-width="4"/>` : `<g transform="translate(${x} ${y})"><path d="M0 0 L0 -30" stroke="#3f7a2e" stroke-width="3"/><circle cx="-6" cy="-24" r="7" fill="#d23b2e"/><circle cx="6" cy="-14" r="6" fill="#d23b2e"/><ellipse cx="0" cy="-34" rx="12" ry="6" fill="#4f8a3a"/></g>`; } return t; };
    s += plantas(560, 9, 'alface') + plantas(690, 10, 'cenoura') + plantas(840, 8, 'tomate');
    // espantalho
    s += `<path d="M680 470 L680 640 M630 520 L730 520" stroke="#8a5a2b" stroke-width="7"/><path d="M650 520 L710 520 L700 590 L660 590 Z" fill="#c0392b" ${K}/><circle cx="680" cy="490" r="20" fill="#e8d6a8" ${K}/><path d="M650 478 L710 478 L700 466 L660 466 Z" fill="#c9a04a" ${K}/>`;
    // jardim de chuva e mudas nativas na margem
    s += `<ellipse cx="1430" cy="700" rx="110" ry="34" fill="#5f4a2a" ${K}/>`;
    for (let i = 0; i < 9; i++) s += `<path d="M${1350 + i * 20} 700 q-6 -30 0 -50 M${1350 + i * 20} 700 q8 -26 14 -40" stroke="#3f7a2e" stroke-width="3" fill="none"/><circle cx="${1350 + i * 20}" cy="652" r="5" fill="${['#e86a9a', '#f2c230', '#9a6ae0'][i % 3]}"/>`;
    return s;
  }
  function hortaFg() {
    let s = '';
    // girassóis e milho no canto
    for (let i = 0; i < 5; i++) {
      const x = 20 + i * 38, y = 900, h = 260 + (i % 2) * 60;
      s += `<path d="M${x} ${y} L${x + 6} ${y - h}" stroke="#4f7a2e" stroke-width="7"/><path d="M${x + 2} ${y - 120} q30 -20 50 0 M${x + 4} ${y - 180} q-30 -20 -50 0" stroke="#4f8a3a" stroke-width="10" fill="none" stroke-linecap="round"/>`;
      if (i % 2 === 0) s += `<g transform="translate(${x + 6} ${y - h})">${Array.from({ length: 12 }, (_, k) => `<ellipse cx="0" cy="-22" rx="8" ry="16" fill="#f2c230" transform="rotate(${k * 30})"/>`).join('')}<circle r="16" fill="#6b3a12"/></g>`;
    }
    const rnd = U.semente(17);
    for (let i = 0; i < 30; i++) { const x = 1280 + rnd() * 330, h = 80 + rnd() * 140; s += `<path d="M${x.toFixed(0)} 905 Q${(x + 10).toFixed(0)} ${(905 - h / 2).toFixed(0)} ${(x + 18 - rnd() * 36).toFixed(0)} ${(905 - h).toFixed(0)}" stroke="${i % 2 ? '#5a8a34' : '#6f9e3c'}" stroke-width="5" fill="none" stroke-linecap="round"/>`; }
    s += `<rect width="${W}" height="${H}" fill="url(#gVinheta)" opacity=".55" pointer-events="none"/>`;
    return s;
  }

  // =========================================================
  // CENA 8 — SALA DE MAPAS (TORRE)
  // =========================================================
  function mapasBg() {
    let s = D.defs();
    s += `<rect width="${W}" height="${H}" fill="#6e4a2c"/>`;
    for (let x = 0; x < W; x += 54) s += `<rect x="${x}" y="0" width="54" height="${H}" fill="${(x / 54) % 2 ? '#7a5232' : '#6a4529'}"/><line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="#4a2c16" stroke-width="2"/>`;
    // telhado inclinado (vigas)
    s += `<path d="M0 0 L800 0 L0 380 Z M1600 0 L800 0 L1600 380 Z" fill="#4a2c16" opacity=".55"/>
      <path d="M0 380 L800 20 L1600 380" fill="none" stroke="#3a2010" stroke-width="34"/>
      <path d="M0 380 L800 20 L1600 380" fill="none" stroke="#7a4a24" stroke-width="18"/>
      <rect x="0" y="380" width="${W}" height="22" fill="#5e3a1f" ${K}/>`;
    // óculo (janela redonda)
    s += `<circle cx="800" cy="210" r="110" fill="#5e3a1f" ${K}/><circle cx="800" cy="210" r="92" fill="url(#gVidroDia)"/>${MI.ceuEm ? MI.ceuEm('<circle cx="800" cy="210" r="92"/>', 708, 118, 184, 184, D.periodo, { horizonte: 0.74, nuvens: 1, astroX: 0.66, semente: 5 }) : ''}<circle cx="800" cy="210" r="92" fill="url(#gReflexo)"/>
      <path d="M708 230 Q760 190 800 214 Q850 190 892 222 L892 300 L708 300 Z" fill="#5f8a4c"/><ellipse cx="820" cy="250" rx="40" ry="12" fill="#6f9a8a"/>
      <path d="M800 118 L800 302 M708 210 L892 210" stroke="#5e3a1f" stroke-width="8"/>`;
    // mapa da bacia emoldurado (esquerda)
    s += D.quadro(80, 120, 320, 220, `<rect width="320" height="220" fill="#f1e6c4"/>
      <path d="M30 40 Q120 10 200 30 Q290 60 300 120 Q290 190 200 205 Q110 215 50 180 Q10 120 30 40 Z" fill="#dfe9c4" stroke="#7a5a2a" stroke-width="3" stroke-dasharray="8 5"/>
      <path d="M70 60 Q130 90 150 120 Q170 150 190 170" stroke="#3f86c8" stroke-width="5" fill="none"/>
      <ellipse cx="210" cy="178" rx="40" ry="20" fill="#7fb6df" stroke="#2b1d12" stroke-width="2"/>
      <rect x="200" y="60" width="70" height="50" fill="#c9a0a0" opacity=".8"/><text x="235" y="90" font-size="12" text-anchor="middle" fill="#5a2a2a">bairro</text>
      <text x="160" y="24" font-size="14" text-anchor="middle" font-family="serif" fill="#2b1d12">Bacia do córrego do Ipê</text>
      <rect x="18" y="186" width="80" height="22" fill="#fff" stroke="#2b1d12"/><line x1="24" y1="200" x2="74" y2="200" stroke="#2b1d12" stroke-width="3"/><text x="86" y="203" font-size="8" fill="#2b1d12">100 m</text>`, '#5e3a1f');
    // fotos aéreas fixadas (direita)
    [[1150, 110, -4], [1300, 130, 3], [1450, 112, -2], [1210, 250, 2], [1380, 262, -3]].forEach(([x, y, r], i) => {
      s += `<g transform="rotate(${r} ${x + 60} ${y + 50})"><rect x="${x}" y="${y}" width="120" height="100" fill="#fbf6e6" ${K}/><rect x="${x + 8}" y="${y + 8}" width="104" height="74" fill="${['#7c8a6a', '#8a8a72', '#6f7c62', '#9a8f78', '#7a8670'][i]}"/>
        <ellipse cx="${x + 70}" cy="${y + 50}" rx="20" ry="12" fill="#9fb3c0"/>${i > 2 ? `<rect x="${x + 16}" y="${y + 16}" width="40" height="30" fill="#c9bba0"/>` : ''}
        <circle cx="${x + 60}" cy="${y + 4}" r="6" fill="#c0392b" ${K}/><text x="${x + 60}" y="${y + 94}" font-size="10" text-anchor="middle" fill="#5a4a36">${[1962, 1978, 1990, 2008, 2026][i]}</text></g>`;
    });
    // mapoteca (direita) e cesto de mapas (esquerda)
    s += `<rect x="1180" y="430" width="380" height="250" fill="url(#gMadeira)" ${K}/>`;
    [0, 1, 2, 3, 4].forEach((i) => { s += `<rect x="1194" y="${444 + i * 46}" width="352" height="38" rx="3" fill="#8a5a33" ${K}/><rect x="1350" y="${458 + i * 46}" width="40" height="8" rx="3" fill="url(#gOuro)"/>`; });
    s += `<path d="M60 600 L190 600 L176 760 L74 760 Z" fill="#a8743f" ${K}/>`;
    [[80, -14], [104, -4], [130, 6], [156, 14], [118, 0]].forEach(([x, r]) => { s += `<g transform="rotate(${r} ${x} 600)"><rect x="${x - 10}" y="470" width="20" height="140" fill="#efe2b8" ${K}/><ellipse cx="${x}" cy="470" rx="10" ry="5" fill="#e2d2a2" ${K}/></g>`; });
    // piso
    s += D.piso(680, 900, 800, 300, { tipo: 'tabuas', cols: 22, rows: 6, c1: '#7a4a24', c2: '#3a2414', seed: 23 });
    s += `<ellipse cx="800" cy="800" rx="460" ry="80" fill="#1f4a5a" ${K}/><ellipse cx="800" cy="800" rx="420" ry="64" fill="none" stroke="#e2bd5a" stroke-width="4"/>`;
    // mesa de desenho inclinada com o mapa
    s += `<path d="M430 470 L1110 470 L1150 600 L390 600 Z" fill="#c99a5a" ${K}/>
      <path d="M470 484 L1070 484 L1100 588 L440 588 Z" fill="#f4ecd2" ${K}/>
      <g fill="none" stroke="#a8742a" stroke-width="2"><ellipse cx="640" cy="530" rx="90" ry="34"/><ellipse cx="640" cy="530" rx="56" ry="20"/><ellipse cx="640" cy="530" rx="24" ry="9"/></g>
      <path d="M480 570 Q640 548 760 556 Q900 566 1080 520" stroke="#3f86c8" stroke-width="5" fill="none"/>
      <path d="M400 600 L380 820 M1140 600 L1160 820 M560 600 L560 760 M980 600 L980 760" stroke="#5e3a1f" stroke-width="12" stroke-linecap="round"/>`;
    // luminária pendente
    s += `<line x1="800" y1="300" x2="800" y2="370" stroke="#2b2b2b" stroke-width="3"/><path d="M760 400 L840 400 L820 370 L780 370 Z" fill="#1f6b4a" ${K}/><circle cx="800" cy="520" r="360" fill="url(#gLuz)" opacity=".7"/>`;
    return s;
  }
  function mapasFg() {
    let s = `<path d="M1240 900 L1250 760 Q1250 720 1300 720 L1400 720 Q1450 720 1450 760 L1460 900 Z" fill="#4a1f16" ${K}/>
      <path d="M1230 790 L1470 790" stroke="#2e110b" stroke-width="4"/>`;
    s += D.planta(80, 900, 0.9, 44);
    s += `<rect width="${W}" height="${H}" fill="url(#gVinheta)" opacity=".8" pointer-events="none"/>`;
    return s;
  }

  // =========================================================
  // CENA 9 — SALA DE JANTAR (REUNIÃO COM O ÓRGÃO AMBIENTAL)
  // =========================================================
  function jantarBg() {
    let s = D.defs();
    s += `<rect width="${W}" height="${H}" fill="#1f4a46"/><rect width="${W}" height="600" fill="url(#pDamasco)"/>`;
    s += `<rect width="${W}" height="44" fill="#e9dcc0"/><rect y="38" width="${W}" height="10" fill="url(#gOuro)"/>`;
    s += `<rect y="460" width="${W}" height="150" fill="url(#gMadeira)" ${K}/>`;
    for (let x = 24; x < W; x += 140) s += `<rect x="${x}" y="480" width="116" height="110" rx="3" fill="none" stroke="#3a2414" stroke-width="3"/>`;
    // janelas com cortinas
    [[90, 200], [1310, 200]].forEach(([x, w]) => {
      s += `<rect x="${x}" y="110" width="${w}" height="330" fill="url(#gVidroDia)" ${K}/>${D.vista(x, 110, w, 330, { horizonte: 0.58, nuvens: 1, semente: x })}<svg x="${x}" y="110" width="${w}" height="330" viewBox="0 0 ${w} 330"><rect y="200" width="${w}" height="130" fill="#6f9a5a"/><ellipse cx="${w / 2}" cy="250" rx="${w / 3}" ry="18" fill="#6fa8a0"/></svg>
        <path d="M${x + w / 2} 110 L${x + w / 2} 440 M${x} 270 L${x + w} 270" stroke="#efe6d2" stroke-width="9"/>`;
      s += D.cortina(x - 40, 90, 90, 380, 'esq') + D.cortina(x + w - 50, 90, 90, 380, 'dir');
    });
    // retrato e tela de projeção
    s += D.quadro(420, 120, 160, 200, `<rect width="160" height="200" fill="#3a3024"/><ellipse cx="80" cy="190" rx="66" ry="62" fill="#5a2a3a"/><ellipse cx="80" cy="86" rx="28" ry="32" fill="#e8c4a4"/><path d="M50 80 Q80 30 110 80 Q100 56 80 56 Q60 56 50 80 Z" fill="#3a2414"/><circle cx="70" cy="88" r="3" fill="#2b1d12"/><circle cx="90" cy="88" r="3" fill="#2b1d12"/><path d="M70 104 Q80 110 90 104" stroke="#8a3a3a" stroke-width="3" fill="none"/><rect width="160" height="200" fill="url(#gVinheta)"/>`);
    s += `<rect x="690" y="90" width="460" height="270" fill="#fbfaf4" ${K}/><rect x="690" y="80" width="460" height="16" rx="6" fill="#3a3f46"/>
      <text x="920" y="140" font-size="26" text-anchor="middle" font-family="Georgia,serif" fill="#1f6f6b">Relatório técnico · Lago do Ipê</text>
      <rect x="730" y="168" width="180" height="150" fill="#e8f2ef" stroke="#2a8a86" stroke-width="2"/>
      ${[[750, 40, '#2a8a86'], [790, 60, '#2a8a86'], [830, 130, '#c0392b']].map(([x, h, c]) => `<rect x="${x}" y="${300 - h}" width="28" height="${h}" fill="${c}"/>`).join('')}
      <text x="820" y="312" font-size="10" text-anchor="middle" fill="#1f3a5a">C1   C2   C3</text>
      <g fill="#7a8a94">${[180, 205, 230, 255, 280].map((y, i) => `<rect x="940" y="${y}" width="${170 - i * 18}" height="9"/>`).join('')}</g>`;
    s += D.lustre(800, 30, 0.85);
    // aparador com louças
    s += `<rect x="140" y="470" width="300" height="20" fill="#6e4524" ${K}/><rect x="152" y="490" width="276" height="120" fill="url(#gMadeira)" ${K}/>
      ${[200, 290, 380].map((x) => `<ellipse cx="${x}" cy="450" rx="34" ry="34" fill="#f4f1ea" ${K}/><ellipse cx="${x}" cy="450" rx="22" ry="22" fill="none" stroke="#3f6fb5" stroke-width="3"/>`).join('')}`;
    // piso
    s += D.piso(610, 900, 800, 260, { cols: 20, rows: 7, c1: '#b98654', c2: '#9a6a3c' });
    s += `<rect y="606" width="${W}" height="8" fill="#5e3a1f"/>`;
    // cadeiras do outro lado da mesa
    [480, 640, 800, 960, 1120].forEach((x) => { s += `<path d="M${x - 46} 560 L${x - 46} 420 Q${x - 46} 380 ${x} 378 Q${x + 46} 380 ${x + 46} 420 L${x + 46} 560 Z" fill="#6b1f2a" ${K}/><path d="M${x - 34} 550 L${x - 34} 426 Q${x - 34} 396 ${x} 394 Q${x + 34} 396 ${x + 34} 426 L${x + 34} 550 Z" fill="#8e2a3c"/>`; });
    // mesa comprida com toalha
    s += `<path d="M300 540 L1300 540 L1400 690 L200 690 Z" fill="#fbfaf4" ${K}/>
      <path d="M200 690 L1400 690 L1400 760 Q800 790 200 760 Z" fill="#efe8d8" ${K}/>
      <path d="M560 560 L1040 560 L1080 670 L520 670 Z" fill="#c9b07a" opacity=".35"/>
      ${[[420, 600], [620, 600], [980, 600], [1180, 600], [400, 660], [1200, 660]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="38" ry="12" fill="#fff" ${K}/><ellipse cx="${x}" cy="${y}" rx="24" ry="7" fill="none" stroke="#c9a03a" stroke-width="2"/>`).join('')}`;
    // cavalete com o mapa da bacia
    s += `<path d="M1480 520 L1450 800 M1540 520 L1570 800 M1510 520 L1510 780" stroke="#5e3a1f" stroke-width="8" stroke-linecap="round"/>
      <rect x="1440" y="430" width="140" height="110" fill="#f1e6c4" ${K}/><path d="M1460 460 Q1500 480 1520 510" stroke="#3f86c8" stroke-width="4" fill="none"/><ellipse cx="1540" cy="510" rx="22" ry="12" fill="#7fb6df"/>`;
    return s;
  }
  function jantarFg() {
    let s = '';
    [[330, 880], [1270, 880]].forEach(([x, y]) => {
      s += `<path d="M${x - 70} ${y + 40} L${x - 70} ${y - 110} Q${x - 70} ${y - 170} ${x} ${y - 172} Q${x + 70} ${y - 170} ${x + 70} ${y - 110} L${x + 70} ${y + 40}" fill="url(#gOuro)" ${K}/>
        <path d="M${x - 56} ${y + 40} L${x - 56} ${y - 104} Q${x - 56} ${y - 152} ${x} ${y - 154} Q${x + 56} ${y - 152} ${x + 56} ${y - 104} L${x + 56} ${y + 40} Z" fill="#8e2a3c"/>`;
    });
    s += `<rect width="${W}" height="${H}" fill="url(#gVinheta)" opacity=".8" pointer-events="none"/>`;
    return s;
  }

  // ---------- novas cenas ----------
  Object.assign(MI.CENAS, {
    horta: {
      nome: 'Horta e Córrego', bg: hortaBg, fg: hortaFg, alvos: 12, luzes: [],
      slots: [
        { o: 'enxada', x: 300, y: 452, s: 0.62, r: 6 },
        { o: 'sacoAdubo', x: 300, y: 420, s: 0.62, sb: 26 },
        { o: 'composteira', x: 380, y: 412, s: 0.7, sb: 30 },
        { o: 'mudas', x: 1180, y: 690, s: 0.55 },
        { o: 'carrinhoMao', x: 640, y: 760, s: 0.66, sb: 34 },
        { o: 'tesouraPoda', x: 420, y: 636, s: 0.42, r: 20 },
        { o: 'garrafaColeta', x: 1040, y: 600, s: 0.5, r: -10 },
        { o: 'fitaPh', x: 1240, y: 628, s: 0.42 },
        { o: 'sondaMulti', x: 1290, y: 572, s: 0.46 },
        { o: 'placaPonto', x: 1140, y: 520, s: 0.6 },
        { o: 'frascoColeta', x: 900, y: 742, s: 0.44, sb: 14 },
        { o: 'caixaTermica', x: 820, y: 640, s: 0.6, sb: 30 },
        { o: 'luvas', x: 1010, y: 814, s: 0.4, r: 30 },
        { o: 'botas', x: 540, y: 520, s: 0.52, sb: 26 },
        { o: 'balde', x: 760, y: 560, s: 0.5, sb: 20 },
        { o: 'regador', x: 210, y: 640, s: 0.5 },
        { o: 'chapeuPalha', x: 680, y: 462, s: 0.42 },
        { o: 'caderneta', x: 1180, y: 756, s: 0.4, r: -14 },
        { o: 'sapo', x: 1080, y: 690, s: 0.36 },
        { o: 'libelula', x: 1000, y: 460, s: 0.42, r: -16 },
        { o: 'gps', x: 1420, y: 640, s: 0.4, r: 12 },
        { o: 'trena', x: 560, y: 860, s: 0.46 },
        { o: 'mapa', x: 160, y: 820, s: 0.56, r: -10 },
      ],
    },
    mapas: {
      nome: 'Sala de Mapas', bg: mapasBg, fg: mapasFg, alvos: 12, luzes: [[800, 400, 440], [800, 210, 160]],
      slots: [
        { o: 'escalimetro', x: 860, y: 540, s: 0.48 },
        { o: 'compassoDesenho', x: 960, y: 520, s: 0.42, r: 20 },
        { o: 'transferidor', x: 540, y: 560, s: 0.42 },
        { o: 'mapaTopo', x: 1260, y: 420, s: 0.5 },
        { o: 'fotoAerea', x: 1030, y: 566, s: 0.4, r: 8 },
        { o: 'drone', x: 1460, y: 410, s: 0.5 },
        { o: 'alfinetes', x: 740, y: 562, s: 0.4 },
        { o: 'teodolito', x: 1150, y: 700, s: 0.72 },
        { o: 'mapaEnrolado', x: 640, y: 780, s: 0.55, r: 10 },
        { o: 'lapisCor', x: 1080, y: 520, s: 0.4 },
        { o: 'lupa', x: 600, y: 520, s: 0.42, r: -20 },
        { o: 'bussola', x: 480, y: 584, s: 0.36 },
        { o: 'gps', x: 1380, y: 560, s: 0.4 },
        { o: 'globo', x: 260, y: 640, s: 0.7 },
        { o: 'oculos', x: 700, y: 520, s: 0.32 },
        { o: 'trena', x: 1000, y: 830, s: 0.44 },
        { o: 'lapis', x: 820, y: 580, s: 0.36 },
        { o: 'telescopio', x: 980, y: 340, s: 0.55, r: 6 },
        { o: 'caderneta', x: 1500, y: 650, s: 0.4, r: 8 },
        { o: 'camera', x: 360, y: 820, s: 0.42 },
        { o: 'carimbo', x: 1250, y: 650, s: 0.36 },
        { o: 'castical', x: 1110, y: 455, s: 0.42 },
      ],
    },
    jantar: {
      nome: 'Sala de Jantar', bg: jantarBg, fg: jantarFg, alvos: 12, luzes: [[800, 80, 440], [290, 448, 140]],
      slots: [
        { o: 'notebook', x: 800, y: 600, s: 0.6 },
        { o: 'pendrive', x: 900, y: 640, s: 0.34 },
        { o: 'cracha', x: 1110, y: 630, s: 0.4, r: 10 },
        { o: 'jarra', x: 700, y: 580, s: 0.46 },
        { o: 'bule', x: 1050, y: 576, s: 0.46 },
        { o: 'talheres', x: 480, y: 610, s: 0.36, r: 20 },
        { o: 'caneta', x: 1260, y: 640, s: 0.38 },
        { o: 'agenda', x: 560, y: 650, s: 0.4, r: -10 },
        { o: 'relatorio', x: 940, y: 590, s: 0.46, r: 6 },
        { o: 'sineta', x: 360, y: 640, s: 0.36 },
        { o: 'xicara', x: 1180, y: 586, s: 0.36 },
        { o: 'taca', x: 640, y: 590, s: 0.32 },
        { o: 'castical', x: 290, y: 448, s: 0.42 },
        { o: 'vaso', x: 1240, y: 420, s: 0.0001 },
        { o: 'oculos', x: 1000, y: 650, s: 0.32 },
        { o: 'calculadora', x: 1330, y: 660, s: 0.34, r: 12 },
        { o: 'pasta', x: 240, y: 556, s: 0.46 },
        { o: 'carimbo', x: 420, y: 560, s: 0.32 },
        { o: 'relogioBolso', x: 860, y: 668, s: 0.3 },
        { o: 'convite', x: 1180, y: 664, s: 0.36, r: -8 },
        { o: 'mapa', x: 1510, y: 820, s: 0.5, r: 8 },
        { o: 'fotoAerea', x: 600, y: 860, s: 0.0001 },
        { o: 'camera', x: 1480, y: 600, s: 0.4 },
      ],
    },
  });

  // ---------- mais objetos nas cenas das missões 1 a 6 ----------
  const extras = {
    hall: [
      { o: 'pendrive', x: 1290, y: 486, s: 0.34 },
      { o: 'tesouraPoda', x: 440, y: 700, s: 0.4, r: 30 },
      { o: 'mapaEnrolado', x: 560, y: 726, s: 0.48, r: 8 },
      { o: 'caneta', x: 594, y: 500, s: 0.32, r: 60 },
      { o: 'agenda', x: 1410, y: 392, s: 0.36, r: 10 },
    ],
    pier: [
      { o: 'sondaMulti', x: 262, y: 772, s: 0.44 },
      { o: 'garrafaColeta', x: 1006, y: 604, s: 0.42 },
      { o: 'fitaPh', x: 472, y: 506, s: 0.36 },
      { o: 'mudas', x: 240, y: 872, s: 0.46 },
    ],
    escritorio: [
      { o: 'agenda', x: 1396, y: 300, s: 0.38 },
      { o: 'pendrive', x: 760, y: 790, s: 0.36 },
      { o: 'fotoAerea', x: 1266, y: 322, s: 0.5, r: -4 },
      { o: 'escalimetro', x: 604, y: 446, s: 0.42 },
      { o: 'lapisCor', x: 120, y: 74, s: 0.36 },
    ],
    biblioteca: [
      { o: 'mapaEnrolado', x: 820, y: 540, s: 0.42, r: -6 },
      { o: 'fotoAerea', x: 340, y: 226, s: 0.38 },
      { o: 'lapisCor', x: 420, y: 424, s: 0.32 },
      { o: 'transferidor', x: 1546, y: 336, s: 0.34 },
      { o: 'compassoDesenho', x: 1530, y: 524, s: 0.36 },
      { o: 'caneta', x: 706, y: 612, s: 0.36, r: 70 },
    ],
    laboratorio: [
      { o: 'fitaPh', x: 602, y: 504, s: 0.38 },
      { o: 'sondaMulti', x: 1160, y: 790, s: 0.44 },
      { o: 'garrafaColeta', x: 322, y: 802, s: 0.44 },
      { o: 'pendrive', x: 520, y: 774, s: 0.32 },
      { o: 'notebook', x: 210, y: 500, s: 0.44 },
    ],
    salao: [
      { o: 'cracha', x: 300, y: 515, s: 0.38, r: -20 },
      { o: 'sineta', x: 762, y: 452, s: 0.32 },
      { o: 'jarra', x: 1384, y: 680, s: 0.38 },
      { o: 'talheres', x: 1300, y: 712, s: 0.32, r: 30 },
      { o: 'caneta', x: 624, y: 506, s: 0.34, r: 80 },
    ],
  };
  Object.entries(extras).forEach(([id, lista]) => {
    const c = MI.CENAS[id];
    c.slots = c.slots.concat(lista);
    c.alvos = 12;
  });
  Object.values(MI.CENAS).forEach((c) => { c.slots = c.slots.filter((s) => s.s > 0.01); });
})();
