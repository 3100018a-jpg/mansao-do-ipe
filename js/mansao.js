/* =========================================================
   Fachada da mansão (mapa principal) com restauração.
   estado: { feitos: {hall:true,...}, rest: {ipe:true,...} }
   ========================================================= */
(function () {
  'use strict';
  const MI = window.MI;
  const U = MI.U;
  const K = 'stroke="#2b1d12" stroke-width="2.2" stroke-linejoin="round"';

  // posição dos medalhões dos capítulos (em % da cena 1600×900)
  MI.PONTOS_MANSAO = {
    hall: { x: 800, y: 560 },
    escritorio: { x: 575, y: 520 },
    biblioteca: { x: 575, y: 330 },
    salao: { x: 800, y: 300 },
    laboratorio: { x: 1020, y: 690 },
    pier: { x: 1390, y: 660 },
    horta: { x: 350, y: 815 },
    mapas: { x: 1105, y: 168 },
    jantar: { x: 1115, y: 525 },
  };

  function janela(x, y, w, h, acesa, arco, vitral) {
    const vidro = vitral ? 'url(#gVitral)' : acesa ? '#ffd877' : '#3a4a5e';
    const topo = arco ? `M${x} ${y + h} L${x} ${y + w / 2} Q${x} ${y} ${x + w / 2} ${y} Q${x + w} ${y} ${x + w} ${y + w / 2} L${x + w} ${y + h} Z` : `M${x} ${y} L${x + w} ${y} L${x + w} ${y + h} L${x} ${y + h} Z`;
    return `<path d="${topo}" fill="${vidro}" ${K}/>
      ${acesa && !vitral ? `<path d="${topo}" fill="url(#gLuzJanela)"/>` : ''}
      <path d="M${x + w / 2} ${y + (arco ? 4 : 0)} L${x + w / 2} ${y + h} M${x} ${y + h * 0.55} L${x + w} ${y + h * 0.55}" stroke="#efe6d2" stroke-width="5"/>
      <path d="${topo}" fill="none" stroke="#efe6d2" stroke-width="7"/>
      <rect x="${x - 8}" y="${y + h}" width="${w + 16}" height="10" fill="#d8c9a8" ${K}/>`;
  }

  MI.desenharMansao = function (estado) {
    const f = estado.feitos || {};
    const r = estado.rest || {};
    const recuperado = (r.mata_ciliar ? 1 : 0) + (r.jardim_chuva ? 1 : 0);
    const corLago = ['#6f9a5a', '#679e72', '#5fa08a'][recuperado];
    const corLago2 = ['#55804a', '#4f8660', '#4a8a7a'][recuperado];
    let s = `<defs>
      <linearGradient id="gCeuM" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2d3a6b"/><stop offset=".45" stop-color="#c46a6a"/><stop offset=".8" stop-color="#f2b46a"/><stop offset="1" stop-color="#f7d49a"/></linearGradient>
      <linearGradient id="gLagoM" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${corLago}"/><stop offset="1" stop-color="${corLago2}"/></linearGradient>
      <linearGradient id="gGrama" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5f8a46"/><stop offset="1" stop-color="#3f6a34"/></linearGradient>
      <linearGradient id="gParede" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f1e2c6"/><stop offset="1" stop-color="#d9c29a"/></linearGradient>
      <linearGradient id="gTelhado" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a5a6a"/><stop offset="1" stop-color="#2f3a46"/></linearGradient>
      <radialGradient id="gLuzJanela" cx=".5" cy=".6" r=".6"><stop offset="0" stop-color="#fff6d0" stop-opacity=".9"/><stop offset="1" stop-color="#ffb84a" stop-opacity="0"/></radialGradient>
      <radialGradient id="gHalo" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffe7a0" stop-opacity=".7"/><stop offset="1" stop-color="#ffe7a0" stop-opacity="0"/></radialGradient>
      <linearGradient id="gOuro" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f3d27a"/><stop offset=".5" stop-color="#c99a3a"/><stop offset="1" stop-color="#8e6420"/></linearGradient>
      <linearGradient id="gVitral"x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e2533e"/><stop offset=".33" stop-color="#f2c230"/><stop offset=".66" stop-color="#3f86c8"/><stop offset="1" stop-color="#3c8a3f"/></linearGradient>
    </defs>`;
    // céu e estrelas
    s += `<rect width="1600" height="900" fill="url(#gCeuM)"/>`;
    const rnd = U.semente(5);
    for (let i = 0; i < 40; i++) s += `<circle cx="${(rnd() * 1600).toFixed(0)}" cy="${(rnd() * 220).toFixed(0)}" r="${(0.8 + rnd() * 1.6).toFixed(1)}" fill="#fff" opacity="${(0.4 + rnd() * 0.6).toFixed(2)}"/>`;
    s += `<circle cx="1320" cy="120" r="34" fill="#fbf3d6" opacity=".9"/>`;
    // morros
    s += `<path d="M0 470 Q260 380 520 440 Q800 360 1080 430 Q1340 370 1600 420 L1600 600 L0 600 Z" fill="#4a6a5a"/>
      <path d="M0 520 Q300 460 600 510 Q900 450 1200 500 Q1420 470 1600 490 L1600 640 L0 640 Z" fill="#3f6048"/>`;
    // gramado
    s += `<rect y="600" width="1600" height="300" fill="url(#gGrama)"/>`;
    // lago à direita
    s += `<path d="M1120 640 Q1300 600 1600 610 L1600 900 L1180 900 Q1080 800 1120 640 Z" fill="url(#gLagoM)" ${K}/>`;
    if (recuperado < 2) for (let i = 0; i < 12; i++) s += `<ellipse cx="${(1200 + rnd() * 380).toFixed(0)}" cy="${(650 + rnd() * 230).toFixed(0)}" rx="${(20 + rnd() * 50).toFixed(0)}" ry="${(5 + rnd() * 8).toFixed(0)}" fill="#a3b84a" opacity="${recuperado ? 0.15 : 0.3}"/>`;
    for (let i = 0; i < 10; i++) s += `<path d="M${(1220 + rnd() * 360).toFixed(0)} ${(660 + rnd() * 220).toFixed(0)} q16 -4 32 0" stroke="#fff" stroke-opacity=".35" stroke-width="2.4" fill="none"/>`;
    // píer
    s += `<path d="M1300 700 L1480 640 L1500 652 L1322 716 Z" fill="#9a6a3c" ${K}/>${[0, 1, 2, 3, 4].map((i) => `<rect x="${1310 + i * 40}" y="${708 - i * 13}" width="6" height="22" fill="#5a3a1c"/>`).join('')}`;
    // mata ciliar
    if (r.mata_ciliar) {
      [[1150, 640], [1200, 625], [1260, 616], [1135, 700], [1150, 770], [1180, 840]].forEach(([x, y], i) => {
        s += `<rect x="${x - 4}" y="${y - 6}" width="8" height="26" fill="#5a3a1c"/><circle cx="${x}" cy="${y - 20}" r="${22 + (i % 2) * 6}" fill="${i % 2 ? '#2f6b3a' : '#3c8248'}" ${K}/>`;
      });
    } else {
      s += `<path d="M1130 660 Q1150 700 1135 760" stroke="#9a7a4a" stroke-width="8" fill="none" opacity=".6"/>`;
    }
    // jardim de chuva
    if (r.jardim_chuva) {
      s += `<ellipse cx="1060" cy="820" rx="80" ry="26" fill="#6b4a2a" ${K}/><ellipse cx="1060" cy="822" rx="66" ry="18" fill="#7fae5a"/>`;
      for (let i = 0; i < 9; i++) s += `<circle cx="${1006 + i * 13}" cy="${814 - (i % 2) * 6}" r="7" fill="${['#e86a9a', '#f2c230', '#9a6ae0'][i % 3]}"/>`;
    }
    // boia
    if (r.boia) s += `<g transform="translate(1440 790)"><ellipse cx="0" cy="10" rx="22" ry="7" fill="#2f4a5a" opacity=".4"/><path d="M-14 8 L14 8 L10 -14 L-10 -14 Z" fill="#f2c230" ${K}/><rect x="-3" y="-40" width="6" height="28" fill="#555"/><circle cx="0" cy="-42" r="6" fill="#e2533e"><animate attributeName="opacity" values="1;.2;1" dur="2s" repeatCount="indefinite"/></circle></g>`;

    // ---------- mansão ----------
    // torre esquerda e direita
    s += `<rect x="430" y="210" width="130" height="430" fill="url(#gParede)" ${K}/><path d="M418 214 L495 110 L572 214 Z" fill="url(#gTelhado)" ${K}/><line x1="495" y1="110" x2="495" y2="80" stroke="#2b1d12" stroke-width="3"/><circle cx="495" cy="78" r="5" fill="url(#gOuro)"/>`;
    s += `<rect x="1040" y="210" width="130" height="430" fill="url(#gParede)" ${K}/><path d="M1028 214 L1105 110 L1182 214 Z" fill="url(#gTelhado)" ${K}/><line x1="1105" y1="110" x2="1105" y2="80" stroke="#2b1d12" stroke-width="3"/>`;
    // janela redonda da sala de mapas (torre direita)
    s += `<circle cx="1105" cy="250" r="24" fill="${f.mapas ? '#ffd877' : '#3a4a5e'}" stroke="#efe6d2" stroke-width="6"/><path d="M1105 228 L1105 272 M1083 250 L1127 250" stroke="#efe6d2" stroke-width="3"/>`;
    if (r.mirante) s += `<g transform="translate(1105 104)"><line x1="0" y1="0" x2="0" y2="-40" stroke="#5a3a1c" stroke-width="3"/><path d="M0 -40 L30 -32 L0 -24 Z" fill="#2a8a86"/></g><g transform="translate(1140 300) rotate(-25)"><rect x="-4" y="-4" width="34" height="8" rx="2" fill="#b8902e" stroke="#2b1d12" stroke-width="1.5"/></g>`;
    // corpo central
    s += `<rect x="540" y="240" width="520" height="400" fill="url(#gParede)" ${K}/>`;
    s += `<path d="M520 246 L800 150 L1080 246 Z" fill="url(#gTelhado)" ${K}/>`;
    s += `<circle cx="800" cy="205" r="22" fill="#efe6d2" ${K}/><text x="800" y="211" font-size="14" text-anchor="middle" font-family="Georgia,serif" fill="#3a2414">1928</text>`;
    // frisos
    s += `<rect x="530" y="430" width="540" height="14" fill="#d8c9a8" ${K}/><rect x="420" y="430" width="150" height="14" fill="#d8c9a8" ${K}/><rect x="1030" y="430" width="150" height="14" fill="#d8c9a8" ${K}/>`;
    // porão (base de pedra)
    s += `<rect x="420" y="640" width="760" height="56" fill="#8a8072" ${K}/>`;
    for (let x = 430; x < 1170; x += 60) s += `<path d="M${x} 640 L${x} 696" stroke="#6f6658" stroke-width="2"/>`;
    s += `<rect x="985" y="652" width="70" height="32" fill="${f.laboratorio ? '#ffd877' : '#2f3a46'}" ${K}/><path d="M1020 652 L1020 684" stroke="#efe6d2" stroke-width="4"/>`;
    s += `<rect x="545" y="652" width="70" height="32" fill="#2f3a46" ${K}/>`;
    // janelas do térreo
    s += janela(540, 470, 70, 110, f.escritorio, false);
    s += janela(460, 470, 70, 110, f.escritorio, false);
    s += janela(1000, 470, 70, 110, f.hall, false);
    s += janela(1080, 470, 70, 110, f.jantar, false);
    // janelas superiores
    s += janela(540, 290, 70, 110, f.biblioteca, true);
    s += janela(460, 290, 70, 110, f.biblioteca, true);
    s += janela(1080, 290, 70, 110, f.salao, true);
    s += janela(1000, 290, 70, 110, f.salao, true);
    s += janela(700, 270, 60, 130, f.salao, true, r.vitrais);
    s += janela(770, 260, 60, 140, f.salao, true, r.vitrais);
    s += janela(840, 270, 60, 130, f.salao, true, r.vitrais);
    // porta e alpendre
    s += `<rect x="680" y="450" width="240" height="16" fill="#d8c9a8" ${K}/>`;
    s += `<rect x="690" y="466" width="18" height="174" fill="#efe6d2" ${K}/><rect x="892" y="466" width="18" height="174" fill="#efe6d2" ${K}/>`;
    s += `<path d="M750 640 L750 520 Q750 486 800 486 Q850 486 850 520 L850 640 Z" fill="${f.hall ? '#6b4022' : '#4a2c16'}" ${K}/><path d="M800 490 L800 640" stroke="#2b1d12" stroke-width="2"/>`;
    s += `<path d="M760 520 Q760 496 800 496 Q840 496 840 520 Z" fill="${f.hall ? '#ffd877' : '#3a4a5e'}" ${K}/>`;
    s += `<path d="M700 640 L900 640 L930 668 L670 668 Z M680 668 L920 668 L940 696 L660 696 Z" fill="#d8c9a8" ${K}/>`;
    // caminho
    s += `<path d="M760 696 Q740 780 640 900 L960 900 Q860 780 840 696 Z" fill="#d6c4a0" ${K}/>`;
    // ipê
    const flor = r.ipe;
    s += `<path d="M300 700 Q296 600 310 540 M308 600 Q260 560 236 520 M310 580 Q360 540 380 500 M306 560 Q290 500 300 460" stroke="#4a2c16" stroke-width="14" fill="none" stroke-linecap="round"/>`;
    if (flor) for (let i = 0; i < 70; i++) s += `<circle cx="${(220 + rnd() * 180).toFixed(0)}" cy="${(420 + rnd() * 130).toFixed(0)}" r="${(10 + rnd() * 12).toFixed(0)}" fill="${['#f2c230', '#f7d54a', '#e0a81f'][i % 3]}"/>`;
    else for (let i = 0; i < 18; i++) s += `<circle cx="${(230 + rnd() * 160).toFixed(0)}" cy="${(440 + rnd() * 110).toFixed(0)}" r="${(6 + rnd() * 6).toFixed(0)}" fill="#7a8a4a" opacity=".7"/>`;
    // coreto
    if (r.coreto) {
      s += `<g transform="translate(150 720)"><path d="M-80 0 L0 -70 L80 0 Z" fill="#7a2335" ${K}/><rect x="-70" y="0" width="140" height="8" fill="#efe6d2" ${K}/>
        ${[-60, -20, 20, 60].map((x) => `<rect x="${x - 4}" y="8" width="8" height="70" fill="#efe6d2" ${K}/>`).join('')}
        <rect x="-86" y="78" width="172" height="16" fill="#d8c9a8" ${K}/><path d="M-64 50 L64 50" stroke="#efe6d2" stroke-width="4"/></g>`;
    }
    // fonte
    s += `<g transform="translate(640 770)"><ellipse cx="0" cy="20" rx="70" ry="20" fill="#cfc4ac" ${K}/><ellipse cx="0" cy="16" rx="58" ry="14" fill="${r.fonte ? '#7fb6df' : '#9a8a6a'}"/>
      <rect x="-8" y="-40" width="16" height="56" fill="#cfc4ac" ${K}/><ellipse cx="0" cy="-40" rx="26" ry="8" fill="#cfc4ac" ${K}/>
      ${r.fonte ? `<path d="M0 -48 Q-20 -70 -36 -20 M0 -48 Q20 -70 36 -20 M0 -48 L0 -76" stroke="#bfe0f2" stroke-width="4" fill="none" opacity=".9"><animate attributeName="opacity" values=".9;.5;.9" dur="1.6s" repeatCount="indefinite"/></path>` : ''}</g>`;
    // lampiões
    if (r.lampioes) {
      [[700, 760], [900, 760], [660, 860], [940, 860]].forEach(([x, y]) => {
        s += `<circle cx="${x}" cy="${y - 64}" r="46" fill="url(#gHalo)"/><rect x="${x - 3}" y="${y - 60}" width="6" height="62" fill="#2b2b2b"/><path d="M${x - 10} ${y - 58} L${x + 10} ${y - 58} L${x + 7} ${y - 78} L${x - 7} ${y - 78} Z" fill="#ffd877" ${K}/><path d="M${x - 9} ${y - 78} L${x} ${y - 88} L${x + 9} ${y - 78} Z" fill="#2b2b2b"/>`;
      });
    }
    // horta do Seu Benedito
    s += `<path d="M262 790 L452 790 L466 840 L248 840 Z" fill="#6b4a2a" ${K}/><path d="M244 850 L470 850 L482 890 L232 890 Z" fill="#6b4a2a" ${K}/>`;
    for (let i = 0; i < 8; i++) { s += `<circle cx="${272 + i * 24}" cy="815" r="${r.horta_agro ? 9 : 6}" fill="${r.horta_agro ? '#6fbf4a' : '#5f9a3a'}"/><circle cx="${258 + i * 28}" cy="870" r="${r.horta_agro ? 9 : 6}" fill="${r.horta_agro ? '#6fbf4a' : '#5f9a3a'}"/>`; }
    if (r.horta_agro) {
      s += `<rect x="470" y="780" width="46" height="40" fill="#8a5a2f" ${K}/><path d="M466 780 L520 780 L514 770 L472 770 Z" fill="#6b4322" ${K}/>`;
      for (let i = 0; i < 6; i++) s += `<circle cx="${280 + i * 32}" cy="${808 + (i % 2) * 4}" r="4" fill="${['#e86a9a', '#f2c230', '#d23b2e'][i % 3]}"/>`;
    }
    if (r.placas) {
      [[1170, 860], [1230, 640], [1560, 640]].forEach(([x, y]) => { s += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y - 34}" stroke="#5a3a1c" stroke-width="4"/><rect x="${x - 20}" y="${y - 54}" width="40" height="24" rx="3" fill="#f2c230" ${K}/><path d="M${x - 12} ${y - 42} L${x + 12} ${y - 42}" stroke="#2a8a86" stroke-width="3"/>`; });
    }
    // arbustos de primeiro plano
    [[420, 700], [480, 712], [1120, 704], [1180, 716]].forEach(([x, y], i) => { s += `<ellipse cx="${x}" cy="${y}" rx="46" ry="26" fill="${i % 2 ? '#3c7a3a' : '#2f6b3a'}" ${K}/>`; });
    return s;
  };
})();
