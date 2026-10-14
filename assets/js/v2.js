/* Le Manège — Version 2.0 : rideau, révélations au défilement, aperçu au survol, programme filtrable. */
(() => {
  document.documentElement.classList.add('js');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* Rideau au défilement : les photos s'ouvrent depuis le centre quand elles entrent à l'écran. */
  const io = 'IntersectionObserver' in window && !reduce
    ? new IntersectionObserver(entries => entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      }), { rootMargin: '0px 0px -6% 0px', threshold: 0 })
    : null;
  const inView = el => { const b = el.getBoundingClientRect(); return b.top < innerHeight && b.bottom > 0; };
  const watch = root => root.querySelectorAll('.curtain:not(.is-in), .pass__rates').forEach(el => {
    if (!io) return el.classList.add('is-in');
    io.observe(el);
    if (inView(el)) requestAnimationFrame(() => el.classList.add('is-in'));
  });
  watch(document);

  /* Le rideau de l'accueil : les spectacles à l'affiche se succèdent, chaque photo s'ouvre comme un rideau de scène. */
  const r = document.querySelector('[data-rideau]');
  if (r) {
    const slides = [...r.querySelectorAll('.rideau__slide')], infos = [...r.querySelectorAll('.rideau__info')];
    const play = r.querySelector('[data-play]'), count = r.querySelector('[data-count]'), bar = r.querySelector('.rideau__progress span');
    const MS = 6500;
    let i = 0, timer = null, playing = !reduce, visible = true;
    r.style.setProperty('--slide-ms', MS + 'ms');
    const restartBar = () => { bar.style.animation = 'none'; void bar.offsetWidth; bar.style.animation = ''; };
    const show = n => {
      const prev = i;
      i = (n + slides.length) % slides.length;
      if (i === prev) return;
      slides.forEach((s, k) => { s.classList.toggle('is-prev', k === prev); s.classList.toggle('is-on', k === i); });
      infos.forEach((s, k) => { s.classList.toggle('is-on', k === i); s.hidden = k !== i; });
      count.textContent = `${i + 1} / ${slides.length}`;
      restartBar();
      schedule();
    };
    const schedule = () => {
      clearTimeout(timer);
      const run = playing && visible && !document.hidden;
      r.classList.toggle('is-playing', playing);
      r.classList.toggle('is-paused', !run);
      if (run) timer = setTimeout(() => show(i + 1), MS);
    };
    r.querySelector('[data-prev]').addEventListener('click', () => show(i - 1));
    r.querySelector('[data-next]').addEventListener('click', () => show(i + 1));
    play.addEventListener('click', () => { playing = !playing; play.textContent = playing ? 'Pause' : 'Lire'; restartBar(); schedule(); });
    play.textContent = playing ? 'Pause' : 'Lire';
    document.addEventListener('visibilitychange', schedule);
    if ('IntersectionObserver' in window) new IntersectionObserver(([en]) => { visible = en.isIntersecting; schedule(); }).observe(r);
    r.addEventListener('focusin', () => { if (playing) { playing = false; play.textContent = 'Lire'; schedule(); } });
    schedule();
  }

  /* Aperçu qui suit le curseur : photo sur les lignes, étiquette « Voir + » sur les visuels. */
  let peek = null;
  if (finePointer && !reduce) {
    peek = document.createElement('div');
    peek.className = 'peek';
    peek.setAttribute('aria-hidden', 'true');
    peek.innerHTML = '<span class="peek__chip">Voir +</span>';
    document.body.append(peek);
    const img = new Image();
    img.alt = '';
    img.decoding = 'async';
    let x = 0, y = 0, tx = 0, ty = 0, raf = 0, active = null;
    const loop = () => {
      x += (tx - x) * 0.18; y += (ty - y) * 0.18;
      const chip = peek.classList.contains('peek--chip');
      peek.style.transform = chip ? `translate(${x + 14}px, ${y + 14}px)` : `translate(${x + 28}px, ${y - peek.offsetHeight / 2}px) rotate(${Math.max(-4, Math.min(4, (tx - x) * 0.05))}deg)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.3 || active ? requestAnimationFrame(loop) : 0;
    };
    const target = e => e.target.closest?.('[data-peek], [data-chip]');
    document.addEventListener('pointerover', e => {
      const t = target(e);
      if (!t || t === active) return;
      active = t;
      const chip = t.hasAttribute('data-chip');
      peek.classList.toggle('peek--chip', chip);
      if (!chip) { img.src = t.dataset.peek; if (!img.isConnected) peek.prepend(img); }
      if (!raf) { x = tx = e.clientX; y = ty = e.clientY; }
      peek.classList.add('is-on');
      if (!raf) raf = requestAnimationFrame(loop);
    });
    document.addEventListener('pointerout', e => {
      const t = target(e);
      if (t && t === active && !t.contains(e.relatedTarget)) { active = null; peek.classList.remove('is-on'); }
    });
    document.addEventListener('pointermove', e => { tx = e.clientX; ty = e.clientY; if (active && !raf) raf = requestAnimationFrame(loop); }, { passive: true });
    addEventListener('scroll', () => { if (active) { active = null; peek.classList.remove('is-on'); } }, { passive: true });
  }

  /* Programme v2 : recherche, filtres avec compteurs, grille ou liste, transitions entre états. */
  const agenda = document.querySelector('[data-agenda]');
  if (agenda && window.LM_EVENTS) {
    const all = window.LM_EVENTS;
    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    const ALL = 'Tous les spectacles';
    const tagCount = {};
    all.forEach(e => e.tags.forEach(t => { tagCount[t] = (tagCount[t] || 0) + 1; }));
    const filters = [ALL, ...Object.keys(tagCount).sort((a, b) => tagCount[b] - tagCount[a] || a.localeCompare(b, 'fr'))];
    const params = new URLSearchParams(location.search);
    const st = { filter: filters.includes(params.get('filtre')) ? params.get('filtre') : ALL, q: '', view: params.get('vue') === 'liste' ? 'liste' : 'grille' };
    const $f = document.querySelector('[data-filters]'), $q = document.querySelector('[data-search]'), $c = document.querySelector('[data-count]');

    const tags = e => `<div class="tags">${e.tags.map(t => `<span>${esc(t)}</span>`).join('')}</div>`;
    const acts = e => `<div class="ev-actions"><a class="btn btn--sm btn--ghost" href="${e.href}">Voir +</a><a class="btn btn--sm" href="${e.ticket}">Réserver</a></div>`;
    const card = e => `<article class="pcard" style="view-transition-name:ev-${e.id}"><a class="pcard__media curtain" href="${e.href}" data-chip tabindex="-1" aria-hidden="true"><img src="${e.image}" alt="" loading="lazy"></a><time class="pcard__date" datetime="${e.iso}">${esc(e.date)}</time><h3 class="pcard__title"><a href="${e.href}">${esc(e.title)}</a></h3>${e.artist ? `<p class="pcard__artist">${esc(e.artist)}</p>` : ''}${tags(e)}${acts(e)}</article>`;
    const row = e => `<article class="prow" data-peek="${e.image}" style="view-transition-name:ev-${e.id}"><time class="prow__date" datetime="${e.iso}"><span class="prow__day">${e.day}</span><span class="prow__mon">${e.mon}</span></time><a class="prow__thumb" href="${e.href}" tabindex="-1" aria-hidden="true"><img src="${e.image}" alt="" loading="lazy"></a><div class="prow__main"><h3 class="prow__title"><a href="${e.href}">${esc(e.title)}</a></h3>${e.artist ? `<p class="prow__artist">${esc(e.artist)}</p>` : ''}</div>${tags(e)}${acts(e)}</article>`;

    const matches = () => {
      const q = norm(st.q.trim());
      return all.filter(e => (st.filter === ALL || e.tags.includes(st.filter)) &&
        (!q || norm(`${e.title} ${e.artist} ${e.tags.join(' ')}`).includes(q)));
    };
    const render = () => {
      const list = matches();
      $f.innerHTML = filters.map(f => `<button class="tag" type="button" data-f="${esc(f)}" aria-pressed="${f === st.filter}">${esc(f)}<span class="tag__n">${f === ALL ? all.length : tagCount[f]}</span></button>`).join('');
      $c.textContent = `${list.length} spectacle${list.length > 1 ? 's' : ''}${st.filter !== ALL || st.q ? ' trouvé' + (list.length > 1 ? 's' : '') : ' · saison 26–27'}`;
      const months = [...new Set(list.map(e => e.month))];
      agenda.innerHTML = months.length ? months.map(m => {
        const evs = list.filter(e => e.month === m);
        return `<section class="pmonth"><h2 class="pmonth__title">${m}<span>${evs.length}</span></h2>${st.view === 'grille' ? `<div class="pcards">${evs.map(card).join('')}</div>` : `<div class="prows">${evs.map(row).join('')}</div>`}</section>`;
      }).join('') : `<div class="pempty"><p>Aucun spectacle ne correspond${st.q ? ` à « ${esc(st.q)} »` : ''}.</p><button class="btn btn--ghost" type="button" data-reset>Voir tous les spectacles</button></div>`;
      watch(agenda);
      const u = new URL(location.href);
      st.filter === ALL ? u.searchParams.delete('filtre') : u.searchParams.set('filtre', st.filter);
      st.view === 'grille' ? u.searchParams.delete('vue') : u.searchParams.set('vue', st.view);
      history.replaceState(null, '', u);
    };
    const update = (fn, animate = true) => {
      fn();
      if (animate && document.startViewTransition && !reduce) document.startViewTransition(render);
      else render();
    };
    // Pas de rideau au rechargement des états : les visuels déjà vus restent ouverts.
    $f.addEventListener('click', e => { const b = e.target.closest('[data-f]'); if (b) update(() => { st.filter = b.dataset.f; }); });
    let t;
    $q.addEventListener('input', () => { clearTimeout(t); t = setTimeout(() => update(() => { st.q = $q.value; }, false), 120); });
    agenda.addEventListener('click', e => { if (e.target.closest('[data-reset]')) { $q.value = ''; update(() => { st.q = ''; st.filter = ALL; }); } });
    document.querySelectorAll('[data-view]').forEach(btn => btn.addEventListener('click', () => update(() => {
      st.view = btn.dataset.view;
      document.querySelectorAll('[data-view]').forEach(x => x.setAttribute('aria-pressed', x === btn));
    })));
    document.querySelectorAll('[data-view]').forEach(x => x.setAttribute('aria-pressed', x.dataset.view === st.view));
    render();
  }
})();
