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
          <a class="sidebar-link" data-panel="settings"><span class="sidebar-icon">⚙️</span> Settings</a>
          <button id="adminLogoutBtn" class="sidebar-link logout-btn"><span class="sidebar-icon">🚪</span> Logout</button>
        </nav>
      </aside>

      <!-- Main -->
      <main class="dashboard-main">
        <header class="dashboard-header">
          <h2 id="panelTitle">Overview</h2>
          <div class="header-user" id="adminHeaderUser" style="cursor: pointer;" title="Edit My Profile">
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
          <div class="form-row">
            <div class="form-group">
              <label>Passport Preview</label>
              <div id="pPassportPreview" class="image-preview"></div>
              <input type="file" id="pPassportPhoto" class="form-input" accept="image/*" capture="user" />
            </div>
            <div class="form-group">
              <label>Profile Photo Preview</label>
              <div id="pProfilePreview" class="image-preview"></div>
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

    <!-- ── Admin Profile Modal ── -->
    <div class="modal-overlay" id="adminProfileModal">
      <div class="modal-box">
        <div class="modal-header">
          <h3>Edit My Profile</h3>
          <button class="modal-close" data-close="adminProfileModal">✕</button>
        </div>
        <form id="adminProfileForm" class="modal-form">
          <div class="form-group">
            <label>My Full Name *</label>
            <input type="text" id="adminEditName" class="form-input" required />
          </div>
          <div class="form-group">
            <label>Profile Picture</label>
            <div id="adminEditAvatarPreview" class="image-preview-lg"></div>
            <input type="file" id="adminEditAvatarFile" class="form-input" accept="image/*" />
          </div>
          <div class="modal-actions">
            <button type="button" class="btn btn-outline" data-close="adminProfileModal">Cancel</button>
            <button type="submit" class="btn btn-primary" id="adminProfileSubmitBtn">Save Changes</button>
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
          <div class="form-row">
            <div class="form-group">
              <label>Headline (English) *</label>
              <input type="text" id="nTitle" class="form-input" required placeholder="English headline..." />
            </div>
            <div class="form-group">
              <label>Headline (Chinese) *</label>
              <input type="text" id="nTitleZh" class="form-input" required placeholder="中文标题..." />
            </div>
          </div>
          <div class="form-group">
            <label>Image URL</label>
            <input type="url" id="nImage" class="form-input" placeholder="https://..." />
          </div>
          <div class="form-group">
            <label>Body (English) *</label>
            <textarea id="nBody" class="form-input" rows="4" required placeholder="Write English content..."></textarea>
          </div>
          <div class="form-group">
            <label>Body (Chinese) *</label>
            <textarea id="nBodyZh" class="form-input" rows="4" required placeholder="编写中文内容..."></textarea>
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
            <td>
              <div class="user-info-cell">
                <div class="user-avatar-sm">
                  ${p.avatar_url ? `<img src="${p.avatar_url}" alt="" />` : (p.full_name?.charAt(0) || '?')}
                </div>
                <span>${p.full_name || 'Unknown'}</span>
              </div>
            </td>
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
  document.getElementById('pPassportPreview').innerHTML = p?.passport_photo_url ? `<img src="${p.passport_photo_url}" style="width:100px; height:auto; border-radius:4px;" />` : 'No passport';
  document.getElementById('pProfilePreview').innerHTML = p?.avatar_url ? `<img src="${p.avatar_url}" style="width:100px; height:auto; border-radius:4px;" />` : 'No profile photo';
  
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
      
      if (invokeError) {
        let msg = invokeError.message;
        try {
          if (invokeError.context && typeof invokeError.context.json === 'function') {
            const body = await invokeError.context.json();
            msg = body.error || msg;
          }
        } catch (e) { /* ignore parse error */ }
        throw new Error(msg);
      }
      if (invokeData?.error) throw new Error(invokeData.error);
      
      const newUserId = invokeData.user.id;
      
      // The trigger created an empty profile. Now update it.
      const { error: profileErr } = await supabase.from('profiles').update(profileData).eq('id', newUserId);
      if (profileErr) throw profileErr;
      
      const { data: existingStat } = await supabase.from('player_stats').select('id').eq('player_id', newUserId).single();
      if (existingStat) {
        const { error: statsErr } = await supabase.from('player_stats').update(statsData).eq('player_id', newUserId);
        if (statsErr) throw statsErr;
      } else {
        const { error: statsErr } = await supabase.from('player_stats').insert({ player_id: newUserId, ...statsData });
        if (statsErr) throw statsErr;
      }
      
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
  document.getElementById('nTitleZh').value = n?.title_zh || '';
  document.getElementById('nImage').value = n?.image_url || '';
  document.getElementById('nBody').value = n?.body || '';
  document.getElementById('nBodyZh').value = n?.body_zh || '';
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
    title_zh: document.getElementById('nTitleZh').value,
    image_url: document.getElementById('nImage').value,
    body: document.getElementById('nBody').value,
    body_zh: document.getElementById('nBodyZh').value,
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

