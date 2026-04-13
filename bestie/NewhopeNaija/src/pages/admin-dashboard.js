import { supabase } from '../lib/supabase.js';
import { showToast } from '../lib/utils.js';

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
          <a class="sidebar-link" data-panel="finances"><span class="sidebar-icon">💰</span> Finances</a>
          <a class="sidebar-link" data-panel="performance"><span class="sidebar-icon">📈</span> Performance</a>
          <a class="sidebar-link" data-panel="medical"><span class="sidebar-icon">🏥</span> Medical</a>
          <a class="sidebar-link" data-panel="standings"><span class="sidebar-icon">🏆</span> Standings</a>
          <a class="sidebar-link" data-panel="messages"><span class="sidebar-icon">📩</span> Messages</a>
          <a class="sidebar-link" data-panel="gallery"><span class="sidebar-icon">🖼️</span> Gallery</a>
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
            <label>Cover Image (Upload OR URL)</label>
            <div id="nImagePreview" class="image-preview" style="width: 100%; height: 160px; border-style: solid; margin-bottom: 12px; display: flex; align-items: center; justify-content: center;">
              <span style="color:var(--gray);">No image selected</span>
            </div>
            <input type="file" id="nImageFile" class="form-input" accept="image/*" style="margin-bottom: 8px;" />
            <div style="font-size: 0.85rem; color: var(--gray); text-align: center; margin-bottom: 8px;">- OR -</div>
            <input type="url" id="nImage" class="form-input" placeholder="https://... (URL fallback)" />
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
              <label style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;">
                <span>Home Logo URL</span>
                <button type="button" class="btn btn-sm btn-outline select-logo-btn" data-target="fHomeLogo" style="padding: 2px 8px; font-size: 0.7rem;">Browse Library</button>
              </label>
              <input type="url" id="fHomeLogo" class="form-input" placeholder="https://..." />
            </div>
            <div class="form-group">
              <label style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;">
                <span>Away Logo URL</span>
                <button type="button" class="btn btn-sm btn-outline select-logo-btn" data-target="fAwayLogo" style="padding: 2px 8px; font-size: 0.7rem;">Browse Library</button>
              </label>
              <input type="url" id="fAwayLogo" class="form-input" placeholder="https://..." />
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

    <!-- ── Logo Selector Modal ── -->
    <div class="modal-overlay" id="logoSelectorModal" style="z-index: 10000;">
      <div class="modal-box" style="max-width: 800px; max-height: 85vh;">
        <div class="modal-header">
          <h3>Select Club Logo</h3>
          <button class="modal-close" data-close="logoSelectorModal">✕</button>
        </div>
        <div class="modal-body" style="padding: 20px; overflow-y: auto;">
          <div class="upload-logo-area" style="margin-bottom: 20px; padding: 20px; border: 1px dashed rgba(255,255,255,0.2); border-radius: 8px; text-align: center; background: rgba(0,0,0,0.2);">
            <p style="margin-bottom: 12px; font-size: 0.9rem; color: var(--gray);">Upload a new logo to the central library (Max 1MB)</p>
            <input type="file" id="newLogoUpload" accept="image/*" style="display: none;" />
            <button type="button" class="btn btn-outline" onclick="document.getElementById('newLogoUpload').click()">Choose File</button>
            <div id="newLogoName" style="margin-top: 10px; font-size: 0.85rem; color: var(--white); display:none;"></div>
            <button type="button" id="uploadLogoBtn" class="btn btn-primary" style="margin-top: 10px; display:none;">Upload to Library</button>
            <div id="logoUploadStatus" style="margin-top: 10px; font-size: 0.8rem;"></div>
          </div>
          <div id="logoGalleryGrid" class="logo-gallery-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 15px;">
            <div style="text-align:center; padding:40px; color:var(--gray); grid-column: 1/-1;">Loading library...</div>
          </div>
        </div>
      </div>
    </div>
    <!-- ── Add/Edit Highlight Modal ── -->
    <div class="modal-overlay" id="highlightModal">
      <div class="modal-box">
        <div class="modal-header">
          <h3 id="highlightModalTitle">Add Highlight</h3>
          <button class="modal-close" data-close="highlightModal">✕</button>
        </div>
        <form id="highlightForm" class="modal-form">
          <input type="hidden" id="highlightFormIndex" value="-1" />
          <div class="form-group">
            <label>Competition / Match Label *</label>
            <input type="text" id="hComp" class="form-input" required placeholder="e.g. Lagos Youth League · MD 14" />
          </div>
          <div class="form-group">
            <label>Title *</label>
            <input type="text" id="hTitle" class="form-input" required placeholder="e.g. NEWHOPE NAIJA FC 3 – 1 SUNRISE FC · Full Match Highlights" />
          </div>
          <div class="form-group">
            <label>Thumbnail Image (Upload OR URL)</label>
            <div id="hImagePreview" class="image-preview" style="width: 100%; height: 160px; border-style: solid; margin-bottom: 12px; display: flex; align-items: center; justify-content: center;">
              <span style="color:var(--gray);">No image selected</span>
            </div>
            <input type="file" id="hImageFile" class="form-input" accept="image/*" style="margin-bottom: 8px;" />
            <div style="font-size: 0.85rem; color: var(--gray); text-align: center; margin-bottom: 8px;">- OR -</div>
            <input type="url" id="hImage" class="form-input" placeholder="https://... (URL fallback)" />
          </div>
          <div class="form-group">
            <label>Video / Link URL (optional)</label>
            <input type="url" id="hLink" class="form-input" placeholder="https://youtube.com/..." />
          </div>
          <div class="form-group">
            <label>Emoji Icon (for placeholder)</label>
            <input type="text" id="hEmoji" class="form-input" value="⚽" maxlength="4" />
          </div>
          <div class="modal-actions">
            <button type="button" class="btn btn-outline" data-close="highlightModal">Cancel</button>
            <button type="submit" class="btn btn-primary" id="highlightFormSubmitBtn">Save Highlight</button>
          </div>
        </form>
      </div>
    </div>

    <!-- ── Process Finance Modal ── -->
    <div class="modal-overlay" id="financeModal">
      <div class="modal-box">
        <div class="modal-header">
          <h3 id="financeModalTitle">Process Salary</h3>
          <button class="modal-close" data-close="financeModal">✕</button>
        </div>
        <form id="financeForm" class="modal-form">
          <input type="hidden" id="fncPlayerId" />
          <div class="form-group">
            <label>Player Name</label>
            <input type="text" id="fncPlayerName" class="form-input" disabled style="background:var(--dark);" />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Month (YYYY-MM) *</label>
              <input type="month" id="fncMonth" class="form-input" required />
            </div>
            <div class="form-group">
              <label>Status *</label>
              <select id="fncStatus" class="form-input">
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Base Salary (₦) *</label>
              <input type="number" id="fncBaseSalary" class="form-input calc-net" required />
            </div>
            <div class="form-group">
              <label>Match Bonus (₦)</label>
              <input type="number" id="fncBonus" class="form-input calc-net" value="0" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Deductions / Fines (₦)</label>
              <input type="number" id="fncDeduction" class="form-input calc-net" value="0" />
            </div>
            <div class="form-group">
              <label>Net Pay (Calculated) (₦)</label>
              <input type="text" id="fncNetPay" class="form-input" disabled style="background:var(--dark);" />
            </div>
          </div>
          <div class="form-group">
            <label>Payment Date (Optional)</label>
            <input type="date" id="fncPaymentDate" class="form-input" />
          </div>
          <div class="form-group">
            <label>Notes</label>
            <input type="text" id="fncNotes" class="form-input" placeholder="e.g. Cleared via bank transfer" />
          </div>
          <div class="modal-actions">
            <button type="button" class="btn btn-outline" data-close="financeModal">Cancel</button>
            <button type="submit" class="btn btn-primary" id="financeSubmitBtn">Save Record</button>
          </div>
        </form>
      </div>
    </div>

    <!-- ── Process Finance Bulk Modal ── -->
    <div class="modal-overlay" id="financeBulkModal">
      <div class="modal-box">
        <div class="modal-header">
          <h3 id="financeBulkModalTitle">Process All Salaries</h3>
          <button class="modal-close" data-close="financeBulkModal">✕</button>
        </div>
        <form id="financeBulkForm" class="modal-form">
          <div class="form-group" style="padding:10px; background:var(--dark); border-radius:8px; margin-bottom:15px;">
            <p style="margin:0; font-size:0.9rem; color:var(--gray);">Process salary for all active players at once. Each player will receive their individually set base salary.</p>
            <p style="margin:5px 0 0 0; font-weight:bold; color:var(--white);">Total Players: <span id="fncBulkCount">0</span></p>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Month (YYYY-MM) *</label>
              <input type="month" id="fncBulkMonth" class="form-input" required />
            </div>
            <div class="form-group">
              <label>Status *</label>
              <select id="fncBulkStatus" class="form-input">
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Match Bonus (₦) (Applies to all)</label>
              <input type="number" id="fncBulkBonus" class="form-input" value="0" />
            </div>
            <div class="form-group">
              <label>Deductions / Fines (₦) (Applies to all)</label>
              <input type="number" id="fncBulkDeduction" class="form-input" value="0" />
            </div>
          </div>
          <div class="form-group">
            <label>Payment Date (Optional)</label>
            <input type="date" id="fncBulkPaymentDate" class="form-input" />
          </div>
          <div class="form-group">
            <label>Notes</label>
            <input type="text" id="fncBulkNotes" class="form-input" placeholder="e.g. Cleared via bank transfer" />
          </div>
          <div class="modal-actions">
            <button type="button" class="btn btn-outline" data-close="financeBulkModal">Cancel</button>
            <button type="submit" class="btn btn-primary" id="financeBulkSubmitBtn">Process All</button>
          </div>
        </form>
      </div>
    </div>

    <!-- ── Performance Modal ── -->
    <div class="modal-overlay" id="performanceModal">
      <div class="modal-box">
        <div class="modal-header">
          <h3>Log Match Performance</h3>
          <button class="modal-close" data-close="performanceModal">✕</button>
        </div>
        <form id="performanceForm" class="modal-form">
          <input type="hidden" id="perfPlayerId" />
          <div class="form-group">
            <label>Player Name</label>
            <input type="text" id="perfPlayerName" class="form-input" disabled style="background:var(--dark);" />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Match Date *</label>
              <input type="date" id="perfDate" class="form-input" required />
            </div>
            <div class="form-group">
              <label>Opponent</label>
              <input type="text" id="perfOpponent" class="form-input" placeholder="e.g. Sunrise FC" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Minutes Played</label>
              <input type="number" id="perfMinutes" class="form-input" value="0" />
            </div>
            <div class="form-group">
              <label>Match Rating (0-10)</label>
              <input type="number" id="perfRating" class="form-input" step="0.1" min="0" max="10" value="0" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Goals</label>
              <input type="number" id="perfGoals" class="form-input" value="0" />
            </div>
            <div class="form-group">
              <label>Assists</label>
              <input type="number" id="perfAssists" class="form-input" value="0" />
            </div>
          </div>
          <div class="form-group">
            <label>Notes / Feedback</label>
            <textarea id="perfNotes" class="form-input" rows="3" placeholder="Performance details..."></textarea>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn btn-outline" data-close="performanceModal">Cancel</button>
            <button type="submit" class="btn btn-primary" id="perfSubmitBtn">Save Logs</button>
          </div>
        </form>
      </div>
    </div>

    <!-- ── Medical Modal ── -->
    <div class="modal-overlay" id="medicalModal">
      <div class="modal-box">
        <div class="modal-header">
          <h3>Log Medical Update</h3>
          <button class="modal-close" data-close="medicalModal">✕</button>
        </div>
        <form id="medicalForm" class="modal-form">
          <input type="hidden" id="medPlayerId" />
          <div class="form-group">
            <label>Player Name</label>
            <input type="text" id="medPlayerName" class="form-input" disabled style="background:var(--dark);" />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Log Date *</label>
              <input type="date" id="medDate" class="form-input" required />
            </div>
            <div class="form-group">
              <label>Log Type *</label>
              <select id="medType" class="form-input" required>
                <option value="injury">Injury</option>
                <option value="recovery">Recovery</option>
                <option value="checkup">Checkup</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Player Status *</label>
              <select id="medStatus" class="form-input" required>
                <option value="fit">Fit / Available</option>
                <option value="injured">Injured</option>
                <option value="recovering">Recovering</option>
              </select>
            </div>
            <div class="form-group">
              <label>Expected Return</label>
              <input type="date" id="medReturn" class="form-input" />
            </div>
          </div>
          <div class="form-group">
            <label>Description / Details</label>
            <textarea id="medDesc" class="form-input" rows="3" placeholder="Symptoms, diagnosis, treatment..."></textarea>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn btn-outline" data-close="medicalModal">Cancel</button>
            <button type="submit" class="btn btn-primary" id="medSubmitBtn">Save Update</button>
          </div>
        </form>
      </div>
    </div>

    <!-- ── Standings Modal ── -->
    <div class="modal-overlay" id="standingModal">
      <div class="modal-box">
        <div class="modal-header">
          <h3 id="standingModalTitle">Edit Standing</h3>
          <button class="modal-close" data-close="standingModal">✕</button>
        </div>
        <form id="standingForm" class="modal-form">
          <input type="hidden" id="sId" />
          <div class="form-row">
            <div class="form-group">
              <label>Club Name *</label>
              <input type="text" id="sClubName" class="form-input" required />
            </div>
            <div class="form-group">
              <label>Badge (Emoji or URL)</label>
              <input type="text" id="sBadge" class="form-input" placeholder="e.g. 🔴 or URL" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Played</label>
              <input type="number" id="sPlayed" class="form-input" value="0" />
            </div>
            <div class="form-group">
              <label>Won</label>
              <input type="number" id="sWon" class="form-input" value="0" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Drawn</label>
              <input type="number" id="sDrawn" class="form-input" value="0" />
            </div>
            <div class="form-group">
              <label>Lost</label>
              <input type="number" id="sLost" class="form-input" value="0" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>GF (Goals For)</label>
              <input type="number" id="sGF" class="form-input" value="0" />
            </div>
            <div class="form-group">
              <label>GA (Goals Against)</label>
              <input type="number" id="sGA" class="form-input" value="0" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Points</label>
              <input type="number" id="sPoints" class="form-input" value="0" />
            </div>
            <div class="form-group">
              <label>Form (e.g. W,W,D,L,W)</label>
              <input type="text" id="sForm" class="form-input" placeholder="Comma separated" />
            </div>
          </div>
          <div class="form-group">
            <label style="display:flex; align-items:center; gap:8px;">
              <input type="checkbox" id="sHighlighted" /> Highlight this team (NewHope Naija FC)
            </label>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn btn-outline" data-close="standingModal">Cancel</button>
            <button type="submit" class="btn btn-primary" id="standingSubmitBtn">Save Standing</button>
          </div>
        </form>
      </div>
    </div>

    <!-- ── Add/Edit Gallery Modal ── -->
    <div class="modal-overlay" id="galleryModal">
      <div class="modal-box">
        <div class="modal-header">
          <h3 id="galleryModalTitle">Add Gallery Photo</h3>
          <button class="modal-close" data-close="galleryModal">✕</button>
        </div>
        <form id="galleryForm" class="modal-form">
          <input type="hidden" id="galleryFormId" />
          <div class="form-group">
            <label>Image (Upload file OR provide URL) *</label>
            <input type="file" id="gImageFile" class="form-input" accept="image/*" style="margin-bottom: 8px;" />
            <div style="font-size: 0.85rem; color: var(--gray); text-align: center; margin-bottom: 8px;">- OR -</div>
            <input type="url" id="gImageUrl" class="form-input" placeholder="https://..." />
          </div>
          <div class="form-group">
            <label>Category</label>
            <select id="gCategory" class="form-input">
              <option value="Match Day">Match Day</option>
              <option value="Training">Training</option>
              <option value="Events">Events</option>
            </select>
          </div>
          <div class="form-group">
            <label>Caption / Title</label>
            <input type="text" id="gCaption" class="form-input" placeholder="e.g. Training session at the stadium" />
          </div>
          <div class="modal-actions">
            <button type="button" class="btn btn-outline" data-close="galleryModal">Cancel</button>
            <button type="submit" class="btn btn-primary" id="gallerySubmitBtn">Save Photo</button>
          </div>
        </form>
      </div>
    </div>

    <!-- ── Add/Edit Homepage Slide Modal ── -->
    <div class="modal-overlay" id="sliderModal">
      <div class="modal-box">
        <div class="modal-header">
          <h3 id="sliderModalTitle">Add Slide</h3>
          <button class="modal-close" data-close="sliderModal">✕</button>
        </div>
        <form id="sliderForm" class="modal-form">
          <input type="hidden" id="sliderFormIndex" value="-1" />
          <div class="form-group">
            <label>Tagline (e.g. WELCOME TO) *</label>
            <input type="text" id="slTagline" class="form-input" required placeholder="Short top label" />
          </div>
          <div class="form-group">
            <label>Main Title (HTML allowed) *</label>
            <input type="text" id="slTitle" class="form-input" required placeholder="e.g. NEWHOPE<br><span class='red'>NAIJA</span>" />
          </div>
          <div class="form-group">
            <label>Background Image (Upload OR URL) *</label>
            <div id="slImagePreview" class="image-preview" style="width: 100%; height: 160px; border-style: solid; margin-bottom: 12px; display: flex; align-items: center; justify-content: center; background-size: cover; background-position: center;">
              <span style="color:var(--gray);">No image selected</span>
            </div>
            <input type="file" id="slImageFile" class="form-input" accept="image/*" style="margin-bottom: 8px;" />
            <div style="font-size: 0.85rem; color: var(--gray); text-align: center; margin-bottom: 8px;">- OR -</div>
            <input type="url" id="slImageUrl" class="form-input" placeholder="https://... (URL fallback)" />
          </div>
          <div class="modal-actions">
            <button type="button" class="btn btn-outline" data-close="sliderModal">Cancel</button>
            <button type="submit" class="btn btn-primary" id="sliderSubmitBtn">Save Slide</button>
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
              <button class="btn btn-sm btn-danger delete-player-btn" data-id="${p.id}">Delete</button>
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

  document.querySelectorAll('.delete-player-btn').forEach(btn => {
    btn.addEventListener('click', () => deletePlayer(btn.dataset.id));
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
  const prevClubEl = document.getElementById('pPreviousClub');
  if (prevClubEl) prevClubEl.value = p?.previous_club || '';
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
  const email = document.getElementById('pEmail').value;
  // Note: email is NOT included in profileData because it lives in auth.users, not the profiles table
  const profileData = {
    full_name: document.getElementById('pFullName').value,
    position: document.getElementById('pPosition').value,
    shirt_number: parseInt(document.getElementById('pShirtNumber').value) || null,
    nationality: document.getElementById('pNationality').value,
    nin_number: document.getElementById('pNIN').value,
    height_cm: parseFloat(document.getElementById('pHeight').value) || null,
    weight_kg: parseFloat(document.getElementById('pWeight').value) || null,
    current_license_no: document.getElementById('pCurrentLicense').value,
    previous_license_no: document.getElementById('pPreviousLicense').value,
    previous_club: document.getElementById('pPreviousClub') ? document.getElementById('pPreviousClub').value : '',
    date_of_birth: document.getElementById('pDob').value || null,
    bio: document.getElementById('pBio').value,
  };

  // Handle File Uploads
  try {
    const passportFile = document.getElementById('pPassportPhoto').files[0];
    if (passportFile) {
      console.log('Uploading passport photo:', passportFile.name);
      const pName = `passports/${Date.now()}_${passportFile.name}`;
      const { data: uploadData, error: err } = await supabase.storage.from('players').upload(pName, passportFile);
      if (!err && uploadData) {
        const { data: pubData } = supabase.storage.from('players').getPublicUrl(uploadData.path);
        profileData.passport_photo_url = pubData.publicUrl;
        console.log('Passport uploaded:', profileData.passport_photo_url);
      } else if (err) {
        console.error('Passport upload error:', err);
        showToast('Passport Upload Error: ' + err.message, 'error');
      }
    }

    const photoFile = document.getElementById('pProfilePhoto').files[0];
    if (photoFile) {
      console.log('Uploading profile photo:', photoFile.name);
      const pName = `photos/${Date.now()}_${photoFile.name}`;
      const { data: uploadData, error: err } = await supabase.storage.from('players').upload(pName, photoFile);
      if (!err && uploadData) {
        const { data: pubData } = supabase.storage.from('players').getPublicUrl(uploadData.path);
        profileData.avatar_url = pubData.publicUrl;
        console.log('Profile photo uploaded:', profileData.avatar_url);
      } else if (err) {
        console.error('Profile photo upload error:', err);
        showToast('Profile Photo Upload Error: ' + err.message, 'error');
      }
    }
  } catch (e) { 
    console.error('Storage system error:', e);
    showToast('Storage system error: ' + e.message, 'error');
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
      if (!email) throw new Error("An email address is required to invite a new player.");
      console.log('Invoking Edge Function "invite-user" for email:', email);
      showToast('Inviting player securely...', 'info');
      
      let invokeData, invokeError;
      try {
        console.log('Waiting for Edge Function response (15s timeout)...');
        // Simple timeout wrapper
        const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Invitation request timed out (15s).')), 15000));
        const response = await Promise.race([
          supabase.functions.invoke('invite-user', { body: { email: email, full_name: profileData.full_name } }),
          timeoutPromise
        ]);
        
        invokeData = response.data;
        invokeError = response.error;
      } catch (e) {
        console.error('Invoke Exception:', e);
        throw new Error('Failed to reach the invitation service. Is "invite-user" deployed? ' + e.message);
      }
      
      if (invokeError) {
        console.error('Edge Function Error Object:', invokeError);
        let msg = invokeError.message || 'Unknown error';
        try {
          // Attempt to parse JSON error response from Supabase Function
          if (invokeError.context && typeof invokeError.context.json === 'function') {
            const body = await invokeError.context.json();
            msg = body.error || msg;
          }
        } catch (e) { console.warn('Could not parse error body', e); }
        throw new Error(`Invitation failed: ${msg}. Check Supabase logs for "invite-user" function.`);
      }

      if (!invokeData || invokeData.error) {
        console.error('Edge Function Data Error:', invokeData);
        throw new Error(invokeData?.error || "Edge Function returned an empty response. Check your Supabase logs.");
      }
      
      const newUserId = invokeData.user?.id;
      if (!newUserId) throw new Error("Could not retrieve new user ID from invitation response.");
      
      showToast('Creating player profile...', 'info');
      
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

async function deletePlayer(id) {
  if (!confirm('Are you sure you want to delete this player? This action cannot be undone.')) return;
  try {
    // Delete child records first to avoid FK constraint violations
    await supabase.from('player_stats').delete().eq('player_id', id);
    await supabase.from('salary_history').delete().eq('player_id', id);
    await supabase.from('performance_logs').delete().eq('player_id', id);
    await supabase.from('medical_logs').delete().eq('player_id', id);

    // Now delete the profile
    const { error } = await supabase.from('profiles').delete().eq('id', id);
    if (error) throw error;

    showToast('Player deleted.', 'info');
    renderPlayersPanel();
  } catch (err) {
    showToast('Error deleting player: ' + err.message, 'error');
    console.error('[deletePlayer] Error:', err);
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
    const preview = document.getElementById('nImagePreview');
    if (preview) preview.innerHTML = '<span style="color:var(--gray);">No image selected</span>';
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
  const preview = document.getElementById('nImagePreview');
  if (preview) {
    preview.innerHTML = n?.image_url ? `<img src="${n.image_url}" style="width:100%; height:100%; object-fit:contain;" />` : '<span style="color:var(--gray);">No image selected</span>';
  }
  document.getElementById('nBody').value = n?.body || '';
  document.getElementById('nBodyZh').value = n?.body_zh || '';
  document.getElementById('nPublished').checked = n?.published || false;
  openModal('newsModal');
}

async function saveNews(e) {
  e.preventDefault();
  if (!supabase) return showToast('Supabase not configured', 'error');
  
  const btn = e.target.querySelector('button[type="submit"]');
  if (btn) { btn.textContent = 'Saving...'; btn.disabled = true; }

  try {
    const id = document.getElementById('newsFormId').value;
    const { data: { user } } = await supabase.auth.getUser();
    
    let imageUrl = document.getElementById('nImage').value;
    const photoFile = document.getElementById('nImageFile')?.files[0];

    if (photoFile) {
      console.log('Uploading news photo:', photoFile.name);
      const pName = `articles/${Date.now()}_${photoFile.name}`;
      const { data: uploadData, error: err } = await supabase.storage.from('news-images').upload(pName, photoFile);
      if (!err && uploadData) {
        const { data: pubData } = supabase.storage.from('news-images').getPublicUrl(uploadData.path);
        imageUrl = pubData.publicUrl;
      } else if (err) {
        console.error('News photo upload error:', err);
        showToast('Image Upload Error: ' + err.message, 'error');
        throw new Error("Failed to upload image.");
      }
    }

    const payload = {
      title: document.getElementById('nTitle').value,
      title_zh: document.getElementById('nTitleZh').value,
      image_url: imageUrl,
      body: document.getElementById('nBody').value,
      body_zh: document.getElementById('nBodyZh').value,
      published: document.getElementById('nPublished').checked,
      author_id: user?.id,
      updated_at: new Date().toISOString(),
    };

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
  } finally {
    const btn = e.target.querySelector('button[type="submit"]');
    if (btn) { btn.textContent = 'Save News'; btn.disabled = false; }
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
    document.getElementById('fHomeLogo').value = '/images/logo.png';
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
  document.getElementById('fHomeLogo').value = f?.home_logo || '';
  document.getElementById('fAwayLogo').value = f?.away_logo || '';
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
    home_logo: document.getElementById('fHomeLogo').value || null,
    away_logo: document.getElementById('fAwayLogo').value || null,
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
  let users = [];
  if (supabase) {
    const { data: usersData, error } = await supabase
      .from('profiles')
      .select('id, full_name, role, created_at, is_active')
      .order('created_at', { ascending: true });
    if (usersData) users = usersData;

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
      <div class="search-box">
        <input type="text" id="userSearch" placeholder="Search user by name..." class="form-input" style="max-width:300px; margin-bottom:0;" />
      </div>
    </div>
    <div class="dash-card">
      <div class="user-admin-list" id="usersListContent">${rows}</div>
    </div>
    <p class="panel-hint">💡 To invite a new player, go to your Supabase Dashboard → Authentication → Invite User.</p>`;

  const userSearch = document.getElementById('userSearch');
  userSearch.addEventListener('input', () => {
    const term = userSearch.value.toLowerCase();
    const filtered = users.filter(u => (u.full_name || '').toLowerCase().includes(term));
    document.getElementById('usersListContent').innerHTML = filtered.length > 0
      ? filtered.map(u => `
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
          </div>`).join('')
      : `<p class="table-empty">No matching users found.</p>`;
    
    attachUserListeners();
  });

  const attachUserListeners = () => {
    document.querySelectorAll('.make-admin-btn').forEach(btn => {
      btn.addEventListener('click', () => changeUserRole(btn.dataset.id, 'admin'));
    });
    document.querySelectorAll('.make-player-btn').forEach(btn => {
      btn.addEventListener('click', () => changeUserRole(btn.dataset.id, 'player'));
    });
  };

  attachUserListeners();
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
    </div>

    <div class="dash-card" style="margin-top:24px;">
      <div class="settings-group">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <h4 style="margin:0;">Homepage Slider</h4>
          <button class="btn btn-sm btn-primary" id="addSliderBtn">+ Add Slide</button>
        </div>
        <p class="settings-desc">Manage the main hero slider images and text shown on the home page.</p>
        <div class="fixture-admin-list" id="settingsSliderList" style="margin-top:16px;"></div>
      </div>
    </div>

    <div class="dash-card" style="margin-top:24px;">
      <div class="settings-group">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <h4 style="margin:0;">Homepage Highlights</h4>
          <button class="btn btn-sm btn-primary" id="addHighlightBtn">+ Add Highlight</button>
        </div>
        <p class="settings-desc">Manage the match highlight cards shown on the home page.</p>
        <div class="fixture-admin-list" id="settingsHighlightsList" style="margin-top:16px;"></div>
      </div>
    </div>

    <div class="dash-card" style="margin-top:24px;">
      <div class="settings-group">
        <h4>Email Configuration Test (Resend)</h4>
        <p class="settings-desc">Verify your Resend setup by sending a test email to your inbox.</p>
        <p class="panel-hint" style="margin-top: 5px;">💡 Note: Ensure your <code>RESEND_API_KEY</code> is set in Supabase Secrets.</p>
        
        <form id="testEmailForm" class="modal-form" style="max-width: 600px; margin-top:20px;">
          <div class="form-group">
            <label>Recipient Email Address</label>
            <input type="email" id="testEmailRecipient" class="form-input" placeholder="you@example.com" required />
          </div>
          <button type="submit" class="btn btn-primary" id="sendTestEmailBtn">Send Test Email</button>
        </form>
      </div>
    </div>`;

  document.getElementById('adBannerForm')?.addEventListener('submit', saveAdBanner);
  document.getElementById('testEmailForm')?.addEventListener('submit', sendTestEmail);
  
  // Render highlights inside settings
  let highlights = [];
  if (supabase) {
    const { data } = await supabase.from('site_settings').select('value').eq('key', 'home_highlights').single();
    highlights = data?.value || [];
  }

  const hList = document.getElementById('settingsHighlightsList');
  if (highlights.length === 0) {
    hList.innerHTML = `<p class="table-empty">No highlights added yet.</p>`;
  } else {
    hList.innerHTML = highlights.map((h, i) => `
      <div class="fixture-admin-row">
        <div class="fixture-admin-match">
          <span style="font-size:1.6rem;">${h.emoji || '⚽'}</span>
          <div>
            <strong>${h.title}</strong>
            <div style="font-size:0.75rem;color:var(--gray);">${h.comp}</div>
          </div>
        </div>
        <div class="table-actions">
          <button class="btn btn-sm btn-outline edit-highlight-btn" data-index="${i}">Edit</button>
          <button class="btn btn-sm btn-danger delete-highlight-btn" data-index="${i}">Delete</button>
        </div>
      </div>`).join('');
  }

  document.getElementById('addHighlightBtn')?.addEventListener('click', () => {
    document.getElementById('highlightModalTitle').textContent = 'Add Highlight';
    document.getElementById('highlightForm').reset();
    document.getElementById('highlightFormIndex').value = '-1';
    document.getElementById('hEmoji').value = '⚽';
    openModal('highlightModal');
  });

  document.querySelectorAll('.edit-highlight-btn').forEach(btn => {
    btn.addEventListener('click', () => loadHighlightForEdit(parseInt(btn.dataset.index), highlights));
  });
  document.querySelectorAll('.delete-highlight-btn').forEach(btn => {
    btn.addEventListener('click', () => deleteHighlight(parseInt(btn.dataset.index), highlights));
  });

  // Handle Highlight Image Preview
  document.getElementById('hImageFile')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const preview = document.getElementById('hImagePreview');
    if (file && preview) {
      const reader = new FileReader();
      reader.onload = (re) => {
        preview.innerHTML = `<img src="${re.target.result}" style="width:100%; height:100%; object-fit:contain;" />`;
      };
      reader.readAsDataURL(file);
    }
  });

  // Render Slider List
  let sliderData = [];
  if (supabase) {
    const { data } = await supabase.from('site_settings').select('value').eq('key', 'home_slider').single();
    sliderData = data?.value || [];
  }

  const sList = document.getElementById('settingsSliderList');
  if (sList) {
    if (sliderData.length === 0) {
      sList.innerHTML = `<p class="table-empty">No slides added yet. Using defaults.</p>`;
    } else {
      sList.innerHTML = sliderData.map((s, i) => `
        <div class="fixture-admin-row" style="align-items: center;">
          <div class="fixture-admin-match" style="gap: 15px;">
            ${s.image ? `<div style="width: 80px; height: 50px; background-image: url('${s.image}'); background-size: cover; background-position: center; border-radius: 4px;"></div>` : '<div style="width: 80px; height: 50px; background: #333; display:flex; align-items:center; justify-content:center; border-radius:4px; color:#666;">No Img</div>'}
            <div>
              <strong>${s.tagline}</strong>
              <div style="font-size:0.85rem;color:var(--gray);margin-top:2px;">${s.title}</div>
            </div>
          </div>
          <div class="table-actions">
            <button class="btn btn-sm btn-outline edit-slider-btn" data-index="${i}">Edit</button>
            <button class="btn btn-sm btn-danger delete-slider-btn" data-index="${i}">Delete</button>
          </div>
        </div>`).join('');
    }
  }

  document.getElementById('addSliderBtn')?.addEventListener('click', () => {
    document.getElementById('sliderModalTitle').textContent = 'Add Slide';
    document.getElementById('sliderForm').reset();
    document.getElementById('sliderFormIndex').value = '-1';
    document.getElementById('slImagePreview').innerHTML = '<span style="color:var(--gray);">No image selected</span>';
    document.getElementById('slImagePreview').style.backgroundImage = 'none';
    openModal('sliderModal');
  });

  document.querySelectorAll('.edit-slider-btn').forEach(btn => {
    btn.addEventListener('click', () => loadSliderForEdit(parseInt(btn.dataset.index), sliderData));
  });
  document.querySelectorAll('.delete-slider-btn').forEach(btn => {
    btn.addEventListener('click', () => deleteSlider(parseInt(btn.dataset.index), sliderData));
  });

  // Handle Slider Image Preview
  document.getElementById('slImageFile')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const preview = document.getElementById('slImagePreview');
    if (file && preview) {
      const reader = new FileReader();
      reader.onload = (re) => {
        preview.style.backgroundImage = `url('${re.target.result}')`;
        preview.innerHTML = '';
      };
      reader.readAsDataURL(file);
    }
  });

  // Add event listener to submit
  document.getElementById('sliderForm')?.removeEventListener('submit', saveSlider); // Prevent dupes if bound elsewhere
  document.getElementById('sliderForm')?.addEventListener('submit', saveSlider);
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

// ─── Highlights Panel ────────────────────────────────────────
// ─── Highlights Panel Logic (now inside Settings) ─────────────
function loadHighlightForEdit(index, highlights) {
  const h = highlights[index];
  if (!h) return;
  document.getElementById('highlightModalTitle').textContent = 'Edit Highlight';
  document.getElementById('highlightFormIndex').value = index;
  document.getElementById('hComp').value = h.comp || '';
  document.getElementById('hTitle').value = h.title || '';
  document.getElementById('hImage').value = h.image || '';
  document.getElementById('hLink').value = h.link || '';
  document.getElementById('hEmoji').value = h.emoji || '⚽';
  
  const preview = document.getElementById('hImagePreview');
  if (preview) {
    preview.innerHTML = h.image ? `<img src="${h.image}" style="width:100%; height:100%; object-fit:contain;" />` : '<span style="color:var(--gray);">No image selected</span>';
  }
  
  openModal('highlightModal');
}

async function saveHighlight(e) {
  e.preventDefault();
  if (!supabase) return showToast('Supabase not configured', 'error');

  const btn = document.getElementById('highlightFormSubmitBtn');
  btn.textContent = 'Saving...';
  btn.disabled = true;

  try {
    // Load current list
    const { data: current } = await supabase.from('site_settings').select('value').eq('key', 'home_highlights').single();
    const highlights = current?.value || [];

    const index = parseInt(document.getElementById('highlightFormIndex').value);
    const file = document.getElementById('hImageFile').files[0];
    let imageUrl = document.getElementById('hImage').value.trim();

    if (file) {
      const fName = `highlights/${Date.now()}_${file.name}`;
      const { data: uploadData, error: uploadErr } = await supabase.storage.from('gallery-images').upload(fName, file);
      if (uploadErr) throw uploadErr;
      const { data: pubData } = await supabase.storage.from('gallery-images').getPublicUrl(uploadData.path);
      imageUrl = pubData.publicUrl;
    }

    const entry = {
      comp: document.getElementById('hComp').value.trim(),
      title: document.getElementById('hTitle').value.trim(),
      image: imageUrl,
      link: document.getElementById('hLink').value.trim(),
      emoji: document.getElementById('hEmoji').value.trim() || '⚽',
    };

    if (index >= 0) {
      highlights[index] = entry;
    } else {
      highlights.push(entry);
    }

    const { error } = await supabase.from('site_settings').upsert({ key: 'home_highlights', value: highlights });
    if (error) throw error;

    showToast(index >= 0 ? 'Highlight updated!' : 'Highlight added!');
    closeModal('highlightModal');
    renderSettingsPanel();
  } catch (err) {
    showToast('Error: ' + err.message, 'error');
  } finally {
    btn.textContent = 'Save Highlight';
    btn.disabled = false;
  }
}

async function deleteHighlight(index, highlights) {
  if (!confirm('Delete this highlight?')) return;
  highlights.splice(index, 1);
  const { error } = await supabase.from('site_settings').upsert({ key: 'home_highlights', value: highlights });
  if (error) return showToast('Error: ' + error.message, 'error');
  showToast('Highlight deleted.', 'info');
  renderSettingsPanel();
}

// ─── Slider Settings Logic ────────────────────────────────────
function loadSliderForEdit(index, sliderData) {
  const s = sliderData[index];
  if (!s) return;
  document.getElementById('sliderModalTitle').textContent = 'Edit Slide';
  document.getElementById('sliderFormIndex').value = index;
  document.getElementById('slTagline').value = s.tagline || '';
  document.getElementById('slTitle').value = s.title || '';
  document.getElementById('slImageUrl').value = s.image || '';
  
  const preview = document.getElementById('slImagePreview');
  if (preview) {
    if (s.image) {
      preview.style.backgroundImage = `url('${s.image}')`;
      preview.innerHTML = '';
    } else {
      preview.style.backgroundImage = 'none';
      preview.innerHTML = '<span style="color:var(--gray);">No image selected</span>';
    }
  }
  
  openModal('sliderModal');
}

async function saveSlider(e) {
  e.preventDefault();
  if (!supabase) return showToast('Supabase not configured', 'error');

  const btn = document.getElementById('sliderSubmitBtn');
  btn.textContent = 'Saving...';
  btn.disabled = true;

  try {
    const { data: current } = await supabase.from('site_settings').select('value').eq('key', 'home_slider').single();
    const slides = current?.value || [];

    const index = parseInt(document.getElementById('sliderFormIndex').value);
    const file = document.getElementById('slImageFile').files[0];
    let imageUrl = document.getElementById('slImageUrl').value.trim();

    if (file) {
      const fName = `slides/${Date.now()}_${file.name}`;
      const { data: uploadData, error: uploadErr } = await supabase.storage.from('slider-images').upload(fName, file);
      if (uploadErr) throw uploadErr;
      const { data: pubData } = await supabase.storage.from('slider-images').getPublicUrl(uploadData.path);
      imageUrl = pubData.publicUrl;
    }

    const entry = {
      tagline: document.getElementById('slTagline').value.trim(),
      title: document.getElementById('slTitle').value.trim(),
      image: imageUrl
    };

    if (index >= 0) {
      slides[index] = entry;
    } else {
      slides.push(entry);
    }

    const { error } = await supabase.from('site_settings').upsert({ key: 'home_slider', value: slides });
    if (error) throw error;

    showToast(index >= 0 ? 'Slide updated!' : 'Slide added!');
    closeModal('sliderModal');
    renderSettingsPanel();
  } catch (err) {
    showToast('Error: ' + err.message, 'error');
  } finally {
    btn.textContent = 'Save Slide';
    btn.disabled = false;
  }
}

async function deleteSlider(index, slides) {
  if (!confirm('Delete this slide?')) return;
  slides.splice(index, 1);
  const { error } = await supabase.from('site_settings').upsert({ key: 'home_slider', value: slides });
  if (error) return showToast('Error: ' + error.message, 'error');
  showToast('Slide deleted.', 'info');
  renderSettingsPanel();
}


// ─── Finances Panel ──────────────────────────────────────────
async function renderFinancesPanel() {
  const panel = document.getElementById('panelContent');
  panel.innerHTML = `<div class="panel-loading">Loading payroll data...</div>`;

  let playerRows = '';
  let historyRows = '';
  let players = [];
  if (supabase) {
    const { data: playersData } = await supabase.from('profiles').select('id, full_name, role, player_stats(salary_amount)').eq('role', 'player').order('full_name');
    if (playersData) players = playersData;
    
    if (players && players.length > 0) {
      playerRows = players.map(p => {
        const stats = Array.isArray(p.player_stats) ? p.player_stats[0] : p.player_stats;
        const salary = stats?.salary_amount || 0;
        return `
          <tr>
            <td><strong>${p.full_name || 'Unnamed Player'}</strong></td>
            <td>₦${Number(salary).toLocaleString()}</td>
            <td class="table-actions">
              <button class="btn btn-sm btn-outline process-pay-btn" data-id="${p.id}" data-name="${p.full_name}" data-salary="${salary}">Process Pay</button>
            </td>
          </tr>`;
      }).join('');
    } else {
      playerRows = `<tr><td colspan="3" class="table-empty">No players found.</td></tr>`;
    }

    const { data: history } = await supabase.from('salary_history').select('*, profiles(full_name)').order('created_at', { ascending: false }).limit(10);
    
    if (history && history.length > 0) {
      historyRows = history.map(h => {
        const pName = h.profiles?.full_name || 'Unknown';
        const stClass = h.status === 'paid' ? 'badge--green' : 'badge--orange';
        return `
          <tr>
            <td>${pName}</td>
            <td>${h.month_year}</td>
            <td>₦${Number(h.net_pay || 0).toLocaleString()}</td>
            <td><span class="badge ${stClass}">${h.status}</span></td>
            <td>${h.payment_date ? new Date(h.payment_date).toLocaleDateString() : '--'}</td>
          </tr>`;
      }).join('');
    } else {
      historyRows = `<tr><td colspan="5" class="table-empty">No salary records found yet.</td></tr>`;
    }
  }

  panel.innerHTML = `
    <div class="panel-toolbar">
      <h3>Finances & Payroll</h3>
      <div class="search-box" style="display:flex; gap:8px; align-items:center;">
        <input type="text" id="financeSearch" placeholder="Search player by name..." class="form-input" style="max-width:300px; margin-bottom:0;" />
        <button class="btn btn-primary" id="processAllPayBtn" style="white-space:nowrap;">Process All Pay</button>
      </div>
    </div>
    <div class="dash-card" style="margin-bottom:24px;">
      <h4 style="margin-bottom:12px;">Active Payroll</h4>
      <div class="player-list-table">
        <table>
          <thead><tr><th>Player Name</th><th>Base Monthly Salary</th><th>Action</th></tr></thead>
          <tbody id="financePlayerRows">${playerRows}</tbody>
        </table>
      </div>
    </div>
    <div class="dash-card">
      <h4 style="margin-bottom:12px;">Recent Transactions</h4>
      <div class="player-list-table">
        <table>
          <thead><tr><th>Player</th><th>Month</th><th>Net Pay</th><th>Status</th><th>Paid On</th></tr></thead>
          <tbody>${historyRows}</tbody>
        </table>
      </div>
    </div>`;

  const finSearch = document.getElementById('financeSearch');
  finSearch.addEventListener('input', () => {
    const term = finSearch.value.toLowerCase();
    const rows = players.filter(p => (p.full_name || '').toLowerCase().includes(term));
    document.getElementById('financePlayerRows').innerHTML = rows.length > 0
      ? rows.map(p => {
          const stats = Array.isArray(p.player_stats) ? p.player_stats[0] : p.player_stats;
          const salary = stats?.salary_amount || 0;
          return `
            <tr>
              <td><strong>${p.full_name || 'Unnamed Player'}</strong></td>
              <td>₦${Number(salary).toLocaleString()}</td>
              <td class="table-actions">
                <button class="btn btn-sm btn-outline process-pay-btn" data-id="${p.id}" data-name="${p.full_name}" data-salary="${salary}">Process Pay</button>
              </td>
            </tr>`;
        }).join('')
      : `<tr><td colspan="3" class="table-empty">No matching players found.</td></tr>`;
    
    // Re-attach listeners to new buttons
    attachFinanceListeners();
  });

  const attachFinanceListeners = () => {
    document.querySelectorAll('.process-pay-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.getElementById('financeForm').reset();
        document.getElementById('fncPlayerId').value = btn.dataset.id;
        document.getElementById('fncPlayerName').value = btn.dataset.name;
        document.getElementById('fncBaseSalary').value = btn.dataset.salary;
        document.getElementById('fncMonth').value = new Date().toISOString().slice(0, 7);
        
        const calcNetPay = () => {
          const base = parseFloat(document.getElementById('fncBaseSalary').value) || 0;
          const bonus = parseFloat(document.getElementById('fncBonus').value) || 0;
          const ded = parseFloat(document.getElementById('fncDeduction').value) || 0;
          document.getElementById('fncNetPay').value = base + bonus - ded;
        };
        calcNetPay();
        openModal('financeModal');
      });
    });
  };

  attachFinanceListeners();

  document.getElementById('processAllPayBtn')?.addEventListener('click', () => {
    document.getElementById('financeBulkForm').reset();
    document.getElementById('fncBulkCount').textContent = players.length;
    document.getElementById('fncBulkMonth').value = new Date().toISOString().slice(0, 7);
    openModal('financeBulkModal');
  });
}

