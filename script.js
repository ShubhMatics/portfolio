/* ============================================================
   SHUBHAM SINGH — PORTFOLIO
   script.js
   ============================================================ */

'use strict';

/* ── CUSTOM CURSOR ── */
const dot  = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

let mx = -100, my = -100;
let rx = -100, ry = -100;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  dot.style.left  = mx + 'px';
  dot.style.top   = my + 'px';
});

(function animateCursor() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animateCursor);
})();

document.querySelectorAll('a, button, .proj-card, .cert-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.width  = '52px';
    ring.style.height = '52px';
    ring.style.borderColor = 'rgba(0,255,247,0.7)';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width  = '32px';
    ring.style.height = '32px';
    ring.style.borderColor = 'rgba(0,255,247,0.4)';
  });
});


/* ── SCROLL REVEAL ── */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .stagger').forEach(el => io.observe(el));


/* ── NAV ACTIVE HIGHLIGHT ── */
const navAs  = document.querySelectorAll('.nav-links a');
const allSec = document.querySelectorAll('section[id], div[id]');

const sio = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navAs.forEach(a => a.classList.remove('nav-active'));
      const a = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (a) a.classList.add('nav-active');
    }
  });
}, { threshold: 0.35 });

allSec.forEach(s => sio.observe(s));


/* ── TYPED TITLE EFFECT ── */
const typed = document.getElementById('typed-role');
if (typed) {
  const roles = ['Java Developer', 'Python Builder', 'Tech Enthusiast', 'Problem Solver'];
  let ri = 0, ci = 0, deleting = false;

  function typeLoop() {
    const current = roles[ri];
    if (!deleting) {
      typed.textContent = current.slice(0, ++ci);
      if (ci === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1800);
        return;
      }
      setTimeout(typeLoop, 90);
    } else {
      typed.textContent = current.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
        setTimeout(typeLoop, 300);
        return;
      }
      setTimeout(typeLoop, 45);
    }
  }
  setTimeout(typeLoop, 1200);
}


/* ── COUNTER ANIMATION ── */
document.querySelectorAll('[data-count]').forEach(el => {
  const target = parseInt(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  let count = 0;
  const step = Math.ceil(target / 40);

  const countObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      const interval = setInterval(() => {
        count = Math.min(count + step, target);
        el.textContent = count + suffix;
        if (count >= target) clearInterval(interval);
      }, 40);
      countObs.unobserve(el);
    }
  }, { threshold: 0.5 });

  countObs.observe(el);
});
