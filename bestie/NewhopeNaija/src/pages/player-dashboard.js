import { supabase } from '../lib/supabase.js';

export const title = 'Player Dashboard';

export function render() {
  return `
    <div class="dashboard-layout">
      <!-- Player Sidebar -->
      <aside class="dashboard-sidebar player-sidebar">
        <div class="sidebar-brand">
          <img src="/images/logo.png" alt="Logo" class="sidebar-logo" />
          <span>Player Portal</span>
        </div>
        <nav class="sidebar-nav">
          <a href="#player-dashboard" class="sidebar-link active"><span class="sidebar-icon">🏠</span>  My Profile</a>
          <a href="#player-dashboard" class="sidebar-link"><span class="sidebar-icon">⚽</span> Performance</a>
          <a href="#player-dashboard" class="sidebar-link"><span class="sidebar-icon">💼</span> Salary & Payments</a>
          <a href="#player-dashboard" class="sidebar-link"><span class="sidebar-icon">🏥</span> Medical Logs</a>
          <button id="playerLogoutBtn" class="sidebar-link logout-btn"><span class="sidebar-icon">🚪</span> Logout</button>
        </nav>
      </aside>

      <!-- Player Main Content -->
      <main class="dashboard-main">
        <header class="dashboard-header">
          <h2>My Dashboard</h2>
          <div class="header-user">
            <div class="user-avatar" id="playerAvatar">P</div>
            <div class="user-info">
              <span class="user-name" id="playerName">Loading...</span>
              <span class="user-role">Academy Player</span>
            </div>
          </div>
        </header>

        <div class="dashboard-content">
          <!-- Hero Overview -->
          <div class="player-hero-card">
            <div class="player-hero-info">
              <h1 id="heroPlayerName">Welcome back!</h1>
              <p>Here is your current season status at NewHope Naija FC.</p>
              <div class="player-health-status" id="healthStatusWrap">
                Status: <strong id="healthStatusText">Fit</strong>
              </div>
            </div>
            <div class="player-hero-stats">
              <div class="hero-stat">
                <span class="hero-stat-val" id="matchesVal">--</span>
                <span class="hero-stat-label">Matches</span>
              </div>
              <div class="hero-stat">
                <span class="hero-stat-val" id="goalsVal">--</span>
                <span class="hero-stat-label">Goals</span>
              </div>
              <div class="hero-stat">
                <span class="hero-stat-val" id="assistsVal">--</span>
                <span class="hero-stat-label">Assists</span>
              </div>
            </div>
          </div>

          <!-- Main Grid -->
          <div class="dash-split-grid player-grid">
            <!-- Left: Financials -->
            <div class="dash-card">
              <div class="dash-card-header">
                <h3>Salary & Payments</h3>
              </div>
              <div class="finance-block">
                <div class="finance-primary">
                  <span>Current Salary (Monthly)</span>
                  <h2 id="salaryAmount">₦--</h2>
                </div>
                <div class="finance-secondary">
                  <div class="finance-row">
                    <span>Last Payment Received</span>
                    <strong id="lastPaymentDate">--</strong>
                  </div>
                  <div class="finance-row">
                    <span>Payment Status</span>
                    <strong id="paymentStatus" class="status-badge success">Paid</strong>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right: Achievements -->
            <div class="dash-card bg-darker">
              <div class="dash-card-header">
                <h3>Achievements Trophy Room</h3>
              </div>
              <div class="achievements-shelf" id="achievementsList">
                <div style="padding:20px; color:var(--gray); text-align:center;">Loading achievements...</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `;
}

export function init() {
  hideGlobalNav();
  loadPlayerData();

  const logoutBtn = document.getElementById('playerLogoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      localStorage.removeItem('nhfc_user_role');
      localStorage.removeItem('nhfc_user_id');
      if (supabase) await supabase.auth.signOut();
      window.location.hash = '#home';
    });
  }
}

