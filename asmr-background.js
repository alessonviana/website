'use strict';

(function () {
  const canvas = document.querySelector('.asmr-background-canvas');
  const hero = document.querySelector('.hero');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (!canvas || !hero || reducedMotion.matches) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const mouse = { x: -1000, y: -1000 };
  const magneticRadius = 280;
  const vortexStrength = 0.07;
  const pullStrength = 0.12;
  let width = 0;
  let height = 0;
  let dpr = 1;
  let particles = [];
  let frameId = 0;
  let running = false;

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.2;
      this.vy = (Math.random() - 0.5) * 0.2;
      this.size = Math.random() * 1.5 + 0.5;
      this.alpha = Math.random() * 0.38 + 0.08;
      this.color = Math.random() > 0.7 ? '220, 232, 242' : '78, 88, 94';
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.05;
      this.frictionGlow = 0;
    }

    update() {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 0.001);

      if (dist < magneticRadius) {
        const force = (magneticRadius - dist) / magneticRadius;

        this.vx += (dx / dist) * force * pullStrength;
        this.vy += (dy / dist) * force * pullStrength;
        this.vx += (dy / dist) * force * vortexStrength * 10;
        this.vy -= (dx / dist) * force * vortexStrength * 10;
        this.frictionGlow = force * 0.72;
      } else {
        this.frictionGlow *= 0.92;
      }

      this.x += this.vx;
      this.y += this.vy;
      this.vx *= 0.95;
      this.vy *= 0.95;
      this.vx += (Math.random() - 0.5) * 0.04;
      this.vy += (Math.random() - 0.5) * 0.04;
      this.rotation += this.rotationSpeed + (Math.abs(this.vx) + Math.abs(this.vy)) * 0.05;

      if (this.x < -20) this.x = width + 20;
      if (this.x > width + 20) this.x = -20;
      if (this.y < -20) this.y = height + 20;
      if (this.y > height + 20) this.y = -20;
    }

    draw() {
      const glow = this.frictionGlow;
      const finalAlpha = Math.min(this.alpha + glow, 0.9);

      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.fillStyle = `rgba(${this.color}, ${finalAlpha})`;

      if (glow > 0.3) {
        ctx.shadowBlur = 8 * glow;
        ctx.shadowColor = `rgba(255, 107, 74, ${glow * 0.72})`;
      }

      ctx.beginPath();
      ctx.moveTo(0, -this.size * 2.5);
      ctx.lineTo(this.size, 0);
      ctx.lineTo(0, this.size * 2.5);
      ctx.lineTo(-this.size, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }

  function particleCount() {
    const area = window.innerWidth * window.innerHeight;
    const cap = window.innerWidth < 720 ? 320 : 900;
    return Math.min(cap, Math.max(220, Math.floor(area / 1700)));
  }

  function init() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    particles = [];
    for (let i = 0; i < particleCount(); i++) {
      particles.push(new Particle());
    }
  }

  function render() {
    ctx.fillStyle = 'rgba(7, 21, 29, 0.2)';
    ctx.fillRect(0, 0, width, height);

    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });

    frameId = requestAnimationFrame(render);
  }

  function start() {
    if (running) return;
    running = true;
    frameId = requestAnimationFrame(render);
  }

  function stop() {
    if (!running) return;
    running = false;
    cancelAnimationFrame(frameId);
  }

  function updateVisibility() {
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    const headerHeight = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header')) || 0;
    const active = window.scrollY >= heroBottom - headerHeight;

    document.body.classList.toggle('asmr-background-active', active);

    if (active && !document.hidden) start();
    else stop();
  }

  function handlePointerMove(x, y) {
    mouse.x = x;
    mouse.y = y;
  }

  let resizeTimer = 0;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      init();
      updateVisibility();
    }, 160);
  }, { passive: true });

  window.addEventListener('scroll', updateVisibility, { passive: true });
  window.addEventListener('mousemove', (event) => {
    handlePointerMove(event.clientX, event.clientY);
  }, { passive: true });
  window.addEventListener('touchmove', (event) => {
    if (event.touches[0]) {
      handlePointerMove(event.touches[0].clientX, event.touches[0].clientY);
    }
  }, { passive: true });

  document.addEventListener('visibilitychange', updateVisibility);

  init();
  updateVisibility();
}());
