/* =========================================================
   Objetos ocultos das missões 7, 8 e 9 (horta e córrego,
   sala de mapas e sala de jantar), também usados para
   enriquecer as cenas das primeiras missões.
   ========================================================= */
(function () {
  'use strict';
  const MI = window.MI;
  const K = 'stroke="#2b1d12" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"';
  const KF = 'stroke="#2b1d12" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"';

  Object.assign(MI.OBJETOS, {
    // ---------------- horta e córrego ----------------
    enxada: {
      nome: 'Enxada', def: 'Ferramenta para capinar e revolver a terra dos canteiros.', r: 46,
      svg: `<line x1="-30" y1="44" x2="22" y2="-30" stroke="#8a5a2b" stroke-width="6" stroke-linecap="round"/>
        <path d="M14 -40 L46 -22 L40 -8 L8 -26 Z" fill="#8e9aa3" ${K}/><rect x="14" y="-36" width="10" height="10" rx="2" fill="#5a646b" transform="rotate(30 19 -31)"/>`,
    },
    sacoAdubo: {
      nome: 'Saco de adubo', def: 'Fertilizante com nitrogênio e fósforo; em excesso, pode ser levado pela chuva até a água.', r: 44,
      svg: `<path d="M-30 -36 Q0 -46 30 -36 L36 38 Q0 46 -36 38 Z" fill="#e8d6a8" ${K}/>
        <path d="M-30 -36 Q0 -28 30 -36" fill="none" ${KF}/>
        <rect x="-22" y="-14" width="44" height="30" rx="3" fill="#3f8a3f" ${KF}/>
        <text x="0" y="-1" font-size="10" font-weight="700" text-anchor="middle" font-family="sans-serif" fill="#fff">NPK</text>
        <text x="0" y="11" font-size="7" text-anchor="middle" font-family="sans-serif" fill="#fff">10-10-10</text>
        <path d="M-12 26 Q0 20 12 26" stroke="#7a6a50" stroke-width="2" fill="none"/>`,
    },
    composteira: {
      nome: 'Composteira', def: 'Caixa onde restos orgânicos viram adubo natural (composto).', r: 48,
      svg: `<rect x="-38" y="-24" width="76" height="60" rx="3" fill="#8a5a2f" ${K}/>
        ${[-14, 0, 14].map((y) => `<line x1="-38" y1="${y}" x2="38" y2="${y}" stroke="#5a3a1c" stroke-width="2"/>`).join('')}
        <path d="M-42 -24 L42 -24 L36 -38 L-36 -38 Z" fill="#6b4322" ${K}/>
        <path d="M-30 -38 Q-20 -50 -8 -40 Q2 -52 14 -40 Q24 -50 32 -38" fill="#4f7a2e" stroke="#2f4d1a" stroke-width="1.6"/>
        <circle cx="-16" cy="-44" r="4" fill="#d9572b"/><circle cx="18" cy="-42" r="3.5" fill="#f2c230"/>`,
    },
    mudas: {
      nome: 'Bandeja de mudas', def: 'Mudas de plantas nativas para recompor a mata ciliar.', r: 46,
      svg: `<path d="M-44 10 L44 10 L38 34 L-38 34 Z" fill="#2f2f33" ${K}/>
        ${[-30, -10, 10, 30].map((x) => `<rect x="${x - 8}" y="4" width="16" height="10" fill="#5a3a1c"/><path d="M${x} 6 Q${x - 2} -10 ${x - 12} -18 M${x} 6 Q${x + 4} -14 ${x + 12} -22 M${x} 6 L${x} -26" stroke="#3c8a3f" stroke-width="3" fill="none"/><ellipse cx="${x - 12}" cy="-20" rx="7" ry="4" fill="#5fb04a"/><ellipse cx="${x + 12}" cy="-24" rx="7" ry="4" fill="#5fb04a"/>`).join('')}`,
    },
    carrinhoMao: {
      nome: 'Carrinho de mão', def: 'Transporta terra, composto e mudas pela horta.', r: 50,
      svg: `<path d="M-40 -16 L30 -16 L18 16 L-30 16 Z" fill="#2f78c4" ${K}/>
        <circle cx="-4" cy="28" r="12" fill="#2b2b2b" ${K}/><circle cx="-4" cy="28" r="4" fill="#bbb"/>
        <path d="M24 -10 L54 -24 M18 10 L50 -2" stroke="#8a5a2b" stroke-width="5" stroke-linecap="round"/>
        <path d="M-26 16 L-30 34 M10 16 L14 34" stroke="#555" stroke-width="3"/>
        <path d="M-36 -16 Q-20 -30 0 -22 Q16 -32 28 -16 Z" fill="#6b4a2a"/>`,
    },
    tesouraPoda: {
      nome: 'Tesoura de poda', def: 'Corta galhos e folhas secas das plantas.', r: 38,
      svg: `<path d="M-6 -4 L-40 30 Q-46 36 -38 40 L-4 6 Z" fill="#c43c32" ${K}/>
        <path d="M6 -4 L40 30 Q46 36 38 40 L4 6 Z" fill="#c43c32" ${K}/>
        <path d="M-4 -2 L-14 -40 L-4 -34 Z M4 -2 L14 -40 L4 -34 Z" fill="#b8bec4" ${K}/>
        <circle cx="0" cy="0" r="5" fill="#555" ${KF}/>`,
    },
    garrafaColeta: {
      nome: 'Amostrador de garrafa', def: 'Garrafa presa a uma corda para coletar água em pontos de difícil acesso.', r: 42,
      svg: `<path d="M8 -46 C30 -50 40 -30 32 -10" fill="none" stroke="#c9a24a" stroke-width="3"/>
        <rect x="-8" y="-44" width="16" height="10" rx="2" fill="#2f78c4" ${K}/>
        <path d="M-8 -34 L-8 -26 Q-20 -20 -20 -8 L-20 34 Q-20 42 -12 42 L12 42 Q20 42 20 34 L20 -8 Q20 -20 8 -26 L8 -34 Z" fill="#dff1fb" fill-opacity=".85" ${K}/>
        <path d="M-19 4 L19 4 L19 34 Q19 40 12 40 L-12 40 Q-19 40 -19 34 Z" fill="#8fbf7a" fill-opacity=".85"/>
        <rect x="-14" y="-6" width="28" height="10" fill="#fff6c9" ${KF}/>`,
    },
    fitaPh: {
      nome: 'Fitas de pH', def: 'Papel indicador que muda de cor conforme a acidez da água.', r: 40,
      svg: `<rect x="-34" y="-30" width="50" height="62" rx="4" fill="#f2f2ee" ${K}/>
        <g>${['#d23b2e', '#e8762c', '#f2c230', '#8bc34a', '#3c8a3f', '#2f78c4', '#5b3a8a'].map((c, i) => `<rect x="-28" y="${-24 + i * 8}" width="38" height="6" fill="${c}"/>`).join('')}</g>
        <g transform="rotate(18 30 0)"><rect x="24" y="-34" width="8" height="64" rx="2" fill="#fff" ${KF}/><rect x="24" y="10" width="8" height="12" fill="#8bc34a"/></g>`,
    },
    sondaMulti: {
      nome: 'Sonda multiparâmetro', def: 'Mede ao mesmo tempo temperatura, pH, condutividade e oxigênio dissolvido.', r: 46,
      svg: `<rect x="-30" y="-40" width="40" height="58" rx="8" fill="#2f3a46" ${K}/>
        <rect x="-24" y="-34" width="28" height="24" rx="2" fill="#bfe3c8" ${KF}/>
        <text x="-10" y="-25" font-size="6.5" text-anchor="middle" font-family="monospace" fill="#173">pH 7.2</text>
        <text x="-10" y="-15" font-size="6.5" text-anchor="middle" font-family="monospace" fill="#173">OD 3.4</text>
        <circle cx="-18" cy="2" r="4" fill="#2f78c4"/><circle cx="-2" cy="2" r="4" fill="#e1642e"/>
        <path d="M-10 18 C-10 34 26 28 30 40" fill="none" stroke="#222" stroke-width="3"/>
        <rect x="24" y="36" width="14" height="14" rx="3" fill="#9aa3a8" ${K}/>`,
    },
    placaPonto: { nome: 'Placa de ponto de coleta', def: 'Placa que identifica e marca um ponto de coleta no campo.', r: 42,
      svg: `<line x1="0" y1="-8" x2="0" y2="46" stroke="#8a5a2b" stroke-width="6" stroke-linecap="round"/>
        <rect x="-32" y="-40" width="64" height="36" rx="4" fill="#f2c230" ${K}/>
        <text x="0" y="-15" font-size="18" font-weight="800" text-anchor="middle" font-family="sans-serif" fill="#2b1d12">C2</text>`,
    },

    // ---------------- sala de mapas ----------------
    escalimetro: {
      nome: 'Escalímetro', def: 'Régua triangular com várias escalas para medir distâncias em mapas e plantas.', r: 46,
      svg: `<g transform="rotate(-24)"><path d="M-48 -8 L48 -8 L48 8 L-48 8 Z" fill="#f4f1e6" ${K}/><path d="M-48 8 L48 8 L44 14 L-44 14 Z" fill="#d9d2bf" ${KF}/>
        <g stroke="#2b1d12" stroke-width="1.2">${Array.from({ length: 19 }, (_, i) => `<line x1="${-44 + i * 4.9}" y1="-8" x2="${-44 + i * 4.9}" y2="${i % 5 ? -3 : 1}"/>`).join('')}</g>
        <text x="30" y="5" font-size="6" font-family="monospace" fill="#c0392b">1:100</text></g>`,
    },
    compassoDesenho: {
      nome: 'Compasso', def: 'Instrumento de desenho para traçar círculos e transportar medidas no mapa.', r: 40,
      svg: `<circle cx="0" cy="-36" r="6" fill="#c9a03a" ${K}/>
        <path d="M-2 -32 L-24 36 M2 -32 L22 30" stroke="#8e9aa3" stroke-width="5" stroke-linecap="round"/>
        <path d="M22 30 L26 42" stroke="#2b2b2b" stroke-width="3"/><path d="M-24 36 L-26 44" stroke="#555" stroke-width="2"/>
        <path d="M-14 4 L12 4" stroke="#8e9aa3" stroke-width="2.5"/>`,
    },
    transferidor: {
      nome: 'Transferidor', def: 'Mede ângulos, usado para orientar direções no mapa.', r: 44,
      svg: `<path d="M-44 20 A44 44 0 0 1 44 20 Z" fill="#cfe8f3" fill-opacity=".8" ${K}/>
        <path d="M-30 20 A30 30 0 0 1 30 20" fill="none" stroke="#5b8aa8" stroke-width="1.4"/>
        <g stroke="#2b1d12" stroke-width="1.2">${Array.from({ length: 13 }, (_, i) => { const a = Math.PI - (i / 12) * Math.PI; return `<line x1="${(Math.cos(a) * 38).toFixed(1)}" y1="${(20 - Math.sin(a) * 38).toFixed(1)}" x2="${(Math.cos(a) * 44).toFixed(1)}" y2="${(20 - Math.sin(a) * 44).toFixed(1)}"/>`; }).join('')}</g>
        <circle cx="0" cy="20" r="3" fill="#c0392b"/>`,
    },
    mapaTopo: {
      nome: 'Mapa topográfico', def: 'Mapa com curvas de nível, que mostram o relevo e para onde a água escoa.', r: 48,
      svg: `<rect x="-44" y="-34" width="88" height="68" rx="2" fill="#f4ecd2" ${K}/>
        <g fill="none" stroke="#a8742a" stroke-width="1.6"><ellipse cx="-6" cy="-4" rx="34" ry="24"/><ellipse cx="-8" cy="-6" rx="24" ry="16"/><ellipse cx="-10" cy="-8" rx="13" ry="8"/></g>
        <path d="M-40 26 Q-8 10 10 16 Q26 22 40 4" stroke="#3f86c8" stroke-width="3" fill="none"/>
        <text x="28" y="-22" font-size="8" font-family="serif" fill="#7a5a2a">820</text>`,
    },
    fotoAerea: {
      nome: 'Foto aérea antiga', def: 'Fotografia tirada do alto, usada para comparar o uso do solo ao longo do tempo.', r: 44,
      svg: `<rect x="-38" y="-34" width="76" height="68" fill="#fbf6e6" ${K} transform="rotate(-6)"/>
        <g transform="rotate(-6)"><rect x="-32" y="-28" width="64" height="48" fill="#7c8a6a"/>
        <path d="M-32 0 Q-10 -10 4 2 Q18 12 32 0 L32 20 L-32 20 Z" fill="#5f6f52"/>
        <ellipse cx="10" cy="-10" rx="12" ry="8" fill="#9fb3c0"/>
        ${[[-24, -20], [-14, -22], [-20, -12]].map(([x, y]) => `<rect x="${x}" y="${y}" width="6" height="5" fill="#d8d0b8"/>`).join('')}
        <text x="0" y="30" font-size="8" text-anchor="middle" font-family="serif" fill="#5a4a36">1962</text></g>`,
    },
    drone: {
      nome: 'Drone', def: 'Aeronave pequena, controlada a distância, que fotografa e mapeia áreas do alto.', r: 48,
      svg: `<rect x="-16" y="-8" width="32" height="18" rx="6" fill="#e9ecef" ${K}/>
        <path d="M-14 -4 L-36 -20 M14 -4 L36 -20 M-14 6 L-36 22 M14 6 L36 22" stroke="#555" stroke-width="4"/>
        ${[[-36, -20], [36, -20], [-36, 22], [36, 22]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="16" ry="4" fill="#9fd0ea" fill-opacity=".7" ${KF}/><circle cx="${x}" cy="${y}" r="3" fill="#333"/>`).join('')}
        <circle cx="0" cy="14" r="5" fill="#2f2f33" ${KF}/>`,
    },
    alfinetes: {
      nome: 'Alfinetes de mapa', def: 'Marcam os pontos de coleta e de interesse sobre o mapa.', r: 38,
      svg: `<rect x="-30" y="0" width="60" height="30" rx="4" fill="#d79a3c" ${K}/>
        ${[[-18, '#c0392b'], [-4, '#2f78c4'], [10, '#3c8a3f'], [22, '#f2c230']].map(([x, c], i) => `<line x1="${x}" y1="2" x2="${x - 4 + i * 2}" y2="-26" stroke="#888" stroke-width="2"/><circle cx="${x - 4 + i * 2}" cy="-30" r="7" fill="${c}" ${KF}/>`).join('')}`,
    },
    teodolito: {
      nome: 'Teodolito', def: 'Instrumento de topografia que mede ângulos para levantar o terreno.', r: 48,
      svg: `<path d="M0 6 L-30 48 M0 6 L30 48 M0 6 L0 48" stroke="#c9a03a" stroke-width="4" stroke-linecap="round"/>
        <rect x="-14" y="-6" width="28" height="12" rx="2" fill="#555" ${K}/>
        <rect x="-12" y="-40" width="24" height="34" rx="4" fill="#f2c230" ${K}/>
        <rect x="-26" y="-32" width="18" height="10" rx="3" fill="#2f2f33" ${K}/><circle cx="-26" cy="-27" r="4" fill="#9fd0ea"/>`,
    },
    mapaEnrolado: {
      nome: 'Mapa enrolado', def: 'Mapa guardado em rolo para não amassar.', r: 44,
      svg: `<g transform="rotate(-20)"><rect x="-40" y="-10" width="80" height="20" fill="#efe2b8" ${K}/>
        <ellipse cx="-40" cy="0" rx="5" ry="10" fill="#e2d2a2" ${K}/><ellipse cx="40" cy="0" rx="5" ry="10" fill="#e2d2a2" ${K}/>
        <path d="M-10 -10 L-10 10 M8 -10 L8 10" stroke="#c0392b" stroke-width="3"/></g>`,
    },
    lapisCor: {
      nome: 'Lápis de cor', def: 'Usados para colorir a legenda e as áreas do mapa.', r: 40,
      svg: `${['#c0392b', '#f2c230', '#3c8a3f', '#2f78c4'].map((c, i) => `<g transform="translate(${-18 + i * 12} 0) rotate(${-10 + i * 6})"><rect x="-4" y="-34" width="8" height="54" fill="${c}" ${KF}/><path d="M-4 20 L0 32 L4 20 Z" fill="#f2d6a8" ${KF}/><path d="M-1.5 27 L0 32 L1.5 27 Z" fill="${c}"/></g>`).join('')}`,
    },

    // ---------------- sala de jantar ----------------
    notebook: {
      nome: 'Notebook', def: 'Computador portátil onde o relatório técnico é escrito e revisado.', r: 48,
      svg: `<path d="M-34 -32 L34 -32 L34 14 L-34 14 Z" fill="#3a3f46" ${K}/>
        <rect x="-28" y="-26" width="56" height="34" fill="#cfe6ef"/>
        <rect x="-22" y="-20" width="30" height="4" fill="#5b7a8a"/><rect x="-22" y="-12" width="40" height="3" fill="#8aa6b4"/><rect x="-22" y="-6" width="36" height="3" fill="#8aa6b4"/>
        <path d="M-44 14 L44 14 L48 24 L-48 24 Z" fill="#9aa3a8" ${K}/>`,
    },
    pendrive: {
      nome: 'Pen drive', def: 'Guarda uma cópia de segurança dos dados e do relatório.', r: 32,
      svg: `<g transform="rotate(-30)"><rect x="-24" y="-10" width="36" height="20" rx="5" fill="#c43c32" ${K}/><rect x="12" y="-6" width="14" height="12" fill="#b8bec4" ${K}/><rect x="16" y="-3" width="3" height="3" fill="#555"/><rect x="21" y="-3" width="3" height="3" fill="#555"/><circle cx="-16" cy="0" r="3" fill="none" stroke="#fff" stroke-width="1.6"/></g>`,
    },
    cracha: {
      nome: 'Crachá', def: 'Identificação da analista do órgão ambiental na reunião.', r: 40,
      svg: `<path d="M-14 -46 L0 -26 L14 -46" fill="none" stroke="#2f78c4" stroke-width="4"/>
        <rect x="-24" y="-26" width="48" height="62" rx="5" fill="#fff" ${K}/>
        <rect x="-24" y="-26" width="48" height="14" rx="5" fill="#2a8a86"/>
        <circle cx="0" cy="2" r="9" fill="#e8c19c" ${KF}/><path d="M-12 22 Q0 10 12 22" fill="#5a6b8a"/>
        <rect x="-16" y="26" width="32" height="4" fill="#9a948a"/>`,
    },
    jarra: {
      nome: 'Jarra de água', def: 'Jarra de vidro servida durante a reunião.', r: 40,
      svg: `<path d="M-20 -36 L18 -36 L22 -26 Q26 0 20 32 Q0 40 -20 32 Q-26 0 -22 -26 Z" fill="#dff1fb" fill-opacity=".85" ${K}/>
        <path d="M-22 -6 Q0 0 22 -6 L20 32 Q0 40 -20 32 Z" fill="#9fd0ea" fill-opacity=".7"/>
        <path d="M22 -24 Q38 -18 30 6 Q26 14 20 14" fill="none" stroke="#2b1d12" stroke-width="4"/>
        <path d="M-12 -28 Q-16 -10 -12 10" stroke="#fff" stroke-width="3" fill="none"/>`,
    },
    bule: {
      nome: 'Bule de chá', def: 'Bule de porcelana da família Ipê.', r: 44,
      svg: `<ellipse cx="0" cy="8" rx="30" ry="24" fill="#f4f1ea" ${K}/>
        <path d="M-30 4 Q-48 -6 -46 -22" fill="none" stroke="#2b1d12" stroke-width="5"/>
        <path d="M28 -2 Q44 0 40 20 Q36 28 26 24" fill="none" stroke="#2b1d12" stroke-width="5"/>
        <ellipse cx="0" cy="-14" rx="16" ry="5" fill="#e8e1d2" ${K}/><circle cx="0" cy="-22" r="5" fill="#c9a03a" ${KF}/>
        <path d="M-20 8 Q0 18 20 8" stroke="#3f6fb5" stroke-width="3" fill="none"/>`,
    },
    talheres: {
      nome: 'Talheres de prata', def: 'Garfo e faca do faqueiro antigo da mansão.', r: 40,
      svg: `<g transform="rotate(-12)"><rect x="-16" y="-10" width="5" height="52" rx="2" fill="#c9ced3" ${KF}/>
        <path d="M-20 -44 L-20 -18 Q-20 -10 -13 -10 Q-6 -10 -6 -18 L-6 -44 M-15.5 -44 L-15.5 -22 M-10.5 -44 L-10.5 -22" fill="none" stroke="#9aa3a8" stroke-width="2.4"/>
        <path d="M10 -44 Q22 -30 18 -2 L12 -2 Z" fill="#dde2e6" ${KF}/><rect x="10" y="-2" width="6" height="44" rx="2" fill="#c9ced3" ${KF}/></g>`,
    },
    caneta: {
      nome: 'Caneta-tinteiro', def: 'Usada para assinar o parecer técnico.', r: 38,
      svg: `<g transform="rotate(35)"><rect x="-6" y="-40" width="12" height="56" rx="5" fill="#1f2a44" ${K}/>
        <rect x="-6" y="-18" width="12" height="4" fill="#c9a03a"/><path d="M-6 16 L0 38 L6 16 Z" fill="#c9a03a" ${KF}/><line x1="0" y1="20" x2="0" y2="34" stroke="#2b1d12" stroke-width="1"/>
        <rect x="4" y="-36" width="3" height="20" fill="#c9a03a"/></g>`,
    },
    agenda: {
      nome: 'Agenda', def: 'Registra as datas das próximas campanhas de monitoramento.', r: 40,
      svg: `<rect x="-30" y="-36" width="60" height="72" rx="4" fill="#7a2335" ${K}/>
        <rect x="-24" y="-30" width="48" height="60" fill="#fbf8ee" ${KF}/>
        <rect x="-24" y="-30" width="48" height="12" fill="#c0392b"/>
        <g fill="#9a948a">${[0, 1, 2, 3].map((r) => [0, 1, 2, 3, 4].map((c) => `<rect x="${-20 + c * 9}" y="${-12 + r * 10}" width="6" height="6"/>`).join('')).join('')}</g>
        <rect x="-2" y="-2" width="6" height="6" fill="#3c8a3f"/>`,
    },
    relatorio: {
      nome: 'Relatório técnico', def: 'Documento com objetivo, métodos, resultados, discussão, limites e recomendações.', r: 46,
      svg: `<rect x="-30" y="-40" width="60" height="80" rx="3" fill="#1f6f6b" ${K}/>
        <rect x="-36" y="-40" width="10" height="80" rx="2" fill="#174f4c" ${K}/>
        <rect x="-20" y="-28" width="44" height="22" fill="#fbf8ee" ${KF}/>
        <text x="2" y="-19" font-size="7" font-weight="700" text-anchor="middle" font-family="sans-serif" fill="#1f3a5a">RELATÓRIO</text>
        <text x="2" y="-10" font-size="6" text-anchor="middle" font-family="sans-serif" fill="#1f3a5a">Lago do Ipê</text>
        <g stroke="#cfe0d7" stroke-width="2">${[8, 16, 24].map((y) => `<line x1="-18" y1="${y}" x2="22" y2="${y}"/>`).join('')}</g>`,
    },
    sineta: {
      nome: 'Sineta de mesa', def: 'Sininho usado para chamar a atenção e abrir a reunião.', r: 34,
      svg: `<path d="M-24 22 Q-24 -18 0 -20 Q24 -18 24 22 Z" fill="#d6b24a" ${K}/>
        <rect x="-30" y="20" width="60" height="8" rx="3" fill="#b8902e" ${K}/>
        <line x1="0" y1="-20" x2="0" y2="-36" stroke="#5a3a1c" stroke-width="5" stroke-linecap="round"/><circle cx="0" cy="-38" r="6" fill="#7a4a24" ${KF}/>
        <path d="M-12 -4 Q-14 8 -12 16" stroke="#fff6c4" stroke-width="3" fill="none"/>`,
    },
  });
})();
