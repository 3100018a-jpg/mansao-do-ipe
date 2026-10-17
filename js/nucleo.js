/* =========================================================
   Mistério na Mansão do Ipê — núcleo
   Espaço de nomes, utilitários, armazenamento e eventos.
   Pode ser carregado no navegador ou no Node (tools/exportar_falas.js).
   ========================================================= */
(function () {
  'use strict';
  const MI = (window.MI = window.MI || {});

  const U = (MI.U = {
    clamp: (v, a, b) => Math.max(a, Math.min(b, v)),
    lerp: (a, b, t) => a + (b - a) * t,
    // FNV-1a 32 bits em hexadecimal (8 caracteres) — também usado para nomear os MP3 das falas
    hash(s) {
      let h = 0x811c9dc5;
      s = String(s);
      for (let i = 0; i < s.length; i++) {
        h ^= s.charCodeAt(i);
        h = Math.imul(h, 0x01000193) >>> 0;
      }
      return ('0000000' + h.toString(16)).slice(-8);
    },
    embaralhar(arr, rnd) {
      const a = arr.slice();
      rnd = rnd || Math.random;
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(rnd() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    },
    // gerador pseudoaleatório com semente (desenhos procedurais estáveis)
    semente(n) {
      let s = (n >>> 0) || 1;
      return function () {
        s = (Math.imul(s ^ (s >>> 15), 0x2c1b3c6d) + 0x297a2d39) >>> 0;
        s = (s ^ (s >>> 12)) >>> 0;
        return (s % 100000) / 100000;
      };
    },
    esc: (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'),
    // dá ids exclusivos a um SVG (vários SVGs com os mesmos ids na página se confundem)
    isolarIds(svg, sufixo) {
      return String(svg)
        .replace(/\bid="([^"]+)"/g, (m, id) => `id="${id}_${sufixo}"`)
        .replace(/url\(#([^)]+)\)/g, (m, id) => `url(#${id}_${sufixo})`)
        .replace(/href="#([^"]+)"/g, (m, id) => `href="#${id}_${sufixo}"`);
    },
    fmtTempo(seg) {
      seg = Math.max(0, Math.floor(seg));
      return Math.floor(seg / 60) + ':' + ('0' + (seg % 60)).slice(-2);
    },
  });

  // ---------- armazenamento seguro ----------
  const PREFIXO = 'mansao-ipe:';
  MI.S = {
    get(chave, padrao) {
      try {
        if (typeof localStorage === 'undefined' || !localStorage) return padrao;
        const v = localStorage.getItem(PREFIXO + chave);
        return v === null ? padrao : JSON.parse(v);
      } catch (e) {
        return padrao;
      }
    },
    set(chave, valor) {
      try {
        if (typeof localStorage !== 'undefined' && localStorage) localStorage.setItem(PREFIXO + chave, JSON.stringify(valor));
      } catch (e) {}
    },
    limpar() {
      try {
        Object.keys(localStorage).filter((k) => k.indexOf(PREFIXO) === 0).forEach((k) => localStorage.removeItem(k));
      } catch (e) {}
    },
  };

  // ---------- eventos ----------
  const ouvintes = {};
  MI.bus = {
    on(n, f) { (ouvintes[n] = ouvintes[n] || []).push(f); },
    emit(n, d) { (ouvintes[n] || []).forEach((f) => { try { f(d); } catch (e) { console.error(e); } }); },
  };
})();