async function renderSettingsPanel() {
  const panel = document.getElementById('panelContent');
  panel.innerHTML = `<div class="panel-loading">Loading settings...</div>`;

  let currentBanner = null;
  if (supabase) {
    const { data } = await supabase.from('site_settings').select('value').eq('key', 'home_ad_banner').single();
    currentBanner = data?.value;
  }

  panel.innerHTML = `
    <div class="panel-toolbar">
      <h3>Global Settings</h3>
    </div>
    <div class="dash-card">
      <div class="settings-group">
        <h4>Homepage Advertisement Banner</h4>
        <p class="settings-desc">Update the wide banner that appears below the hero section on the home page.</p>
        <p class="panel-hint" style="margin-top: 5px;">💡 Recommended size: <strong>728 x 90px</strong> (Standard Leaderboard) for best results.</p>
        
        <form id="adBannerForm" class="modal-form" style="max-width: 600px; margin-top:20px;">
          <div class="form-group">
            <label>Current Banner Image</label>
            <div id="adBannerPreview" class="image-preview" style="width: 100%; height: 120px; border-style: solid;">
              ${currentBanner?.imageUrl ? `<img src="${currentBanner.imageUrl}" style="object-fit: contain;" />` : 'No banner set'}
            </div>
            <input type="file" id="adBannerFile" class="form-input" accept="image/*" />
          </div>
          <div class="form-group">
            <label>Destination Link (URL)</label>
            <input type="url" id="adBannerLink" class="form-input" value="${currentBanner?.link || ''}" placeholder="https://example.com" />
          </div>
          <button type="submit" class="btn btn-primary" id="saveAdBtn">Save Banner Settings</button>
        </form>
      </div>
    </div>`;

  document.getElementById('adBannerForm')?.addEventListener('submit', saveAdBanner);
}

async function saveAdBanner(e) {
  e.preventDefault();
  const btn = document.getElementById('saveAdBtn');
  const file = document.getElementById('adBannerFile').files[0];
  const link = document.getElementById('adBannerLink').value;

  btn.textContent = 'Saving...';
  btn.disabled = true;

  try {
    let imageUrl = null;
    if (file) {
      const fName = `banners/home_ad_${Date.now()}`;
      const { data, error } = await supabase.storage.from('adverts').upload(fName, file);
      if (error) throw error;
      const { data: pubData } = await supabase.storage.from('adverts').getPublicUrl(data.path);
      imageUrl = pubData.publicUrl;
    } else {
      // Keep existing image if no new file uploaded
      const { data: current } = await supabase.from('site_settings').select('value').eq('key', 'home_ad_banner').single();
      imageUrl = current?.value?.imageUrl;
    }

    const { error } = await supabase.from('site_settings').upsert({
      key: 'home_ad_banner',
      value: { imageUrl, link }
    });

    if (error) throw error;
    showToast('Banner settings saved!');
    renderSettingsPanel();
  } catch (err) {
    showToast('Error: ' + err.message, 'error');
  } finally {
    btn.textContent = 'Save Banner Settings';
    btn.disabled = false;
  }
}

async function loadAdminProfile() {
  if (!supabase) return;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  const { data: p } = await supabase.from('profiles').select('*').eq('id', user.id).single();
  
  document.getElementById('adminEditName').value = p?.full_name || '';
  document.getElementById('adminEditAvatarPreview').innerHTML = p?.avatar_url 
    ? `<img src="${p.avatar_url}" style="width:80px; height:80px; border-radius:50%; object-fit:cover;" />` 
    : 'No photo set';
  openModal('adminProfileModal');
}