async function loadPlayerData() {
  if (!supabase) {
    renderMockPlayer();
    return;
  }

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      window.location.hash = '#login';
      return;
    }

    const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    const { data: stats } = await supabase.from('player_stats').select('*').eq('player_id', user.id).single();
    
    if (profile) {
      document.getElementById('playerName').textContent = profile.full_name || 'Unnamed Player';
      document.getElementById('playerAvatar').textContent = profile.full_name ? profile.full_name.charAt(0) : 'P';
      document.getElementById('heroPlayerName').textContent = 'Welcome back, ' + (profile.full_name ? profile.full_name.split(' ')[0] : 'Player') + '!';
    }

    if (stats) {
      document.getElementById('matchesVal').textContent = stats.matches_played || '0';
      document.getElementById('goalsVal').textContent = stats.goals || '0';
      document.getElementById('assistsVal').textContent = stats.assists || '0';
      
      const healthStatus = stats.health_status || 'fit';
      const healthEl = document.getElementById('healthStatusText');
      healthEl.textContent = healthStatus.toUpperCase();
      healthEl.className = healthStatus === 'injured' ? 'text-danger' : 'text-success';

      document.getElementById('salaryAmount').textContent = stats.salary_amount ? '₦' + stats.salary_amount.toLocaleString() : 'Not Set';
      document.getElementById('lastPaymentDate').textContent = stats.last_payment_date || 'No record';
      
      const pStatus = stats.payment_status || 'pending';
      const pBadge = document.getElementById('paymentStatus');
      pBadge.textContent = pStatus.toUpperCase();
      pBadge.className = `status-badge ${pStatus === 'paid' ? 'success' : (pStatus==='overdue' ? 'danger' : 'warning')}`;
      
      const achEl = document.getElementById('achievementsList');
      if (stats.achievements && stats.achievements.length > 0) {
        achEl.innerHTML = '';
        stats.achievements.forEach(ach => {
          achEl.innerHTML += `<div class="achievement-item"><span class="ach-icon">🏆</span><span>${ach}</span></div>`;
        });
      } else {
        achEl.innerHTML = '<div style="color:var(--gray); text-align:center;">No achievements unlocked yet.</div>';
      }
    }
  } catch (err) {
    console.warn('Failed to load real data, falling back to mock:', err);
    renderMockPlayer();
  }
}

function renderMockPlayer() {
  document.getElementById('playerName').textContent = 'Chidi Nwosu';
  document.getElementById('playerAvatar').textContent = 'C';
  document.getElementById('heroPlayerName').textContent = 'Welcome back, Chidi!';

  document.getElementById('matchesVal').textContent = '24';
  document.getElementById('goalsVal').textContent = '14';
  document.getElementById('assistsVal').textContent = '6';

  document.getElementById('salaryAmount').textContent = '₦150,000';
  document.getElementById('lastPaymentDate').textContent = 'March 20, 2026';

  const achEl = document.getElementById('achievementsList');
  achEl.innerHTML = `
    <div class="achievement-item"><span class="ach-icon">🏆</span><div class="ach-text"><strong>Youth League Champion</strong><br><small>2025 Season</small></div></div>
    <div class="achievement-item"><span class="ach-icon">🏅</span><div class="ach-text"><strong>Player of the Month</strong><br><small>February 2026</small></div></div>
    <div class="achievement-item"><span class="ach-icon">⚽</span><div class="ach-text"><strong>Hat-trick Hero</strong><br><small>vs Sunrise FC</small></div></div>
  `;
}

function hideGlobalNav() {
  const navbar = document.getElementById('navbar');
  const footer = document.getElementById('footer');
  const topbar = document.getElementById('topbar');
  if (navbar) navbar.style.display = 'none';
  if (footer) footer.style.display = 'none';
  if (topbar) topbar.style.display = 'none';
  
  window.addEventListener('hashchange', function onHash() {
    if (window.location.hash !== '#player-dashboard') {
      if (navbar) navbar.style.display = '';
      if (footer) footer.style.display = '';
      if (topbar) topbar.style.display = '';
      window.removeEventListener('hashchange', onHash);
    }
  });
}
