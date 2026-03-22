/* ════════════════════════════════════════
   KYLIAN CARDUNER — Portfolio · script.js
   ════════════════════════════════════════ */

// ── CUSTOM CURSOR ──
const cursor = document.getElementById('cursor');
const trail  = document.getElementById('cursor-trail');
let mx = 0, my = 0, tx = 0, ty = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

(function animateCursor() {
  tx += (mx - tx) * 0.11;
  ty += (my - ty) * 0.11;
  trail.style.left = tx + 'px';
  trail.style.top  = ty + 'px';
  requestAnimationFrame(animateCursor);
})();

// ── NAVBAR SCROLL ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('stuck', window.scrollY > 50);
});

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.style.getPropertyValue('--d') || '0ms';
      setTimeout(() => {
        entry.target.classList.add('in');
      }, parseInt(delay) || 0);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── PROGRESS BARS — animate on scroll ──
const progressObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      const target = fill.style.width;
      fill.style.width = '0%';
      setTimeout(() => { fill.style.width = target; }, 200);
      progressObserver.unobserve(fill);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.lcard__progress-fill').forEach(el => progressObserver.observe(el));

// ── ACTIVE NAV LINK on scroll ──
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks = document.querySelectorAll('.nav__links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = 'var(--tx)';
    }
  });
});