async function saveFinancePayment(e) {
  e.preventDefault();
  if (!supabase) return showToast('Supabase not configured', 'error');

  const btn = document.getElementById('financeSubmitBtn');
  btn.textContent = 'Saving...';
  btn.disabled = true;

  const payload = {
    player_id: document.getElementById('fncPlayerId').value,
    month_year: document.getElementById('fncMonth').value,
    base_salary: parseFloat(document.getElementById('fncBaseSalary').value) || 0,
    bonus: parseFloat(document.getElementById('fncBonus').value) || 0,
    deduction: parseFloat(document.getElementById('fncDeduction').value) || 0,
    status: document.getElementById('fncStatus').value,
    payment_date: document.getElementById('fncPaymentDate').value || null,
    notes: document.getElementById('fncNotes').value
  };

  try {
    const { error } = await supabase.from('salary_history').insert(payload);
    if (error) throw error;
    showToast('Salary record saved!');
    closeModal('financeModal');
    renderFinancesPanel();
  } catch (err) {
    showToast('Error: ' + err.message, 'error');
  } finally {
    btn.textContent = 'Save Record';
    btn.disabled = false;
  }
}

async function saveFinanceBulkPayment(e) {
  e.preventDefault();
  if (!supabase) return showToast('Supabase not configured', 'error');

  const btn = document.getElementById('financeBulkSubmitBtn');
  btn.textContent = 'Processing...';
  btn.disabled = true;

  try {
    const { data: players } = await supabase.from('profiles').select('id, player_stats(salary_amount)').eq('role', 'player');
    if (!players || players.length === 0) throw new Error('No players found to process.');

    const month = document.getElementById('fncBulkMonth').value;
    const status = document.getElementById('fncBulkStatus').value;
    const bonus = parseFloat(document.getElementById('fncBulkBonus').value) || 0;
    const deduction = parseFloat(document.getElementById('fncBulkDeduction').value) || 0;
    const paymentDate = document.getElementById('fncBulkPaymentDate').value || null;
    const notes = document.getElementById('fncBulkNotes').value;

    const payloads = players.map(p => {
      const stats = Array.isArray(p.player_stats) ? p.player_stats[0] : p.player_stats;
      const baseSalary = stats?.salary_amount || 0;
      return {
        player_id: p.id,
        month_year: month,
        base_salary: baseSalary,
        bonus: bonus,
        deduction: deduction,
        status: status,
        payment_date: paymentDate,
        notes: notes
      };
    });

    const { error } = await supabase.from('salary_history').insert(payloads);
    if (error) throw error;
    
    showToast(`Successfully processed salary for ${payloads.length} players!`);
    closeModal('financeBulkModal');
    renderFinancesPanel();
  } catch (err) {
    showToast('Error: ' + err.message, 'error');
  } finally {
    btn.textContent = 'Process All';
    btn.disabled = false;
  }
}

