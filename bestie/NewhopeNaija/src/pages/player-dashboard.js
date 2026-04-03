import { supabase } from '../lib/supabase.js';
import { showToast } from '../lib/utils.js';

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
          <a href="#" class="sidebar-link active" data-tab="tab-profile"><span class="sidebar-icon">🏠</span>  My Profile</a>
          <a href="#" class="sidebar-link" data-tab="tab-performance"><span class="sidebar-icon">⚽</span> Performance</a>
          <a href="#" class="sidebar-link" data-tab="tab-salary"><span class="sidebar-icon">💼</span> Salary & Payments</a>
          <a href="#" class="sidebar-link" data-tab="tab-medical"><span class="sidebar-icon">🏥</span> Medical Logs</a>
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
              <span class="user-role">Club Player</span>
            </div>
          </div>
        </header>

        <div class="dashboard-content">
          <!-- TAB: PROFILE -->
          <div id="tab-profile" class="dash-tab-content active" style="display:block;">
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
            
            <div class="dash-split-grid player-grid" style="margin-top: 24px;">
              <!-- Achievements -->
              <div class="dash-card bg-darker" style="grid-column: 1/-1;">
                <div class="dash-card-header">
                  <h3>Achievements Trophy Room</h3>
                </div>
                <div class="achievements-shelf" id="achievementsList">
                  <div style="padding:20px; color:var(--gray); text-align:center;">Loading achievements...</div>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB: PERFORMANCE -->
          <div id="tab-performance" class="dash-tab-content" style="display:none;">
            <div class="dash-split-grid player-grid">
              <div class="dash-card" style="grid-column: 1/-1;">
                <div class="dash-card-header">
                  <h3>Recent Performance</h3>
                </div>
                <div class="player-list-table">
                  <table style="font-size: 0.8rem;">
                    <thead><tr><th>Date</th><th>Opponent</th><th>Stat</th><th>Rating</th></tr></thead>
                    <tbody id="playerPerformanceLogs">
                      <tr><td colspan="4" class="table-empty">Loading performance...</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB: SALARY -->
          <div id="tab-salary" class="dash-tab-content" style="display:none;">
            <div class="dash-split-grid player-grid">
              <div class="dash-card" style="grid-column: 1/-1;">
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
                      <span>Latest Status</span>
                      <strong id="paymentStatus" class="status-badge">--</strong>
                    </div>
                  </div>
                </div>
                <div class="player-list-table" style="margin-top:20px;">
                  <table style="font-size: 0.8rem;">
                    <thead><tr><th>Month</th><th>Net Pay</th><th>Status</th><th>Paid On</th></tr></thead>
                    <tbody id="playerSalaryHistory">
                      <tr><td colspan="4" class="table-empty">Loading history...</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB: MEDICAL -->
          <div id="tab-medical" class="dash-tab-content" style="display:none;">
            <div class="dash-split-grid player-grid">
              <div class="dash-card" style="grid-column: 1/-1;">
                <div class="dash-card-header">
                  <h3>Medical History</h3>
                </div>
                <div class="player-list-table">
                  <table style="font-size: 0.8rem;">
                    <thead><tr><th>Date</th><th>Type</th><th>Status</th><th>Return</th></tr></thead>
                    <tbody id="playerMedicalLogs">
                      <tr><td colspan="4" class="table-empty">Loading medical...</td></tr>
                    </tbody>
                  </table>
                </div>
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

  // Tab Switching Logic
  const tabLinks = document.querySelectorAll('.player-sidebar .sidebar-link[data-tab]');
  const tabs = document.querySelectorAll('.dash-tab-content');
  tabLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      // Remove active class from all links and hide all tabs
      tabLinks.forEach(l => l.classList.remove('active'));
      tabs.forEach(t => { t.style.display = 'none'; t.classList.remove('active'); });
      
      // Activate clicked link
      link.classList.add('active');
      
      // Show target tab
      const tabId = link.getAttribute('data-tab');
      const targetTab = document.getElementById(tabId);
      if (targetTab) {
        targetTab.style.display = 'block';
        targetTab.classList.add('active');
      }
    });
  });

  const logoutBtn = document.getElementById('playerLogoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      localStorage.removeItem('nhfc_user_role');
      localStorage.removeItem('nhfc_user_id');
      if (supabase) await supabase.auth.signOut();
      showToast('Logged out successfully.');
      window.location.hash = '#home';
    });
  }
}

