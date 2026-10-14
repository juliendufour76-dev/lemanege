(() => {
  const B = 'https://www.lemanege.com/', T = 'https://billetterie-theatredumanege.mapado.com/event/', I = B + 'local/adapt-img/750/10x/local/cache-gd2/';
  const ev = (month, title, artist, tags, date, slug, ticket, image) => ({ month, title, artist, tags, date, href: B + slug + '.html', ticket: T + ticket, image });
  const all = [
    ev('octobre', 'Zola... Pas comme Émile !!! (face A)', 'Forbon N’Zakimuena / Cie Mantrap', ['Théâtre Musique', 'Séances scolaires'], '13 octobre 2026', 'Zola-Pas-comme-Emile-face-A', '758650-zola-pas-comme-emile-face-a-forbon-nzakimuena-cie-mantrap', I + '62/4d254fc6b096948bb4ec877b66d875.jpg?1782434733'),
    ev('octobre', 'Les contes d’Ismaël et Forbon', 'Les actions', ['Théâtre Musique', 'Rencontres'], '14 octobre 2026', 'Les-contes-d-Ismael-et-Forbon', '763648-rencart-les-contes-dismael-et-forbon', I + '3d/eb578821d027906f42bbf52b48a6b9.jpg?1782434594'),
    ev('octobre', 'Les contes d’Ismaël et Forbon', 'Les actions', ['Théâtre Musique', 'Rencontres'], '14 octobre 2026', 'Les-contes-d-Ismael-et-Forbon-623', '763676-rencart-les-contes-dismael-et-forbon', I + '87/2c21a59ed5c55bef5ae9ea206aa86d.jpg?1782434831'),
    ev('octobre', 'La Bonne Âme du Se-Tchouan', 'Nora Granovsky / Cie BVZK', ['Théâtre', 'Grands formats'], '15 octobre > 16 octobre 2026', 'La-Bonne-Ame-du-Se-Tchouan', '758783-la-bonne-ame-du-se-tchouan-nora-granovsky-cie-bvzk'),
    ev('octobre', 'Creaviva', 'Rafaela Carrasco', ['Danse', 'Spectacle avec navette'], '15 octobre 2026', 'Creaviva', '758755-creaviva-rafaela-carrasco'),
    ev('octobre', 'Résidence ouverte au public', 'Spectacle En chemin (titre provisoire)', ['Théâtre', 'Rencontres'], '30 octobre 2026', 'Residence-ouverte-au-public', '768135-residence-ouverte-au-public-en-chemin'),
    ev('novembre', 'En chemin / Du sel sur nos chaussures', 'Marco Cupellari / Valérie Cros / PerpetuoMobileTeatro / Konpani Ibao', ['Théâtre'], '3 novembre 2026', 'En-chemin-titre-provisoire', '758790-en-chemin-titre-provisoire-perpetuomobileteatro-konpani-ibao'),
    ev('novembre', 'Les suppliantes d’après Eschyle', 'Charles Tordjman / Cie Fabbrica', ['Théâtre'], '6 novembre 2026', 'Les-suppliantes-d-apres-Eschyle', '759952-les-suppliantes-dapres-eschyle-charles-tordjman-compagnie-fabbrica'),
    ev('novembre', 'ALA.NI', 'Sunshine Music', ['Concert'], '12 novembre 2026', 'ALA-NI', '760085-ala-ni-sunshine-music'),
    ev('novembre', '1,2,3 Poquelin', 'tg STAN', ['Théâtre', 'Grands formats'], '13 novembre 2026', '1-2-3-Poquelin', '760106-1-2-3-poquelin-tg-stan'),
    ev('novembre', 'Panique !', 'Collectif Temps Calme', ['Concert', 'Musique', 'Sélection Jeunesse'], '15 novembre 2026', 'Panique', '760155-panique-collectif-temps-calme'),
    ev('novembre', 'Un Casse-Noisette', 'Groupe Émile Dubois / Cie Jean-Claude Gallotta', ['Danse'], '20 novembre 2026', 'Un-Casse-Noisette', '760190-un-casse-noisette-groupe-emile-dubois-cie-jean-claude-gallotta'),
    ev('novembre', 'Une journée à Villeneuve d’Ascq', 'Visite guidée du musée du LaM / Corvidae de Marta Cuscunà / Dear Luigi, I (…)', ['Expo', 'Marionnettes', 'Théâtre', 'Spectacle avec navette'], '21 novembre 2026', 'Une-journee-a-Villeneuve-d-Ascq', '760260-une-journee-a-villeneuve-dascq'),
    ev('novembre', 'The Experimental Tropic Blues Band + DalaïDrama + Little (…)', '', ['Concert'], '21 novembre 2026', 'The-Experimental-Tropic-Blues-Band-DalaiDrama-Little-Daddy-Shake', '760337-the-experimental-tropic-blues-band-dalai-drama-little-daddy-shake'),
    ev('novembre', 'Thomas VDB', 'Autruches', ['Humour'], '25 novembre 2026', 'Thomas-VDB', '760372-thomas-vdb'),
    ev('décembre', 'Combat des lianes', 'Zora Snake', ['Danse'], '1er décembre 2026', 'Combat-des-lianes', '760414-combat-des-lianes-zora-snake'),
    ev('décembre', 'Nuggets', 'Maxim Storms', ['Théâtre', 'Cirque'], '4 décembre 2026', 'Nuggets', '760568-nuggets-maxim-storms'),
    ev('décembre', 'Cabaret Téhéran', 'Gurshad Shaheman / Cie la ligne d’Ombre', ['Théâtre'], '7 décembre 2026', 'Cabaret-Teheran', '760603-cabaret-teheran-gurshad-shaheman-cie-la-ligne-dombre'),
    ev('décembre', 'Amandine Lourdel', 'Renversée', ['Humour'], '11 décembre 2026', 'Amandine-Lourdel', '760610-amandine-lourdel-renversee'),
    ev('décembre', 'Irresistible revolution', 'Cie RUDA / Ayelen Parolin', ['Danse', 'Spectacle avec navette'], '16 décembre 2026', 'Irresistible-revolution', '760624-irresistible-revolution-ayelen-parolin-compagnie-ruda')
  ];
  const FILTERS = ['Tous les spectacles', 'Théâtre', 'Théâtre Musique', 'Danse', 'Concert', 'Cirque', 'Marionnettes', 'Performance', 'Festival', 'Expo', 'Grands formats', 'Conférence', 'Opéra', 'Humour', 'Repas spectacle', 'Théâtre d’objets', 'Musique', 'Spectacle avec navette', 'Sélection Jeunesse', 'Rencontres', 'Séances scolaires', 'Spectacles passés'];
  const PER_PAGE = 8;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const st = { filter: FILTERS[0], page: 1, view: 'grille' };
  const $f = document.getElementById('filters'), $a = document.getElementById('agenda'), $p = document.getElementById('pager');

  const thumb = e => `<a class="thumb" href="${e.href}">${e.image ? `<img src="${e.image}" alt="" loading="lazy">` : ''}</a>`;
  const tags = e => `<div class="tags">${e.tags.map(t => `<span>${esc(t)}</span>`).join('')}</div>`;
  const acts = e => `<div class="ev-actions"><a class="btn btn--sm btn--ghost" href="${e.href}">Voir +</a><a class="btn btn--sm" href="${e.ticket}">Réserver</a></div>`;
  const title = e => `<h3 class="ev-title"><a href="${e.href}">${esc(e.title)}</a></h3>`;
  const row = e => `<article class="row">${thumb(e)}<div><div class="date">${e.date}</div>${title(e)}${e.artist ? `<div class="artist">${esc(e.artist)}</div>` : ''}${tags(e)}</div>${acts(e)}</article>`;
  const card = e => `<article class="card">${thumb(e)}<div class="date">${e.date}</div>${title(e)}${e.artist ? `<div class="artist">${esc(e.artist)}</div>` : ''}${tags(e)}${acts(e)}</article>`;

  function render() {
    const list = all.filter(e => st.filter === FILTERS[0] || e.tags.includes(st.filter));
    const total = Math.max(1, Math.ceil(list.length / PER_PAGE));
    st.page = Math.min(st.page, total);
    const items = list.slice((st.page - 1) * PER_PAGE, st.page * PER_PAGE);
    $f.innerHTML = FILTERS.map(f => `<button class="tag" aria-pressed="${f === st.filter}">${esc(f)}</button>`).join('');
    const months = [...new Set(items.map(e => e.month))];
    $a.innerHTML = months.length ? months.map(m => {
      const evs = items.filter(e => e.month === m);
      return `<section><h2 class="month">${m}</h2>${st.view === 'grille' ? `<div class="cards month-cards">${evs.map(card).join('')}</div>` : evs.map(row).join('')}</section>`;
    }).join('') : '<p class="empty">Aucun spectacle dans cette catégorie.</p>';
    const b = (lbl, p, cur, dis, aria) => `<button data-page="${p}"${cur ? ' aria-current="page"' : ''}${dis ? ' disabled' : ''}${aria ? ` aria-label="${aria}"` : ''}>${lbl}</button>`;
    $p.innerHTML = total > 1 ? b('&lt;', st.page - 1, false, st.page <= 1, 'Page précédente') + Array.from({ length: total }, (_, i) => b(i + 1, i + 1, i + 1 === st.page)).join('') + b('&gt;', st.page + 1, false, st.page >= total, 'Page suivante') : '';
  }
  $f.addEventListener('click', e => { const t = e.target.closest('button'); if (!t) return; st.filter = t.textContent; st.page = 1; render(); });
  $p.addEventListener('click', e => { const t = e.target.closest('button'); if (!t || t.disabled) return; st.page = +t.dataset.page; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
  document.querySelectorAll('[data-view]').forEach(btn => btn.addEventListener('click', () => {
    st.view = btn.dataset.view;
    document.querySelectorAll('[data-view]').forEach(x => x.setAttribute('aria-pressed', x === btn));
    render();
  }));
  render();
})();