// ─── Performance Panel ──────────────────────────────────────────
async function renderPerformancePanel() {
  const panel = document.getElementById('panelContent');
  panel.innerHTML = `<div class="panel-loading">Loading performance data...</div>`;

  let playerRows = '';
  let logsRows = '';
  let players = [];
  if (supabase) {
    const { data: playersData } = await supabase.from('profiles').select('id, full_name, role').eq('role', 'player').order('full_name');
    if (playersData) players = playersData;
    if (players && players.length > 0) {
      playerRows = players.map(p => `
        <tr>
          <td><strong>${p.full_name || 'Unnamed Player'}</strong></td>
          <td class="table-actions">
            <button class="btn btn-sm btn-outline log-perf-btn" data-id="${p.id}" data-name="${p.full_name}">Log Match Performance</button>
          </td>
        </tr>`).join('');
    } else {
      playerRows = `<tr><td colspan="2" class="table-empty">No players found.</td></tr>`;
    }

    const { data: logs } = await supabase.from('performance_logs').select('*, profiles(full_name)').order('match_date', { ascending: false }).limit(10);
    if (logs && logs.length > 0) {
      logsRows = logs.map(l => `
        <tr>
          <td>${l.profiles?.full_name || 'Unknown'}</td>
          <td>${l.match_date}</td>
          <td>${l.opponent || '--'}</td>
          <td>${l.goals || 0}G / ${l.assists || 0}A</td>
          <td><span class="badge badge--green">${l.rating || '--'}</span></td>
        </tr>`).join('');
    } else {
      logsRows = `<tr><td colspan="5" class="table-empty">No performance logs found yet.</td></tr>`;
    }
  }

  panel.innerHTML = `
    <div class="panel-toolbar">
      <h3>Performance Tracking</h3>
      <div class="search-box">
        <input type="text" id="perfSearch" placeholder="Search player by name..." class="form-input" style="max-width:300px; margin-bottom:0;" />
      </div>
    </div>
    <div class="dash-card" style="margin-bottom:24px;">
      <h4 style="margin-bottom:12px;">Process Performance</h4>
      <div class="player-list-table">
        <table>
          <thead><tr><th>Player Name</th><th>Action</th></tr></thead>
          <tbody id="perfPlayerRows">${playerRows}</tbody>
        </table>
      </div>
    </div>
    <div class="dash-card">
      <h4 style="margin-bottom:12px;">Recent Match Logs</h4>
      <div class="player-list-table">
        <table>
          <thead><tr><th>Player</th><th>Date</th><th>Opponent</th><th>Stats</th><th>Rating</th></tr></thead>
          <tbody>${logsRows}</tbody>
        </table>
      </div>
    </div>`;

  const perfSearch = document.getElementById('perfSearch');
  perfSearch.addEventListener('input', () => {
    const term = perfSearch.value.toLowerCase();
    const filtered = players.filter(p => (p.full_name || '').toLowerCase().includes(term));
    document.getElementById('perfPlayerRows').innerHTML = filtered.length > 0
      ? filtered.map(p => `
          <tr>
            <td><strong>${p.full_name || 'Unnamed Player'}</strong></td>
            <td class="table-actions">
              <button class="btn btn-sm btn-outline log-perf-btn" data-id="${p.id}" data-name="${p.full_name}">Log Match Performance</button>
            </td>
          </tr>`).join('')
      : `<tr><td colspan="2" class="table-empty">No matching players found.</td></tr>`;
    
    attachPerfListeners();
  });

  const attachPerfListeners = () => {
    document.querySelectorAll('.log-perf-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.getElementById('performanceForm').reset();
        document.getElementById('perfPlayerId').value = btn.dataset.id;
        document.getElementById('perfPlayerName').value = btn.dataset.name;
        document.getElementById('perfDate').value = new Date().toISOString().split('T')[0];
        openModal('performanceModal');
      });
    });
  };

  attachPerfListeners();
}

