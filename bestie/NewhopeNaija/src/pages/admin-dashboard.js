import { supabase } from '../lib/supabase.js';

export const title = 'Admin Dashboard';

// ─── Helpers ────────────────────────────────────────────────
function hideGlobalNav() {
  ['navbar', 'footer', 'topbar'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  window.addEventListener('hashchange', function onHash() {
    if (window.location.hash !== '#admin-dashboard') {
      ['navbar', 'footer', 'topbar'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = '';
      });
      window.removeEventListener('hashchange', onHash);
    }
  });
}

function showToast(msg, type = 'success') {
  const t = document.createElement('div');
  t.className = `admin-toast admin-toast--${type}`;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.classList.add('show'), 10);
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 3000);
}

function openModal(id) { document.getElementById(id)?.classList.add('active'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('active'); }

// ─── Render ──────────────────────────────────────────────────
export function render() {
  return `
    <div class="dashboard-layout">
      <!-- Sidebar -->
      <aside class="dashboard-sidebar">
        <div class="sidebar-brand">
          <img src="/images/logo.png" alt="Logo" class="sidebar-logo" />
          <span>Admin Panel</span>
        </div>
        <nav class="sidebar-nav">
          <a class="sidebar-link active" data-panel="overview"><span class="sidebar-icon">📊</span> Overview</a>
          <a class="sidebar-link" data-panel="players"><span class="sidebar-icon">👥</span> Players</a>
          <a class="sidebar-link" data-panel="news"><span class="sidebar-icon">📰</span> News</a>
          <a class="sidebar-link" data-panel="fixtures"><span class="sidebar-icon">⚽</span> Fixtures</a>
          <a class="sidebar-link" data-panel="users"><span class="sidebar-icon">🔐</span> Manage Users</a>
          <button id="adminLogoutBtn" class="sidebar-link logout-btn"><span class="sidebar-icon">🚪</span> Logout</button>
        </nav>
      </aside>

      <!-- Main -->
      <main class="dashboard-main">
        <header class="dashboard-header">
          <h2 id="panelTitle">Overview</h2>
          <div class="header-user">
            <div class="user-avatar" id="adminAvatar">A</div>
            <div class="user-info">
              <span class="user-name" id="adminName">Admin User</span>
              <span class="user-role">Super Admin</span>
            </div>
          </div>
        </header>

        <!-- Dynamic Panel Content -->
        <div class="dashboard-content" id="panelContent">
          <div class="panel-loading">Loading...</div>
        </div>
      </main>
    </div>

    <!-- ── Add/Edit Player Modal ── -->
    <div class="modal-overlay" id="playerModal">
      <div class="modal-box">
        <div class="modal-header">
          <h3 id="playerModalTitle">Add Player</h3>
          <button class="modal-close" data-close="playerModal">✕</button>
        </div>
        <form id="playerForm" class="modal-form">
          <input type="hidden" id="playerFormId" />
          <div class="form-row">
            <div class="form-group">
              <label>Full Name *</label>
              <input type="text" id="pFullName" class="form-input" required />
            </div>
            <div class="form-group">
              <label>Email Address</label>
              <input type="email" id="pEmail" class="form-input" placeholder="player@example.com" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Position</label>
              <select id="pPosition" class="form-input">
                <option value="">Select position</option>
                <option>Goalkeeper</option><option>Defender</option>
                <option>Midfielder</option><option>Forward</option>
              </select>
            </div>
            <div class="form-group">
              <label>Jersey Number</label>
              <input type="number" id="pShirtNumber" class="form-input" min="1" max="99" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Nationality</label>
              <input type="text" id="pNationality" class="form-input" placeholder="e.g. Nigerian" />
            </div>
            <div class="form-group">
              <label>NIN Number</label>
              <input type="text" id="pNIN" class="form-input" placeholder="National ID" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Height (cm)</label>
              <input type="number" id="pHeight" class="form-input" placeholder="e.g. 180" />
            </div>
            <div class="form-group">
              <label>Weight (kg)</label>
              <input type="number" id="pWeight" class="form-input" placeholder="e.g. 75" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Current License No.</label>
              <input type="text" id="pCurrentLicense" class="form-input" />
            </div>
            <div class="form-group">
              <label>Previous License No. (Optional)</label>
              <input type="text" id="pPreviousLicense" class="form-input" />
            </div>
          </div>
          <div class="form-group">
            <label>Previous Club (Optional)</label>
            <input type="text" id="pPreviousClub" class="form-input" placeholder="Name of previous club" />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Upload Passport (Live Camera)</label>
              <input type="file" id="pPassportPhoto" class="form-input" accept="image/*" capture="user" />
            </div>
            <div class="form-group">
              <label>Upload Photo</label>
              <input type="file" id="pProfilePhoto" class="form-input" accept="image/*" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Date of Birth</label>
              <input type="date" id="pDob" class="form-input" />
            </div>
            <div class="form-group">
              <label>Health Status</label>
              <select id="pHealth" class="form-input">
                <option value="fit">Fit</option>
                <option value="injured">Injured</option>
                <option value="recovering">Recovering</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label>Monthly Salary (₦)</label>
            <input type="number" id="pSalary" class="form-input" placeholder="e.g. 150000" />
          </div>
          <div class="form-group">
            <label>Bio</label>
            <textarea id="pBio" class="form-input" rows="3" placeholder="Short player bio..."></textarea>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn btn-outline" data-close="playerModal">Cancel</button>
            <button type="submit" class="btn btn-primary" id="playerFormSubmitBtn">Save Player</button>
          </div>
        </form>
      </div>
    </div>

    <!-- ── Add/Edit News Modal ── -->
    <div class="modal-overlay" id="newsModal">
      <div class="modal-box">
        <div class="modal-header">
          <h3 id="newsModalTitle">Post News</h3>
          <button class="modal-close" data-close="newsModal">✕</button>
        </div>
        <form id="newsForm" class="modal-form">
          <input type="hidden" id="newsFormId" />
          <div class="form-group">
            <label>Headline *</label>
            <input type="text" id="nTitle" class="form-input" required placeholder="News headline..." />
          </div>
          <div class="form-group">
            <label>Image URL</label>
            <input type="url" id="nImage" class="form-input" placeholder="https://..." />
          </div>
          <div class="form-group">
            <label>Body *</label>
            <textarea id="nBody" class="form-input" rows="6" required placeholder="Write your news content..."></textarea>
          </div>
          <div class="form-group checkbox-group">
            <label class="checkbox-label">
              <input type="checkbox" id="nPublished" />
              <span class="checkmark"></span>
              Publish immediately
            </label>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn btn-outline" data-close="newsModal">Cancel</button>
            <button type="submit" class="btn btn-primary">Save News</button>
          </div>
        </form>
      </div>
    </div>

    <!-- ── Add/Edit Fixture Modal ── -->
    <div class="modal-overlay" id="fixtureModal">
      <div class="modal-box">
        <div class="modal-header">
          <h3 id="fixtureModalTitle">Add Fixture</h3>
          <button class="modal-close" data-close="fixtureModal">✕</button>
        </div>
        <form id="fixtureForm" class="modal-form">
          <input type="hidden" id="fixtureFormId" />
          <div class="form-row">
            <div class="form-group">
              <label>Home Team *</label>
              <input type="text" id="fHomeTeam" class="form-input" value="NewHope Naija FC" required />
            </div>
            <div class="form-group">
              <label>Away Team *</label>
              <input type="text" id="fAwayTeam" class="form-input" required placeholder="Opponent FC" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Match Date & Time *</label>
              <input type="datetime-local" id="fMatchDate" class="form-input" required />
            </div>
            <div class="form-group">
              <label>Status</label>
              <select id="fStatus" class="form-input">
                <option value="scheduled">Scheduled</option>
                <option value="live">Live</option>
                <option value="completed">Completed</option>
                <option value="postponed">Postponed</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Venue</label>
              <input type="text" id="fVenue" class="form-input" placeholder="Stadium name" />
            </div>
            <div class="form-group">
              <label>Competition</label>
              <input type="text" id="fCompetition" class="form-input" placeholder="e.g. NPFL" />
            </div>
          </div>
          <div class="form-row" id="scoreRow">
            <div class="form-group">
              <label>Home Score</label>
              <input type="number" id="fHomeScore" class="form-input" min="0" value="0" />
            </div>
            <div class="form-group">
              <label>Away Score</label>
              <input type="number" id="fAwayScore" class="form-input" min="0" value="0" />
            </div>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn btn-outline" data-close="fixtureModal">Cancel</button>
            <button type="submit" class="btn btn-primary">Save Fixture</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

// ─── Panels ────────────────────────────────────────────────

async function renderOverviewPanel() {
  const panel = document.getElementById('panelContent');
  panel.innerHTML = `<div class="panel-loading">Loading stats...</div>`;

  let playerCount = '--', newsCount = '--', fixtureCount = '--', injuredCount = '--';

  if (supabase) {
    const [players, news, fixtures, injured] = await Promise.all([
      supabase.from('profiles').select('id', { count: 'exact' }).eq('role', 'player'),
      supabase.from('news').select('id', { count: 'exact' }),
      supabase.from('fixtures').select('id', { count: 'exact' }),
      supabase.from('player_stats').select('id', { count: 'exact' }).eq('health_status', 'injured'),
    ]);
    playerCount = players.count ?? '--';
    newsCount = news.count ?? '--';
    fixtureCount = fixtures.count ?? '--';
    injuredCount = injured.count ?? '--';
  }

  panel.innerHTML = `
    <div class="dash-stats-grid">
      <div class="dash-stat-card"><div class="stat-icon">👥</div><div class="stat-info"><h3>Total Players</h3><p>${playerCount}</p></div></div>
      <div class="dash-stat-card"><div class="stat-icon">🏥</div><div class="stat-info"><h3>Injured</h3><p>${injuredCount}</p></div></div>
      <div class="dash-stat-card"><div class="stat-icon">📰</div><div class="stat-info"><h3>News Posts</h3><p>${newsCount}</p></div></div>
      <div class="dash-stat-card"><div class="stat-icon">⚽</div><div class="stat-info"><h3>Fixtures</h3><p>${fixtureCount}</p></div></div>
    </div>
    <div class="dash-welcome-banner">
      <h3>Welcome to the Admin Console 👋</h3>
      <p>Use the sidebar to manage players, post news, update fixtures, or manage user roles.</p>
    </div>
  `;
}

async function renderPlayersPanel() {
  const panel = document.getElementById('panelContent');
  panel.innerHTML = `<div class="panel-loading">Loading players...</div>`;

  let rows = '';
  if (supabase) {
    const { data: players, error } = await supabase
      .from('profiles')
      .select('id, full_name, position, shirt_number, is_active, player_stats(health_status, salary_amount)')
      .eq('role', 'player')
      .order('created_at', { ascending: true });

    if (error) {
      rows = `<tr><td colspan="6" class="table-empty">Error: ${error.message}</td></tr>`;
    } else if (!players || players.length === 0) {
      rows = `<tr><td colspan="6" class="table-empty">No players found. Add your first player!</td></tr>`;
    } else {
      rows = players.map(p => {
        const stats = Array.isArray(p.player_stats) ? p.player_stats[0] : p.player_stats;
        const health = stats?.health_status || 'unknown';
        const healthClass = { fit: 'badge--green', injured: 'badge--red', recovering: 'badge--yellow', suspended: 'badge--orange', unknown: 'badge--grey' }[health] || 'badge--grey';
        const salary = stats?.salary_amount ? `₦${Number(stats.salary_amount).toLocaleString()}` : '--';
        return `
          <tr>
            <td><strong>#${p.shirt_number ?? '--'}</strong></td>
            <td>${p.full_name || 'Unknown'}</td>
            <td>${p.position || '--'}</td>
            <td>${salary}</td>
            <td><span class="badge ${healthClass}">${health}</span></td>
            <td class="table-actions">
              <button class="btn btn-sm btn-outline edit-player-btn" data-id="${p.id}">Edit</button>
            </td>
          </tr>`;
      }).join('');
    }
  } else {
    rows = `<tr><td colspan="6" class="table-empty">Supabase not configured.</td></tr>`;
  }

  panel.innerHTML = `
    <div class="panel-toolbar">
      <h3>All Players</h3>
      <button class="btn btn-primary" id="addPlayerBtn">+ Add Player</button>
    </div>
    <div class="dash-card">
      <div class="player-list-table">
        <table>
          <thead>
            <tr><th>#</th><th>Name</th><th>Position</th><th>Salary</th><th>Health</th><th>Action</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>`;

  document.getElementById('addPlayerBtn')?.addEventListener('click', () => {
    document.getElementById('playerModalTitle').textContent = 'Add Player';
    document.getElementById('playerForm').reset();
    document.getElementById('playerFormId').value = '';
    openModal('playerModal');
  });

  document.querySelectorAll('.edit-player-btn').forEach(btn => {
    btn.addEventListener('click', () => loadPlayerForEdit(btn.dataset.id));
  });
}

async function loadPlayerForEdit(playerId) {
  if (!supabase) return;
  const { data: p } = await supabase.from('profiles').select('*').eq('id', playerId).single();
  const { data: stats } = await supabase.from('player_stats').select('*').eq('player_id', playerId).single();

  document.getElementById('playerModalTitle').textContent = 'Edit Player';
  document.getElementById('playerFormId').value = playerId;
  document.getElementById('pFullName').value = p?.full_name || '';
  document.getElementById('pEmail').value = p?.email || '';
  document.getElementById('pPosition').value = p?.position || '';
  document.getElementById('pShirtNumber').value = p?.shirt_number || '';
  document.getElementById('pNationality').value = p?.nationality || '';
  document.getElementById('pNIN').value = p?.nin_number || '';
  document.getElementById('pHeight').value = p?.height_cm || '';
  document.getElementById('pWeight').value = p?.weight_kg || '';
  document.getElementById('pCurrentLicense').value = p?.current_license_no || '';
  document.getElementById('pPreviousLicense').value = p?.previous_license_no || '';
  document.getElementById('pPreviousClub').value = p?.previous_club || '';
  document.getElementById('pDob').value = p?.date_of_birth || '';
  document.getElementById('pBio').value = p?.bio || '';
  document.getElementById('pPassportPhoto').value = '';
  document.getElementById('pProfilePhoto').value = '';
  document.getElementById('pHealth').value = stats?.health_status || 'fit';
  document.getElementById('pSalary').value = stats?.salary_amount || '';
  openModal('playerModal');
}

async function savePlayer(e) {
  e.preventDefault();
  if (!supabase) return showToast('Supabase not configured', 'error');

  const btn = document.getElementById('playerFormSubmitBtn');
  btn.textContent = 'Saving...';
  btn.disabled = true;

  const id = document.getElementById('playerFormId').value;
  const profileData = {
    full_name: document.getElementById('pFullName').value,
    email: document.getElementById('pEmail').value,
    position: document.getElementById('pPosition').value,
    shirt_number: parseInt(document.getElementById('pShirtNumber').value) || null,
    nationality: document.getElementById('pNationality').value,
    nin_number: document.getElementById('pNIN').value,
    height_cm: parseFloat(document.getElementById('pHeight').value) || null,
    weight_kg: parseFloat(document.getElementById('pWeight').value) || null,
    current_license_no: document.getElementById('pCurrentLicense').value,
    previous_license_no: document.getElementById('pPreviousLicense').value,
    previous_club: document.getElementById('pPreviousClub').value,
    date_of_birth: document.getElementById('pDob').value || null,
    bio: document.getElementById('pBio').value,
  };

  // Handle File Uploads (Optional, ignores errors if bucket doesn't exist yet)
  try {
    const passportFile = document.getElementById('pPassportPhoto').files[0];
    if (passportFile) {
      const pName = `passports/${Date.now()}_${passportFile.name}`;
      const { data: uploadData, error: err } = await supabase.storage.from('players').upload(pName, passportFile);
      if (!err && uploadData) {
        const { data: pubData } = supabase.storage.from('players').getPublicUrl(uploadData.path);
        profileData.passport_photo_url = pubData.publicUrl;
      }
    }

    const photoFile = document.getElementById('pProfilePhoto').files[0];
    if (photoFile) {
      const pName = `photos/${Date.now()}_${photoFile.name}`;
      const { data: uploadData, error: err } = await supabase.storage.from('players').upload(pName, photoFile);
      if (!err && uploadData) {
        const { data: pubData } = supabase.storage.from('players').getPublicUrl(uploadData.path);
        profileData.avatar_url = pubData.publicUrl;
      }
    }
  } catch (e) { 
    console.warn('Storage uploads failed (Bucket might not exist yet)', e);
  }
  const statsData = {
    health_status: document.getElementById('pHealth').value,
    salary_amount: parseFloat(document.getElementById('pSalary').value) || null,
  };

  try {
    if (id) {
      // Update existing player
      const { error: pErr } = await supabase.from('profiles').update(profileData).eq('id', id);
      if (pErr) throw pErr;
      
      const { data: existingStat } = await supabase.from('player_stats').select('id').eq('player_id', id).single();
      if (existingStat) {
        await supabase.from('player_stats').update(statsData).eq('player_id', id);
      } else {
        await supabase.from('player_stats').insert({ player_id: id, ...statsData });
      }
      showToast('Player updated successfully!');
    } else {
      // Invite new player via Edge Function
      if (!profileData.email) throw new Error("An email address is required to invite a new player.");
      showToast('Inviting player securely...', 'info');
      
      const { data: invokeData, error: invokeError } = await supabase.functions.invoke('invite-user', {
        body: { email: profileData.email }
      });
      
      if (invokeError) throw new Error(invokeError.message || "Failed to run edge function.");
      if (invokeData?.error) throw new Error(invokeData.error);
      
      const newUserId = invokeData.user.id;
      
      // The trigger created an empty profile. Now update it.
      await supabase.from('profiles').update(profileData).eq('id', newUserId);
      await supabase.from('player_stats').insert({ player_id: newUserId, ...statsData });
      
      showToast('Player invited and profile beautifully setup!');
    }
    closeModal('playerModal');
    renderPlayersPanel();
  } catch (err) {
    showToast('Error: ' + err.message, 'error');
  } finally {
    btn.textContent = 'Save Player';
    btn.disabled = false;
  }
}

async function renderNewsPanel() {
  const panel = document.getElementById('panelContent');
  panel.innerHTML = `<div class="panel-loading">Loading news...</div>`;

  let rows = '';
  if (supabase) {
    const { data: newsList, error } = await supabase
      .from('news')
      .select('id, title, published, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      rows = `<p class="table-empty">Error: ${error.message}</p>`;
    } else if (!newsList || newsList.length === 0) {
      rows = `<p class="table-empty">No news posts yet.</p>`;
    } else {
      rows = newsList.map(n => `
        <div class="news-admin-row">
          <div class="news-admin-info">
            <span class="badge ${n.published ? 'badge--green' : 'badge--grey'}">${n.published ? 'Published' : 'Draft'}</span>
            <strong>${n.title}</strong>
            <span class="news-admin-date">${new Date(n.created_at).toLocaleDateString()}</span>
          </div>
          <div class="table-actions">
            <button class="btn btn-sm btn-outline edit-news-btn" data-id="${n.id}">Edit</button>
            <button class="btn btn-sm btn-danger delete-news-btn" data-id="${n.id}">Delete</button>
          </div>
        </div>
      `).join('');
    }
  }

  panel.innerHTML = `
    <div class="panel-toolbar">
      <h3>News Posts</h3>
      <button class="btn btn-primary" id="addNewsBtn">+ Post News</button>
    </div>
    <div class="dash-card">
      <div class="news-admin-list">${rows}</div>
    </div>`;

  document.getElementById('addNewsBtn')?.addEventListener('click', () => {
    document.getElementById('newsModalTitle').textContent = 'Post News';
    document.getElementById('newsForm').reset();
    document.getElementById('newsFormId').value = '';
    openModal('newsModal');
  });

  document.querySelectorAll('.edit-news-btn').forEach(btn => {
    btn.addEventListener('click', () => loadNewsForEdit(btn.dataset.id));
  });
  document.querySelectorAll('.delete-news-btn').forEach(btn => {
    btn.addEventListener('click', () => deleteNews(btn.dataset.id));
  });
}

async function loadNewsForEdit(id) {
  if (!supabase) return;
  const { data: n } = await supabase.from('news').select('*').eq('id', id).single();
  document.getElementById('newsModalTitle').textContent = 'Edit News';
  document.getElementById('newsFormId').value = id;
  document.getElementById('nTitle').value = n?.title || '';
  document.getElementById('nImage').value = n?.image_url || '';
  document.getElementById('nBody').value = n?.body || '';
  document.getElementById('nPublished').checked = n?.published || false;
  openModal('newsModal');
}

async function saveNews(e) {
  e.preventDefault();
  if (!supabase) return showToast('Supabase not configured', 'error');

  const id = document.getElementById('newsFormId').value;
  const { data: { user } } = await supabase.auth.getUser();
  const payload = {
    title: document.getElementById('nTitle').value,
    image_url: document.getElementById('nImage').value,
    body: document.getElementById('nBody').value,
    published: document.getElementById('nPublished').checked,
    author_id: user?.id,
    updated_at: new Date().toISOString(),
  };

  try {
    if (id) {
      const { error } = await supabase.from('news').update(payload).eq('id', id);
      if (error) throw error;
      showToast('News updated!');
    } else {
      const { error } = await supabase.from('news').insert(payload);
      if (error) throw error;
      showToast('News published!');
    }
    closeModal('newsModal');
    renderNewsPanel();
  } catch (err) {
    showToast('Error: ' + err.message, 'error');
  }
}

async function deleteNews(id) {
  if (!confirm('Delete this news post?')) return;
  const { error } = await supabase.from('news').delete().eq('id', id);
  if (error) return showToast('Error: ' + error.message, 'error');
  showToast('News deleted.', 'info');
  renderNewsPanel();
}

async function renderFixturesPanel() {
  const panel = document.getElementById('panelContent');
  panel.innerHTML = `<div class="panel-loading">Loading fixtures...</div>`;

  let rows = '';
  if (supabase) {
    const { data: fixtures, error } = await supabase
      .from('fixtures')
      .select('*')
      .order('match_date', { ascending: false });

    if (error) {
      rows = `<p class="table-empty">Error: ${error.message}</p>`;
    } else if (!fixtures || fixtures.length === 0) {
      rows = `<p class="table-empty">No fixtures added yet.</p>`;
    } else {
      const statusClass = { scheduled: 'badge--blue', live: 'badge--red badge-pulse', completed: 'badge--green', postponed: 'badge--grey' };
      rows = fixtures.map(f => `
        <div class="fixture-admin-row">
          <div class="fixture-admin-match">
            <span class="badge ${statusClass[f.status] || 'badge--grey'}">${f.status}</span>
            <strong>${f.home_team} vs ${f.away_team}</strong>
            ${f.status === 'completed' ? `<span class="fixture-score">${f.home_score ?? 0} – ${f.away_score ?? 0}</span>` : ''}
          </div>
          <div class="fixture-admin-meta">
            <span>📅 ${new Date(f.match_date).toLocaleString()}</span>
            ${f.venue ? `<span>🏟️ ${f.venue}</span>` : ''}
            ${f.competition ? `<span>🏆 ${f.competition}</span>` : ''}
          </div>
          <div class="table-actions">
            <button class="btn btn-sm btn-outline edit-fixture-btn" data-id="${f.id}">Edit / Score</button>
            <button class="btn btn-sm btn-danger delete-fixture-btn" data-id="${f.id}">Delete</button>
          </div>
        </div>
      `).join('');
    }
  }

  panel.innerHTML = `
    <div class="panel-toolbar">
      <h3>Fixtures & Results</h3>
      <button class="btn btn-primary" id="addFixtureBtn">+ Add Fixture</button>
    </div>
    <div class="dash-card">
      <div class="fixture-admin-list">${rows}</div>
    </div>`;

  document.getElementById('addFixtureBtn')?.addEventListener('click', () => {
    document.getElementById('fixtureModalTitle').textContent = 'Add Fixture';
    document.getElementById('fixtureForm').reset();
    document.getElementById('fixtureFormId').value = '';
    document.getElementById('fHomeTeam').value = 'NewHope Naija FC';
    openModal('fixtureModal');
  });
  document.querySelectorAll('.edit-fixture-btn').forEach(btn => {
    btn.addEventListener('click', () => loadFixtureForEdit(btn.dataset.id));
  });
  document.querySelectorAll('.delete-fixture-btn').forEach(btn => {
    btn.addEventListener('click', () => deleteFixture(btn.dataset.id));
  });
}

async function loadFixtureForEdit(id) {
  if (!supabase) return;
  const { data: f } = await supabase.from('fixtures').select('*').eq('id', id).single();
  document.getElementById('fixtureModalTitle').textContent = 'Edit Fixture / Update Score';
  document.getElementById('fixtureFormId').value = id;
  document.getElementById('fHomeTeam').value = f?.home_team || 'NewHope Naija FC';
  document.getElementById('fAwayTeam').value = f?.away_team || '';
  document.getElementById('fMatchDate').value = f?.match_date ? f.match_date.slice(0, 16) : '';
  document.getElementById('fVenue').value = f?.venue || '';
  document.getElementById('fCompetition').value = f?.competition || '';
  document.getElementById('fStatus').value = f?.status || 'scheduled';
  document.getElementById('fHomeScore').value = f?.home_score ?? 0;
  document.getElementById('fAwayScore').value = f?.away_score ?? 0;
  openModal('fixtureModal');
}

async function saveFixture(e) {
  e.preventDefault();
  if (!supabase) return showToast('Supabase not configured', 'error');

  const id = document.getElementById('fixtureFormId').value;
  const payload = {
    home_team: document.getElementById('fHomeTeam').value,
    away_team: document.getElementById('fAwayTeam').value,
    match_date: document.getElementById('fMatchDate').value,
    venue: document.getElementById('fVenue').value,
    competition: document.getElementById('fCompetition').value,
    status: document.getElementById('fStatus').value,
    home_score: parseInt(document.getElementById('fHomeScore').value) || null,
    away_score: parseInt(document.getElementById('fAwayScore').value) || null,
    updated_at: new Date().toISOString(),
  };

  try {
    if (id) {
      const { error } = await supabase.from('fixtures').update(payload).eq('id', id);
      if (error) throw error;
      showToast('Fixture updated!');
    } else {
      const { error } = await supabase.from('fixtures').insert(payload);
      if (error) throw error;
      showToast('Fixture added!');
    }
    closeModal('fixtureModal');
    renderFixturesPanel();
  } catch (err) {
    showToast('Error: ' + err.message, 'error');
  }
}

async function deleteFixture(id) {
  if (!confirm('Delete this fixture?')) return;
  const { error } = await supabase.from('fixtures').delete().eq('id', id);
  if (error) return showToast('Error: ' + error.message, 'error');
  showToast('Fixture deleted.', 'info');
  renderFixturesPanel();
}

async function renderUsersPanel() {
  const panel = document.getElementById('panelContent');
  panel.innerHTML = `<div class="panel-loading">Loading users...</div>`;

  let rows = '';
  if (supabase) {
    const { data: users, error } = await supabase
      .from('profiles')
      .select('id, full_name, role, created_at, is_active')
      .order('created_at', { ascending: true });

    if (error) {
      rows = `<p class="table-empty">Error: ${error.message}</p>`;
    } else if (!users || users.length === 0) {
      rows = `<p class="table-empty">No users found.</p>`;
    } else {
      rows = users.map(u => `
        <div class="user-admin-row">
          <div class="user-admin-info">
            <div class="user-avatar-sm">${(u.full_name || 'U')[0].toUpperCase()}</div>
            <div>
              <strong>${u.full_name || 'Unnamed User'}</strong>
              <span class="badge ${u.role === 'admin' ? 'badge--red' : 'badge--blue'}">${u.role}</span>
            </div>
          </div>
          <div class="table-actions">
            ${u.role === 'player'
              ? `<button class="btn btn-sm btn-outline make-admin-btn" data-id="${u.id}">Make Admin</button>`
              : `<button class="btn btn-sm btn-outline make-player-btn" data-id="${u.id}">Make Player</button>`
            }
          </div>
        </div>
      `).join('');
    }
  }

  panel.innerHTML = `
    <div class="panel-toolbar">
      <h3>All Users</h3>
    </div>
    <div class="dash-card">
      <div class="user-admin-list">${rows}</div>
    </div>
    <p class="panel-hint">💡 To invite a new player, go to your Supabase Dashboard → Authentication → Invite User.</p>`;

  document.querySelectorAll('.make-admin-btn').forEach(btn => {
    btn.addEventListener('click', () => changeUserRole(btn.dataset.id, 'admin'));
  });
  document.querySelectorAll('.make-player-btn').forEach(btn => {
    btn.addEventListener('click', () => changeUserRole(btn.dataset.id, 'player'));
  });
}

async function changeUserRole(userId, newRole) {
  if (!supabase) return;
  if (!confirm(`Change this user's role to "${newRole}"?`)) return;
  const { error } = await supabase.from('profiles').update({ role: newRole }).eq('id', userId);
  if (error) return showToast('Error: ' + error.message, 'error');
  showToast(`User role updated to ${newRole}!`);
  renderUsersPanel();
}

// ─── Init ────────────────────────────────────────────────────
const panelRenderers = {
  overview: renderOverviewPanel,
  players: renderPlayersPanel,
  news: renderNewsPanel,
  fixtures: renderFixturesPanel,
  users: renderUsersPanel,
};
const panelTitles = {
  overview: 'Overview',
  players: 'Manage Players',
  news: 'News Manager',
  fixtures: 'Fixtures & Results',
  users: 'Manage Users',
};

export function init() {
  hideGlobalNav();

  // Load admin info
  if (supabase) {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      supabase.from('profiles').select('full_name').eq('id', user.id).single().then(({ data }) => {
        if (data?.full_name) {
          document.getElementById('adminName').textContent = data.full_name;
          document.getElementById('adminAvatar').textContent = data.full_name[0].toUpperCase();
        }
      });
    });
  }

  // Render default panel
  renderOverviewPanel();

  // Sidebar nav
  document.querySelectorAll('.sidebar-link[data-panel]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const panel = link.dataset.panel;
      document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      document.getElementById('panelTitle').textContent = panelTitles[panel] || panel;
      panelRenderers[panel]?.();
    });
  });

  // Modal close buttons
  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => closeModal(btn.dataset.close));
  });
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) overlay.classList.remove('active');
    });
  });

  // Form submissions
  document.getElementById('playerForm')?.addEventListener('submit', savePlayer);
  document.getElementById('newsForm')?.addEventListener('submit', saveNews);
  document.getElementById('fixtureForm')?.addEventListener('submit', saveFixture);

  // Logout
  document.getElementById('adminLogoutBtn')?.addEventListener('click', async () => {
    localStorage.removeItem('nhfc_user_role');
    localStorage.removeItem('nhfc_user_id');
    if (supabase) await supabase.auth.signOut();
    window.location.hash = '#home';
  });
}
