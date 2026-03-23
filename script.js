/* ════════════════════════════════════════
   KYLIAN CARDUNER — Portfolio · script.js
   ════════════════════════════════════════ */

// ── CUSTOM CURSOR ──
const cur  = document.getElementById('cur');
const curR = document.getElementById('cur-r');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top  = my + 'px';
});

(function loop() {
  rx += (mx - rx) * 0.11;
  ry += (my - ry) * 0.11;
  curR.style.left = rx + 'px';
  curR.style.top  = ry + 'px';
  requestAnimationFrame(loop);
})();

// ── NAVBAR SCROLL ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('on', window.scrollY > 50);
});

// ── ACTIVE NAV LINK ──
const sections = document.querySelectorAll('section[id]');
const links    = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 130) current = s.id;
  });
  links.forEach(l => {
    l.classList.remove('active');
    if (l.getAttribute('href') === '#' + current) l.classList.add('active');
  });
});

// ── SCROLL REVEAL ──
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const delay = parseInt(e.target.style.getPropertyValue('--d')) || 0;
      setTimeout(() => e.target.classList.add('in'), delay);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ── PROGRESS BARS (animate on scroll) ──
const pio = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const target = e.target.style.width;
      e.target.style.width = '0%';
      setTimeout(() => { e.target.style.width = target; }, 200);
      pio.unobserve(e.target);
    }
  });
}, { threshold: 0.6 });

document.querySelectorAll('.prog-fill, .skill-fill').forEach(el => pio.observe(el));