async function savePerformanceLog(e) {
  e.preventDefault();
  if (!supabase) return showToast('Supabase not configured', 'error');

  const btn = document.getElementById('perfSubmitBtn');
  btn.textContent = 'Saving...';
  btn.disabled = true;

  const payload = {
    player_id: document.getElementById('perfPlayerId').value,
    match_date: document.getElementById('perfDate').value,
    opponent: document.getElementById('perfOpponent').value,
    minutes_played: parseInt(document.getElementById('perfMinutes').value) || 0,
    goals: parseInt(document.getElementById('perfGoals').value) || 0,
    assists: parseInt(document.getElementById('perfAssists').value) || 0,
    rating: parseFloat(document.getElementById('perfRating').value) || 0,
    notes: document.getElementById('perfNotes').value
  };

  try {
    const { error } = await supabase.from('performance_logs').insert(payload);
    if (error) throw error;
    showToast('Performance log saved!');
    closeModal('performanceModal');
    renderPerformancePanel();
  } catch (err) {
    showToast('Error: ' + err.message, 'error');
  } finally {
    btn.textContent = 'Save Logs';
    btn.disabled = false;
  }
}

// ─── Medical Panel ──────────────────────────────────────────
async function renderMedicalPanel() {
  const panel = document.getElementById('panelContent');
  panel.innerHTML = `<div class="panel-loading">Loading medical data...</div>`;

  let playerRows = '';
  let logsRows = '';
  let players = [];
  if (supabase) {
    const { data: playersData } = await supabase.from('profiles').select('id, full_name, role').eq('role', 'player').order('full_name');
    if (playersData) players = playersData;
    if (players && players.length > 0) {
      playerRows = players.map(p => `
        <tr>
          <td><strong>${p.full_name || 'Unnamed Player'}</strong></td>
          <td class="table-actions">
            <button class="btn btn-sm btn-outline log-med-btn" data-id="${p.id}" data-name="${p.full_name}">Log Medical Update</button>
          </td>
        </tr>`).join('');
    } else {
      playerRows = `<tr><td colspan="2" class="table-empty">No players found.</td></tr>`;
    }

    const { data: logs } = await supabase.from('medical_logs').select('*, profiles(full_name)').order('log_date', { ascending: false }).limit(10);
    if (logs && logs.length > 0) {
      logsRows = logs.map(l => {
        const stClass = l.status === 'fit' ? 'badge--green' : (l.status === 'injured' ? 'badge--orange' : 'badge--blue');
        return `
          <tr>
            <td>${l.profiles?.full_name || 'Unknown'}</td>
            <td>${l.log_date}</td>
            <td>${l.type.toUpperCase()}</td>
            <td><span class="badge ${stClass}">${l.status.toUpperCase()}</span></td>
            <td>${l.expected_return || '--'}</td>
          </tr>`;
      }).join('');
    } else {
      logsRows = `<tr><td colspan="5" class="table-empty">No medical records found yet.</td></tr>`;
    }
  }

  panel.innerHTML = `
    <div class="panel-toolbar">
      <h3>Medical & Health Logs</h3>
      <div class="search-box">
        <input type="text" id="medSearch" placeholder="Search player by name..." class="form-input" style="max-width:300px; margin-bottom:0;" />
      </div>
    </div>
    <div class="dash-card" style="margin-bottom:24px;">
      <h4 style="margin-bottom:12px;">Log Health Update</h4>
      <div class="player-list-table">
        <table>
          <thead><tr><th>Player Name</th><th>Action</th></tr></thead>
          <tbody id="medPlayerRows">${playerRows}</tbody>
        </table>
      </div>
    </div>
    <div class="dash-card">
      <h4 style="margin-bottom:12px;">Recent Medical History</h4>
      <div class="player-list-table">
        <table>
          <thead><tr><th>Player</th><th>Date</th><th>Type</th><th>Status</th><th>Return Date</th></tr></thead>
          <tbody>${logsRows}</tbody>
        </table>
      </div>
    </div>`;

  const medSearch = document.getElementById('medSearch');
  medSearch.addEventListener('input', () => {
    const term = medSearch.value.toLowerCase();
    const filtered = players.filter(p => (p.full_name || '').toLowerCase().includes(term));
    document.getElementById('medPlayerRows').innerHTML = filtered.length > 0
      ? filtered.map(p => `
          <tr>
            <td><strong>${p.full_name || 'Unnamed Player'}</strong></td>
            <td class="table-actions">
              <button class="btn btn-sm btn-outline log-med-btn" data-id="${p.id}" data-name="${p.full_name}">Log Medical Update</button>
            </td>
          </tr>`).join('')
      : `<tr><td colspan="2" class="table-empty">No matching players found.</td></tr>`;
    
    attachMedListeners();
  });

  const attachMedListeners = () => {
    document.querySelectorAll('.log-med-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.getElementById('medicalForm').reset();
        document.getElementById('medPlayerId').value = btn.dataset.id;
        document.getElementById('medPlayerName').value = btn.dataset.name;
        document.getElementById('medDate').value = new Date().toISOString().split('T')[0];
        openModal('medicalModal');
      });
    });
  };

  attachMedListeners();
}

