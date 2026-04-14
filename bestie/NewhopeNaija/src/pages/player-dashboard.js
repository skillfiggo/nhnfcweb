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
          <a href="#" class="sidebar-link" data-tab="tab-documents"><span class="sidebar-icon">📄</span> Documents</a>
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

          <!-- TAB: DOCUMENTS -->
          <div id="tab-documents" class="dash-tab-content" style="display:none;">
            <div class="dash-split-grid player-grid">
              <div class="dash-card" style="grid-column: 1/-1;">
                <div class="dash-card-header">
                  <h3>My Documents</h3>
                </div>

                <!-- Upload Zone -->
                <div class="doc-upload-zone" id="docDropZone">
                  <div class="doc-upload-icon">📤</div>
                  <p class="doc-upload-label">Drag & drop a document here or click to browse</p>
                  <input type="file" id="pdfFileInput" accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain" style="display:none;" />
                  <button class="btn btn-primary" id="pdfBrowseBtn" style="margin-top:12px;">Choose File</button>
                  <p class="doc-upload-hint" id="selectedFileName" style="margin-top:8px; color:var(--accent); font-size:0.8rem;"></p>
                </div>

                <div style="display:flex; gap:12px; margin:16px 0;">
                  <input type="text" id="docLabelInput" placeholder="Optional label / description" class="form-input" style="flex:1;" />
                  <button class="btn btn-primary" id="uploadPdfBtn" style="white-space:nowrap;">
                    <span id="uploadBtnText">⬆ Save Document</span>
                  </button>
                </div>

                <!-- Document List -->
                <div class="dash-card-header" style="margin-top:12px;">
                  <h3>Saved Documents</h3>
                  <button class="btn btn-secondary" id="refreshDocsBtn" style="font-size:0.75rem; padding:6px 12px;">🔄 Refresh</button>
                </div>
                <div id="documentsList" class="documents-list">
                  <div style="text-align:center; padding:20px; color:var(--gray);">Loading documents...</div>
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
      tabLinks.forEach(l => l.classList.remove('active'));
      tabs.forEach(t => { t.style.display = 'none'; t.classList.remove('active'); });
      link.classList.add('active');
      const tabId = link.getAttribute('data-tab');
      const targetTab = document.getElementById(tabId);
      if (targetTab) {
        targetTab.style.display = 'block';
        targetTab.classList.add('active');
        // Lazy-load documents when the tab is first opened
        if (tabId === 'tab-documents') loadDocuments();
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

  // ---- Document Upload Logic ----
  const fileInput   = document.getElementById('pdfFileInput');
  const browseBtn   = document.getElementById('pdfBrowseBtn');
  const dropZone    = document.getElementById('docDropZone');
  const uploadBtn   = document.getElementById('uploadPdfBtn');
  const refreshBtn  = document.getElementById('refreshDocsBtn');
  const fileNameEl  = document.getElementById('selectedFileName');

  // Open file picker
  browseBtn?.addEventListener('click', () => fileInput?.click());

  // Show selected file name
  fileInput?.addEventListener('change', () => {
    if (fileInput.files[0]) {
      fileNameEl.textContent = '📎 ' + fileInput.files[0].name;
    }
  });

  // Drag & drop
  dropZone?.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
  });
  dropZone?.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
  dropZone?.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    const file = e.dataTransfer?.files[0];
    
    // Allowed document types
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    
    if (file && allowedTypes.includes(file.type)) {
      // Inject into file input via DataTransfer
      const dt = new DataTransfer();
      dt.items.add(file);
      fileInput.files = dt.files;
      fileNameEl.textContent = '📎 ' + file.name;
    } else {
      showToast('Please drop a valid document (PDF, DOC/DOCX, or TXT).', 'error');
    }
  });

  // Upload
  uploadBtn?.addEventListener('click', uploadPdf);

  // Refresh list
  refreshBtn?.addEventListener('click', loadDocuments);
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
  achEl.innerHTML = '<div style="color:var(--gray); text-align:center;">Loading achievements...</div>';
  
  try {
    const { data: achs, error: achErr } = await supabase.from('player_achievements').select('*').eq('player_id', user.id).order('created_at', { ascending: false });
    if (achErr) throw achErr;

    if (achs && achs.length > 0) {
      achEl.innerHTML = achs.map(ach => `
        <div class="achievement-item trophy-visual-item">
          <img src="${ach.image_url}" alt="${ach.title}" class="trophy-img" />
          <div class="trophy-details">
            <h4 class="trophy-title">${ach.title}</h4>
            <span class="trophy-date">${new Date(ach.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      `).join('');
    } else {
      achEl.innerHTML = '<div style="color:var(--gray); text-align:center;">No achievements unlocked yet.</div>';
    }
  } catch (err) {
    console.error('Achievements Error:', err);
    achEl.innerHTML = '<div style="color:var(--danger); text-align:center;">Error loading achievements.</div>';
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
    console.error('Performance Logs Error (code:', err.code, '):', err.message, err);
    document.getElementById('playerPerformanceLogs').innerHTML = `<tr><td colspan="4" class="table-empty">Error: ${err.message}</td></tr>`;
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
    console.error('Medical Logs Error (code:', err.code, '):', err.message, err);
    document.getElementById('playerMedicalLogs').innerHTML = `<tr><td colspan="4" class="table-empty">Error: ${err.message}</td></tr>`;
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

// =========================================================
// DOCUMENTS — Upload & Download
// =========================================================
const BUCKET = 'player-documents';

async function getCurrentUserId() {
  const { data: { user } } = await supabase.auth.getUser();
  return user?.id || null;
}

async function uploadPdf() {
  const fileInput  = document.getElementById('pdfFileInput');
  const labelInput = document.getElementById('docLabelInput');
  const uploadBtn  = document.getElementById('uploadPdfBtn');
  const btnText    = document.getElementById('uploadBtnText');

  const file = fileInput?.files[0];
  if (!file) { showToast('Please select a document first.', 'error'); return; }
  
  const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
  if (!allowedTypes.includes(file.type)) { showToast('Only PDF, Word, and Text documents are allowed.', 'error'); return; }
  if (file.size > 10 * 1024 * 1024) { showToast('File is too large. Max 10 MB.', 'error'); return; }

  const userId = await getCurrentUserId();
  if (!userId) { showToast('Not authenticated.', 'error'); return; }

  // Extract real extension (e.g., pdf, docx)
  const ext = file.name.split('.').pop();
  
  // Build storage path: userId/timestamp_label.ext
  // Let's sanitize the label and fallback to the original file name without strictly assuming .pdf
  const baseName = labelInput?.value.trim() 
    ? labelInput.value.trim().replace(/[^a-zA-Z0-9_\- ]/g, '')
    : file.name.substring(0, file.name.lastIndexOf('.')).replace(/[^a-zA-Z0-9_\- ]/g, '');
    
  const ts      = Date.now();
  const safeName = `${ts}_${baseName}.${ext}`;
  const storagePath = `${userId}/${safeName}`;

  btnText.textContent = 'Uploading...';
  uploadBtn.disabled = true;

  const { error: uploadErr } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, file, { contentType: file.type, upsert: false });

  if (uploadErr) {
    showToast('Upload failed: ' + uploadErr.message, 'error');
    btnText.textContent = '⬆ Save Document';
    uploadBtn.disabled = false;
    return;
  }

  showToast('Document saved successfully! 🎉');
  btnText.textContent = '⬆ Save Document';
  uploadBtn.disabled = false;
  fileInput.value = '';
  document.getElementById('selectedFileName').textContent = '';
  if (labelInput) labelInput.value = '';
  loadDocuments();
}

