// ===== Client-Side Hash Router =====
import { supabase } from './lib/supabase.js';

const routes = {};

export function register(hash, pageModule) {
  routes[hash] = pageModule;
}

export function navigate(hash) {
  window.location.hash = hash;
}

function getHash() {
  return window.location.hash.replace('#', '') || 'home';
}

export async function render() {
  const hash = getHash();
  const page = routes[hash] || routes['home'];
  if (!page) return;

  // --- Route Guard Logic ---
  if (hash === 'admin-dashboard' || hash === 'player-dashboard') {
    if (supabase) {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        console.warn('[Router Guard] No user found, redirecting to login:', userError);
        localStorage.removeItem('nhfc_user_role');
        localStorage.removeItem('nhfc_user_id');
        window.location.hash = '#login';
        return;
      }

      console.log('[Router Guard] Current User ID:', user.id);

      // Use cached role from localStorage (set at login) for instant, reliable routing
      let role = localStorage.getItem('nhfc_user_role');
      console.log('[Router Guard] Cached Role from localStorage:', role);
      
      // If no cached role or if it's player (to be safe), fetch from Supabase to verify
      if (!role || role === 'player') {
        try {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();
          
          if (profileError) {
            console.error('[Router Guard] Profile Fetch Error:', profileError.message);
          } else {
            role = profile?.role || 'player';
            console.log('[Router Guard] Fresh role from Supabase:', role);
            localStorage.setItem('nhfc_user_role', role);
          }
        } catch (e) {
          console.error('[Router Guard] Exception during profile fetch:', e);
        }
      }

      role = role || 'player';
      console.log('[Router Guard] Final Role Decision:', role, 'Target Hash:', hash);
      
      if (hash === 'admin-dashboard' && role !== 'admin') {
        console.warn('[Router Guard] Access Denied: User is not admin. Redirecting to player-dashboard.');
        window.location.hash = '#player-dashboard';
        return;
      }
      if (hash === 'player-dashboard' && role === 'admin') {
        console.info('[Router Guard] Admin accessing player-dashboard. Perfect.');
      }
    }
  }
  // -------------------------

  const app = document.getElementById('app');
  app.innerHTML = page.render();

  // Update document title
  if (page.title) document.title = page.title + ' | NewHope Naija FC';
  else document.title = 'NewHope Naija FC | Official Website';

  // Update active nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    const linkHash = link.getAttribute('href')?.replace('#', '');
    if (linkHash === hash) link.classList.add('active');
  });
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.classList.remove('active-link');
    const linkHash = link.getAttribute('href')?.replace('#', '');
    if (linkHash === hash) link.classList.add('active-link');
  });

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'instant' });

  // Run page-specific init
  if (page.init) page.init();

  // Re-run global scroll reveal
  initReveal();
}

function initReveal() {
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

  // Staggered cards
  document.querySelectorAll('.news-card, .player-card, .match-card, .highlight-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.08}s`;
    card.classList.add('reveal');
    revealObserver.observe(card);
  });
}

export function initRouter() {
  window.addEventListener('hashchange', () => render());
  render();
}
