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
  let activeCard = null;

  const updateControls = () => {
    if (!viewport || !prevButton || !nextButton) return;

    const maxScroll = viewport.scrollWidth - viewport.clientWidth - 2;
    prevButton.disabled = viewport.scrollLeft <= 2;
    nextButton.disabled = viewport.scrollLeft >= maxScroll;
  };

  const scrollByCard = direction => {
    if (!viewport) return;

    const firstCard = cards[0];
    const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : 320;
    viewport.scrollBy({
      left: direction * (cardWidth + 22),
      behavior: 'smooth',
    });
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
    modal.querySelector('.testimonial-modal-close')?.focus();
  };

  const closeModal = () => {
    if (!modal || modal.hidden) return;

    modal.hidden = true;
    document.body.classList.remove('testimonial-modal-open');
    activeCard?.focus();
    activeCard = null;
  };

  cards.forEach(card => {
    card.addEventListener('click', () => openModal(card));
  });

  prevButton?.addEventListener('click', () => scrollByCard(-1));
  nextButton?.addEventListener('click', () => scrollByCard(1));
  viewport?.addEventListener('scroll', updateControls, {passive: true});
  window.addEventListener('resize', updateControls);

  closeButtons.forEach(button => {
    button.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeModal();
  });

  updateControls();
})();