async function loadDocuments() {
  const listEl = document.getElementById('documentsList');
  if (!listEl) return;

  listEl.innerHTML = '<div style="text-align:center;padding:20px;color:var(--gray);">Loading...</div>';

  const userId = await getCurrentUserId();
  if (!userId) { listEl.innerHTML = '<div style="color:var(--danger);padding:12px;">Not authenticated.</div>'; return; }

  const { data: files, error } = await supabase.storage.from(BUCKET).list(userId, {
    limit: 100, offset: 0, sortBy: { column: 'created_at', order: 'desc' }
  });

  if (error) {
    listEl.innerHTML = `<div style="color:var(--danger);padding:12px;">Error loading documents: ${error.message}</div>`;
    return;
  }

  if (!files || files.length === 0) {
    listEl.innerHTML = '<div style="text-align:center;padding:30px;color:var(--gray);">No documents uploaded yet.</div>';
    return;
  }

  listEl.innerHTML = files.map(f => {
    // Determine the icon and display name based on extension
    const extMatch = f.name.match(/\.([a-zA-Z]+)$/);
    const ext = extMatch ? extMatch[1].toLowerCase() : '';
    let icon = '📄';
    if (['doc', 'docx'].includes(ext)) icon = '📝';
    if (ext === 'txt') icon = '🗒️';
    
    // Removing the timestamp prefix and the extension to get a clean display name
    const displayName = f.name.replace(/^\d+_/, '').replace(/\.[a-zA-Z]+$/, '');
    const uploadedAt  = f.created_at ? new Date(f.created_at).toLocaleString() : 'Unknown date';
    const fileSize    = f.metadata?.size ? formatBytes(f.metadata.size) : '';
    
    return `
      <div class="doc-item" data-path="${userId}/${f.name}" data-name="${f.name}">
        <div class="doc-item-icon">${icon}</div>
        <div class="doc-item-info">
          <p class="doc-item-name">${displayName}</p>
          <p class="doc-item-meta">${uploadedAt}${fileSize ? ' · ' + fileSize : ''}</p>
        </div>
        <div class="doc-item-actions">
          <button class="btn btn-secondary doc-download-btn" data-path="${userId}/${f.name}" data-name="${f.name}" style="font-size:0.75rem;padding:6px 14px;">⬇ Download</button>
          <button class="btn btn-danger doc-delete-btn" data-path="${userId}/${f.name}" style="font-size:0.75rem;padding:6px 10px;background:rgba(220,50,50,0.15);border:1px solid rgba(220,50,50,0.4);">🗑</button>
        </div>
      </div>`;
  }).join('');

  // Bind download buttons
  listEl.querySelectorAll('.doc-download-btn').forEach(btn => {
    btn.addEventListener('click', () => downloadPdf(btn.dataset.path, btn.dataset.name));
  });

  // Bind delete buttons
  listEl.querySelectorAll('.doc-delete-btn').forEach(btn => {
    btn.addEventListener('click', () => deleteDocument(btn.dataset.path));
  });
}

async function downloadPdf(storagePath, fileName) {
  const { data, error } = await supabase.storage.from(BUCKET).download(storagePath);
  if (error) { showToast('Download failed: ' + error.message, 'error'); return; }

  const url  = URL.createObjectURL(data);
  const link = document.createElement('a');
  link.href  = url;
  link.download = fileName.replace(/^\d+_/, '');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  showToast('Download started!');
}

async function deleteDocument(storagePath) {
  if (!confirm('Delete this document? This cannot be undone.')) return;
  const { error } = await supabase.storage.from(BUCKET).remove([storagePath]);
  if (error) { showToast('Delete failed: ' + error.message, 'error'); return; }
  showToast('Document deleted.');
  loadDocuments();
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}