async function saveAdminProfile(e) {
  e.preventDefault();
  const btn = document.getElementById('adminProfileSubmitBtn');
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  btn.textContent = 'Saving...';
  btn.disabled = true;

  const fullName = document.getElementById('adminEditName').value;
  const avatarFile = document.getElementById('adminEditAvatarFile').files[0];
  let avatarUrl = null;

  if (avatarFile) {
    const fName = `avatars/${user.id}_${Date.now()}`;
    const { data: uploadData, error: uploadErr } = await supabase.storage.from('players').upload(fName, avatarFile);
    if (!uploadErr && uploadData) {
      const { data: pubData } = await supabase.storage.from('players').getPublicUrl(uploadData.path);
      avatarUrl = pubData.publicUrl;
    }
  }

  const payload = { full_name: fullName };
  if (avatarUrl) payload.avatar_url = avatarUrl;

  const { error } = await supabase.from('profiles').update(payload).eq('id', user.id);
  
  if (error) {
    showToast('Error: ' + error.message, 'error');
  } else {
    showToast('Profile updated!');
    document.getElementById('adminName').textContent = fullName;
    if (avatarUrl || (payload.avatar_url)) {
      const finalUrl = avatarUrl || payload.avatar_url;
      document.getElementById('adminAvatar').innerHTML = `<img src="${finalUrl}" alt="" style="width:100%; height:100%; border-radius:50%; object-fit:cover;" />`;
    } else {
      document.getElementById('adminAvatar').textContent = fullName[0].toUpperCase();
    }
    closeModal('adminProfileModal');
  }
  btn.textContent = 'Save Changes';
  btn.disabled = false;
}

// ─── Init ────────────────────────────────────────────────────
const panelRenderers = {
  overview: renderOverviewPanel,
  players: renderPlayersPanel,
  news: renderNewsPanel,
  fixtures: renderFixturesPanel,
  users: renderUsersPanel,
  settings: renderSettingsPanel,
};
const panelTitles = {
  overview: 'Overview',
  players: 'Manage Players',
  news: 'News Manager',
  fixtures: 'Fixtures & Results',
  users: 'Manage Users',
  settings: 'Global Settings',
};

export function init() {
  hideGlobalNav();

  // Load admin info
  if (supabase) {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      supabase.from('profiles').select('*').eq('id', user.id).single().then(({ data }) => {
        if (data?.full_name) {
          document.getElementById('adminName').textContent = data.full_name;
          if (data.avatar_url) {
            document.getElementById('adminAvatar').innerHTML = `<img src="${data.avatar_url}" alt="" style="width:100%; height:100%; border-radius:50%; object-fit:cover;" />`;
          } else {
            document.getElementById('adminAvatar').textContent = data.full_name[0].toUpperCase();
          }
        }
      });
    });
  }

  // Header interaction
  document.getElementById('adminHeaderUser')?.addEventListener('click', loadAdminProfile);
  document.getElementById('adminProfileForm')?.addEventListener('submit', saveAdminProfile);

  // Sidebar Controls
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

  // Universal Modal Closers
  document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-close') || e.target.getAttribute('data-close')) {
      const modalId = e.target.getAttribute('data-close') || e.target.closest('.modal-overlay')?.id;
      if (modalId) closeModal(modalId);
    }
    if (e.target.classList.contains('modal-overlay')) {
      closeModal(e.target.id);
    }
  });

  // Form Submissions
  document.getElementById('playerForm')?.addEventListener('submit', savePlayer);
  document.getElementById('newsForm')?.addEventListener('submit', saveNews);
  document.getElementById('fixtureForm')?.addEventListener('submit', saveFixture);

  // Logout
  document.getElementById('adminLogoutBtn')?.addEventListener('click', async () => {
    if (!confirm('Logout from Admin Panel?')) return;
    await supabase.auth.signOut();
    localStorage.removeItem('nhfc_user_role');
    localStorage.removeItem('nhfc_user_id');
    window.location.hash = '#login';
  });

  // Render default panel
  renderOverviewPanel();
}
