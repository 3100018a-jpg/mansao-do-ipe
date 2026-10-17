/* =========================================================
   Retratos dos personagens (SVG paramétrico, 200 × 220)
   ========================================================= */
(function () {
  'use strict';
  const MI = window.MI;
  const K = 'stroke="#2b1d12" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"';

  function escurecer(hex, f) {
    const n = parseInt(hex.slice(1), 16);
    const r = Math.round(((n >> 16) & 255) * f), g = Math.round(((n >> 8) & 255) * f), b = Math.round((n & 255) * f);
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  function cabeloTras(v) {
    const c = v.cabelo;
    switch (v.estilo) {
      case 'cacheado': {
        let s = '';
        const pts = [[50, 70], [44, 100], [50, 130], [62, 52], [82, 38], [104, 34], [126, 40], [144, 54], [156, 76], [158, 104], [150, 132], [60, 150], [142, 150]];
        pts.forEach(([x, y], i) => { s += `<circle cx="${x}" cy="${y}" r="${24 + (i % 3) * 4}" fill="${c}"/>`; });
        return s;
      }
      case 'coque':
        return `<circle cx="100" cy="34" r="24" fill="${c}" ${K}/><path d="M86 30 Q100 22 114 30" stroke="${escurecer(c, 0.8)}" stroke-width="2" fill="none"/>`;
      case 'chanel':
        return `<path d="M50 90 Q46 40 100 36 Q154 40 150 90 L152 138 Q140 144 128 138 L72 138 Q60 144 48 138 Z" fill="${c}" ${K}/>`;
      default:
        return '';
    }
  }

  function cabeloFrente(v) {
    const c = v.cabelo, cs = escurecer(c, 0.75);
    switch (v.estilo) {
      case 'cacheado': {
        let s = '';
        [[64, 60], [80, 48], [98, 44], [116, 46], [134, 56], [146, 70]].forEach(([x, y], i) => { s += `<circle cx="${x}" cy="${y}" r="${14 + (i % 2) * 3}" fill="${c}"/><circle cx="${x - 3}" cy="${y - 3}" r="4" fill="${cs}" opacity=".5"/>`; });
        return s;
      }
      case 'coque':
        return `<path d="M54 92 Q52 48 100 46 Q148 48 146 92 Q140 70 120 64 Q100 74 76 64 Q60 72 54 92 Z" fill="${c}" ${K}/><path d="M76 56 Q100 50 124 56" stroke="${cs}" stroke-width="2" fill="none"/>`;
      case 'chanel':
        return `<path d="M54 86 Q56 46 100 44 Q144 46 146 86 L140 84 Q132 66 112 70 Q100 64 86 70 Q66 66 60 86 Z" fill="${c}" ${K}/>`;
      case 'curtoCacheado': {
        let s = `<path d="M56 84 Q54 44 100 42 Q146 44 144 84 Q136 66 100 64 Q64 66 56 84 Z" fill="${c}" ${K}/>`;
        for (let i = 0; i < 9; i++) s += `<circle cx="${62 + i * 9.5}" cy="${56 - Math.sin((i / 8) * Math.PI) * 12}" r="9" fill="${c}"/>`;
        return s;
      }
      case 'chapeuPalha':
        return `<path d="M56 96 Q56 80 64 74 L66 100 Z M144 96 Q144 80 136 74 L134 100 Z" fill="${c}"/>
          <ellipse cx="100" cy="62" rx="82" ry="18" fill="#e2bd6a" ${K}/>
          <path d="M60 60 Q60 18 100 16 Q140 18 140 60 Z" fill="#ebc977" ${K}/>
          <path d="M60 50 Q100 60 140 50 L140 60 Q100 70 60 60 Z" fill="#7a3a22"/>
          <path d="M30 64 Q100 80 170 64" stroke="#b8913f" stroke-width="1.6" fill="none"/>`;
      case 'chapeuCoco':
        return `<path d="M58 86 Q58 62 72 58 L70 90 Z M142 86 Q142 62 128 58 L130 90 Z" fill="${c}"/>
          <ellipse cx="100" cy="60" rx="66" ry="12" fill="#3a2e24" ${K}/>
          <path d="M66 58 Q64 14 100 12 Q136 14 134 58 Z" fill="#4a3a2c" ${K}/>
          <path d="M65 48 Q100 56 135 48 L135 58 Q100 66 65 58 Z" fill="#1f1a16"/>`;
      default:
        return '';
    }
  }

  function roupa(v, id) {
    const r = v.roupa, g = v.gola;
    const base = `<path d="M14 222 Q16 176 58 166 L82 160 L118 160 L142 166 Q184 176 186 222 Z" fill="${r}" ${K}/>`;
    switch (id) {
      case 'marta':
        return base + `<path d="M82 160 L100 196 L118 160 L110 160 L100 178 L90 160 Z" fill="${g}" ${K}/>
          <path d="M78 162 L96 204 L86 222 M122 162 L104 204 L114 222" stroke="${escurecer(r, 0.7)}" stroke-width="3" fill="none"/>
          <rect x="128" y="186" width="18" height="12" rx="2" fill="#f2c230" ${K}/>`;
      case 'helena':
        return base + `<path d="M76 162 Q100 186 124 162" fill="none" stroke="${g}" stroke-width="7"/>
          ${v.colar ? Array.from({ length: 11 }, (_, i) => { const t = i / 10; const x = 78 + 44 * t, y = 168 + Math.sin(t * Math.PI) * 18; return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.6" fill="#fbf7ee" stroke="#b8a88a" stroke-width="1"/>`; }).join('') : ''}
          <circle cx="132" cy="184" r="7" fill="#e2bd5a" ${K}/>`;
      case 'benedito':
        return `<path d="M14 222 Q16 176 58 166 L82 160 L118 160 L142 166 Q184 176 186 222 Z" fill="${g}" ${K}/>
          <path d="M60 222 L64 186 L136 186 L140 222 Z" fill="${r}" ${K}/>
          <path d="M70 186 L62 164 M130 186 L138 164" stroke="${r}" stroke-width="10" stroke-linecap="round"/>
          <circle cx="72" cy="190" r="4" fill="#c9a03a"/><circle cx="128" cy="190" r="4" fill="#c9a03a"/>
          <rect x="88" y="196" width="24" height="16" rx="2" fill="none" stroke="${escurecer(r, 0.7)}" stroke-width="2"/>`;
      case 'tiago':
        return base + `<path d="M70 164 Q100 184 130 164 L124 160 Q100 174 76 160 Z" fill="${escurecer(r, 0.8)}" ${K}/>
          <path d="M90 174 L88 204 M110 174 L112 204" stroke="#f4ead6" stroke-width="3"/>
          <path d="M60 200 Q100 210 140 200" stroke="${escurecer(r, 0.75)}" stroke-width="2" fill="none"/>`;
      case 'lucia':
        return base + `<path d="M84 160 L100 184 L116 160 Z" fill="${g}"/>
          <path d="M80 162 L96 222 M120 162 L104 222" stroke="#c9ced3" stroke-width="3"/>
          <rect x="124" y="184" width="22" height="16" rx="2" fill="none" stroke="#c9ced3" stroke-width="2.4"/>
          <path d="M128 182 L128 194 M134 180 L134 194" stroke="#2f78c4" stroke-width="2.4"/>`;
      case 'rafael':
        return `<path d="M14 222 Q16 176 58 166 L82 160 L118 160 L142 166 Q184 176 186 222 Z" fill="${g}" ${K}/>
          <path d="M46 222 L52 176 L84 164 L100 200 L116 164 L148 176 L154 222 Z" fill="${r}" ${K}/>
          <path d="M88 168 L100 176 L112 168 L112 182 L100 176 L88 182 Z" fill="#c0392b" ${K}/>
          <circle cx="100" cy="206" r="3" fill="#e2bd5a"/><circle cx="100" cy="218" r="3" fill="#e2bd5a"/>
          <rect x="128" y="186" width="16" height="22" fill="#fbf8ee" ${K}/><path d="M131 192 L141 192 M131 198 L141 198" stroke="#7a6a50" stroke-width="1.5"/>`;
      default:
        return base;
    }
  }

  MI.retrato = function (id) {
    const p = MI.PERSONAGENS[id];
    if (!p) return '';
    const v = p.visual;
    const pele = v.pele, peleS = escurecer(pele, 0.86);
    const velho = /idos/.test(v.idade);
    let s = `<svg viewBox="0 0 200 220" class="retrato-svg" aria-hidden="true">`;
    s += cabeloTras(v);
    s += roupa(v, id);
    // pescoço
    s += `<path d="M82 140 L82 166 Q100 176 118 166 L118 140 Z" fill="${peleS}" ${K}/>`;
    // orelhas
    s += `<ellipse cx="54" cy="100" rx="9" ry="13" fill="${pele}" ${K}/><ellipse cx="146" cy="100" rx="9" ry="13" fill="${pele}" ${K}/>`;
    if (v.brinco) s += `<circle cx="53" cy="118" r="5" fill="${v.brinco}" ${K}/><circle cx="147" cy="118" r="5" fill="${v.brinco}" ${K}/>`;
    // rosto
    s += `<path d="M56 92 Q56 46 100 46 Q144 46 144 92 Q144 132 122 146 Q100 158 78 146 Q56 132 56 92 Z" fill="${pele}" ${K}/>`;
    // bochechas
    s += `<ellipse cx="74" cy="116" rx="10" ry="6" fill="#e0707a" opacity=".28"/><ellipse cx="126" cy="116" rx="10" ry="6" fill="#e0707a" opacity=".28"/>`;
    // olhos
    const sob = escurecer(v.cabelo === '#e8e4dc' || v.cabelo === '#cfcac2' ? '#8a8278' : v.cabelo, 1);
    [[80, 98], [120, 98]].forEach(([x, y]) => {
      s += `<ellipse cx="${x}" cy="${y}" rx="9" ry="7.5" fill="#fff" stroke="#2b1d12" stroke-width="1.8"/>`;
      s += `<circle cx="${x + 1}" cy="${y + 0.5}" r="5" fill="#4a2e1c"/><circle cx="${x + 1}" cy="${y + 0.5}" r="2.4" fill="#120a05"/><circle cx="${x + 3}" cy="${y - 1.6}" r="1.6" fill="#fff"/>`;
      s += `<path d="M${x - 10} ${y - 2} Q${x} ${y - 11} ${x + 10} ${y - 2}" stroke="#2b1d12" stroke-width="2.4" fill="none"/>`;
      s += `<path d="M${x - 11} ${y - 16} Q${x} ${y - 22} ${x + 11} ${y - 15}" stroke="${sob}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
      if (velho) s += `<path d="M${x + (x < 100 ? -14 : 14)} ${y + 2} l${x < 100 ? -5 : 5} -2 M${x + (x < 100 ? -14 : 14)} ${y + 6} l${x < 100 ? -5 : 5} 1" stroke="${escurecer(pele, 0.7)}" stroke-width="1.5"/>`;
    });
    // nariz e boca
    s += `<path d="M100 104 Q96 118 102 122" stroke="${escurecer(pele, 0.65)}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
    if (v.bigode) s += `<path d="M84 130 Q92 122 100 127 Q108 122 116 130 Q108 132 100 130 Q92 132 84 130 Z" fill="${v.bigode}" ${K}/>`;
    s += `<path d="M86 132 Q100 144 114 132 Q100 138 86 132 Z" fill="#a8434a" stroke="#2b1d12" stroke-width="2"/>`;
    s += `<path d="M90 133.5 Q100 137 110 133.5" stroke="#fff" stroke-width="2.2" fill="none"/>`;
    if (velho) s += `<path d="M76 124 Q80 134 84 138 M124 124 Q120 134 116 138" stroke="${escurecer(pele, 0.72)}" stroke-width="1.6" fill="none"/>`;
    if (v.barba) s += `<path d="M60 112 Q62 150 100 156 Q138 150 140 112 Q132 140 116 140 Q100 146 84 140 Q68 140 60 112 Z" fill="${v.barba}" ${K}/><path d="M88 134 Q100 140 112 134" stroke="#7a3a3a" stroke-width="3" fill="none"/>`;
    s += cabeloFrente(v);
    if (v.oculos) s += `<g fill="#fff" fill-opacity=".18" stroke="#3a2414" stroke-width="3"><circle cx="80" cy="99" r="14"/><circle cx="120" cy="99" r="14"/></g><path d="M94 98 Q100 94 106 98 M66 96 L56 92 M134 96 L144 92" stroke="#3a2414" stroke-width="3" fill="none"/>`;
    if (v.oculosProtecao) s += `<path d="M56 64 Q58 50 80 52 L120 52 Q142 50 144 64 Q142 76 122 74 Q108 72 100 66 Q92 72 78 74 Q58 76 56 64 Z" fill="#cfe8f3" fill-opacity=".85" ${K}/><path d="M52 64 L44 70 M148 64 L156 70" stroke="#2f78c4" stroke-width="5" stroke-linecap="round"/>`;
    s += `</svg>`;
    return s;
  };
})();
