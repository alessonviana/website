'use strict';

/* ================================================
   ALESSON VIANA PORTFOLIO — SCRIPT.JS
   Vanilla JS · No jQuery · No frameworks
   ================================================ */

/* ---- Custom Cursor ---- */
const cursor   = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

if (cursor && window.matchMedia('(pointer:fine)').matches) {
  let mx = 0, my = 0, fx = 0, fy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  (function trackFollower() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
    requestAnimationFrame(trackFollower);
  })();

  const hoverTargets = 'a,button,.tech-pill,.skill-card,.article-card,.achieve-card,.cert-card,.service-card';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); follower.classList.add('hover'); });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); follower.classList.remove('hover'); });
  });
}

/* ---- Navbar scroll + active section ---- */
const navbar   = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
const navToggle     = document.querySelector('.nav-toggle');
const navLinksList  = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  highlightNav();
}, { passive: true });

function highlightNav() {
  const pos = window.scrollY + 100;
  sections.forEach(sec => {
    if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight) {
      const id = sec.id;
      navLinks.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === '#' + id);
      });
    }
  });
}

navToggle?.addEventListener('click', () => {
  const open = navToggle.classList.toggle('open');
  navLinksList.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

navLinks.forEach(l => l.addEventListener('click', () => {
  navToggle?.classList.remove('open');
  navLinksList?.classList.remove('open');
  navToggle?.setAttribute('aria-expanded', false);
  document.body.style.overflow = '';
}));

/* ---- Smooth scroll ---- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

/* ---- Typewriter ---- */
const typeEl = document.querySelector('.typewriter');
const roles  = ['Cloud Architect', 'DevOps Engineer', 'Infrastructure Specialist', 'Automation Expert'];
let ri = 0, ci = 0, deleting = false;

function typewrite() {
  if (!typeEl) return;
  const word = roles[ri];
  typeEl.textContent = deleting
    ? word.slice(0, --ci)
    : word.slice(0, ++ci);

  let delay = deleting ? 55 : 88;
  if (!deleting && ci === word.length)      { delay = 1800; deleting = true; }
  else if (deleting && ci === 0)            { deleting = false; ri = (ri + 1) % roles.length; delay = 280; }
  setTimeout(typewrite, delay);
}
typewrite();

/* ---- Hero canvas particles ---- */
const canvas = document.querySelector('.hero-canvas');
if (canvas) {
  const ctx  = canvas.getContext('2d');
  let pts = [], raf;

  const resize = () => {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };

  class Pt {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * canvas.width;
      this.y  = Math.random() * canvas.height;
      this.vx = (Math.random() - .5) * .28;
      this.vy = (Math.random() - .5) * .28;
      this.r  = Math.random() * 1.4 + .3;
      this.a  = Math.random() * .35 + .05;
    }
    move() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,69,0,${this.a})`;
      ctx.fill();
    }
  }

  const init = () => {
    pts = [];
    const n = Math.min(Math.floor((canvas.width * canvas.height) / 9000), 90);
    for (let i = 0; i < n; i++) pts.push(new Pt());
  };

  const frame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < pts.length; i++) {
      pts[i].move(); pts[i].draw();
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 110) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255,69,0,${.055 * (1 - d / 110)})`;
          ctx.lineWidth = .5;
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.stroke();
        }
      }
    }
    raf = requestAnimationFrame(frame);
  };

  resize(); init(); frame();
  window.addEventListener('resize', () => { resize(); init(); });

  /* Pause when tab is hidden to save resources */
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else frame();
  });
}

/* ---- Scroll reveal ---- */
const revealEls = document.querySelectorAll('[data-reveal]');

/* Stagger siblings within same parent */
revealEls.forEach(el => {
  const sibs = [...el.parentElement.querySelectorAll('[data-reveal]')];
  const idx  = sibs.indexOf(el);
  if (idx > 0) el.style.transitionDelay = `${idx * 0.08}s`;
});

const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('revealed'); revealObs.unobserve(e.target); }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

revealEls.forEach(el => revealObs.observe(el));

/* ---- CountUp animation ---- */
const counters   = document.querySelectorAll('.counter-number');
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el     = e.target;
    const target = parseInt(el.dataset.target, 10);
    const dur    = 1600;
    const step   = target / (dur / 16);
    let val = 0;
    const tick = setInterval(() => {
      val += step;
      if (val >= target) { el.textContent = target; clearInterval(tick); }
      else el.textContent = Math.floor(val);
    }, 16);
    counterObs.unobserve(el);
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObs.observe(c));

/* ---- Contact form ---- */
const form    = document.getElementById('contact-form');
const formMsg = document.getElementById('form-msg');

form?.addEventListener('submit', e => {
  e.preventDefault();
  const name    = form.name.value.trim();
  const email   = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    showMsg('Please fill in all fields.', 'err'); return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showMsg('Please enter a valid email address.', 'err'); return;
  }

  const sub  = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  window.location.href = `mailto:alesson.viana@gmail.com?subject=${sub}&body=${body}`;
  showMsg('Opening your email client…', 'ok');
  setTimeout(() => { form.reset(); showMsg('', ''); }, 5000);
});

function showMsg(text, type) {
  if (!formMsg) return;
  formMsg.textContent = text;
  formMsg.className   = 'form-msg ' + type;
}