async function saveMedicalLog(e) {
  e.preventDefault();
  if (!supabase) return showToast('Supabase not configured', 'error');

  const btn = document.getElementById('medSubmitBtn');
  btn.textContent = 'Saving...';
  btn.disabled = true;

  const payload = {
    player_id: document.getElementById('medPlayerId').value,
    log_date: document.getElementById('medDate').value,
    type: document.getElementById('medType').value,
    status: document.getElementById('medStatus').value,
    description: document.getElementById('medDesc').value,
    expected_return: document.getElementById('medReturn').value || null
  };

  try {
    const { error } = await supabase.from('medical_logs').insert(payload);
    if (error) throw error;
    
    // Also update health_status in player_stats table automatically
    await supabase.from('player_stats').update({ health_status: payload.status }).eq('player_id', payload.player_id);

    showToast('Medical log and health status saved!');
    closeModal('medicalModal');
    renderMedicalPanel();
  } catch (err) {
    showToast('Error: ' + err.message, 'error');
  } finally {
    btn.textContent = 'Save Update';
    btn.disabled = false;
  }
}

// ─── Standings Panel ──────────────────────────────────────────
async function renderStandingsPanel() {
  const panel = document.getElementById('panelContent');
  panel.innerHTML = `<div class="panel-loading">Loading standings...</div>`;

  let rows = '';
  if (supabase) {
    const { data: standings, error } = await supabase
      .from('league_standings')
      .select('*')
      .order('points', { ascending: false })
      .order('goals_for', { ascending: false });

    if (error) {
      rows = `<tr><td colspan="8" class="table-empty">Error: ${error.message}</td></tr>`;
    } else if (!standings || standings.length === 0) {
      rows = `<tr><td colspan="8" class="table-empty">No standings entries. Add the first team!</td></tr>`;
    } else {
      rows = standings.map((s, idx) => {
        const gd = (s.goals_for || 0) - (s.goals_against || 0);
        const gdStr = gd > 0 ? `+${gd}` : gd;
        return `
          <tr class="${s.is_highlighted ? 'highlight-row' : ''}">
            <td><strong>${idx + 1}</strong></td>
            <td>
              <div class="team-cell">
                <div class="team-badge">${s.club_badge?.startsWith('http') ? `<img src="${s.club_badge}" style="width:20px;height:20px;object-fit:contain;"/>` : (s.club_badge || '⚽')}</div>
                <strong>${s.club_name}</strong>
              </div>
            </td>
            <td>${s.played}</td>
            <td>${s.won}/${s.drawn}/${s.lost}</td>
            <td>${gdStr}</td>
            <td><strong>${s.points}</strong></td>
            <td class="table-actions">
              <button class="btn btn-icon edit-standing-btn" data-id="${s.id}" title="Edit">✏️</button>
              <button class="btn btn-icon delete-standing-btn" data-id="${s.id}" title="Delete">🗑️</button>
            </td>
          </tr>`;
      }).join('');
    }
  }

  panel.innerHTML = `
    <div class="panel-toolbar">
      <div class="toolbar-left">
        <h3>League Table Management</h3>
        <p class="text-gray" style="font-size:0.85rem;">Manage teams and their current league stats.</p>
      </div>
      <button class="btn btn-primary" id="addStandingBtn">+ Add Team</button>
    </div>
    <div class="dash-card">
      <div class="player-list-table">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Club</th>
              <th>P</th>
              <th>W/D/L</th>
              <th>GD</th>
              <th>Pts</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>
  `;

  document.getElementById('addStandingBtn')?.addEventListener('click', () => {
    document.getElementById('standingForm').reset();
    document.getElementById('sId').value = '';
    document.getElementById('standingModalTitle').textContent = 'Add Team to Standings';
    openModal('standingModal');
  });

  document.querySelectorAll('.edit-standing-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;
      const { data: s } = await supabase.from('league_standings').select('*').eq('id', id).single();
      if (s) {
        document.getElementById('sId').value = s.id;
        document.getElementById('sClubName').value = s.club_name;
        document.getElementById('sBadge').value = s.club_badge || '';
        document.getElementById('sPlayed').value = s.played;
        document.getElementById('sWon').value = s.won;
        document.getElementById('sDrawn').value = s.drawn;
        document.getElementById('sLost').value = s.lost;
        document.getElementById('sGF').value = s.goals_for;
        document.getElementById('sGA').value = s.goals_against;
        document.getElementById('sPoints').value = s.points;
        document.getElementById('sForm').value = (s.form || []).join(',');
        document.getElementById('sHighlighted').checked = !!s.is_highlighted;
        document.getElementById('standingModalTitle').textContent = 'Edit League Standing';
        openModal('standingModal');
      }
    });
  });

  document.querySelectorAll('.delete-standing-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!confirm('Remove this team from the standings?')) return;
      const { error } = await supabase.from('league_standings').delete().eq('id', btn.dataset.id);
      if (error) showToast(error.message, 'error');
      else { showToast('Removed from standings.'); renderStandingsPanel(); }
    });
  });
}

