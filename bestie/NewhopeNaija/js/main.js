// ===== Preloader =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader')?.classList.add('hidden');
  }, 1400);
});

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }
});

// ===== Mobile Menu =====
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const navOverlay = document.getElementById('navOverlay');
const navClose = document.getElementById('navClose');

function openMenu() {
  hamburger?.classList.add('active');
  mobileNav?.classList.add('open');
  navOverlay?.classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  hamburger?.classList.remove('active');
  mobileNav?.classList.remove('open');
  navOverlay?.classList.remove('show');
  document.body.style.overflow = '';
}
hamburger?.addEventListener('click', () => {
  if (mobileNav?.classList.contains('open')) closeMenu();
  else openMenu();
});
navClose?.addEventListener('click', closeMenu);
navOverlay?.addEventListener('click', closeMenu);
document.querySelectorAll('.mobile-nav-link').forEach(link => link.addEventListener('click', closeMenu));

// ===== Active Nav Link =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link[data-section]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === current);
  });
});

// ===== Scroll Reveal =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

// ===== Staggered Card Reveal =====
document.querySelectorAll('.news-card, .player-card, .match-card, .highlight-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
  revealObserver.observe(card);
  card.classList.add('reveal');
});

// ===== Player Tabs =====
const playerTabs = document.querySelectorAll('.player-tab');
const playerGroups = document.querySelectorAll('.player-group');
playerTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    playerTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const group = tab.dataset.group;
    playerGroups.forEach(g => {
      g.style.display = (g.dataset.group === group || group === 'all') ? 'grid' : 'none';
    });
  });
});

// ===== Ticker Duplicate for infinite loop =====
const ticker = document.querySelector('.ticker-track');
if (ticker) {
  ticker.innerHTML += ticker.innerHTML;
}

// ===== Gallery Lightbox =====
const galleryItems = document.querySelectorAll('.gallery-item');
if (galleryItems.length > 0) {
  // Create lightbox
  const lb = document.createElement('div');
  lb.id = 'lightbox';
  lb.style.cssText = `position:fixed;inset:0;z-index:9000;background:rgba(0,0,0,0.95);
    display:none;align-items:center;justify-content:center;backdrop-filter:blur(8px)`;
  lb.innerHTML = `<button id="lb-close" style="position:absolute;top:20px;right:24px;font-size:2rem;color:white;background:none;border:none;cursor:pointer;z-index:1">✕</button>
    <img id="lb-img" src="" alt="" style="max-width:90vw;max-height:85vh;object-fit:contain;border-radius:8px;box-shadow:0 8px 50px rgba(0,0,0,0.8)">`;
  document.body.appendChild(lb);
  document.getElementById('lb-close')?.addEventListener('click', () => lb.style.display = 'none');
  lb.addEventListener('click', e => { if (e.target === lb) lb.style.display = 'none'; });
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.querySelector('img')?.src || '';
      if (src) {
        document.getElementById('lb-img').src = src;
        lb.style.display = 'flex';
      }
    });
  });
}

// ===== Smooth hover on stat counters =====
document.querySelectorAll('.hero-stat-value[data-count]').forEach(el => {
  const target = parseInt(el.dataset.count);
  let current = 0;
  const step = Math.ceil(target / 50);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current + (el.dataset.suffix || '');
    if (current >= target) clearInterval(timer);
  }, 40);
});
