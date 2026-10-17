/* =========================================================
   Biblioteca de objetos ocultos (SVG desenhado à mão em código).
   Cada objeto é desenhado em torno de (0,0), cabendo em ±50.
   nome: aparece na lista; def: aparece no modo Definições; r: raio de toque.
   ========================================================= */
(function () {
  'use strict';
  const MI = window.MI;
  const K = 'stroke="#2b1d12" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"';
  const KF = 'stroke="#2b1d12" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"';

  const O = (MI.OBJETOS = {
    // ---------------- campo ----------------
    oximetro: {
      nome: 'Medidor de oxigênio', def: 'Aparelho com sonda que mede o oxigênio dissolvido na água, em mg/L.', r: 44,
      svg: `<path d="M2 26 C2 44 30 30 34 46" fill="none" stroke="#222" stroke-width="3.2"/>
        <rect x="28" y="42" width="11" height="18" rx="4" fill="#9aa3a8" ${K}/>
        <rect x="-24" y="-40" width="48" height="68" rx="9" fill="#f0bf2e" ${K}/>
        <rect x="-18" y="-33" width="36" height="22" rx="3" fill="#cfe9d3" ${KF}/>
        <text x="0" y="-16" font-size="13" font-weight="700" text-anchor="middle" font-family="monospace" fill="#1d4a2a">2.1</text>
        <circle cx="-9" cy="2" r="4.5" fill="#3d3d3d"/><circle cx="9" cy="2" r="4.5" fill="#3d3d3d"/>
        <rect x="-12" y="12" width="24" height="7" rx="3" fill="#c0392b"/>`,
    },
    termometro: {
      nome: 'Termômetro', def: 'Instrumento que mede a temperatura da água ou do ar, em graus Celsius.', r: 40,
      svg: `<rect x="-6" y="-46" width="12" height="78" rx="6" fill="#eef6fb" ${K}/>
        <circle cx="0" cy="38" r="10" fill="#d23b2e" ${K}/>
        <rect x="-2.2" y="-20" width="4.4" height="56" fill="#d23b2e"/>
        <g stroke="#2b1d12" stroke-width="1.3">${[-36, -28, -20, -12, -4, 4, 12, 20].map((y) => `<line x1="3" y1="${y}" x2="6" y2="${y}"/>`).join('')}</g>`,
    },
    frascoColeta: {
      nome: 'Frasco de coleta', def: 'Recipiente limpo e identificado usado para guardar a amostra de água.', r: 38,
      svg: `<rect x="-11" y="-46" width="22" height="13" rx="3" fill="#f4f4f0" ${K}/>
        <path d="M-9 -33 L-9 -26 C-22 -20 -22 -12 -22 -6 L-22 36 Q-22 44 -14 44 L14 44 Q22 44 22 36 L22 -6 C22 -12 22 -20 9 -26 L9 -33 Z" fill="#a8621f" fill-opacity="0.92" ${K}/>
        <rect x="-16" y="0" width="32" height="24" rx="2" fill="#fbf7ea" ${KF}/>
        <line x1="-11" y1="8" x2="11" y2="8" stroke="#6b5a45" stroke-width="2"/><line x1="-11" y1="15" x2="6" y2="15" stroke="#6b5a45" stroke-width="2"/>
        <path d="M-17 -10 Q-16 -18 -10 -22" stroke="#fff" stroke-opacity=".6" stroke-width="3" fill="none"/>`,
    },
    discoSecchi: {
      nome: 'Disco de Secchi', def: 'Disco preto e branco baixado por uma corda para medir a transparência da água.', r: 44,
      svg: `<path d="M0 -10 C4 -30 -6 -38 2 -50" fill="none" stroke="#8a6a3c" stroke-width="3"/>
        <ellipse cx="0" cy="10" rx="40" ry="26" fill="#fff" ${K}/>
        <path d="M0 10 L0 -16 A40 26 0 0 1 40 10 Z" fill="#1d1d1d"/>
        <path d="M0 10 L0 36 A40 26 0 0 1 -40 10 Z" fill="#1d1d1d"/>
        <ellipse cx="0" cy="10" rx="40" ry="26" fill="none" ${K}/>
        <circle cx="0" cy="10" r="4" fill="#c9a24a" ${KF}/>`,
    },
    gps: {
      nome: 'GPS', def: 'Receptor que informa as coordenadas geográficas (latitude e longitude) de um ponto.', r: 38,
      svg: `<rect x="10" y="-50" width="7" height="22" rx="3" fill="#333" ${KF}/>
        <rect x="-20" y="-34" width="40" height="72" rx="10" fill="#e1642e" ${K}/>
        <rect x="-14" y="-26" width="28" height="30" rx="3" fill="#bfe0e8" ${KF}/>
        <path d="M-14 -6 Q-4 -16 4 -8 T14 -14" stroke="#3d8a4a" stroke-width="2.4" fill="none"/>
        <path d="M2 -20 a4 4 0 1 1 0.1 0 M2 -16 L2 -10" stroke="#c0392b" stroke-width="2" fill="#c0392b"/>
        <circle cx="0" cy="18" r="7" fill="#3a3a3a" ${KF}/><rect x="-14" y="28" width="9" height="5" rx="2" fill="#333"/><rect x="5" y="28" width="9" height="5" rx="2" fill="#333"/>`,
    },
    caderneta: {
      nome: 'Caderneta de campo', def: 'Caderno resistente onde se anotam data, hora, local e observações no campo.', r: 40,
      svg: `<rect x="-28" y="-38" width="54" height="72" rx="4" fill="#3f6b3c" ${K}/>
        <rect x="-24" y="-38" width="4" height="72" fill="#2c4d2a"/>
        <rect x="14" y="-38" width="5" height="72" fill="#1a1a1a"/>
        <rect x="-14" y="-24" width="24" height="12" rx="2" fill="#efe6cc" ${KF}/>
        <path d="M30 -30 L40 -40 L46 -34 L36 -24 Z" fill="#f0c33c" ${KF}/><path d="M30 -30 L27 -21 L36 -24" fill="#e7c9a0" ${KF}/>
        <rect x="-28" y="-38" width="54" height="72" rx="4" fill="none" ${K}/>`,
    },
    prancheta: {
      nome: 'Prancheta', def: 'Base rígida com prendedor para apoiar fichas e formulários durante a coleta.', r: 44,
      svg: `<rect x="-30" y="-42" width="60" height="86" rx="5" fill="#b9814a" ${K}/>
        <rect x="-23" y="-30" width="46" height="66" fill="#fbf8ee" ${KF}/>
        <g stroke="#9bb3c9" stroke-width="2">${[-18, -9, 0, 9, 18, 27].map((y) => `<line x1="-17" y1="${y}" x2="17" y2="${y}"/>`).join('')}</g>
        <rect x="-12" y="-48" width="24" height="12" rx="3" fill="#b8bec4" ${K}/>`,
    },
    luvas: {
      nome: 'Luvas nitrílicas', def: 'Luvas descartáveis que protegem as mãos e evitam contaminar a amostra.', r: 42,
      svg: `<g transform="rotate(-14)"><path d="M-30 30 L-32 -2 L-34 -24 Q-34 -30 -29 -30 Q-25 -30 -25 -24 L-24 -10 L-24 -34 Q-24 -40 -19 -40 Q-14 -40 -14 -34 L-13 -12 L-12 -36 Q-12 -42 -7 -42 Q-2 -42 -2 -36 L-2 -10 L0 -30 Q1 -35 5 -34 Q9 -33 8 -28 L4 4 L4 30 Z" fill="#4d8fd6" ${K}/></g>
        <g transform="translate(22 6) rotate(18)"><path d="M-18 30 L-20 -2 L-22 -20 Q-22 -26 -17 -26 Q-13 -26 -13 -20 L-12 -8 L-12 -30 Q-12 -36 -7 -36 Q-2 -36 -2 -30 L-1 -10 L0 -30 Q0 -36 5 -36 Q10 -36 10 -30 L10 -8 L12 -24 Q13 -29 17 -28 Q21 -27 20 -22 L16 6 L16 30 Z" fill="#6aa6e6" ${K}/></g>`,
    },
    camera: {
      nome: 'Câmera fotográfica', def: 'Registra imagens do local, com data e hora, como apoio ao registro de campo.', r: 44,
      svg: `<rect x="-38" y="-20" width="76" height="46" rx="7" fill="#2f2f33" ${K}/>
        <rect x="-38" y="-6" width="76" height="20" fill="#7a5233"/>
        <rect x="-22" y="-30" width="22" height="12" rx="3" fill="#2f2f33" ${K}/>
        <circle cx="4" cy="3" r="19" fill="#c9ced3" ${K}/><circle cx="4" cy="3" r="12" fill="#22333d" ${KF}/><circle cx="0" cy="-1" r="4" fill="#9fd0ea"/>
        <rect x="24" y="-16" width="9" height="6" rx="2" fill="#f2f2f2"/>`,
    },
    etiqueta: {
      nome: 'Etiquetas', def: 'Identificam cada frasco com ponto, data, hora e parâmetro a analisar.', r: 36,
      svg: `<path d="M-30 -14 L18 -14 L34 0 L18 14 L-30 14 Z" fill="#fff6c9" ${K}/>
        <circle cx="16" cy="0" r="4" fill="#fff" ${KF}/>
        <path d="M20 0 C34 -20 40 10 48 -12" fill="none" stroke="#c0392b" stroke-width="2.2"/>
        <line x1="-24" y1="-5" x2="6" y2="-5" stroke="#7a6a50" stroke-width="2"/><line x1="-24" y1="4" x2="0" y2="4" stroke="#7a6a50" stroke-width="2"/>
        <path d="M-34 6 L10 26 L20 16 L-26 -4 Z" fill="#d9f1ff" ${KF}/>`,
    },
    trena: {
      nome: 'Trena', def: 'Fita métrica usada para medir distâncias e profundidades.', r: 38,
      svg: `<path d="M18 10 L52 10 L52 18 L18 18 Z" fill="#f4d23a" ${KF}/>
        <g stroke="#2b1d12" stroke-width="1.2">${[24, 30, 36, 42, 48].map((x) => `<line x1="${x}" y1="10" x2="${x}" y2="14"/>`).join('')}</g>
        <rect x="-30" y="-26" width="52" height="50" rx="12" fill="#f0b81f" ${K}/>
        <circle cx="-4" cy="-1" r="14" fill="#2d2d2d" ${K}/><circle cx="-4" cy="-1" r="4" fill="#bbb"/>
        <rect x="-26" y="14" width="12" height="7" rx="2" fill="#c0392b"/>`,
    },
    caixaTermica: {
      nome: 'Caixa térmica', def: 'Mantém as amostras refrigeradas, com gelo, até a chegada ao laboratório.', r: 46,
      svg: `<rect x="-42" y="-14" width="84" height="50" rx="7" fill="#2f78c4" ${K}/>
        <rect x="-46" y="-28" width="92" height="18" rx="6" fill="#f2f2f0" ${K}/>
        <path d="M-18 -28 L-18 -40 Q-18 -44 -14 -44 L14 -44 Q18 -44 18 -40 L18 -28" fill="none" ${K}/>
        <rect x="-30" y="2" width="60" height="18" rx="3" fill="#f2f2f0" ${KF}/>
        <text x="0" y="15" font-size="11" font-weight="700" text-anchor="middle" font-family="sans-serif" fill="#2f78c4">AMOSTRAS</text>`,
    },
    balde: {
      nome: 'Balde', def: 'Recipiente usado em coletas de superfície e para transportar materiais.', r: 40,
      svg: `<path d="M-30 -24 Q0 -58 30 -24" fill="none" stroke="#666" stroke-width="3"/>
        <path d="M-32 -22 L-24 38 Q0 46 24 38 L32 -22 Z" fill="#9aa8b4" ${K}/>
        <ellipse cx="0" cy="-22" rx="32" ry="8" fill="#6d7c88" ${K}/>
        <path d="M-28 4 Q0 12 28 4" fill="none" stroke="#6d7c88" stroke-width="2.4"/>`,
    },
    puca: {
      nome: 'Puçá (rede de mão)', def: 'Rede com cabo usada para coletar organismos aquáticos e folhas da superfície.', r: 46,
      svg: `<line x1="-46" y1="40" x2="4" y2="-6" stroke="#8a5a2b" stroke-width="5" stroke-linecap="round"/>
        <ellipse cx="18" cy="-20" rx="24" ry="16" fill="none" stroke="#555" stroke-width="3" transform="rotate(-40 18 -20)"/>
        <path d="M4 -6 Q10 30 30 10 Q44 -6 34 -36" fill="#e9e1cf" fill-opacity="0.55" stroke="#6b6b6b" stroke-width="1.4"/>
        <g stroke="#8b8b8b" stroke-width="0.9" fill="none"><path d="M10 0 Q20 10 32 -10"/><path d="M8 10 Q20 20 34 -2"/><path d="M14 -12 L22 18"/><path d="M24 -22 L30 10"/></g>`,
    },
    botas: {
      nome: 'Botas de borracha', def: 'Calçado impermeável para entrar com segurança nas margens e na água rasa.', r: 46,
      svg: `<path d="M-40 -34 L-16 -34 L-16 22 L4 26 Q8 40 -4 40 L-42 40 Q-44 40 -44 36 Z" fill="#2f6b3a" ${K}/>
        <rect x="-42" y="-38" width="28" height="9" rx="3" fill="#24542d" ${K}/>
        <path d="M-6 -30 L18 -30 L18 22 L38 26 Q42 40 30 40 L-8 40 Q-10 40 -10 36 Z" fill="#3a8248" ${K}/>
        <rect x="-8" y="-34" width="28" height="9" rx="3" fill="#2f6b3a" ${K}/>
        <path d="M-44 34 L4 34 M-10 34 L38 34" stroke="#1d3b22" stroke-width="3"/>`,
    },
    lanterna: {
      nome: 'Lanterna', def: 'Fonte de luz portátil para trabalhos no início da manhã ou em locais escuros.', r: 40,
      svg: `<g transform="rotate(-25)"><rect x="-36" y="-9" width="50" height="18" rx="5" fill="#c43c32" ${K}/>
        <path d="M14 -9 L30 -16 L30 16 L14 9 Z" fill="#9aa3a8" ${K}/>
        <ellipse cx="30" cy="0" rx="4" ry="16" fill="#fff4b0" ${KF}/>
        <rect x="-20" y="-12" width="8" height="5" rx="1.5" fill="#333"/>
        <path d="M34 -14 L58 -26 L58 26 L34 14 Z" fill="#fff6b8" fill-opacity="0.35"/></g>`,
    },
    mapa: {
      nome: 'Mapa da propriedade', def: 'Representação da área com o lago, o córrego e os pontos de coleta.', r: 46,
      svg: `<path d="M-42 -30 L-14 -38 L14 -30 L42 -38 L42 30 L14 38 L-14 30 L-42 38 Z" fill="#efe2b8" ${K}/>
        <path d="M-14 -38 L-14 30 M14 -30 L14 38" stroke="#bfa877" stroke-width="1.6"/>
        <path d="M-30 -24 Q-10 -6 -4 4 Q4 16 -6 28" fill="none" stroke="#3f86c8" stroke-width="3"/>
        <ellipse cx="18" cy="6" rx="16" ry="11" fill="#7fb6df" ${KF}/>
        <path d="M24 -20 l6 6 m0 -6 l-6 6" stroke="#c0392b" stroke-width="2.4"/>
        <circle cx="-26" cy="16" r="5" fill="#5c9a4a"/><circle cx="-34" cy="8" r="4" fill="#5c9a4a"/>`,
    },
    binoculo: {
      nome: 'Binóculo', def: 'Amplia a visão à distância para observar aves e trechos da margem.', r: 42,
      svg: `<rect x="-36" y="-16" width="28" height="44" rx="9" fill="#2e2e2e" ${K}/>
        <rect x="8" y="-16" width="28" height="44" rx="9" fill="#2e2e2e" ${K}/>
        <rect x="-10" y="-8" width="20" height="16" rx="3" fill="#555" ${K}/>
        <rect x="-32" y="-34" width="20" height="20" rx="4" fill="#444" ${K}/><rect x="12" y="-34" width="20" height="20" rx="4" fill="#444" ${K}/>
        <ellipse cx="-22" cy="24" rx="10" ry="4" fill="#6fa8c9"/><ellipse cx="22" cy="24" rx="10" ry="4" fill="#6fa8c9"/>`,
    },
    bussola: {
      nome: 'Bússola', def: 'Indica a direção norte e ajuda a orientar o mapa e os pontos de coleta.', r: 36,
      svg: `<circle cx="0" cy="0" r="32" fill="#c9a24a" ${K}/><circle cx="0" cy="0" r="25" fill="#fbf6e6" ${KF}/>
        <path d="M0 -21 L6 0 L0 21 L-6 0 Z" fill="#fff" ${KF}/><path d="M0 -21 L6 0 L-6 0 Z" fill="#c0392b"/>
        <text x="0" y="-11" font-size="8" text-anchor="middle" font-family="serif" font-weight="700" fill="#2b1d12" dy="-4">N</text>
        <circle cx="0" cy="-36" r="5" fill="none" stroke="#c9a24a" stroke-width="3"/>`,
    },
    lupa: {
      nome: 'Lupa', def: 'Lente de aumento para examinar folhas, algas e detalhes de documentos.', r: 40,
      svg: `<line x1="14" y1="14" x2="42" y2="42" stroke="#6b3f1f" stroke-width="10" stroke-linecap="round"/>
        <circle cx="-6" cy="-6" r="26" fill="#cfe8f3" fill-opacity="0.7" stroke="#b08a3a" stroke-width="6"/>
        <path d="M-20 -14 Q-16 -24 -6 -26" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/>`,
    },
    chapeuPalha: {
      nome: 'Chapéu de palha', def: 'Protege do sol durante o trabalho de campo e no jardim.', r: 46,
      svg: `<ellipse cx="0" cy="12" rx="48" ry="16" fill="#e2bd6a" ${K}/>
        <path d="M-24 10 Q-26 -24 0 -26 Q26 -24 24 10 Z" fill="#ebc977" ${K}/>
        <path d="M-24 2 Q0 10 24 2 L24 10 Q0 18 -24 10 Z" fill="#a5452c"/>
        <g stroke="#b8913f" stroke-width="1.2" fill="none"><path d="M-40 14 Q0 24 40 14"/><path d="M-16 -16 Q0 -20 16 -16"/></g>`,
    },
    regador: {
      nome: 'Regador', def: 'Usado para regar a horta; em excesso, a água pode levar adubo do solo.', r: 44,
      svg: `<path d="M-30 -18 L28 -18 L24 30 L-26 30 Z" fill="#7aa16a" ${K}/>
        <path d="M24 -6 L50 -30 L54 -26 L28 6" fill="#7aa16a" ${K}/>
        <ellipse cx="53" cy="-29" rx="6" ry="4" fill="#5c8350" ${KF}/>
        <path d="M-30 -10 Q-48 -10 -46 8 Q-44 22 -28 20" fill="none" stroke="#5c8350" stroke-width="5"/>
        <path d="M-20 -18 Q0 -42 20 -18" fill="none" stroke="#5c8350" stroke-width="5"/>`,
    },
    sapo: {
      nome: 'Sapo', def: 'Anfíbio que vive perto da água; sua presença também é registrada no campo.', r: 34,
      svg: `<ellipse cx="0" cy="8" rx="28" ry="18" fill="#6c9a3a" ${K}/>
        <circle cx="-14" cy="-10" r="9" fill="#7fb045" ${K}/><circle cx="14" cy="-10" r="9" fill="#7fb045" ${K}/>
        <circle cx="-14" cy="-11" r="4" fill="#1d1d1d"/><circle cx="14" cy="-11" r="4" fill="#1d1d1d"/>
        <path d="M-12 8 Q0 16 12 8" fill="none" stroke="#2b1d12" stroke-width="2"/>
        <path d="M-28 18 L-40 26 M-28 18 L-34 30 M28 18 L40 26 M28 18 L34 30" stroke="#5a8530" stroke-width="4" stroke-linecap="round"/>`,
    },
    libelula: {
      nome: 'Libélula', def: 'Inseto cujas larvas vivem na água; é observado em ambientes aquáticos.', r: 34,
      svg: `<g fill="#cfe8f6" fill-opacity="0.85" stroke="#5b8aa8" stroke-width="1.4"><ellipse cx="-18" cy="-8" rx="18" ry="6" transform="rotate(-12 -18 -8)"/><ellipse cx="18" cy="-8" rx="18" ry="6" transform="rotate(12 18 -8)"/>
        <ellipse cx="-16" cy="4" rx="15" ry="5" transform="rotate(10 -16 4)"/><ellipse cx="16" cy="4" rx="15" ry="5" transform="rotate(-10 16 4)"/></g>
        <rect x="-3" y="-8" width="6" height="42" rx="3" fill="#2a7f9e" ${KF}/><circle cx="0" cy="-12" r="6" fill="#1f5f78" ${KF}/>`,
    },

    // ---------------- hall ----------------
    guardaChuva: {
      nome: 'Guarda-chuva', def: 'Protege da chuva; dias chuvosos também devem ser anotados no registro de campo.', r: 46,
      svg: `<path d="M0 -40 L0 34 Q0 46 -10 44" fill="none" stroke="#3b2a1e" stroke-width="4" stroke-linecap="round"/>
        <path d="M-42 -6 Q-40 -44 0 -46 Q40 -44 42 -6 Q32 -14 21 -6 Q10 -14 0 -6 Q-10 -14 -21 -6 Q-32 -14 -42 -6 Z" fill="#7a2335" ${K}/>
        <path d="M0 -46 Q-12 -30 -21 -6 M0 -46 Q12 -30 21 -6 M0 -46 L0 -6" stroke="#5a1626" stroke-width="1.6" fill="none"/>`,
    },
    chapeu: {
      nome: 'Chapéu', def: 'Acessório de época que pertencia ao pai de Dona Helena.', r: 40,
      svg: `<ellipse cx="0" cy="18" rx="44" ry="12" fill="#4a3a2c" ${K}/>
        <path d="M-26 16 Q-30 -22 -6 -26 Q0 -20 6 -26 Q30 -22 26 16 Z" fill="#5c4a38" ${K}/>
        <path d="M-27 6 Q0 14 27 6 L26 14 Q0 22 -26 14 Z" fill="#1f1a16"/>`,
    },
    mala: {
      nome: 'Maleta de campo', def: 'Leva os equipamentos de coleta organizados e protegidos.', r: 50,
      svg: `<path d="M-14 -30 L-14 -40 Q-14 -44 -10 -44 L10 -44 Q14 -44 14 -40 L14 -30" fill="none" ${K} stroke-width="4"/>
        <rect x="-46" y="-30" width="92" height="64" rx="8" fill="#8a5a2f" ${K}/>
        <rect x="-46" y="-12" width="92" height="7" fill="#6b4322"/>
        <rect x="-34" y="-30" width="8" height="64" fill="#5a3a1c"/><rect x="26" y="-30" width="8" height="64" fill="#5a3a1c"/>
        <rect x="-6" y="-16" width="12" height="14" rx="2" fill="#d6b24a" ${KF}/>`,
    },
    carta: {
      nome: 'Carta-convite', def: 'Carta em que Dona Helena pede ajuda à equipe técnica.', r: 40,
      svg: `<rect x="-38" y="-24" width="76" height="48" rx="3" fill="#f6ecd2" ${K}/>
        <path d="M-38 -24 L0 6 L38 -24" fill="none" ${K}/>
        <path d="M-38 24 L-8 -2 M38 24 L8 -2" stroke="#c9b48a" stroke-width="1.6"/>
        <circle cx="0" cy="6" r="8" fill="#a3242e" ${KF}/><path d="M-3 4 L0 9 L3 4" stroke="#6d1219" stroke-width="1.5" fill="none"/>`,
    },
    chave: {
      nome: 'Chave antiga', def: 'Abre a porta do laboratório no porão da mansão.', r: 36,
      svg: `<g transform="rotate(-30)"><circle cx="-26" cy="0" r="13" fill="none" stroke="#b8902e" stroke-width="6"/>
        <circle cx="-26" cy="0" r="13" fill="none" stroke="#2b1d12" stroke-width="1.2"/>
        <rect x="-14" y="-4" width="52" height="8" rx="2" fill="#c9a03a" ${KF}/>
        <path d="M26 4 L26 16 L32 16 L32 4 M36 4 L36 12 L40 12 L40 4" fill="#c9a03a" ${KF}/></g>`,
    },
    relogioBolso: {
      nome: 'Relógio de bolso', def: 'Marca a hora exata das observações, informação essencial no registro.', r: 34,
      svg: `<path d="M0 -34 C14 -52 30 -40 22 -26" fill="none" stroke="#b8902e" stroke-width="2.4"/>
        <circle cx="0" cy="-34" r="5" fill="#d6b24a" ${KF}/>
        <circle cx="0" cy="0" r="28" fill="#d6b24a" ${K}/><circle cx="0" cy="0" r="22" fill="#fffbef" ${KF}/>
        <line x1="0" y1="0" x2="0" y2="-15" stroke="#2b1d12" stroke-width="2.4"/><line x1="0" y1="0" x2="10" y2="4" stroke="#2b1d12" stroke-width="2"/>
        <g fill="#2b1d12">${[0, 90, 180, 270].map((a) => `<circle cx="${(18 * Math.sin((a * Math.PI) / 180)).toFixed(1)}" cy="${(-18 * Math.cos((a * Math.PI) / 180)).toFixed(1)}" r="1.8"/>`).join('')}</g>`,
    },
    castical: {
      nome: 'Castiçal', def: 'Suporte de vela; ilumina os cômodos antigos da mansão.', r: 42,
      svg: `<path d="M0 -50 Q-6 -40 0 -34 Q6 -40 0 -50 Z" fill="#ffb53a" stroke="#d9771f" stroke-width="1.4"/>
        <rect x="-6" y="-34" width="12" height="34" rx="2" fill="#fbf3dc" ${KF}/>
        <path d="M-16 0 L16 0 L10 6 L-10 6 Z" fill="#c9a03a" ${KF}/>
        <path d="M-4 6 L4 6 L6 32 L-6 32 Z" fill="#c9a03a" ${KF}/>
        <ellipse cx="0" cy="38" rx="20" ry="7" fill="#b8902e" ${K}/>`,
    },
    leque: {
      nome: 'Leque', def: 'Acessório antigo usado nos bailes do salão.', r: 42,
      svg: `<path d="M0 30 L-42 -14 A46 46 0 0 1 42 -14 Z" fill="#d9567c" ${K}/>
        <g stroke="#a3304f" stroke-width="1.6">${[-38, -24, -10, 4, 18, 32].map((x) => `<line x1="0" y1="30" x2="${x}" y2="${-16 - (20 - Math.abs(x) * 0.4)}"/>`).join('')}</g>
        <path d="M-30 -18 A40 40 0 0 1 30 -18" fill="none" stroke="#f6d7e2" stroke-width="3"/>
        <circle cx="0" cy="30" r="4" fill="#c9a03a" ${KF}/>`,
    },
    vaso: {
      nome: 'Vaso de flores', def: 'Vaso de porcelana com flores do jardim.', r: 44,
      svg: `<g fill="#f2c94c" ${KF}><circle cx="-14" cy="-34" r="8"/><circle cx="10" cy="-40" r="9"/><circle cx="-2" cy="-26" r="7" fill="#e86a6a"/><circle cx="18" cy="-24" r="7" fill="#e86a6a"/></g>
        <path d="M-10 -20 L-14 -34 M0 -18 L10 -40 M6 -18 L18 -24" stroke="#3c7a3c" stroke-width="2.4"/>
        <path d="M-16 -18 Q-30 4 -14 36 L14 36 Q30 4 16 -18 Z" fill="#e9eef5" ${K}/>
        <path d="M-20 4 Q0 14 20 4 M-17 18 Q0 26 17 18" stroke="#3f6fb5" stroke-width="2.6" fill="none"/>`,
    },

    // ---------------- escritório ----------------
    calculadora: {
      nome: 'Calculadora', def: 'Ajuda a organizar e conferir cálculos, como médias de várias medições.', r: 38,
      svg: `<rect x="-26" y="-38" width="52" height="76" rx="7" fill="#3d4a55" ${K}/>
        <rect x="-19" y="-30" width="38" height="16" rx="2" fill="#bfd8b0" ${KF}/>
        <text x="15" y="-18" font-size="11" text-anchor="end" font-family="monospace" fill="#2b3a22">5.0</text>
        <g fill="#e8e3d6">${[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => `<rect x="${-19 + c * 10}" y="${-8 + r * 13}" width="7" height="9" rx="1.5"/>`).join('')).join('')}</g>
        <rect x="11" y="18" width="8" height="14" rx="1.5" fill="#e07a3a"/>`,
    },
    grafico: {
      nome: 'Gráfico', def: 'Representação visual de medições ao longo do tempo; um ponto só não forma tendência.', r: 44,
      svg: `<rect x="-40" y="-34" width="80" height="68" rx="2" fill="#fbfaf2" ${K}/>
        <g stroke="#cfe0d7" stroke-width="1">${[-22, -10, 2, 14, 26].map((y) => `<line x1="-34" y1="${y}" x2="34" y2="${y}"/>`).join('')}</g>
        <path d="M-30 -28 L-30 28 L34 28" fill="none" stroke="#2b1d12" stroke-width="2"/>
        <circle cx="-14" cy="6" r="5" fill="#c0392b" ${KF}/>
        <text x="4" y="-12" font-size="13" font-family="serif" font-style="italic" fill="#7a6a50">?</text><text x="18" y="0" font-size="13" font-family="serif" font-style="italic" fill="#7a6a50">?</text>`,
    },
    pasta: {
      nome: 'Pasta de arquivo', def: 'Guarda relatórios, fichas e laudos organizados por data e ponto de coleta.', r: 44,
      svg: `<path d="M-42 -26 L-14 -26 L-8 -34 L22 -34 L26 -26 L42 -26 L42 32 L-42 32 Z" fill="#d79a3c" ${K}/>
        <rect x="-36" y="-30" width="70" height="40" fill="#fbf8ee" ${KF}/>
        <path d="M-42 -16 L42 -16 L42 32 L-42 32 Z" fill="#e6ac4e" ${K}/>
        <rect x="-16" y="2" width="32" height="12" rx="2" fill="#fbf3dc" ${KF}/>`,
    },
    carimbo: {
      nome: 'Carimbo', def: 'Marca documentos com data e “recebido”, comum em protocolos de escritório.', r: 36,
      svg: `<ellipse cx="0" cy="-30" rx="13" ry="10" fill="#7a2335" ${K}/>
        <rect x="-5" y="-22" width="10" height="22" fill="#8a5a2f" ${KF}/>
        <rect x="-22" y="0" width="44" height="12" rx="2" fill="#5a3a1c" ${K}/>
        <rect x="-24" y="12" width="48" height="8" rx="1" fill="#2b2b2b"/>
        <ellipse cx="18" cy="34" rx="22" ry="7" fill="none" stroke="#b52b2b" stroke-width="2.4" stroke-dasharray="4 2"/>`,
    },
    lapis: {
      nome: 'Lápis', def: 'No campo, o lápis é preferido porque não borra se o papel molhar.', r: 40,
      svg: `<g transform="rotate(-35)"><rect x="-38" y="-6" width="56" height="12" fill="#f2c230" ${K}/>
        <path d="M18 -6 L38 0 L18 6 Z" fill="#f2d6a8" ${KF}/><path d="M32 -2 L38 0 L32 2 Z" fill="#333"/>
        <rect x="-46" y="-6" width="8" height="12" rx="2" fill="#e88a9a" ${KF}/><rect x="-40" y="-6" width="4" height="12" fill="#b8bec4"/></g>`,
    },
    oculos: {
      nome: 'Óculos', def: 'Óculos de leitura esquecidos sobre os papéis.', r: 38,
      svg: `<circle cx="-18" cy="0" r="14" fill="#dceef7" fill-opacity="0.6" stroke="#5a3a1c" stroke-width="3.5"/>
        <circle cx="18" cy="0" r="14" fill="#dceef7" fill-opacity="0.6" stroke="#5a3a1c" stroke-width="3.5"/>
        <path d="M-4 -2 Q0 -7 4 -2" stroke="#5a3a1c" stroke-width="3" fill="none"/>
        <path d="M-32 -3 L-44 -10 M32 -3 L44 -10" stroke="#5a3a1c" stroke-width="3"/>`,
    },
    maquinaEscrever: {
      nome: 'Máquina de escrever', def: 'Era usada para datilografar relatórios antes dos computadores.', r: 50,
      svg: `<rect x="-40" y="-36" width="80" height="12" rx="5" fill="#3a3a3a" ${K}/>
        <rect x="-26" y="-48" width="52" height="16" fill="#fbf8ee" ${KF}/>
        <path d="M-46 -24 L46 -24 L52 30 L-52 30 Z" fill="#2c3e50" ${K}/>
        <g fill="#f2efe6" stroke="#111" stroke-width="1">${[0, 1, 2].map((r) => Array.from({ length: 8 - r }, (_, c) => `<circle cx="${-35 + r * 5 + c * 10}" cy="${-8 + r * 11}" r="3.6"/>`).join('')).join('')}</g>
        <rect x="-22" y="22" width="44" height="5" rx="2" fill="#f2efe6"/>`,
    },
    telefone: {
      nome: 'Telefone antigo', def: 'Aparelho de disco usado para contatar o laboratório e a prefeitura.', r: 44,
      svg: `<path d="M-38 -24 Q-40 -38 -26 -38 L26 -38 Q40 -38 38 -24 L30 -20 Q22 -30 14 -22 L-14 -22 Q-22 -30 -30 -20 Z" fill="#1f1f1f" ${K}/>
        <path d="M-30 -10 L30 -10 L40 34 L-40 34 Z" fill="#2a2a2a" ${K}/>
        <circle cx="0" cy="12" r="16" fill="#e8e1cc" ${KF}/><circle cx="0" cy="12" r="5" fill="#2a2a2a"/>
        <g fill="#2a2a2a">${Array.from({ length: 8 }, (_, i) => { const a = (i / 8) * Math.PI * 2; return `<circle cx="${(11 * Math.cos(a)).toFixed(1)}" cy="${(12 + 11 * Math.sin(a)).toFixed(1)}" r="2.2"/>`; }).join('')}</g>`,
    },
    xicara: {
      nome: 'Xícara de café', def: 'Uma pausa para o café durante a organização dos dados.', r: 36,
      svg: `<ellipse cx="0" cy="24" rx="36" ry="9" fill="#f4f1ea" ${K}/>
        <path d="M-24 -14 L24 -14 L18 20 Q0 28 -18 20 Z" fill="#f4f1ea" ${K}/>
        <ellipse cx="0" cy="-14" rx="24" ry="6" fill="#5a3418" ${KF}/>
        <path d="M22 -6 Q38 -4 32 10 Q28 16 20 14" fill="none" stroke="#2b1d12" stroke-width="4"/>
        <path d="M-6 -26 Q-10 -34 -4 -40 M6 -24 Q2 -32 8 -40" stroke="#c9c2b4" stroke-width="2" fill="none"/>
        <path d="M-20 0 Q0 6 20 0" stroke="#3f86c8" stroke-width="2.2" fill="none"/>`,
    },
    tinteiro: {
      nome: 'Tinteiro com pena', def: 'Tinta e pena usadas nos registros antigos do escritório.', r: 40,
      svg: `<path d="M8 6 C14 -20 30 -40 44 -48 C40 -30 28 -10 12 8 Z" fill="#f2efe6" ${KF}/>
        <path d="M10 6 L40 -44" stroke="#9a948a" stroke-width="1.2"/>
        <path d="M-24 -4 L24 -4 L28 30 L-28 30 Z" fill="#1f2a44" ${K}/>
        <rect x="-12" y="-14" width="24" height="10" rx="2" fill="#c9a03a" ${KF}/>
        <path d="M-16 6 Q0 12 16 6" stroke="#5f75a8" stroke-width="2" fill="none"/>`,
    },
    pluviometro: {
      nome: 'Pluviômetro', def: 'Coleta e mede a chuva, em milímetros; a chuva pode levar nutrientes do solo ao lago.', r: 42,
      svg: `<path d="M-22 -40 L22 -40 L8 -22 L-8 -22 Z" fill="#dfeef6" fill-opacity=".85" ${K}/>
        <rect x="-9" y="-22" width="18" height="58" rx="3" fill="#e7f3f9" fill-opacity=".9" ${K}/>
        <rect x="-7" y="8" width="14" height="26" fill="#6fb2df" fill-opacity=".8"/>
        <g stroke="#2b1d12" stroke-width="1.2">${[-14, -6, 2, 10, 18, 26].map((y) => `<line x1="-9" y1="${y}" x2="-3" y2="${y}"/>`).join('')}</g>
        <rect x="-14" y="36" width="28" height="8" rx="2" fill="#7a5a3a" ${KF}/>`,
    },
    abajur: {
      nome: 'Luminária de mesa', def: 'Luminária verde clássica dos escritórios antigos.', r: 44,
      svg: `<path d="M-38 -16 Q0 -44 38 -16 L32 -8 L-32 -8 Z" fill="#1f6b4a" ${K}/>
        <ellipse cx="0" cy="-8" rx="32" ry="5" fill="#fff3b0"/>
        <rect x="-3" y="-8" width="6" height="34" fill="#c9a03a" ${KF}/>
        <ellipse cx="0" cy="30" rx="22" ry="7" fill="#c9a03a" ${K}/>`,
    },

    // ---------------- biblioteca ----------------
    livro: {
      nome: 'Livro de limnologia', def: 'Obra de consulta sobre lagos, rios e a vida em águas continentais.', r: 42,
      svg: `<path d="M-40 -26 L0 -18 L40 -26 L40 26 L0 34 L-40 26 Z" fill="#fbf6e6" ${K}/>
        <path d="M0 -18 L0 34" stroke="#2b1d12" stroke-width="2"/>
        <path d="M-44 -22 L-40 -26 L-40 26 L0 34 L40 26 L40 -26 L44 -22 L44 30 L0 38 L-44 30 Z" fill="#2f6b8a" ${K}/>
        <g stroke="#b0a68a" stroke-width="1.4">${[-10, -2, 6, 14].map((y) => `<line x1="-32" y1="${y - 6}" x2="-8" y2="${y - 2}"/><line x1="8" y1="${y - 2}" x2="32" y2="${y - 6}"/>`).join('')}</g>
        <path d="M14 -10 Q22 -14 30 -10 Q24 -2 14 -10" fill="#7fb045"/>`,
    },
    globo: {
      nome: 'Globo terrestre', def: 'Modelo da Terra para localizar regiões, latitudes e longitudes.', r: 46,
      svg: `<path d="M-30 -36 A44 44 0 0 1 30 32" fill="none" stroke="#b8902e" stroke-width="4"/>
        <circle cx="0" cy="-2" r="32" fill="#5d9fd0" ${K}/>
        <path d="M-20 -24 Q-6 -30 0 -18 Q-4 -6 -16 -8 Q-26 -12 -20 -24 Z M6 -4 Q20 -10 24 4 Q22 18 10 20 Q2 8 6 -4 Z M-22 8 Q-14 6 -12 16 Q-18 22 -24 16 Z" fill="#7fb045" ${KF}/>
        <path d="M-32 -2 Q0 8 32 -2" stroke="#ffffff" stroke-opacity=".5" stroke-width="1.4" fill="none"/>
        <path d="M0 30 L0 40 M-18 44 L18 44" stroke="#8a5a2f" stroke-width="5" stroke-linecap="round"/>`,
    },
    microscopio: {
      nome: 'Microscópio', def: 'Amplia estruturas muito pequenas, como algas e microrganismos da água.', r: 46,
      svg: `<path d="M-30 40 L30 40 L26 32 L-26 32 Z" fill="#2f2f33" ${K}/>
        <path d="M8 32 Q26 10 14 -20" fill="none" stroke="#2f2f33" stroke-width="9" stroke-linecap="round"/>
        <rect x="-22" y="4" width="34" height="6" rx="2" fill="#555" ${KF}/>
        <g transform="rotate(-24 -4 -16)"><rect x="-12" y="-46" width="16" height="44" rx="3" fill="#e6e8ea" ${K}/><rect x="-8" y="-54" width="8" height="10" rx="2" fill="#2f2f33"/><rect x="-8" y="-2" width="8" height="10" fill="#2f2f33"/></g>
        <circle cx="18" cy="-4" r="6" fill="#888" ${KF}/>`,
    },
    ampulheta: {
      nome: 'Ampulheta', def: 'Mede intervalos de tempo; lembra que tendências só aparecem com o tempo.', r: 38,
      svg: `<rect x="-24" y="-42" width="48" height="8" rx="2" fill="#8a5a2f" ${K}/><rect x="-24" y="34" width="48" height="8" rx="2" fill="#8a5a2f" ${K}/>
        <path d="M-16 -34 L16 -34 Q16 -10 3 0 Q16 10 16 34 L-16 34 Q-16 10 -3 0 Q-16 -10 -16 -34 Z" fill="#e7f3f9" fill-opacity=".8" ${K}/>
        <path d="M-10 -22 L10 -22 Q8 -10 0 -2 Q-8 -10 -10 -22 Z M-14 32 Q0 16 14 32 Z" fill="#e2b45a"/>
        <line x1="0" y1="-2" x2="0" y2="22" stroke="#e2b45a" stroke-width="1.5"/>
        <line x1="-20" y1="-34" x2="-20" y2="34" stroke="#8a5a2f" stroke-width="3"/><line x1="20" y1="-34" x2="20" y2="34" stroke="#8a5a2f" stroke-width="3"/>`,
    },
    pergaminho: {
      nome: 'Resolução CONAMA', def: 'Norma que classifica os corpos de água e define padrões de qualidade por classe.', r: 44,
      svg: `<rect x="-34" y="-30" width="68" height="60" fill="#f6ecd2" ${K}/>
        <ellipse cx="-34" cy="0" rx="7" ry="31" fill="#e8d8ae" ${K}/><ellipse cx="34" cy="0" rx="7" ry="31" fill="#e8d8ae" ${K}/>
        <text x="0" y="-14" font-size="9" font-weight="700" text-anchor="middle" font-family="serif" fill="#2b1d12">CONAMA</text>
        <text x="0" y="-4" font-size="8" text-anchor="middle" font-family="serif" fill="#2b1d12">357/2005</text>
        <g stroke="#9a8a6a" stroke-width="1.4">${[6, 13, 20].map((y) => `<line x1="-20" y1="${y}" x2="20" y2="${y}"/>`).join('')}</g>`,
    },
    revista: {
      nome: 'Revista científica', def: 'Publica pesquisas revisadas por especialistas, com métodos e resultados.', r: 44,
      svg: `<rect x="-30" y="-40" width="60" height="80" rx="2" fill="#fbfaf4" ${K}/>
        <rect x="-30" y="-40" width="60" height="18" fill="#2a8a86"/>
        <text x="0" y="-27" font-size="9" font-weight="700" text-anchor="middle" font-family="sans-serif" fill="#fff">ÁGUAS</text>
        <rect x="-22" y="-14" width="44" height="26" fill="#8fc0d8" ${KF}/>
        <path d="M-22 4 Q-8 -8 4 2 T22 -2 L22 12 L-22 12 Z" fill="#3f86c8"/>
        <g stroke="#9a948a" stroke-width="1.6">${[20, 26, 32].map((y) => `<line x1="-22" y1="${y}" x2="22" y2="${y}"/>`).join('')}</g>`,
    },
    herbario: {
      nome: 'Exsicata de herbário', def: 'Planta prensada e etiquetada, guardada como registro científico.', r: 42,
      svg: `<rect x="-30" y="-40" width="60" height="80" fill="#f4eedc" ${K}/>
        <path d="M0 30 Q-2 0 2 -30" stroke="#4a7a3a" stroke-width="2.4" fill="none"/>
        <g fill="#6c9a4a" ${KF}><ellipse cx="-10" cy="-14" rx="10" ry="5" transform="rotate(-30 -10 -14)"/><ellipse cx="12" cy="-6" rx="10" ry="5" transform="rotate(30 12 -6)"/><ellipse cx="-10" cy="8" rx="10" ry="5" transform="rotate(-30 -10 8)"/><ellipse cx="11" cy="16" rx="9" ry="4.5" transform="rotate(30 11 16)"/></g>
        <rect x="6" y="26" width="22" height="12" fill="#fff" ${KF}/>`,
    },
    concha: {
      nome: 'Concha', def: 'Parte de coleção de história natural guardada na biblioteca.', r: 34,
      svg: `<path d="M0 30 L-32 -6 Q-30 -32 0 -34 Q30 -32 32 -6 Z" fill="#f2c9a8" ${K}/>
        <g stroke="#c98a64" stroke-width="2" fill="none"><path d="M0 30 L-20 -26"/><path d="M0 30 L-8 -32"/><path d="M0 30 L8 -32"/><path d="M0 30 L20 -26"/><path d="M0 30 L-30 -10"/><path d="M0 30 L30 -10"/></g>
        <path d="M-10 30 L10 30 L6 38 L-6 38 Z" fill="#e8b48e" ${KF}/>`,
    },
    coruja: {
      nome: 'Estátua de coruja', def: 'Símbolo do conhecimento, enfeita a estante da biblioteca.', r: 40,
      svg: `<path d="M-24 40 Q-30 0 -20 -24 L-16 -40 L-6 -28 L6 -28 L16 -40 L20 -24 Q30 0 24 40 Z" fill="#9a7a4a" ${K}/>
        <circle cx="-9" cy="-14" r="9" fill="#f3e6c4" ${KF}/><circle cx="9" cy="-14" r="9" fill="#f3e6c4" ${KF}/>
        <circle cx="-9" cy="-14" r="4" fill="#2b1d12"/><circle cx="9" cy="-14" r="4" fill="#2b1d12"/>
        <path d="M-3 -4 L0 3 L3 -4 Z" fill="#e0a02a"/>
        <path d="M-14 10 Q0 18 14 10 M-12 20 Q0 28 12 20" stroke="#7a5a2f" stroke-width="2" fill="none"/>`,
    },
    telescopio: {
      nome: 'Luneta', def: 'Instrumento óptico para observar o céu e paisagens distantes.', r: 46,
      svg: `<g transform="rotate(-28)"><rect x="-44" y="-8" width="40" height="16" rx="3" fill="#b8902e" ${K}/><rect x="-6" y="-11" width="40" height="22" rx="3" fill="#8a5a2f" ${K}/>
        <rect x="32" y="-13" width="10" height="26" rx="2" fill="#b8902e" ${K}/><rect x="-50" y="-5" width="8" height="10" rx="2" fill="#2b1d12"/></g>
        <path d="M0 6 L-14 46 M0 6 L14 46 M0 6 L0 46" stroke="#5a3a1c" stroke-width="3.2" stroke-linecap="round"/>`,
    },

    // ---------------- laboratório ----------------
    tuboEnsaio: {
      nome: 'Tubos de ensaio', def: 'Pequenos tubos de vidro para reações e preparo de soluções.', r: 44,
      svg: `<g fill="#e7f3f9" fill-opacity=".9" ${KF}>
        <path d="M-28 -36 L-18 -36 L-18 22 Q-23 30 -28 22 Z"/><path d="M-8 -40 L2 -40 L2 22 Q-3 30 -8 22 Z"/><path d="M12 -36 L22 -36 L22 22 Q17 30 12 22 Z"/></g>
        <path d="M-27 4 L-19 4 L-19 22 Q-23 28 -27 22 Z" fill="#6fbf73"/><path d="M-7 -6 L1 -6 L1 22 Q-3 28 -7 22 Z" fill="#e2b33a"/><path d="M13 10 L21 10 L21 22 Q17 28 13 22 Z" fill="#5b8fd6"/>
        <rect x="-38" y="-10" width="70" height="8" rx="2" fill="#8a5a2f" ${K}/><rect x="-38" y="26" width="70" height="10" rx="2" fill="#8a5a2f" ${K}/>
        <path d="M-34 -2 L-34 26 M28 -2 L28 26" stroke="#5a3a1c" stroke-width="4"/>`,
    },
    bequer: {
      nome: 'Béquer', def: 'Copo de vidro graduado para misturar e aquecer líquidos.', r: 40,
      svg: `<path d="M-26 -34 L-30 -38 L28 -38 L26 -34 L26 32 Q26 38 20 38 L-20 38 Q-26 38 -26 32 Z" fill="#e7f3f9" fill-opacity=".85" ${K}/>
        <path d="M-24 4 L24 4 L24 32 Q24 36 20 36 L-20 36 Q-24 36 -24 32 Z" fill="#8ac9a0" fill-opacity=".85"/>
        <g stroke="#2b1d12" stroke-width="1.3">${[-20, -10, 0, 10, 20].map((y) => `<line x1="-24" y1="${y}" x2="-14" y2="${y}"/>`).join('')}</g>`,
    },
    erlenmeyer: {
      nome: 'Erlenmeyer', def: 'Frasco cônico usado para agitar soluções sem derramar.', r: 42,
      svg: `<path d="M-9 -42 L9 -42 L9 -16 L32 30 Q34 38 26 38 L-26 38 Q-34 38 -32 30 L-9 -16 Z" fill="#e7f3f9" fill-opacity=".85" ${K}/>
        <path d="M-20 8 L20 8 L30 30 Q31 35 26 35 L-26 35 Q-31 35 -30 30 Z" fill="#c98ad6" fill-opacity=".8"/>
        <rect x="-11" y="-46" width="22" height="7" rx="2" fill="#c9a03a" ${KF}/>`,
    },
    pipeta: {
      nome: 'Pipeta', def: 'Tubo calibrado que mede e transfere volumes exatos de líquido.', r: 42,
      svg: `<g transform="rotate(30)"><rect x="-3" y="-48" width="6" height="30" fill="#e7f3f9" ${KF}/>
        <ellipse cx="0" cy="-8" rx="8" ry="12" fill="#e7f3f9" fill-opacity=".85" ${KF}/>
        <path d="M-3 2 L3 2 L1 46 L-1 46 Z" fill="#e7f3f9" ${KF}/>
        <rect x="-2" y="20" width="4" height="22" fill="#e86a6a"/>
        <rect x="-6" y="-60" width="12" height="14" rx="5" fill="#d84a4a" ${KF}/></g>`,
    },
    balanca: {
      nome: 'Balança analítica', def: 'Mede massas muito pequenas com grande precisão, em gramas e miligramas.', r: 46,
      svg: `<rect x="-42" y="10" width="84" height="28" rx="4" fill="#e9ecef" ${K}/>
        <rect x="-16" y="18" width="32" height="12" rx="2" fill="#bfe0c4" ${KF}/>
        <text x="0" y="28" font-size="9" text-anchor="middle" font-family="monospace" fill="#1d4a2a">0.150</text>
        <path d="M-34 10 L-34 -34 L34 -34 L34 10" fill="#e7f3f9" fill-opacity=".5" ${K}/>
        <ellipse cx="0" cy="4" rx="18" ry="4" fill="#9aa3a8" ${KF}/><rect x="-2" y="4" width="4" height="6" fill="#777"/>`,
    },
    oculosProtecao: {
      nome: 'Óculos de proteção', def: 'Protegem os olhos contra respingos de reagentes no laboratório.', r: 40,
      svg: `<path d="M-40 -2 Q-44 -20 -24 -20 L24 -20 Q44 -20 40 -2 Q38 16 20 14 Q8 12 0 4 Q-8 12 -20 14 Q-38 16 -40 -2 Z" fill="#cfe8f3" fill-opacity=".8" ${K}/>
        <path d="M-40 -6 L-48 -4 M40 -6 L48 -4" stroke="#2f78c4" stroke-width="5" stroke-linecap="round"/>
        <path d="M-30 -12 Q-24 -16 -16 -14" stroke="#fff" stroke-width="3" fill="none"/>`,
    },
    contaGotas: {
      nome: 'Conta-gotas', def: 'Adiciona pequenas quantidades de líquido, gota a gota.', r: 34,
      svg: `<g transform="rotate(-20)"><rect x="-8" y="-44" width="16" height="22" rx="7" fill="#2f2f33" ${KF}/>
        <path d="M-5 -22 L5 -22 L3 30 L0 38 L-3 30 Z" fill="#e7f3f9" fill-opacity=".9" ${KF}/>
        <rect x="-3" y="8" width="6" height="20" fill="#e2b33a"/></g>
        <path d="M14 34 Q18 40 14 44 Q10 40 14 34 Z" fill="#e2b33a"/>`,
    },
    bicoBunsen: {
      nome: 'Bico de Bunsen', def: 'Queimador a gás que fornece chama para aquecer materiais.', r: 40,
      svg: `<path d="M0 -50 Q-12 -32 -6 -22 Q0 -30 6 -22 Q12 -32 0 -50 Z" fill="#6fa8ff" fill-opacity=".85"/>
        <path d="M0 -38 Q-5 -30 -2 -24 L2 -24 Q5 -30 0 -38 Z" fill="#cfe2ff"/>
        <rect x="-6" y="-22" width="12" height="48" fill="#9aa3a8" ${K}/>
        <rect x="-9" y="6" width="18" height="8" fill="#c9a03a" ${KF}/>
        <ellipse cx="0" cy="32" rx="24" ry="8" fill="#5a5a5a" ${K}/>
        <path d="M-6 14 L-36 20" stroke="#d84a4a" stroke-width="5" stroke-linecap="round"/>`,
    },
    funil: {
      nome: 'Funil', def: 'Ajuda a transferir líquidos e a filtrar amostras com papel-filtro.', r: 36,
      svg: `<path d="M-32 -30 L32 -30 L6 6 L6 38 L-6 38 L-6 6 Z" fill="#e7f3f9" fill-opacity=".85" ${K}/>
        <path d="M-24 -24 L24 -24 L4 4 L-4 4 Z" fill="#fbfaf2" ${KF}/>
        <ellipse cx="0" cy="-30" rx="32" ry="5" fill="none" ${K}/>`,
    },
    fichaCustodia: {
      nome: 'Ficha de cadeia de custódia', def: 'Registra quem coletou, transportou e recebeu cada amostra, com datas e horas.', r: 44,
      svg: `<rect x="-30" y="-40" width="60" height="80" fill="#fffdf4" ${K}/>
        <rect x="-30" y="-40" width="60" height="14" fill="#c0392b"/>
        <text x="0" y="-30" font-size="7.5" font-weight="700" text-anchor="middle" font-family="sans-serif" fill="#fff">CUSTÓDIA</text>
        <g stroke="#9a948a" stroke-width="1.2" fill="none">${[-16, -6, 4, 14, 24].map((y) => `<rect x="-24" y="${y}" width="48" height="8"/>`).join('')}</g>
        <path d="M6 30 Q12 24 16 30 T26 28" stroke="#1f4a8a" stroke-width="2" fill="none"/>`,
    },
    jaleco: {
      nome: 'Jaleco', def: 'Avental de mangas longas que protege a roupa e a pele no laboratório.', r: 48,
      svg: `<path d="M-14 -42 L-38 -32 L-48 20 L-36 22 L-30 -8 L-28 42 L28 42 L30 -8 L36 22 L48 20 L38 -32 L14 -42 L0 -20 Z" fill="#fbfbf8" ${K}/>
        <path d="M-14 -42 L-6 -16 L0 -20 L6 -16 L14 -42" fill="#e8ecef" ${KF}/>
        <line x1="0" y1="-20" x2="0" y2="42" stroke="#c9ced3" stroke-width="2"/>
        <rect x="-22" y="8" width="14" height="12" fill="none" stroke="#c9ced3" stroke-width="2"/><rect x="10" y="-8" width="10" height="8" fill="#5aa0b8"/>`,
    },

    // ---------------- salão ----------------
    microfone: {
      nome: 'Microfone', def: 'Amplifica a voz para que todos os moradores possam ouvir a apresentação.', r: 44,
      svg: `<rect x="-14" y="-46" width="28" height="36" rx="12" fill="#c9ced3" ${K}/>
        <g stroke="#7a8288" stroke-width="1.4">${[-38, -32, -26, -20].map((y) => `<line x1="-12" y1="${y}" x2="12" y2="${y}"/>`).join('')}</g>
        <path d="M-18 -20 Q-18 0 0 0 Q18 0 18 -20" fill="none" stroke="#5a5a5a" stroke-width="3"/>
        <rect x="-3" y="0" width="6" height="34" fill="#3a3a3a"/>
        <ellipse cx="0" cy="38" rx="20" ry="6" fill="#2f2f33" ${K}/>`,
    },
    cartaz: {
      nome: 'Infográfico', def: 'Cartaz que comunica os dados com imagens e cores, sem distorcer a informação.', r: 48,
      svg: `<rect x="-36" y="-44" width="72" height="88" rx="3" fill="#fbf8ee" ${K}/>
        <rect x="-30" y="-38" width="60" height="12" fill="#2a8a86"/>
        <path d="M-26 -12 Q-18 -20 -10 -12 Q-18 -4 -26 -12 Z" fill="#3f86c8"/>
        <text x="8" y="-8" font-size="10" font-weight="700" font-family="sans-serif" fill="#2b1d12" text-anchor="middle">2,1 mg/L</text>
        <rect x="-26" y="2" width="10" height="24" fill="#c0392b"/><rect x="-10" y="10" width="10" height="16" fill="#e2b33a"/><rect x="6" y="-2" width="10" height="28" fill="#3c8a3f"/>
        <line x1="-28" y1="27" x2="26" y2="27" stroke="#2b1d12" stroke-width="1.6"/>
        <path d="M-12 44 L-22 60 M12 44 L22 60" stroke="#8a5a2f" stroke-width="3"/>`,
    },
    convite: {
      nome: 'Convite da reunião', def: 'Chama os moradores do entorno para a apresentação dos resultados.', r: 38,
      svg: `<rect x="-34" y="-24" width="68" height="48" rx="3" fill="#fbf3dc" ${K}/>
        <rect x="-29" y="-19" width="58" height="38" rx="2" fill="none" stroke="#c9a03a" stroke-width="2"/>
        <text x="0" y="-4" font-size="9" font-style="italic" text-anchor="middle" font-family="serif" fill="#7a2335">Convite</text>
        <line x1="-18" y1="6" x2="18" y2="6" stroke="#9a8a6a" stroke-width="1.4"/><line x1="-12" y1="12" x2="12" y2="12" stroke="#9a8a6a" stroke-width="1.4"/>`,
    },
    gramofone: {
      nome: 'Gramofone', def: 'Toca discos de música; animava os bailes antigos.', r: 50,
      svg: `<path d="M2 -4 Q10 -30 34 -46 Q46 -36 44 -14 Q24 -14 8 4 Z" fill="#c9a03a" ${K}/>
        <path d="M34 -46 Q50 -40 44 -14" fill="#e2bd5a" ${KF}/>
        <rect x="-38" y="6" width="64" height="30" rx="3" fill="#7a4a24" ${K}/>
        <ellipse cx="-8" cy="6" rx="28" ry="6" fill="#1f1f1f" ${KF}/>
        <path d="M8 4 L-2 4" stroke="#b8902e" stroke-width="3"/>
        <rect x="-34" y="36" width="8" height="6" fill="#5a3a1c"/><rect x="18" y="36" width="8" height="6" fill="#5a3a1c"/>`,
    },
    violino: {
      nome: 'Violino', def: 'Instrumento de cordas tocado nas noites de baile.', r: 46,
      svg: `<g transform="rotate(-30)"><path d="M0 -14 Q-14 -16 -14 -4 Q-10 2 -14 8 Q-16 26 0 28 Q16 26 14 8 Q10 2 14 -4 Q14 -16 0 -14 Z" fill="#a9541f" ${K}/>
        <rect x="-2.5" y="-48" width="5" height="40" fill="#2b1d12"/><path d="M-4 -56 Q4 -60 4 -50 Q0 -46 -4 -50 Z" fill="#7a3a12" ${KF}/>
        <path d="M-6 -2 Q-8 2 -6 6 M6 -2 Q8 2 6 6" stroke="#2b1d12" stroke-width="1.4" fill="none"/><rect x="-5" y="14" width="10" height="3" fill="#2b1d12"/></g>
        <line x1="-34" y1="28" x2="30" y2="-36" stroke="#8a5a2f" stroke-width="2"/>`,
    },
    taca: {
      nome: 'Taça de cristal', def: 'Parte do serviço de cristal da família Ipê.', r: 34,
      svg: `<path d="M-18 -36 L18 -36 Q20 -6 0 0 Q-20 -6 -18 -36 Z" fill="#e7f3f9" fill-opacity=".85" ${K}/>
        <path d="M-16 -22 L16 -22 Q14 -4 0 -2 Q-14 -4 -16 -22 Z" fill="#e8c46a" fill-opacity=".8"/>
        <line x1="0" y1="0" x2="0" y2="30" stroke="#2b1d12" stroke-width="2.4"/>
        <ellipse cx="0" cy="32" rx="16" ry="5" fill="#e7f3f9" ${K}/>`,
    },
    partitura: {
      nome: 'Partitura', def: 'Folha com a música escrita em notas, usada pelos músicos.', r: 42,
      svg: `<rect x="-34" y="-40" width="64" height="80" fill="#fbf8ee" ${K} transform="rotate(-6)"/>
        <g transform="rotate(-6)" stroke="#2b1d12" stroke-width="1">${[-24, -4, 16].map((y) => [0, 4, 8, 12, 16].map((d) => `<line x1="-28" y1="${y + d}" x2="24" y2="${y + d}"/>`).join('')).join('')}</g>
        <g transform="rotate(-6)" fill="#2b1d12">${[[-18, -20], [-6, -16], [6, -22], [16, 0], [-14, 4], [2, 24], [14, 20]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="3.4" ry="2.6"/><line x1="${x + 3}" y1="${y}" x2="${x + 3}" y2="${y - 12}" stroke="#2b1d12" stroke-width="1.4"/>`).join('')}</g>`,
    },
    megafone: {
      nome: 'Megafone', def: 'Amplifica a voz em espaços abertos, como no jardim da mansão.', r: 44,
      svg: `<path d="M-28 -10 L20 -32 L20 32 L-28 10 Z" fill="#e8e8e2" ${K}/>
        <ellipse cx="20" cy="0" rx="8" ry="32" fill="#d84a4a" ${K}/>
        <rect x="-40" y="-10" width="14" height="20" rx="3" fill="#d84a4a" ${K}/>
        <path d="M-18 8 L-22 30 L-12 30 L-8 8" fill="#3a3a3a" ${KF}/>`,
    },
    projetor: {
      nome: 'Projetor de slides', def: 'Projeta imagens e gráficos na parede durante a reunião.', r: 46,
      svg: `<rect x="-40" y="-18" width="70" height="40" rx="5" fill="#5b5f66" ${K}/>
        <circle cx="34" cy="2" r="13" fill="#2f2f33" ${K}/><circle cx="34" cy="2" r="7" fill="#9fd0ea"/>
        <rect x="-30" y="-34" width="40" height="16" rx="2" fill="#8a8e96" ${K}/>
        <g fill="#e8e1cc">${[-26, -18, -10, -2].map((x) => `<rect x="${x}" y="-40" width="6" height="8"/>`).join('')}</g>
        <path d="M46 -6 L70 -20 L70 24 L46 10" fill="#fff6b8" fill-opacity=".3"/>`,
    },
    mascara: {
      nome: 'Máscara de baile', def: 'Lembrança dos bailes de máscaras de 1928.', r: 40,
      svg: `<path d="M-42 -6 Q-40 -22 -20 -20 Q-6 -18 0 -10 Q6 -18 20 -20 Q40 -22 42 -6 Q40 14 18 12 Q6 10 0 2 Q-6 10 -18 12 Q-40 14 -42 -6 Z" fill="#2f2a5a" ${K}/>
        <ellipse cx="-18" cy="-4" rx="9" ry="6" fill="#efe6cc"/><ellipse cx="18" cy="-4" rx="9" ry="6" fill="#efe6cc"/>
        <path d="M30 -18 Q44 -44 30 -50 Q40 -36 26 -22" fill="#d9567c" ${KF}/>
        <g fill="#e2bd5a">${[-32, -24, 24, 32].map((x) => `<circle cx="${x}" cy="${x < 0 ? 4 : 4}" r="2"/>`).join('')}</g>`,
    },
    metronomo: {
      nome: 'Metrônomo', def: 'Marca o ritmo da música com um pêndulo regular.', r: 40,
      svg: `<path d="M-22 40 L-10 -40 L10 -40 L22 40 Z" fill="#7a4a24" ${K}/>
        <path d="M-12 30 L-4 -28 L4 -28 L12 30 Z" fill="#e8d8ae" ${KF}/>
        <line x1="0" y1="26" x2="12" y2="-26" stroke="#2b1d12" stroke-width="2.4"/>
        <rect x="5" y="-10" width="8" height="6" fill="#c9a03a" transform="rotate(14 9 -7)"/>`,
    },
  });

  // desenha um objeto em um <svg> próprio (lista de itens, diário)
  MI.svgObjeto = function (id, tamanho, extra) {
    const o = O[id];
    if (!o) return '';
    return `<svg viewBox="-56 -56 112 112" width="${tamanho}" height="${tamanho}" ${extra || ''} aria-hidden="true">${o.svg}</svg>`;
  };
})();