async function saveStanding(e) {
  e.preventDefault();
  if (!supabase) return;

  const btn = document.getElementById('standingSubmitBtn');
  const id = document.getElementById('sId').value;
  btn.textContent = 'Saving...';
  btn.disabled = true;

  const formVal = document.getElementById('sForm').value;
  const formArray = formVal ? formVal.split(',').map(s => s.trim().toUpperCase()).filter(s => ['W','D','L'].includes(s)) : [];

  const payload = {
    club_name: document.getElementById('sClubName').value,
    club_badge: document.getElementById('sBadge').value,
    played: parseInt(document.getElementById('sPlayed').value) || 0,
    won: parseInt(document.getElementById('sWon').value) || 0,
    drawn: parseInt(document.getElementById('sDrawn').value) || 0,
    lost: parseInt(document.getElementById('sLost').value) || 0,
    goals_for: parseInt(document.getElementById('sGF').value) || 0,
    goals_against: parseInt(document.getElementById('sGA').value) || 0,
    points: parseInt(document.getElementById('sPoints').value) || 0,
    form: formArray,
    is_highlighted: document.getElementById('sHighlighted').checked
  };

  try {
    let err;
    if (id) {
      const { error } = await supabase.from('league_standings').update(payload).eq('id', id);
      err = error;
    } else {
      const { error } = await supabase.from('league_standings').insert(payload);
      err = error;
    }

    if (err) throw err;
    showToast('Standing saved!');
    closeModal('standingModal');
    renderStandingsPanel();
  } catch (err) {
    showToast('Error: ' + err.message, 'error');
  } finally {
    btn.textContent = 'Save Standing';
    btn.disabled = false;
  }
}

