(() => {
  const h = document.querySelector('.site-header'), b = document.querySelector('.burger');
  if (h && b) b.addEventListener('click', () => { const o = h.classList.toggle('is-open'); b.setAttribute('aria-expanded', o); b.textContent = o ? 'Fermer ×' : 'Menu ☰'; });
  const s = document.querySelector('.slider');
  if (s) {
    const slides = [...s.querySelectorAll('.slide')], play = s.querySelector('[data-play]');
    let i = 0, playing = !matchMedia('(prefers-reduced-motion: reduce)').matches;
    const show = n => { i = (n + slides.length) % slides.length; slides.forEach((el, k) => el.classList.toggle('is-active', k === i)); };
    const sync = () => { play.textContent = playing ? 'Pause' : 'Lire'; };
    s.querySelector('[data-prev]').onclick = () => show(i - 1);
    s.querySelector('[data-next]').onclick = () => show(i + 1);
    play.onclick = () => { playing = !playing; sync(); };
    setInterval(() => { if (playing) show(i + 1); }, 6000);
    sync();
  }
})();
