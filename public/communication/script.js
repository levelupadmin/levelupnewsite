/* Own Every Room — motion system
   Mirrors the /sw behaviour: line-mask reveals, staggered fade-ups,
   scroll-linked ring + bar fills, count-ups, marquees, parallax, accordions. */

(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ──────────────── Nav: dark over hero, solid after ──────────────── */
  var nav = document.getElementById('nav');
  var burger = document.getElementById('burger');
  var hero = document.getElementById('top');
  var lastY = 0;

  function navState() {
    var y = window.scrollY;
    var threshold = hero ? hero.offsetHeight - 90 : 90;
    nav.classList.toggle('is-solid', y > threshold);
    // hide on scroll down, show on scroll up (only once well past the hero)
    if (y > threshold + 260) {
      nav.classList.toggle('is-hidden', y > lastY && !nav.classList.contains('is-open'));
    } else {
      nav.classList.remove('is-hidden');
    }
    lastY = y;
  }

  burger.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.getElementById('navLinks').addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      nav.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });

  /* ──────────────── Smooth anchor scroll (JS-driven so reveals fire) ──────────────── */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href');
    if (id === '#' || id.length < 2) return;
    var target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    var top = target.getBoundingClientRect().top + window.scrollY - 74;
    window.scrollTo({ top: top, behavior: reduce ? 'auto' : 'smooth' });
  });

  /* ──────────────── Scroll progress ──────────────── */
  var pbar = document.getElementById('pbar');

  /* ──────────────── Parallax ──────────────── */
  var pxNodes = [];

  // Belt-and-braces: if anything in view is still hidden, reveal it.
  // IntersectionObserver can miss elements after instant jumps or when the
  // tab was backgrounded while they scrolled past.
  function sweepReveals() {
    var vh = window.innerHeight;
    document.querySelectorAll('.rv:not(.in), .rl:not(.in), .rings:not(.in), .score:not(.in)').forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < vh - 40 && r.bottom > 0) revealNow(el, 0);
    });
  }

  function onScroll() {
    navState();
    mobileScroll();
    var h = document.documentElement.scrollHeight - window.innerHeight;
    pbar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
    sweepReveals();

    if (!reduce) {
      for (var i = 0; i < pxNodes.length; i++) {
        var n = pxNodes[i];
        var r = n.el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > window.innerHeight + 200) continue;
        var mid = r.top + r.height / 2 - window.innerHeight / 2;
        n.el.style.transform = 'translate3d(0,' + (-mid * n.k).toFixed(1) + 'px,0)';
      }
      timelineFill();
    }
  }

  /* ──────────────── Timeline progress line ──────────────── */
  var tl = document.getElementById('tl');
  var tlFill = document.getElementById('tlFill');
  /* Driven by its own listener below, not from onScroll - a throw anywhere
     earlier in onScroll used to silently kill the lane. scaleY, not height:
     a percentage height against a top/bottom-sized absolute parent resolves
     to 0 in Chrome. */
  function timelineFill() {
    if (!tl || !tlFill) return;
    var r = tl.getBoundingClientRect();
    var pct = (window.innerHeight * 0.72 - r.top) / r.height;
    tlFill.style.transform = 'scaleY(' + Math.max(0, Math.min(1, pct)).toFixed(4) + ')';
  }
  if (tl && tlFill) {
    /* Called straight off the scroll event, not through rAF: it is one
       getBoundingClientRect and one transform write, and rAF is throttled
       to zero in some embedded contexts, which killed this silently. */
    window.addEventListener('scroll', timelineFill, { passive: true });
    window.addEventListener('resize', timelineFill, { passive: true });
    timelineFill();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  /* ──────────────── Logo marquee ──────────────── */
  // Full wordmarks, all normalised to one cap height, in brand colour.
  var LOGOS = [
    ['deloitte', 'Deloitte'], ['pwc', 'PwC'], ['tata_steel', 'Tata Steel'],
    ['tata_power', 'Tata Power'], ['icici_bank', 'ICICI Bank'], ['tech_mahindra', 'Tech Mahindra'],
    ['times_of_india', 'The Times of India'], ['india_today', 'India Today'],
    ['leo_burnett', 'Leo Burnett'], ['dneg', 'DNEG'], ['sail', 'SAIL'],
    ['nasscom', 'Nasscom'], ['telus', 'TELUS International'],
    ['binghamton', 'Binghamton University']
  ];
  // canara_hsbc is deliberately out of the white set — its only available source
  // is an opaque JPG, so the knockout renders as a solid block.
  // Same infinite marquee on every breakpoint. Mobile only differs in CSS:
  // full-bleed to the screen edge, wider gaps, no edge mask.
  var host = document.getElementById('logos');

  function buildLogos() {
    if (!host || host.dataset.mode === 'marquee') return;
    host.dataset.mode = 'marquee';
    host.innerHTML = '';

    var track = document.createElement('div');
    track.className = 'logos__track';
    for (var pass = 0; pass < 2; pass++) {
      LOGOS.forEach(function (l) {
        var img = document.createElement('img');
        img.src = 'https://cdn.leveluplearning.in/live-hub/communication/img/logos_w/' + l[0] + '.webp';
        img.alt = pass === 0 ? l[1] : '';
        if (pass === 1) img.setAttribute('aria-hidden', 'true');
        img.loading = 'lazy';
        track.appendChild(img);
      });
    }
    host.appendChild(track);
  }
  buildLogos();

  /* ──────────────── Rings: scroll-scrubbed arcs ────────────────
     The arc length tracks scroll position through the section, and the
     three rings are staggered so they fill in sequence as you come down. */
  (function () {
    var sec = document.getElementById('week');
    if (!sec) return;
    var arcs = [].slice.call(sec.querySelectorAll('.ring__arc'));
    if (!arcs.length) return;
    var FULL = 534;
    var targets = arcs.map(function (a) {
      return parseFloat((a.getAttribute('style') || '').replace(/[^0-9.]/g, '')) || 160;
    });
    if (reduce) {
      arcs.forEach(function (a, i) { a.style.strokeDashoffset = targets[i]; });
      return;
    }
    sec.querySelector('.rings').classList.add('scrub');
    var ticking = false;
    function upd() {
      ticking = false;
      var r = sec.getBoundingClientRect(), vh = window.innerHeight;
      var start = vh * 0.85, end = vh * 0.15 - r.height * 0.55;
      var p = (start - r.top) / (start - end);
      if (p < 0) p = 0; if (p > 1) p = 1;
      for (var i = 0; i < arcs.length; i++) {
        var local = (p - i * 0.18) / 0.46;
        if (local < 0) local = 0; if (local > 1) local = 1;
        arcs[i].style.strokeDashoffset = (FULL - local * (FULL - targets[i])).toFixed(1);
      }
    }
    function onS() { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }
    window.addEventListener('scroll', onS, { passive: true });
    window.addEventListener('resize', onS, { passive: true });
    upd();
  })();

  /* ──────────────── Scroll-revealed lede ────────────────
     Wrap every word, then light them up as the paragraph crosses the
     viewport. Same mechanic as the AI cohort page. */
  (function () {
    var el = document.querySelector('.cohort-lede');
    if (!el) return;
    function wrap(t, bold) {
      return t.split(/(\s+)/).map(function (w) {
        return /\S/.test(w) ? '<span class="lw' + (bold ? ' lw-b' : '') + '">' + w + '</span>' : w;
      }).join('');
    }
    var html = '';
    [].forEach.call(el.childNodes, function (n) {
      if (n.nodeType === 3) html += wrap(n.textContent, false);
      else if (n.nodeType === 1) html += wrap(n.textContent, n.classList && n.classList.contains('cl-b'));
    });
    el.innerHTML = html;
    var words = [].slice.call(el.querySelectorAll('.lw'));
    var N = words.length;
    if (!N || reduce) { words.forEach(function (w) { w.classList.add('on'); }); return; }
    var shown = -1, ticking = false;
    function upd() {
      ticking = false;
      var r = el.getBoundingClientRect(), vh = window.innerHeight;
      var start = vh * 0.82, end = vh * 0.34;
      var p = (start - r.top) / (start - end);
      if (p < 0) p = 0; if (p > 1) p = 1;
      var target = Math.round(p * N);
      if (target === shown) return;
      for (var i = 0; i < N; i++) {
        var on = i < target;
        if (on !== words[i]._on) { words[i]._on = on; words[i].classList.toggle('on', on); }
      }
      shown = target;
    }
    function onS() { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }
    window.addEventListener('scroll', onS, { passive: true });
    window.addEventListener('resize', onS, { passive: true });
    upd();
  })();

  /* ──────────────── Testimonial marquee ────────────────
     Duplicate each row's cards so translateX(-50%) loops seamlessly. */
  document.querySelectorAll('[data-tmar]').forEach(function (row) {
    if (row.dataset.looped) return;
    row.dataset.looped = '1';
    var cards = Array.prototype.slice.call(row.children);
    cards.forEach(function (c) {
      var clone = c.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      row.appendChild(clone);
    });
  });


  /* ──────────────── Reveal system ──────────────── */
  function revealNow(el, delay) {
    el.style.transitionDelay = (delay || 0) + 's';
    el.classList.add('in');
    el.querySelectorAll('.rl > span').forEach(function (s, i) {
      s.style.transitionDelay = ((delay || 0) + i * 0.11) + 's';
    });
    el.querySelectorAll('.rw').forEach(function (s, i) {
      s.style.transitionDelay = ((delay || 0) + i * 0.035) + 's';
    });
  }

  var targets = document.querySelectorAll('.rv, .rl, .rings, .score, .tl__item');

  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var sibs = Array.prototype.filter.call(
          el.parentNode.children,
          function (c) { return c.classList && c.classList.contains('rv'); }
        );
        var i = sibs.indexOf(el);
        revealNow(el, i > 0 ? Math.min(i, 5) * 0.09 : 0);
        io.unobserve(el);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -70px 0px' });
    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add('in'); });
  }

  // Hero reveals immediately, staggered, without waiting on scroll.
  var heroIn = document.getElementById('heroIn');
  if (heroIn) {
    setTimeout(function () {
      heroIn.querySelectorAll('.rl').forEach(function (el) { el.classList.add('in'); });
      heroIn.querySelectorAll('.rl > span').forEach(function (s, i) {
        s.style.transitionDelay = (0.18 + i * 0.12) + 's';
      });
      var order = heroIn.querySelectorAll('.rv');
      order.forEach(function (el, i) {
        var d = i === 0 ? 0.05 : 0.5 + (i - 1) * 0.11;
        el.style.transitionDelay = d + 's';
        el.classList.add('in');
      });
    }, 120);
  }

  /* ──────────────── Count-up stats ──────────────── */
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && !reduce) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseInt(el.getAttribute('data-count'), 10);
        var start = null, dur = 1000;
        (function tick(ts) {
          if (!start) start = ts || performance.now();
          var p = Math.min(((ts || performance.now()) - start) / dur, 1);
          el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(tick); else el.textContent = target;
        })();
        co.unobserve(el);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { el.textContent = '0'; co.observe(el); });
  }

  /* ──────────────── Parallax registration ──────────────── */
  if (!reduce) {
    document.querySelectorAll('.how__img img, .who__img img').forEach(function (img) {
      img.classList.add('px');
      pxNodes.push({ el: img, k: 0.035 });
    });
  }

  /* ──────────────── Accordions ──────────────── */
  function wire(triggerSel, itemSel, panelSel) {
    document.querySelectorAll(triggerSel).forEach(function (btn) {
      btn.setAttribute('aria-expanded', 'false');
      btn.addEventListener('click', function () {
        var item = btn.closest(itemSel);
        var panel = item.querySelector(panelSel);
        if (item.classList.contains('is-open')) {
          panel.style.maxHeight = null;
          item.classList.remove('is-open');
          btn.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('is-open');
          panel.style.maxHeight = panel.scrollHeight + 'px';
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }
  wire('.mod__btn', '.mod', '.mod__panel');
  wire('.faq__q', '.faq__item', '.faq__a');

  var rt;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () {
      document.querySelectorAll('.mod.is-open .mod__panel, .faq__item.is-open .faq__a')
        .forEach(function (p) { p.style.maxHeight = p.scrollHeight + 'px'; });
    }, 140);
  });

  // First module open so the pattern is discoverable.
  var firstMod = document.querySelector('.mod__btn');
  if (firstMod && window.innerWidth > 720) firstMod.click();

  /* ──────────────── Hero video fallback ──────────────── */
  var vid = document.getElementById('heroVid');
  if (vid) {
    vid.addEventListener('error', swapPoster);
    vid.querySelector('source').addEventListener('error', swapPoster);
    tryPlay();
    // Browsers pause muted autoplay video in a backgrounded tab. Resume on return.
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) tryPlay();
    });
    // And on the first interaction, in case the autoplay policy blocked us.
    ['pointerdown', 'keydown', 'touchstart'].forEach(function (ev) {
      window.addEventListener(ev, tryPlay, { once: true, passive: true });
    });
  }
  function tryPlay() {
    if (!vid || vid.dataset.swapped || !vid.paused) return;
    // Safari only honours muted autoplay when the property is set, not just the
    // attribute, and it re-checks on every play() call.
    vid.muted = true;
    vid.removeAttribute('controls');
    var p = vid.play();
    if (p && p.catch) p.catch(function () { /* blocked: poster frame remains visible */ });
  }
  function swapPoster() {
    if (!vid || vid.dataset.swapped) return;
    vid.dataset.swapped = '1';
    var img = document.createElement('img');
    // Reuse whatever poster the page declared, so each domain keeps serving
    // this from its own fastest source rather than a hardcoded CDN path.
    img.src = vid.getAttribute('poster') ||
      'https://cdn.leveluplearning.in/live-hub/communication/img/hero-dark.webp';
    img.alt = '';
    vid.parentNode.replaceChild(img, vid);
  }

  /* ──────────────── Mobile interaction layer ────────────────
     Swipe rails, sticky CTA, hero drift. All of it is transform/
     opacity only and shares the one rAF scroll loop already here.
     Nothing runs at all above 720px. ───────────────────────── */
  var mqPhone = window.matchMedia('(max-width:720px)');
  var railState = [];
  var sticky = document.getElementById('stickyCta');
  var applySec = document.getElementById('apply');
  var heroEl = document.querySelector('.hero');
  var heroInner = document.querySelector('.hero__in');
  var heroCopy = document.querySelector('.hero__copy') || heroInner;

  function buildRails() {
    railState = [];
    document.querySelectorAll('.rail-dots,.rail-hint').forEach(function (n) { n.remove(); });
    if (!mqPhone.matches) return;

    [['.who', 'Swipe']].forEach(function (cfg) {
      var rail = document.querySelector(cfg[0]);
      if (!rail) return;
      var cards = rail.children;
      if (cards.length < 2) return;

      var hint = document.createElement('div');
      hint.className = 'rail-hint';
      hint.innerHTML = cfg[1] + ' <span>&rarr;</span>';

      var dots = document.createElement('div');
      dots.className = 'rail-dots';
      for (var i = 0; i < cards.length; i++) {
        var b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', 'Go to card ' + (i + 1));
        b.dataset.i = i;
        dots.appendChild(b);
      }
      rail.parentNode.insertBefore(dots, rail.nextSibling);
      rail.parentNode.insertBefore(hint, dots);

      dots.addEventListener('click', function (e) {
        var b = e.target.closest('button');
        if (!b) return;
        var card = rail.children[+b.dataset.i];
        rail.scrollTo({ left: card.offsetLeft - rail.offsetLeft - 20, behavior: 'smooth' });
      });

      var st = { rail: rail, dots: dots, hint: hint, last: -1, ticking: false };
      railState.push(st);
      rail.addEventListener('scroll', function () {
        if (st.ticking) return;
        st.ticking = true;
        requestAnimationFrame(function () { syncRail(st); st.ticking = false; });
      }, { passive: true });
      syncRail(st);
    });
  }

  function syncRail(st) {
    var mid = st.rail.scrollLeft + st.rail.clientWidth / 2;
    var best = 0, bestD = Infinity;
    for (var i = 0; i < st.rail.children.length; i++) {
      var c = st.rail.children[i];
      var d = Math.abs((c.offsetLeft - st.rail.offsetLeft) + c.offsetWidth / 2 - mid);
      if (d < bestD) { bestD = d; best = i; }
    }
    if (best === st.last) return;
    st.last = best;
    for (var j = 0; j < st.dots.children.length; j++) {
      st.dots.children[j].classList.toggle('is-on', j === best);
    }
    // once they have swiped, the nudge has done its job
    if (best > 0 && st.hint) { st.hint.style.opacity = '0'; }
  }

  function mobileScroll() {
    if (!mqPhone.matches) {
      if (sticky) sticky.classList.remove('is-up');
      if (heroInner) heroInner.style.transform = '';
      if (heroCopy) heroCopy.style.opacity = '';
      return;
    }
    var y = window.scrollY;

    // Hero drifts up and fades as it leaves — ties the fold to the scroll.
    if (heroInner && heroEl && !reduce) {
      var hh = heroEl.offsetHeight || 1;
      // No translate on phones. The hero is clipped, and any drift slides the
      // company logo strip past its bottom edge and cuts it off. Only the copy
      // fades; the proof strip never moves.
      if (y < hh) {
        var t = y / hh;
        heroCopy.style.opacity = Math.max(.15, 1 - t * 0.95).toFixed(3);
      } else if (heroCopy.style.opacity !== '0.15') {
        heroCopy.style.opacity = '0.15';
      }
    }

    // Sticky CTA: up once the hero is gone, away once the real apply step arrives.
    if (sticky) {
      var past = heroEl ? y > heroEl.offsetHeight * 0.85 : y > 500;
      var reached = applySec
        ? applySec.getBoundingClientRect().top < window.innerHeight * 0.9
        : false;
      sticky.classList.toggle('is-up', past && !reached);
    }
  }

  buildRails();
  mqPhone.addEventListener('change', function () { buildLogos(); buildRails(); mobileScroll(); });
  window.addEventListener('resize', function () {
    clearTimeout(window.__railT);
    window.__railT = setTimeout(function () { buildLogos(); buildRails(); }, 220);
  }, { passive: true });

  onScroll();
})();
