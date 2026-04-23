'use strict';

(() => {
  const progress = document.querySelector('[data-page-progress]');
  if (!progress) return;

  const root = document.documentElement;
  let ticking = false;

  function clamp(value) {
    return Math.min(100, Math.max(0, value));
  }

  function updateProgress() {
    const scrollTop = window.scrollY || root.scrollTop || 0;
    const scrollHeight = Math.max(root.scrollHeight, document.body.scrollHeight);
    const maxScroll = scrollHeight - window.innerHeight;
    const value = maxScroll > 0 ? clamp((scrollTop / maxScroll) * 100) : 100;
    const rounded = Math.round(value);

    root.style.setProperty('--page-progress', `${value.toFixed(2)}%`);
    root.style.setProperty('--page-progress-alpha', value > 0.2 ? '1' : '0');
    progress.setAttribute('aria-valuenow', String(rounded));
    ticking = false;
  }

  function requestProgressUpdate() {
    if (ticking) return;

    ticking = true;
    window.requestAnimationFrame(updateProgress);
  }

  window.addEventListener('scroll', requestProgressUpdate, {passive: true});
  window.addEventListener('resize', requestProgressUpdate, {passive: true});
  window.addEventListener('load', requestProgressUpdate);
  document.addEventListener('DOMContentLoaded', requestProgressUpdate);

  requestProgressUpdate();
})();
