'use strict';

(function () {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function escapeHTML(value) {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  class TextScramble {
    constructor(el) {
      this.el = el;
      this.chars = '!<>-_\\/[]{}=+*^?#';
      this.queue = [];
      this.frame = 0;
      this.frameRequest = 0;
      this.resolve = function () {};
      this.update = this.update.bind(this);
    }

    setText(newText) {
      const oldChars = Array.from(this.el.innerText);
      const nextChars = Array.from(newText);
      const length = Math.max(oldChars.length, nextChars.length);
      const promise = new Promise((resolve) => {
        this.resolve = resolve;
      });

      this.queue = [];

      for (let i = 0; i < length; i++) {
        const from = oldChars[i] || '';
        const to = nextChars[i] || '';
        const start = Math.floor(Math.random() * 36);
        const end = start + Math.floor(Math.random() * 52) + 38;
        this.queue.push({ from, to, start, end });
      }

      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }

    update() {
      let output = '';
      let complete = 0;

      for (let i = 0; i < this.queue.length; i++) {
        const item = this.queue[i];

        if (this.frame >= item.end) {
          complete++;
          output += escapeHTML(item.to);
        } else if (this.frame >= item.start) {
          if (!item.char || Math.random() < 0.28) {
            item.char = this.chars[Math.floor(Math.random() * this.chars.length)];
          }

          output += `<span class="dud">${escapeHTML(item.char)}</span>`;
        } else {
          output += escapeHTML(item.from);
        }
      }

      this.el.innerHTML = output;

      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }
  }

  function startHeroScramble() {
    if (reducedMotion.matches) return;

    const targets = document.querySelectorAll('[data-scramble-text]');
    targets.forEach((target, index) => {
      const text = target.getAttribute('data-scramble-text') || target.textContent || '';
      const scrambler = new TextScramble(target);

      target.setAttribute('aria-label', text);
      window.setTimeout(() => {
        scrambler.setText(text);
      }, index * 420);
    });
  }

  function startRainingLetters() {
    const container = document.querySelector('.hero-rain');
    if (!container || reducedMotion.matches) return;

    const allChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*()_+-=[]{}|;:,.?';
    let letters = [];
    let active = [];
    let frameId = 0;
    let lastTime = 0;
    let nextFlicker = 0;

    function randomChar() {
      return allChars[Math.floor(Math.random() * allChars.length)];
    }

    function resetLetter(letter, initial) {
      letter.x = Math.random() * 100;
      letter.y = initial ? Math.random() * 100 : -8 - Math.random() * 18;
      letter.speed = 2.8 + Math.random() * 7.2;
      letter.node.textContent = randomChar();
      letter.node.style.left = `${letter.x}%`;
    }

    function createLetters() {
      const rect = container.getBoundingClientRect();
      const area = rect.width * rect.height;
      const baseCount = Math.floor(area / 14000);
      const count = Math.min(rect.width < 700 ? 76 : 170, Math.max(48, baseCount));

      container.replaceChildren();
      letters = [];
      active = [];

      for (let i = 0; i < count; i++) {
        const node = document.createElement('span');
        const letter = { node, x: 0, y: 0, speed: 0 };

        node.className = 'rain-char';
        container.appendChild(node);
        resetLetter(letter, true);
        letters.push(letter);
      }
    }

    function flicker(time) {
      if (time < nextFlicker) return;

      active.forEach((index) => {
        letters[index]?.node.classList.remove('is-active');
      });

      active = [];
      const activeCount = Math.min(letters.length, Math.floor(Math.random() * 3) + 4);

      for (let i = 0; i < activeCount; i++) {
        const index = Math.floor(Math.random() * letters.length);
        active.push(index);
        letters[index]?.node.classList.add('is-active');
      }

      nextFlicker = time + 70;
    }

    function animate(time) {
      const rect = container.getBoundingClientRect();
      const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0;

      lastTime = time;
      flicker(time);

      letters.forEach((letter) => {
        letter.y += letter.speed * delta;

        if (letter.y > 108) {
          resetLetter(letter, false);
        }

        letter.node.style.transform = `translate3d(-50%, ${(rect.height * letter.y) / 100}px, 0)`;
      });

      frameId = requestAnimationFrame(animate);
    }

    let resizeTimer = 0;
    window.addEventListener('resize', () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(createLetters, 160);
    }, { passive: true });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(frameId);
      } else {
        lastTime = 0;
        frameId = requestAnimationFrame(animate);
      }
    });

    createLetters();
    frameId = requestAnimationFrame(animate);
  }

  document.addEventListener('DOMContentLoaded', () => {
    startHeroScramble();
    startRainingLetters();
  });
}());