// ─── Messages Panel ──────────────────────────────────────────
async function renderMessagesPanel() {
  const panel = document.getElementById('panelContent');
  panel.innerHTML = `<div class="panel-loading">Loading messages...</div>`;

  let rows = '';
  if (supabase) {
    const { data: messages, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      rows = `<tr><td colspan="5" class="table-empty">Error: ${error.message}</td></tr>`;
    } else if (!messages || messages.length === 0) {
      rows = `<tr><td colspan="5" class="table-empty">No messages received yet.</td></tr>`;
    } else {
      rows = messages.map(m => {
        const date = new Date(m.created_at).toLocaleString();
        const unreadClass = !m.is_read ? 'style="font-weight:bold; background: rgba(204,0,0,0.05);"' : '';
        const statusBadge = m.is_read ? '<span class="badge badge--grey">Read</span>' : '<span class="badge badge--red">New</span>';
        
        return `
          <tr ${unreadClass}>
            <td>
              <div style="font-size:0.85rem; color:var(--gray);">${date}</div>
              <div style="margin-top:4px;">${statusBadge}</div>
            </td>
            <td>
              <div style="font-weight:600; color:var(--white);">${m.name}</div>
              <div style="font-size:0.8rem; color:var(--gray);">${m.email}</div>
            </td>
            <td><div style="font-weight:600; color:var(--red-light);">${m.subject}</div></td>
            <td style="max-width:300px;"><div style="font-size:0.9rem; line-height:1.4; color:var(--light-gray);">${m.message}</div></td>
            <td class="table-actions">
              ${!m.is_read ? `<button class="btn btn-icon mark-read-btn" data-id="${m.id}" title="Mark as Read">👁️</button>` : ''}
              <button class="btn btn-icon delete-message-btn" data-id="${m.id}" title="Delete">🗑️</button>
            </td>
          </tr>`;
      }).join('');
    }
  }

  panel.innerHTML = `
    <div class="panel-toolbar">
      <div class="toolbar-left">
        <h3>Contact Form Messages</h3>
        <p class="text-gray" style="font-size:0.85rem;">Inquiries submitted via the website contact form.</p>
      </div>
    </div>
    <div class="dash-card">
      <div class="player-list-table">
        <table>
          <thead>
            <tr>
              <th style="width:150px;">Date</th>
              <th style="width:180px;">From</th>
              <th style="width:150px;">Subject</th>
              <th>Message</th>
              <th style="width:120px;">Actions</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>
  `;

  document.querySelectorAll('.mark-read-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const { error } = await supabase.from('contact_messages').update({ is_read: true }).eq('id', btn.dataset.id);
      if (error) showToast(error.message, 'error');
      else renderMessagesPanel();
    });
  });

  document.querySelectorAll('.delete-message-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!confirm('Permanently delete this message?')) return;
      const { error } = await supabase.from('contact_messages').delete().eq('id', btn.dataset.id);
      if (error) showToast(error.message, 'error');
      else { showToast('Message deleted.'); renderMessagesPanel(); }
    });
  });
}

// ─── Gallery Panel ──────────────────────────────────────────
async function renderGalleryPanel() {
  const panel = document.getElementById('panelContent');
  panel.innerHTML = `<div class="panel-loading">Loading gallery...</div>`;

  let rows = '';
  if (supabase) {
    const { data: photos, error } = await supabase
      .from('gallery_photos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      rows = `<tr><td colspan="4" class="table-empty">Error: ${error.message}</td></tr>`;
    } else if (!photos || photos.length === 0) {
      rows = `<tr><td colspan="4" class="table-empty">No photos in the gallery yet.</td></tr>`;
    } else {
      rows = photos.map(p => `
        <tr>
          <td><img src="${p.image_url}" style="width:60px; height:60px; object-fit:cover; border-radius:4px;" /></td>
          <td><span class="badge">${p.category}</span></td>
          <td>${p.caption || '<span class="text-gray">No caption</span>'}</td>
          <td class="table-actions">
            <button class="btn btn-icon delete-photo-btn" data-id="${p.id}" title="Delete">🗑️</button>
          </td>
        </tr>`).join('');
    }
  }

  panel.innerHTML = `
    <div class="panel-toolbar">
      <div class="toolbar-left">
        <h3>Photo Gallery Management</h3>
        <p class="text-gray" style="font-size:0.85rem;">Upload and manage photos for the public gallery.</p>
      </div>
      <button class="btn btn-primary" id="addPhotoBtn">+ Add Photo</button>
    </div>
    <div class="dash-card">
      <div class="player-list-table">
        <table>
          <thead>
            <tr>
              <th style="width:80px;">Preview</th>
              <th style="width:120px;">Category</th>
              <th>Caption</th>
              <th style="width:80px;">Actions</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>
  `;

  document.getElementById('addPhotoBtn')?.addEventListener('click', () => {
    document.getElementById('galleryForm').reset();
    document.getElementById('galleryFormId').value = '';
    document.getElementById('galleryModalTitle').textContent = 'Add Gallery Photo';
    openModal('galleryModal');
  });

  document.querySelectorAll('.delete-photo-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!confirm('Permanently delete this photo?')) return;
      const { error } = await supabase.from('gallery_photos').delete().eq('id', btn.dataset.id);
      if (error) showToast(error.message, 'error');
      else { showToast('Photo deleted.'); renderGalleryPanel(); }
    });
  });
}

