import '@fontsource/staatliches';
import '@fontsource/bebas-neue/400.css';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import '@fontsource/oswald/400.css';
import '@fontsource/oswald/500.css';
import '@fontsource/oswald/600.css';
import '@fontsource/oswald/700.css';
import './style.css';
import { register, initRouter, render } from './router.js';
import * as home from './pages/home.js';
import * as news from './pages/news.js';
import * as newsArticle from './pages/news-article.js';
import * as players from './pages/players.js';
import * as matches from './pages/matches.js';
import * as gallery from './pages/gallery.js';
import * as contact from './pages/contact.js';
import * as login from './pages/login.js';
import * as adminDashboard from './pages/admin-dashboard.js';
import * as playerDashboard from './pages/player-dashboard.js';
import * as setupPassword from './pages/setup-password.js';
import * as forgotPassword from './pages/forgot-password.js';
import * as resetPassword from './pages/reset-password.js';
import * as history from './pages/history.js';
import * as tv from './pages/tv.js';
import { supabase } from './lib/supabase.js';
import { t } from './i18n.js';

function updateStaticTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.innerHTML = t(key); // Use innerHTML in case translations include HTML tags like <br>
  });
}

// ===== Supabase Auth Listener =====
// Capture the raw hash BEFORE Supabase strips it
const _rawHashOnLoad = window.location.hash;

supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'PASSWORD_RECOVERY') {
    // Force router to stay on reset-password page
    window.location.hash = '#reset-password';
    return;
  }

  // When Supabase fires SIGNED_IN after consuming an invite link,
  // the hash is already stripped — so we check against our saved copy.
  if (event === 'SIGNED_IN' && session) {
    const isInvite = _rawHashOnLoad.includes('type=invite') ||
                     _rawHashOnLoad.includes('type=signup');
    if (isInvite) {
      window.location.hash = '#setup-password';
      return;
    }
  }
});


// ===== Register Routes =====
register('home', home);
register('news', news);
register('news-article', newsArticle);
register('players', players);
register('matches-page', matches);
register('gallery', gallery);
register('contact', contact);
register('login', login);
register('admin-dashboard', adminDashboard);
register('player-dashboard', playerDashboard);
register('setup-password', setupPassword);
register('forgot-password', forgotPassword);
register('reset-password', resetPassword);
register('history', history);
register('newhope-tv', tv);

// ===== Preloader =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader')?.classList.add('hidden');
  }, 1400);
});

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) navbar?.classList.add('scrolled');
  else navbar?.classList.remove('scrolled');
});

// ===== Mobile Nav =====
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
  mobileNav?.classList.contains('open') ? closeMenu() : openMenu();
});
navClose?.addEventListener('click', closeMenu);
navOverlay?.addEventListener('click', closeMenu);

// Close mobile menu on nav link click (delegated)
document.getElementById('mobileNav')?.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (link && !link.classList.contains('mega-link')) {
    closeMenu();
  }
});

// ===== Mega Menu Panel Switcher =====
document.querySelectorAll('.mega-link[data-panel]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const panelId = link.getAttribute('data-panel');
    // Hide all panels
    document.querySelectorAll('.mega-panel').forEach(p => p.classList.remove('active'));
    // Show the clicked panel
    document.getElementById(panelId)?.classList.add('active');
    // Update active link style
    document.querySelectorAll('.mega-link').forEach(l => l.classList.remove('active-link'));
    link.classList.add('active-link');
  });
});

// ===== Start Router =====
initRouter();

// ===== Language Toggle =====
const langToggle = document.getElementById('langToggle');
if (langToggle) {
  // Set initial value based on localStorage
  const initialLang = localStorage.getItem('lang') || 'en';
  langToggle.value = initialLang;

    langToggle.addEventListener('change', (e) => {
    localStorage.setItem('lang', e.target.value);
    updateStaticTranslations();
    render(); // Re-render the SPA to apply translations
  });
}

// Ensure static translations run initially
updateStaticTranslations();

// ===== Search Modal Logic =====
const searchBtn = document.getElementById('searchBtn');
const searchModal = document.getElementById('searchModal');
const searchCloseBtn = document.getElementById('searchCloseBtn');
const searchInput = document.getElementById('searchInput');
const searchSuggestions = document.getElementById('searchSuggestions');
const searchResultsList = document.getElementById('searchResultsList');

function openSearch() {
  if (!searchModal) return;
  searchModal.classList.add('active');
  document.body.style.overflow = 'hidden';
  setTimeout(() => searchInput && searchInput.focus(), 300);
}

