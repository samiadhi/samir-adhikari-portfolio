(function () {
  document.documentElement.classList.add('js-ready');

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open navigation menu');
      });
    });
  }

  const filters = document.querySelectorAll('[data-filter]');
  const projectCards = document.querySelectorAll('.project-card[data-category]');
  filters.forEach(function (button) {
    button.addEventListener('click', function () {
      const filter = button.getAttribute('data-filter');
      filters.forEach(function (item) {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      projectCards.forEach(function (card) {
        const show = filter === 'all' || card.getAttribute('data-category') === filter;
        card.hidden = !show;
      });
    });
  });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealItems.forEach(function (item) { observer.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add('is-visible'); });
  }
})();