async function saveGalleryPhoto(e) {
  e.preventDefault();
  if (!supabase) return;
  const btn = document.getElementById('gallerySubmitBtn');
  btn.textContent = 'Saving...';
  btn.disabled = true;

  try {
    let finalImageUrl = document.getElementById('gImageUrl').value.trim();
    const fileInput = document.getElementById('gImageFile');
    
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const { data: uploadData, error: uploadErr } = await supabase.storage.from('gallery-images').upload(fileName, file);
      if (uploadErr) throw uploadErr;
      
      const { data: pubData } = supabase.storage.from('gallery-images').getPublicUrl(uploadData.path);
      finalImageUrl = pubData.publicUrl;
    }

    if (!finalImageUrl) {
      throw new Error('Please upload an image or provide an image URL.');
    }

    const payload = {
      image_url: finalImageUrl,
      category: document.getElementById('gCategory').value,
      caption: document.getElementById('gCaption').value
    };

    const { error } = await supabase.from('gallery_photos').insert(payload);
    if (error) throw error;
    showToast('Photo added to gallery!');
    closeModal('galleryModal');
    renderGalleryPanel();
  } catch (err) {
    showToast('Error: ' + err.message, 'error');
  } finally {
    btn.textContent = 'Save Photo';
    btn.disabled = false;
  }
}

// ─── Init ────────────────────────────────────────────────────
const panelRenderers = {
  overview: renderOverviewPanel,
  players: renderPlayersPanel,
  news: renderNewsPanel,
  fixtures: renderFixturesPanel,
  finances: renderFinancesPanel,
  performance: renderPerformancePanel,
  medical: renderMedicalPanel,
  standings: renderStandingsPanel,
  messages: renderMessagesPanel,
  gallery: renderGalleryPanel,
  users: renderUsersPanel,
  settings: renderSettingsPanel,
};
const panelTitles = {
  overview: 'Overview',
  players: 'Manage Players',
  news: 'News Manager',
  fixtures: 'Fixtures & Results',
  finances: 'Finances & Payroll',
  performance: 'Performance Tracking',
  medical: 'Medical Logs',
  standings: 'League Standings',
  messages: 'Contact Messages',
  gallery: 'Photo Gallery',
  users: 'Manage Users',
  settings: 'Global Settings',
};

async function sendTestEmail(e) {
  e.preventDefault();
  if (!supabase) return showToast('Supabase not configured', 'error');

  const btn = document.getElementById('sendTestEmailBtn');
  const recipient = document.getElementById('testEmailRecipient').value;
  
  btn.textContent = 'Sending...';
  btn.disabled = true;

  try {
    const { data: invokeData, error: invokeError } = await supabase.functions.invoke('send-email', {
      body: { 
        to: recipient, 
        subject: 'NewHope Naija FC - Test Email',
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #1a1a1a;">
            <h2 style="color: #003366;">NewHope Naija FC</h2>
            <p>This is a test email to verify your <strong>Resend</strong> integration.</p>
            <p>If you received this, your setup is working correctly! ⚽</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 0.8rem; color: #666;">Official Admin Console - NewHope Naija FC</p>
          </div>
        `
      }
    });

    if (invokeError) throw invokeError;
    if (invokeData?.error) throw new Error(invokeData.error);

    showToast('Test email sent successfully! Check your inbox.');
    document.getElementById('testEmailForm').reset();
  } catch (err) {
    console.error('Email Test Error:', err);
    showToast('Error: ' + err.message, 'error');
  } finally {
    btn.textContent = 'Send Test Email';
    btn.disabled = false;
  }
}

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
  document.getElementById('highlightForm')?.addEventListener('submit', saveHighlight);
  document.getElementById('financeForm')?.addEventListener('submit', saveFinancePayment);
  document.getElementById('financeBulkForm')?.addEventListener('submit', saveFinanceBulkPayment);
  document.getElementById('performanceForm')?.addEventListener('submit', savePerformanceLog);
  document.getElementById('medicalForm')?.addEventListener('submit', saveMedicalLog);
  document.getElementById('standingForm')?.addEventListener('submit', saveStanding);
  document.getElementById('galleryForm')?.addEventListener('submit', saveGalleryPhoto);

  // Auto calc net pay
  document.querySelectorAll('.calc-net').forEach(input => {
    input.addEventListener('input', () => {
      const base = parseFloat(document.getElementById('fncBaseSalary').value) || 0;
      const bonus = parseFloat(document.getElementById('fncBonus').value) || 0;
      const ded = parseFloat(document.getElementById('fncDeduction').value) || 0;
      document.getElementById('fncNetPay').value = base + bonus - ded;
    });
  });

  // Image Previews for File Inputs
  const setupImagePreview = (inputId, previewId, imgStyles, emptyText) => {
    document.getElementById(inputId)?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      const preview = document.getElementById(previewId);
      if (file && preview) {
        const reader = new FileReader();
        reader.onload = (re) => {
          preview.innerHTML = `<img src="${re.target.result}" style="${imgStyles}" />`;
        };
        reader.readAsDataURL(file);
      } else if (!file && preview) {
        preview.innerHTML = emptyText;
      }
    });
  };

  setupImagePreview('pPassportPhoto', 'pPassportPreview', 'width:100px; height:auto; border-radius:4px; object-fit:cover;', 'No passport');
  setupImagePreview('pProfilePhoto', 'pProfilePreview', 'width:100px; height:auto; border-radius:4px; object-fit:cover;', 'No profile photo');
  setupImagePreview('adminEditAvatarFile', 'adminEditAvatarPreview', 'width:100%; height:100%; object-fit:contain;', 'No image selected');
  setupImagePreview('nImageFile', 'nImagePreview', 'width:100%; height:100%; object-fit:contain;', '<span style="color:var(--gray);">No image selected</span>');

  // ── Logo Selector Library Logic ──
  let activeLogoTarget = null;
  const logoModal = document.getElementById('logoSelectorModal');

  document.querySelectorAll('.select-logo-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      activeLogoTarget = e.currentTarget.dataset.target;
      openModal('logoSelectorModal');
      loadLogosGallery();
    });
  });

  async function loadLogosGallery() {
    const grid = document.getElementById('logoGalleryGrid');
    if (!supabase || !grid) return;
    grid.innerHTML = '<div style="text-align:center; padding:40px; color:var(--gray); grid-column: 1/-1;">Loading library...</div>';
    
    const { data, error } = await supabase.storage.from('club-logos').list('', { sortBy: { column: 'created_at', order: 'desc' } });
    if (error) {
      grid.innerHTML = `<div style="text-align:center; padding:20px; color:#ff5555; grid-column: 1/-1;">Error: ${error.message}</div>`;
      return;
    }
    
    if (!data || data.length === 0) {
      grid.innerHTML = '<div style="text-align:center; padding:40px; color:var(--gray); grid-column: 1/-1;">No logos found. Upload your first club logo!</div>';
      return;
    }

    const validFiles = data.filter(f => !f.name.startsWith('.'));
    
    let html = '';
    for (const file of validFiles) {
      const { data: pubData } = supabase.storage.from('club-logos').getPublicUrl(file.name);
      html += `
        <div class="logo-gallery-item" style="border: 2px solid transparent; border-radius: 8px; overflow: hidden; cursor: pointer; transition: all 0.2s; background: rgba(255,255,255,0.03); padding: 10px;" 
             onclick="selectLogoUrl('${pubData.publicUrl}')" 
             onmouseover="this.style.borderColor='#cc0000'; this.style.transform='scale(1.05)';" 
             onmouseout="this.style.borderColor='transparent'; this.style.transform='none';">
          <img src="${pubData.publicUrl}" style="width: 100%; height: 80px; object-fit: contain;" title="${file.name}" />
        </div>
      `;
    }
    grid.innerHTML = html;
  }

  window.selectLogoUrl = function(url) {
    if (activeLogoTarget) {
      document.getElementById(activeLogoTarget).value = url;
    }
    closeModal('logoSelectorModal');
  };

  const uploadLogoInp = document.getElementById('newLogoUpload');
  const uploadLogoName = document.getElementById('newLogoName');
  const uploadLogoBtn = document.getElementById('uploadLogoBtn');
  const uploadLogoStatus = document.getElementById('logoUploadStatus');

  uploadLogoInp?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadLogoName.textContent = file.name;
      uploadLogoName.style.display = 'block';
      uploadLogoBtn.style.display = 'inline-block';
      uploadLogoStatus.textContent = '';
    }
  });

  uploadLogoBtn?.addEventListener('click', async () => {
    const file = uploadLogoInp.files[0];
    if (!file) return;
    
    if (file.size > 1048576) {
      uploadLogoStatus.style.color = '#ff5555';
      uploadLogoStatus.textContent = 'File too large (Max 1MB).';
      return;
    }

    uploadLogoBtn.textContent = 'Uploading...';
    uploadLogoBtn.disabled = true;

    const pName = `${Date.now()}_${file.name.replace(/\s+/g, '-')}`;
    const { error: err } = await supabase.storage.from('club-logos').upload(pName, file);
    
    uploadLogoBtn.textContent = 'Upload to Library';
    uploadLogoBtn.disabled = false;
    
    if (err) {
      uploadLogoStatus.style.color = '#ff5555';
      uploadLogoStatus.textContent = err.message;
    } else {
      uploadLogoStatus.style.color = '#00e676';
      uploadLogoStatus.textContent = 'Uploaded successfully!';
      uploadLogoInp.value = '';
      uploadLogoName.style.display = 'none';
      uploadLogoBtn.style.display = 'none';
      setTimeout(() => { uploadLogoStatus.textContent = ''; }, 3000);
      loadLogosGallery();
    }
  });

  // Logout
  document.getElementById('adminLogoutBtn')?.addEventListener('click', async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('nhfc_user_role');
    localStorage.removeItem('nhfc_user_id');
    showToast('Logged out successfully.');
    window.location.hash = '#login';
  });

  // Render default panel
  renderOverviewPanel();
}
