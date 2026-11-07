/*!
 * VitalyJS v1.0.0 — VitalyCSS komponentu skripts
 * Viss darbojas caur data-v-* atribūtiem, JS rakstīt nav jāprot.
 * Nav atkarību. Ievieto pirms </body>:  <script src="vitaly.js"></script>
 *
 * ATRIBŪTI
 *  data-v-logs="#id"            atver modālo logu
 *  data-v-aizvert[="#id"]       aizver logu / sānpaneli / ziņu / paziņojumu
 *  data-v-statisks              logs neaizveras ar klikšķi uz fona
 *  data-v-nolaist               nolaižamās izvēlnes poga (iekš .nolaižamais)
 *  data-v-cilnes + data-v-cilne="#id"   cilnes
 *  data-v-akordeons [data-v-viens]  + data-v-akordeons-poga   akordeons
 *  data-v-saklaut="#id"         sakļaujams bloks
 *  data-v-sanpanelis="#id"      sānpanelis (offcanvas)
 *  data-v-pazinojums="teksts"   toast (+ data-v-veids, data-v-ilgums)
 *  data-v-padoms="teksts"       rīka padoms (+ data-v-vieta) — tīrs CSS
 *  data-v-karuselis [data-v-auto="4000"]   karuselis
 *  data-v-kopet="#id|teksts"    kopēt uz starpliktuvi
 *  data-v-tema                  gaišā/tumšā tēma
 *  data-v-ritinat="#id"         gluda ritināšana (+ data-v-nobide)
 *  data-v-uz-augsu              poga "uz augšu"
 *  data-v-spiegs                izvēlne, kas izceļ aktīvo sadaļu
 *  data-v-skaititajs="1250"     skaitļu animācija (+ prefikss/sufikss/ilgums)
 *  data-v-paradit[="kreisi|labi|pieaugt"]  parādīšanās ritinot (+ data-v-kave)
 *  data-v-slinks="url"          slinkā attēlu ielāde
 *  data-v-gaisma[="url"]        attēlu palielinājums (lightbox)
 *  data-v-parole="#id"          parole rādīt/slēpt
 *  data-v-simboli="#id"         rakstzīmju skaitītājs (ar maxlength)
 *  data-v-kartot                tabulas kārtošana pēc kolonnas
 *  data-v-meklet="#id"          saraksta/tabulas filtrēšana
 *  data-v-lasisanas-progress    lasīšanas progresa josla
 *
 * JS API:  Vitaly.pazinot('Teksts', {veids:'labi'})  ·  Vitaly.atvertLogu('#id')
 * Notikumi: v:atverts, v:aizverts, v:cilne, v:tema (burbuļo uz augšu)
 */