async function loadPlayerData() {
  if (!supabase) {
    document.getElementById('playerName').textContent = 'Database Disconnected';
    return;
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    window.location.hash = '#login';
    return;
  }

  // Fetch Core Profile & Stats
  const { data: profile, error: profileErr } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle();
  if (profileErr) console.error('Error fetching profile:', profileErr.message);

  const { data: stats, error: statsErr } = await supabase.from('player_stats').select('*').eq('player_id', user.id).maybeSingle();
  if (statsErr) console.error('Error fetching player_stats:', statsErr.message);

  // Profile Fallbacks
  const playerName = profile?.full_name || 'Club Player';
  document.getElementById('playerName').textContent = playerName;
  document.getElementById('playerAvatar').textContent = playerName.charAt(0).toUpperCase();
  document.getElementById('heroPlayerName').textContent = 'Welcome back, ' + playerName.split(' ')[0] + '!';

  // Stats Fallbacks
  document.getElementById('matchesVal').textContent = stats?.matches_played || '0';
  document.getElementById('goalsVal').textContent = stats?.goals || '0';
  document.getElementById('assistsVal').textContent = stats?.assists || '0';
  
  const healthStatus = stats?.health_status || 'fit';
  const healthEl = document.getElementById('healthStatusText');
  healthEl.textContent = healthStatus.toUpperCase();
  healthEl.className = healthStatus === 'injured' ? 'text-danger' : 'text-success';

  document.getElementById('salaryAmount').textContent = stats?.salary_amount ? '₦' + Number(stats.salary_amount).toLocaleString() : 'Not Set';
  
  const achEl = document.getElementById('achievementsList');
  if (stats?.achievements && stats.achievements.length > 0) {
    achEl.innerHTML = stats.achievements.map(ach => 
      `<div class="achievement-item"><span class="ach-icon">🏆</span><span>${ach}</span></div>`
    ).join('');
  } else {
    achEl.innerHTML = '<div style="color:var(--gray); text-align:center;">No achievements unlocked yet.</div>';
  }

  // Fetch Salary History - Independent Try/Catch or Promise
  try {
    const { data: history, error: salaryErr } = await supabase.from('salary_history').select('*').eq('player_id', user.id).order('created_at', { ascending: false });
    if (salaryErr) throw salaryErr;

    const histEl = document.getElementById('playerSalaryHistory');
    if (history && history.length > 0) {
      const latest = history[0];
      document.getElementById('lastPaymentDate').textContent = latest.payment_date ? new Date(latest.payment_date).toLocaleDateString() : 'Pending';
      const stClass = latest.status === 'paid' ? 'success' : 'warning';
      document.getElementById('paymentStatus').textContent = latest.status.toUpperCase();
      document.getElementById('paymentStatus').className = `status-badge ${stClass}`;

      histEl.innerHTML = history.map(h => {
        const bdgClass = h.status === 'paid' ? 'badge--green' : 'badge--orange';
        return `
          <tr>
            <td>${h.month_year}</td>
            <td>₦${Number(h.net_pay || 0).toLocaleString()}</td>
            <td><span class="badge ${bdgClass}" style="transform:scale(0.85);">${h.status}</span></td>
            <td>${h.payment_date ? new Date(h.payment_date).toLocaleDateString() : '--'}</td>
          </tr>`;
      }).join('');
    } else {
      document.getElementById('lastPaymentDate').textContent = 'No records';
      document.getElementById('paymentStatus').textContent = '--';
      document.getElementById('paymentStatus').className = 'status-badge';
      histEl.innerHTML = '<tr><td colspan="4" class="table-empty">No salary records found.</td></tr>';
    }
  } catch (err) {
    console.error('Salary History Error:', err);
    document.getElementById('playerSalaryHistory').innerHTML = '<tr><td colspan="4" class="table-empty">Error loading salary records.</td></tr>';
  }

  // Fetch Performance Logs
  try {
    const { data: perfLogs, error: perfErr } = await supabase.from('performance_logs').select('*').eq('player_id', user.id).order('match_date', { ascending: false }).limit(5);
    if (perfErr) throw perfErr;

    const perfEl = document.getElementById('playerPerformanceLogs');
    if (perfLogs && perfLogs.length > 0) {
      perfEl.innerHTML = perfLogs.map(l => `
        <tr>
          <td>${l.match_date}</td>
          <td>${l.opponent || '--'}</td>
          <td>${l.goals || 0}G / ${l.assists || 0}A</td>
          <td><span class="badge badge--green" style="transform:scale(0.85);">${l.rating || '--'}</span></td>
        </tr>`).join('');
    } else {
      perfEl.innerHTML = '<tr><td colspan="4" class="table-empty">No performance logs found.</td></tr>';
    }
  } catch (err) {
    console.error('Performance Logs Error:', err);
    document.getElementById('playerPerformanceLogs').innerHTML = '<tr><td colspan="4" class="table-empty">Error loading performance logs.</td></tr>';
  }

  // Fetch Medical Logs
  try {
    const { data: medLogs, error: medErr } = await supabase.from('medical_logs').select('*').eq('player_id', user.id).order('log_date', { ascending: false });
    if (medErr) throw medErr;

    const medEl = document.getElementById('playerMedicalLogs');
    if (medLogs && medLogs.length > 0) {
      medEl.innerHTML = medLogs.map(m => {
        const stClass = m.status === 'fit' ? 'badge--green' : (m.status === 'injured' ? 'badge--orange' : 'badge--blue');
        return `
          <tr>
            <td>${m.log_date}</td>
            <td>${m.type.toUpperCase()}</td>
            <td><span class="badge ${stClass}" style="transform:scale(0.85);">${m.status.toUpperCase()}</span></td>
            <td>${m.expected_return || '--'}</td>
          </tr>`;
      }).join('');
    } else {
      medEl.innerHTML = '<tr><td colspan="4" class="table-empty">No medical records found.</td></tr>';
    }
  } catch (err) {
    console.error('Medical Logs Error:', err);
    document.getElementById('playerMedicalLogs').innerHTML = '<tr><td colspan="4" class="table-empty">Error loading medical records.</td></tr>';
  }
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