function closeSearch() {
  if (!searchModal) return;
  searchModal.classList.remove('active');
  document.body.style.overflow = '';
  if (searchInput) {
    searchInput.value = '';
    handleSearchInput('');
  }
}

function renderSearchResults(results, isLoading = false) {
  if (!searchResultsList) return;
  searchResultsList.innerHTML = '';
  
  if (isLoading) {
    searchResultsList.innerHTML = `<div style="color:var(--gray);text-align:center;padding:20px;">Searching...</div>`;
    return;
  }
  
  if (results.length === 0) {
    searchResultsList.innerHTML = `<div style="color:var(--gray);text-align:center;padding:20px;">No results found for "${searchInput.value}"</div>`;
    return;
  }
  
  results.forEach(item => {
    const a = document.createElement('a');
    a.href = item.url;
    a.className = 'search-result-item';
    a.innerHTML = `
      <div class="search-result-icon">${item.icon}</div>
      <div class="search-result-info">
        <div class="search-result-title">${item.title}</div>
        <div class="search-result-desc">${item.desc}</div>
      </div>
    `;
    a.addEventListener('click', closeSearch);
    searchResultsList.appendChild(a);
  });
}

async function fetchSearchResults(query) {
  renderSearchResults([], true);
  
  const searchPattern = `%${query}%`;
  
  try {
    const [newsRes, playersRes, fixturesRes] = await Promise.all([
      supabase.from('news')
        .select('id, title, excerpt')
        .ilike('title', searchPattern)
        .eq('status', 'published')
        .limit(3),
      
      supabase.from('profiles')
        .select('id, full_name, position')
        .eq('role', 'player')
        .ilike('full_name', searchPattern)
        .limit(3),
        
      supabase.from('fixtures')
        .select('id, opponent, match_date')
        .ilike('opponent', searchPattern)
        .limit(3)
    ]);
    
    let combinedResults = [];
    
    if (newsRes.data) {
      newsRes.data.forEach(n => combinedResults.push({
        title: n.title,
        desc: n.excerpt || 'News Article',
        icon: '📰',
        url: `#news-article?id=${n.id}`
      }));
    }
    
    if (playersRes.data) {
      playersRes.data.forEach(p => combinedResults.push({
        title: p.full_name,
        desc: p.position || 'Club Player',
        icon: '👥',
        url: `#players`
      }));
    }
    
    if (fixturesRes.data) {
      fixturesRes.data.forEach(f => {
        const dateStr = f.match_date ? new Date(f.match_date).toLocaleDateString() : 'Upcoming';
        combinedResults.push({
          title: `Match vs ${f.opponent}`,
          desc: `Fixture Date: ${dateStr}`,
          icon: '⚡',
          url: `#matches-page`
        });
      });
    }
    
    renderSearchResults(combinedResults);
  } catch (err) {
    console.error('Search error:', err);
    searchResultsList.innerHTML = `<div style="color:var(--brand-red);text-align:center;padding:20px;">An error occurred while searching.</div>`;
  }
}

// Debounce helper
function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

const handleSearchInput = async (query) => {
  if (!searchSuggestions || !searchResultsList) return;
  if (!query.trim()) {
    searchSuggestions.style.display = 'block';
    searchResultsList.style.display = 'none';
  } else {
    searchSuggestions.style.display = 'none';
    searchResultsList.style.display = 'flex';
    await fetchSearchResults(query);
  }
};

const debouncedSearch = debounce((q) => handleSearchInput(q), 300);

if (searchBtn) searchBtn.addEventListener('click', openSearch);
if (searchCloseBtn) searchCloseBtn.addEventListener('click', closeSearch);
if (searchInput) {
  searchInput.addEventListener('input', (e) => debouncedSearch(e.target.value));
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && searchModal && searchModal.classList.contains('active')) {
    closeSearch();
  }
});
// Close search when clicking suggestion links
document.querySelectorAll('.search-link').forEach(link => {
  link.addEventListener('click', closeSearch);
});

// ===== Debug Helper =====
window.checkMyRole = async () => {
  const { supabase } = await import('./lib/supabase.js');
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return console.error('No user logged in!');
  
  console.log('--- NHFC Session Debug ---');
  console.log('Your Auth ID:', user.id);
  
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
    
  if (error) {
    console.error('Profile Table Error:', error.message);
    console.log('Tip: Make sure you have a row in the "profiles" table with ID:', user.id);
  } else {
    console.log('Profile Table Row:', profile);
    console.log('Current localStorage Role:', localStorage.getItem('nhfc_user_role'));
  }
};

