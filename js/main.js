/* ============ QHORE PRIME — interações ============ */
(function () {
  'use strict';

  var header   = document.getElementById('header');
  var nav      = document.getElementById('nav');
  var toggle   = document.getElementById('navToggle');
  var links    = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
  var sections = links
    .map(function (l) { return document.querySelector(l.getAttribute('href')); })
    .filter(Boolean);

  /* Header sólido ao rolar */
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 40);
    activateLink();
  }

  /* Menu mobile */
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
  links.forEach(function (l) { l.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* Link ativo conforme a seção visível */
  function activateLink() {
    var pos = window.scrollY + window.innerHeight * 0.32;
    var current = sections[0];
    sections.forEach(function (sec) {
      if (sec.offsetTop <= pos) current = sec;
    });
    links.forEach(function (l) {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current.id);
    });
  }

  /* Scroll reveal */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* FAQ — accordion com animação suave (max-height) */
  var faqItems = Array.prototype.slice.call(document.querySelectorAll('.faq-item'));
  faqItems.forEach(function (item) {
    var summary = item.querySelector('summary');
    var answer = item.querySelector('.faq-answer');
    if (!summary || !answer) return;

    summary.addEventListener('click', function (e) {
      e.preventDefault();

      if (item.hasAttribute('open')) {            // fechar
        answer.style.maxHeight = answer.scrollHeight + 'px';
        requestAnimationFrame(function () { answer.style.maxHeight = '0px'; });
        answer.addEventListener('transitionend', function te() {
          item.removeAttribute('open');
          answer.style.maxHeight = '';
          answer.removeEventListener('transitionend', te);
        });
      } else {                                    // abrir (fecha os demais)
        faqItems.forEach(function (other) {
          if (other !== item && other.hasAttribute('open')) {
            var oa = other.querySelector('.faq-answer');
            oa.style.maxHeight = oa.scrollHeight + 'px';
            requestAnimationFrame(function () { oa.style.maxHeight = '0px'; });
            oa.addEventListener('transitionend', function te() {
              other.removeAttribute('open');
              oa.style.maxHeight = '';
              oa.removeEventListener('transitionend', te);
            });
          }
        });
        item.setAttribute('open', '');
        answer.style.maxHeight = '0px';
        requestAnimationFrame(function () { answer.style.maxHeight = answer.scrollHeight + 'px'; });
        answer.addEventListener('transitionend', function te() {
          answer.style.maxHeight = '';
          answer.removeEventListener('transitionend', te);
        });
      }
    });
  });

  /* Ano no rodapé */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
