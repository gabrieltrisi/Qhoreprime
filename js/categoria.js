/* ============ QHORE PRIME — Página de Categoria ============ */
/* Menu mobile + scroll-reveal + ano do rodapé.
   (NÃO usa o scrollspy de main.js, que espera seções locais.) */
(function () {
  'use strict';

  var nav    = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');

  if (nav && toggle) {
    function closeMenu() {
      nav.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    }
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.classList.toggle('active', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
    Array.prototype.forEach.call(document.querySelectorAll('.nav-link'), function (l) {
      l.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* Header sólido ao rolar */
  var header = document.getElementById('header');
  if (header) {
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 40); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Scroll reveal */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* Ano no rodapé */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
