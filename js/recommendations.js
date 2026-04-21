'use strict';

(() => {
  const root = document.querySelector('[data-testimonials]');
  if (!root) return;

  const viewport = root.querySelector('[data-testimonials-viewport]');
  const prevButton = root.querySelector('[data-testimonials-prev]');
  const nextButton = root.querySelector('[data-testimonials-next]');
  const cards = [...root.querySelectorAll('.retro-testimonial-card')];
  const modal = document.querySelector('[data-testimonial-modal]');
  const modalName = document.getElementById('testimonial-modal-name');
  const modalRole = modal?.querySelector('[data-testimonial-role]');
  const modalText = document.getElementById('testimonial-modal-text');
  const closeButtons = modal ? [...modal.querySelectorAll('[data-testimonial-close]')] : [];
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const autoplayDelay = 6200;
  const resumeDelay = 9000;
  let activeCard = null;
  let autoplayTimer = null;
  let resumeTimer = null;
  let isPaused = false;

  const updateControls = () => {
    if (!viewport || !prevButton || !nextButton) return;

    const maxScroll = viewport.scrollWidth - viewport.clientWidth - 2;
    prevButton.disabled = viewport.scrollLeft <= 2;
    nextButton.disabled = viewport.scrollLeft >= maxScroll;
  };

  const getScrollStep = () => {
    const firstCard = cards[0];
    const track = root.querySelector('.retro-testimonials-track');
    const gap = track ? parseFloat(window.getComputedStyle(track).columnGap) || 22 : 22;
    const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : 320;

    return cardWidth + gap;
  };

  const scrollByCard = direction => {
    if (!viewport) return;

    viewport.scrollBy({
      left: direction * getScrollStep(),
      behavior: 'smooth',
    });
  };

  const scrollNext = () => {
    if (!viewport) return;

    const maxScroll = viewport.scrollWidth - viewport.clientWidth - 2;
    if (viewport.scrollLeft >= maxScroll) {
      viewport.scrollTo({left: 0, behavior: 'smooth'});
      return;
    }

    scrollByCard(1);
  };

  const stopAutoplay = () => {
    window.clearInterval(autoplayTimer);
    autoplayTimer = null;
  };

  const startAutoplay = () => {
    if (prefersReducedMotion || autoplayTimer || !viewport || cards.length < 2) return;

    autoplayTimer = window.setInterval(() => {
      if (isPaused || document.hidden || (modal && !modal.hidden)) return;
      scrollNext();
    }, autoplayDelay);
  };

  const pauseAutoplay = () => {
    isPaused = true;
    window.clearTimeout(resumeTimer);
  };

  const resumeAutoplay = (delay = 0) => {
    window.clearTimeout(resumeTimer);
    resumeTimer = window.setTimeout(() => {
      isPaused = false;
      startAutoplay();
    }, delay);
  };

  const openModal = card => {
    if (!modal || !modalName || !modalRole || !modalText) return;

    activeCard = card;
    const name = card.querySelector('strong')?.textContent?.trim() || '';
    const role = card.querySelector('small')?.textContent?.trim() || '';
    const fullText = card.querySelector('.retro-testimonial-full')?.textContent?.trim();
    const previewText = card.querySelector('.retro-testimonial-quote')?.textContent?.trim() || '';

    modalName.textContent = name;
    modalRole.textContent = role;
    modalText.textContent = fullText || previewText;
    modal.hidden = false;
    document.body.classList.add('testimonial-modal-open');
    pauseAutoplay();
    modal.querySelector('.testimonial-modal-close')?.focus();
  };

  const closeModal = () => {
    if (!modal || modal.hidden) return;

    modal.hidden = true;
    document.body.classList.remove('testimonial-modal-open');
    activeCard?.focus();
    activeCard = null;
    resumeAutoplay(resumeDelay);
  };

  cards.forEach(card => {
    card.addEventListener('click', () => openModal(card));
  });

  prevButton?.addEventListener('click', () => {
    pauseAutoplay();
    scrollByCard(-1);
    resumeAutoplay(resumeDelay);
  });

  nextButton?.addEventListener('click', () => {
    pauseAutoplay();
    scrollByCard(1);
    resumeAutoplay(resumeDelay);
  });

  viewport?.addEventListener('scroll', updateControls, {passive: true});
  viewport?.addEventListener('pointerdown', () => pauseAutoplay(), {passive: true});
  viewport?.addEventListener('pointerup', () => resumeAutoplay(resumeDelay), {passive: true});
  viewport?.addEventListener('touchend', () => resumeAutoplay(resumeDelay), {passive: true});
  root.addEventListener('mouseenter', pauseAutoplay);
  root.addEventListener('mouseleave', () => resumeAutoplay(1200));
  root.addEventListener('focusin', pauseAutoplay);
  root.addEventListener('focusout', () => resumeAutoplay(resumeDelay));

  window.addEventListener('resize', updateControls);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      pauseAutoplay();
    } else {
      resumeAutoplay(1200);
    }
  });

  closeButtons.forEach(button => {
    button.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeModal();
  });

  updateControls();
  startAutoplay();
})();