(function () {
  'use strict';

  document.documentElement.classList.add('v-js');

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var raidit = function (el, nos, det) {
    el.dispatchEvent(new CustomEvent('v:' + nos, { bubbles: true, detail: det || {} }));
  };
  var mer = function (el, a) {
    var v = el.getAttribute(a);
    if (!v) return null;
    try { return $(v); } catch (_) { return null; }
  };
  var bezDiakritikam = function (t) {
    return t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };
  var atjaunotRitinasanu = function () {
    document.body.style.overflow = $('.aizkars--atvērts, .sānpanelis--atvērts') ? 'hidden' : '';
  };

  /* ───────── TĒMA ───────── */
  try {
    var saglabata = localStorage.getItem('vitaly-tema');
    if (saglabata) document.documentElement.setAttribute('data-tema', saglabata);
  } catch (_) {}

  function parslegtTemu() {
    var h = document.documentElement;
    var t = h.getAttribute('data-tema');
    var tumsa = t ? t === 'tumša' : matchMedia('(prefers-color-scheme: dark)').matches;
    var jauna = tumsa ? 'gaiša' : 'tumša';
    h.setAttribute('data-tema', jauna);
    try { localStorage.setItem('vitaly-tema', jauna); } catch (_) {}
    raidit(h, 'tema', { tema: jauna });
  }

  /* ───────── MODĀLIE LOGI ───────── */
  function atvertLogu(el) {
    if (typeof el === 'string') el = $(el);
    if (!el || el.classList.contains('aizkars--atvērts')) return;
    el._atgriezt = document.activeElement;
    el.classList.add('aizkars--atvērts');
    el.setAttribute('aria-hidden', 'false');
    var l = $('.logs', el);
    if (l) { l.setAttribute('role', 'dialog'); l.setAttribute('aria-modal', 'true'); }
    atjaunotRitinasanu();
    var f = $('[autofocus], .logs button, .logs [href], .logs input, .logs select, .logs textarea', el);
    if (f) f.focus();
    raidit(el, 'atverts');
  }
  function aizvertLogu(el) {
    if (typeof el === 'string') el = $(el);
    if (!el || !el.classList.contains('aizkars--atvērts')) return;
    el.classList.remove('aizkars--atvērts');
    el.setAttribute('aria-hidden', 'true');
    atjaunotRitinasanu();
    if (el._atgriezt && el._atgriezt.focus) el._atgriezt.focus();
    raidit(el, 'aizverts');
  }

  /* ───────── SĀNPANELIS ───────── */
  function atvertPanel(el) {
    if (!el) return;
    var f = $('.sānpaneļa-fons');
    if (!f) {
      f = document.createElement('div');
      f.className = 'sānpaneļa-fons';
      f.addEventListener('click', function () { $$('.sānpanelis--atvērts').forEach(aizvertPanel); });
      document.body.appendChild(f);
    }
    el.classList.add('sānpanelis--atvērts');
    requestAnimationFrame(function () {
      if (el.classList.contains('sānpanelis--atvērts')) f.classList.add('redzams');
    });
    atjaunotRitinasanu();
    raidit(el, 'atverts');
  }
  function aizvertPanel(el) {
    el.classList.remove('sānpanelis--atvērts');
    if (!$('.sānpanelis--atvērts')) {
      var f = $('.sānpaneļa-fons');
      if (f) f.classList.remove('redzams');
    }
    atjaunotRitinasanu();
    raidit(el, 'aizverts');
  }

  /* ───────── NOLAIŽAMĀ IZVĒLNE ───────── */
  function nolaizamais(d, atverts) {
    d.classList.toggle('nolaižamais--atvērts', atverts);
    var t = $('[data-v-nolaist]', d);
    if (t) t.setAttribute('aria-expanded', atverts);
  }

  /* ───────── CILNES ───────── */
  function aktivizetCilni(poga) {
    var kont = poga.closest('[data-v-cilnes]');
    $$('[data-v-cilne]', kont).forEach(function (p) {
      var a = p === poga;
      p.classList.toggle('aktīvs', a);
      p.setAttribute('aria-selected', a);
      p.tabIndex = a ? 0 : -1;
      var pan = mer(p, 'data-v-cilne');
      if (pan) { pan.hidden = !a; pan.setAttribute('role', 'tabpanel'); }
    });
    raidit(kont, 'cilne', { poga: poga });
  }

  /* ───────── AKORDEONS / SAKĻAUJAMS ───────── */
  function akordeonaVieniba(item) {
    var acc = item.closest('[data-v-akordeons]');
    var atver = !item.classList.contains('akordeons__vienība--atvērta');
    if (atver && acc && acc.hasAttribute('data-v-viens')) {
      $$('.akordeons__vienība--atvērta', acc).forEach(function (o) { akordeonsIestat(o, false); });
    }
    akordeonsIestat(item, atver);
  }
  function akordeonsIestat(item, atverts) {
    item.classList.toggle('akordeons__vienība--atvērta', atverts);
    var p = $('[data-v-akordeons-poga]', item);
    if (p) p.setAttribute('aria-expanded', atverts);
    raidit(item, atverts ? 'atverts' : 'aizverts');
  }
  function sakļaut(poga) {
    var m = mer(poga, 'data-v-saklaut');
    if (!m) return;
    var o = !m.classList.contains('sakļaujams--atvērts');
    m.classList.toggle('sakļaujams--atvērts', o);
    poga.setAttribute('aria-expanded', o);
    raidit(m, o ? 'atverts' : 'aizverts');
  }

  /* ───────── PAZIŅOJUMI (TOAST) ───────── */
  function izzust(el) {
    el.classList.remove('redzams');
    el.style.opacity = '0';
    setTimeout(function () { el.remove(); }, 260);
  }
  function pazinot(teksts, opc) {
    opc = opc || {};
    var vieta = $('.paziņojumu-vieta');
    if (!vieta) {
      vieta = document.createElement('div');
      vieta.className = 'paziņojumu-vieta';
      vieta.setAttribute('aria-live', 'polite');
      document.body.appendChild(vieta);
    }
    var t = document.createElement('div');
    t.className = 'paziņojums paziņojums--' + (opc.veids || 'info');
    t.setAttribute('role', 'status');
    var s = document.createElement('span');
    s.textContent = teksts;
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'paziņojums__aizvērt';
    b.setAttribute('data-v-aizvert', '');
    b.setAttribute('aria-label', 'Aizvērt');
    b.innerHTML = '&times;';
    t.appendChild(s);
    t.appendChild(b);
    vieta.appendChild(t);
    requestAnimationFrame(function () { t.classList.add('redzams'); });
    var ilg = opc.ilgums === undefined ? 4000 : opc.ilgums;
    if (ilg > 0) setTimeout(function () { izzust(t); }, ilg);
    return t;
  }

  function aizvertUniversali(poga) {
    var sel = poga.getAttribute('data-v-aizvert');
    var el = sel ? $(sel) : poga.closest('.aizkars, .sānpanelis, .paziņojums, .ziņa');
    if (!el) return;
    if (el.classList.contains('aizkars')) aizvertLogu(el);
    else if (el.classList.contains('sānpanelis')) aizvertPanel(el);
    else izzust(el);
  }

  /* ───────── KOPĒT ───────── */
  function kopet(poga) {
    var v = poga.getAttribute('data-v-kopet');
    var m = v.charAt(0) === '#' ? $(v) : null;
    var teksts = v;
    if (m) teksts = (/^(INPUT|TEXTAREA|SELECT)$/.test(m.tagName) ? m.value : m.textContent).trim();
    var gatavs = function () {
      var org = poga.textContent;
      poga.textContent = poga.getAttribute('data-v-kopets') || 'Nokopēts!';
      setTimeout(function () { poga.textContent = org; }, 1600);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(teksts).then(gatavs);
    } else {
      var ta = document.createElement('textarea');
      ta.value = teksts; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); gatavs(); } catch (_) {}
      ta.remove();
    }
  }

  /* ───────── GAISMAS KASTE ───────── */
  function gaisma(el) {
    var src = el.getAttribute('data-v-gaisma') || el.currentSrc || el.src || el.getAttribute('href');
    if (!src) return;
    var k = $('.gaismas-kaste');
    if (!k) {
      k = document.createElement('div');
      k.className = 'aizkars gaismas-kaste';
      k.setAttribute('data-v-statisks', '');
      k.innerHTML = '<img alt="">';
      k.addEventListener('click', function () { aizvertLogu(k); });
      document.body.appendChild(k);
    }
    var im = $('img', k);
    im.src = src;
    im.alt = el.alt || '';
    atvertLogu(k);
  }

  /* ───────── TABULAS KĀRTOŠANA ───────── */
  function kartot(th) {
    var tab = th.closest('table');
    var idx = Array.prototype.indexOf.call(th.parentNode.children, th);
    var tb = tab.tBodies[0];
    var dilst = th.getAttribute('aria-sort') === 'ascending';
    $$('th', tab).forEach(function (h) { h.removeAttribute('aria-sort'); });
    th.setAttribute('aria-sort', dilst ? 'descending' : 'ascending');
    var lv = new Intl.Collator('lv', { numeric: true });
    var val = function (r) {
      var t = r.cells[idx].textContent.trim();
      var n = t.replace(/\s/g, '').replace(',', '.');
      return /^-?\d+(\.\d+)?$/.test(n) ? parseFloat(n) : t;
    };
    Array.prototype.slice.call(tb.rows).sort(function (a, b) {
      var x = val(a), y = val(b);
      var r = (typeof x === 'number' && typeof y === 'number') ? x - y : lv.compare(String(x), String(y));
      return dilst ? -r : r;
    }).forEach(function (r) { tb.appendChild(r); });
  }

  /* ───────── KARUSELIS ───────── */
  function karuselis(el) {
    var josla = $('.karuselis__josla', el);
    if (!josla) return;
    var n = josla.children.length, i = 0, taimeris;
    var punkti = $('.karuselis__punkti', el);
    if (punkti) {
      punkti.innerHTML = '';
      for (var k = 0; k < n; k++) {
        (function (k) {
          var b = document.createElement('button');
          b.type = 'button';
          b.setAttribute('aria-label', 'Slaids ' + (k + 1));
          b.addEventListener('click', function () { iet(k); starts(); });
          punkti.appendChild(b);
        })(k);
      }
    }
    function iet(j) {
      i = (j + n) % n;
      josla.style.transform = 'translateX(-' + (i * 100) + '%)';
      if (punkti) Array.prototype.forEach.call(punkti.children, function (b, x) { b.classList.toggle('aktīvs', x === i); });
    }
    function starts() {
      clearInterval(taimeris);
      var ms = +el.getAttribute('data-v-auto');
      if (ms && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
        taimeris = setInterval(function () { iet(i + 1); }, ms);
      }
    }
    var p = $('[data-v-iepriekseja]', el), nx = $('[data-v-nakama]', el);
    if (p) p.addEventListener('click', function () { iet(i - 1); starts(); });
    if (nx) nx.addEventListener('click', function () { iet(i + 1); starts(); });
    el.addEventListener('mouseenter', function () { clearInterval(taimeris); });
    el.addEventListener('mouseleave', starts);
    var x0 = null;
    el.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    el.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var d = e.changedTouches[0].clientX - x0;
      if (Math.abs(d) > 40) { iet(i + (d < 0 ? 1 : -1)); starts(); }
      x0 = null;
    });
    iet(0);
    starts();
  }

  /* ───────── SKAITĪTĀJS ───────── */
  function skaitit(el) {
    var gal = parseFloat(el.getAttribute('data-v-skaititajs'));
    if (isNaN(gal)) return;
    var ilg = +el.getAttribute('data-v-ilgums') || 1500;
    var pre = el.getAttribute('data-v-prefikss') || '';
    var suf = el.getAttribute('data-v-sufikss') || '';
    var dec = (String(gal).split('.')[1] || '').length;
    var t0 = performance.now();
    (function kadrs(t) {
      var p = Math.min((t - t0) / ilg, 1);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + (gal * e).toLocaleString('lv-LV', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf;
      if (p < 1) requestAnimationFrame(kadrs);
    })(t0);
  }

  /* ───────── PALĪGS: IntersectionObserver ───────── */
  function reiz(sel, fn, opc) {
    var els = $$(sel);
    if (!('IntersectionObserver' in window)) { els.forEach(fn); return; }
    var io = new IntersectionObserver(function (ent) {
      ent.forEach(function (e) { if (e.isIntersecting) { fn(e.target); io.unobserve(e.target); } });
    }, opc || { threshold: 0.15 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ───────── KLIKŠĶI (delegēti) ───────── */
  document.addEventListener('click', function (e) {
    var c = function (s) { return e.target.closest(s); };
    var el;

    // nolaižamās izvēlnes
    var dd = c('.nolaižamais');
    $$('.nolaižamais--atvērts').forEach(function (d) { if (d !== dd) nolaizamais(d, false); });
    if ((el = c('[data-v-nolaist]'))) {
      e.preventDefault();
      var d = el.closest('.nolaižamais');
      nolaizamais(d, !d.classList.contains('nolaižamais--atvērts'));
    } else if (dd && c('.nolaižamais__izvēlne a, .nolaižamais__izvēlne button') && !c('[data-v-paturet]')) {
      nolaizamais(dd, false);
    }

    // modālie logi
    if ((el = c('[data-v-logs]'))) { e.preventDefault(); atvertLogu(mer(el, 'data-v-logs')); }
    var fons = e.target;
    if (fons.classList && fons.classList.contains('aizkars--atvērts') && !fons.hasAttribute('data-v-statisks')) aizvertLogu(fons);
    if ((el = c('[data-v-aizvert]'))) aizvertUniversali(el);

    // sānpanelis, sakļaujams, akordeons, cilnes
    if ((el = c('[data-v-sanpanelis]'))) { e.preventDefault(); atvertPanel(mer(el, 'data-v-sanpanelis')); }
    if ((el = c('[data-v-saklaut]'))) sakļaut(el);
    if ((el = c('[data-v-akordeons-poga]'))) akordeonaVieniba(el.closest('.akordeons__vienība'));
    if ((el = c('[data-v-cilne]'))) { e.preventDefault(); aktivizetCilni(el); }

    // paziņojumi
    if ((el = c('[data-v-pazinojums]'))) {
      var il = el.getAttribute('data-v-ilgums');
      pazinot(el.getAttribute('data-v-pazinojums'), {
        veids: el.getAttribute('data-v-veids') || 'info',
        ilgums: il === null ? undefined : +il
      });
    }

    // dažādi
    if ((el = c('[data-v-kopet]'))) kopet(el);
    if (c('[data-v-tema]')) parslegtTemu();
    if ((el = c('[data-v-gaisma]'))) { e.preventDefault(); gaisma(el); }
    if (c('[data-v-uz-augsu]')) { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    if ((el = c('[data-v-ritinat]'))) {
      var m = mer(el, 'data-v-ritinat');
      if (m) {
        e.preventDefault();
        var nob = +el.getAttribute('data-v-nobide') || 72;
        window.scrollTo({ top: m.getBoundingClientRect().top + window.pageYOffset - nob, behavior: 'smooth' });
      }
    }
    if ((el = c('[data-v-parole]'))) {
      var inp = mer(el, 'data-v-parole');
      if (inp) {
        var rada = inp.type === 'password';
        inp.type = rada ? 'text' : 'password';
        el.setAttribute('aria-pressed', rada);
        el.textContent = rada ? (el.getAttribute('data-v-slept') || 'Slēpt') : (el.getAttribute('data-v-radit') || 'Rādīt');
      }
    }
    if ((el = c('[data-v-kartot] th'))) kartot(el);
  });

  /* ───────── TASTATŪRA ───────── */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var logi = $$('.aizkars--atvērts');
      if (logi.length) aizvertLogu(logi[logi.length - 1]);
      $$('.sānpanelis--atvērts').forEach(aizvertPanel);
      $$('.nolaižamais--atvērts').forEach(function (d) { nolaizamais(d, false); });
    }
    if (e.key === 'Tab') {
      var l = $('.aizkars--atvērts');
      if (l) {
        var f = $$('a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])', l)
          .filter(function (x) { return x.offsetParent !== null; });
        if (f.length) {
          var pirmais = f[0], pedejais = f[f.length - 1];
          if (e.shiftKey && document.activeElement === pirmais) { e.preventDefault(); pedejais.focus(); }
          else if (!e.shiftKey && document.activeElement === pedejais) { e.preventDefault(); pirmais.focus(); }
        }
      }
    }
    if (e.target.matches && e.target.matches('[data-v-cilne]') && ['ArrowRight', 'ArrowLeft', 'Home', 'End'].indexOf(e.key) > -1) {
      var p = $$('[data-v-cilne]', e.target.closest('[data-v-cilnes]'));
      var i = p.indexOf(e.target);
      i = e.key === 'Home' ? 0 : e.key === 'End' ? p.length - 1 : (i + (e.key === 'ArrowRight' ? 1 : -1) + p.length) % p.length;
      e.preventDefault(); aktivizetCilni(p[i]); p[i].focus();
    }
    if (e.key === 'Enter' && e.target.matches && e.target.matches('[data-v-kartot] th')) kartot(e.target);
  });

  /* ───────── IEVADES LAUKI ───────── */
  document.addEventListener('input', function (e) {
    var el = e.target;
    var sk = el.getAttribute && el.getAttribute('data-v-simboli');
    if (sk) {
      var m = $(sk);
      if (m) m.textContent = el.value.length + (el.maxLength > 0 ? ' / ' + el.maxLength : '');
    }
    var mk = el.getAttribute && el.getAttribute('data-v-meklet');
    if (mk) {
      var mer_ = $(mk);
      if (!mer_) return;
      var q = bezDiakritikam(el.value.trim());
      var vienumi = mer_.tagName === 'TABLE' ? $$('tbody tr', mer_) : Array.prototype.slice.call(mer_.children);
      vienumi.forEach(function (v) { v.hidden = q && bezDiakritikam(v.textContent).indexOf(q) === -1; });
    }
  });

  /* ───────── INICIALIZĀCIJA ───────── */
  function init() {
    // cilnes
    $$('[data-v-cilnes]').forEach(function (k) {
      k.setAttribute('role', 'tablist');
      var p = $$('[data-v-cilne]', k);
      p.forEach(function (x) { x.setAttribute('role', 'tab'); });
      var akt = p.filter(function (x) { return x.classList.contains('aktīvs'); })[0] || p[0];
      if (akt) aktivizetCilni(akt);
    });

    // akordeoni
    $$('.akordeons__vienība').forEach(function (it) {
      var p = $('[data-v-akordeons-poga]', it);
      if (p) p.setAttribute('aria-expanded', it.classList.contains('akordeons__vienība--atvērta'));
    });

    // karuseļi
    $$('[data-v-karuselis]').forEach(karuselis);

    // skaitītāji, parādīšanās, slinkā ielāde
    reiz('[data-v-skaititajs]', skaitit, { threshold: 0.4 });
    $$('[data-v-paradit]').forEach(function (el) {
      var k = el.getAttribute('data-v-kave');
      if (k) el.style.transitionDelay = k + 'ms';
    });
    reiz('[data-v-paradit]', function (el) { el.classList.add('parādīts'); });
    reiz('img[data-v-slinks]', function (im) {
      im.addEventListener('load', function () { im.classList.add('ielādēts'); });
      im.src = im.getAttribute('data-v-slinks');
    }, { rootMargin: '200px' });

    // tabulu galvenes
    $$('[data-v-kartot] th').forEach(function (th) { th.tabIndex = 0; });

    // scrollspy
    $$('[data-v-spiegs]').forEach(function (nav) {
      if (!('IntersectionObserver' in window)) return;
      var saites = $$('a[href^="#"]', nav).filter(function (a) { return a.hash.length > 1; });
      var karte = new Map();
      saites.forEach(function (a) { var s = $(a.hash); if (s) karte.set(s, a); });
      var io = new IntersectionObserver(function (en) {
        en.forEach(function (x) {
          if (x.isIntersecting) {
            saites.forEach(function (a) { a.classList.remove('aktīvs'); });
            karte.get(x.target).classList.add('aktīvs');
          }
        });
      }, { rootMargin: '-35% 0px -60% 0px' });
      karte.forEach(function (_, s) { io.observe(s); });
    });

    // ritināšanās: "uz augšu" + lasīšanas progress
    var augsa = $('[data-v-uz-augsu]'), josla = $('[data-v-lasisanas-progress]');
    var gaida = false;
    function ritinasana() {
      gaida = false;
      var y = window.pageYOffset;
      if (augsa) augsa.classList.toggle('redzams', y > 400);
      if (josla) {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        josla.style.width = (h > 0 ? Math.min(y / h * 100, 100) : 0) + '%';
      }
    }
    if (augsa || josla) {
      window.addEventListener('scroll', function () {
        if (!gaida) { gaida = true; requestAnimationFrame(ritinasana); }
      }, { passive: true });
      ritinasana();
    }

    // simbolu skaitītāji sākuma vērtībai
    $$('[data-v-simboli]').forEach(function (el) { el.dispatchEvent(new Event('input', { bubbles: true })); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.Vitaly = {
    pazinot: pazinot,
    atvertLogu: atvertLogu,
    aizvertLogu: aizvertLogu,
    atvertPaneli: function (s) { atvertPanel(typeof s === 'string' ? $(s) : s); },
    parslegtTemu: parslegtTemu
  };
})();
