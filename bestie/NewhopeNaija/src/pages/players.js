export const title = 'Our Squad';

// Detailed player data including stats for the popup modal
const playersData = [
  // Goalkeepers
  { id: 'gk1', pos: 'gk', num: 1, name: 'IBRAHIM MUSA', fname: 'IBRAHIM', lname: 'MUSA', role: 'GK', country: '🇳🇬 Nigeria', foot: 'Right', height: '185 CM', weight: '78 KG', dob: '2001-05-12', photo: '/images/player-placeholder.jpg' },
  { id: 'gk2', pos: 'gk', num: 22, name: 'SAMUEL ABUBAKAR', fname: 'SAMUEL', lname: 'ABUBAKAR', role: 'GK', country: '🇳🇬 Nigeria', foot: 'Right', height: '188 CM', weight: '82 KG', dob: '1999-11-20', photo: '/images/player-placeholder.jpg' },
  // Defenders
  { id: 'def1', pos: 'def', num: 2, name: 'FELIX OKORO', fname: 'FELIX', lname: 'OKORO', role: 'RB', country: '🇳🇬 Nigeria', foot: 'Right', height: '176 CM', weight: '70 KG', dob: '2002-03-15', photo: '/images/player-placeholder.jpg' },
  { id: 'def2', pos: 'def', num: 3, name: 'BOLA ADELEKE', fname: 'BOLA', lname: 'ADELEKE', role: 'LB', country: '🇳🇬 Nigeria', foot: 'Left', height: '174 CM', weight: '68 KG', dob: '2003-08-05', photo: '/images/player-placeholder.jpg' },
  { id: 'def3', pos: 'def', num: 4, name: 'TAIWO ADEYEMI', fname: 'TAIWO', lname: 'ADEYEMI', role: 'CB', country: '🇳🇬 Nigeria', foot: 'Right', height: '186 CM', weight: '80 KG', dob: '1998-12-10', photo: '/images/player-placeholder.jpg' },
  { id: 'def4', pos: 'def', num: 5, name: 'CHUKWUMA EZE', fname: 'CHUKWUMA', lname: 'EZE', role: 'CB', country: '🇳🇬 Nigeria', foot: 'Right', height: '189 CM', weight: '85 KG', dob: '1997-04-22', photo: '/images/player-placeholder.jpg' },
  { id: 'def5', pos: 'def', num: 6, name: 'HARUNA USMAN', fname: 'HARUNA', lname: 'USMAN', role: 'DEF', country: '🇳🇬 Nigeria', foot: 'Right', height: '180 CM', weight: '75 KG', dob: '2000-09-30', photo: '/images/player-placeholder.jpg' },
  // Midfielders
  { id: 'mid1', pos: 'mid', num: 8, name: 'EMEKA OKAFOR', fname: 'EMEKA', lname: 'OKAFOR', role: 'MID', country: '🇳🇬 Nigeria', foot: 'Right', height: '178 CM', weight: '72 KG', dob: '2001-07-18', photo: '/images/player-placeholder.jpg' },
  { id: 'mid2', pos: 'mid', num: 10, name: 'SEGUN AFOLABI', fname: 'SEGUN', lname: 'AFOLABI', role: 'CAM', country: '🇳🇬 Nigeria', foot: 'Both', height: '172 CM', weight: '65 KG', dob: '2004-01-25', photo: '/images/player-placeholder.jpg' },
  { id: 'mid3', pos: 'mid', num: 14, name: 'TUNDE IBRAHIM', fname: 'TUNDE', lname: 'IBRAHIM', role: 'DM', country: '🇳🇬 Nigeria', foot: 'Right', height: '182 CM', weight: '77 KG', dob: '1999-06-08', photo: '/images/player-placeholder.jpg' },
  { id: 'mid4', pos: 'mid', num: 16, name: 'DELE NWACHUKWU', fname: 'DELE', lname: 'NWACHUKWU', role: 'MID', country: '🇳🇬 Nigeria', foot: 'Right', height: '175 CM', weight: '69 KG', dob: '2002-11-14', photo: '/images/player-placeholder.jpg' },
  { id: 'mid5', pos: 'mid', num: 26, name: 'AHMED ABUBAKAR', fname: 'AHMED', lname: 'ABUBAKAR', role: 'MID', country: '🇳🇬 Nigeria', foot: 'RIGHT', height: '175.3 CM', weight: '64.7 KG', dob: '2009-08-25', photo: '/images/player-placeholder.jpg' }, // The specific player from the reference image
  // Attackers
  { id: 'att1', pos: 'att', num: 7, name: 'AHMED LAWAL', fname: 'AHMED', lname: 'LAWAL', role: 'RW', country: '🇳🇬 Nigeria', foot: 'Left', height: '177 CM', weight: '71 KG', dob: '2001-02-28', photo: '/images/player-placeholder.jpg' },
  { id: 'att2', pos: 'att', num: 9, name: 'CHIDI NWOSU', fname: 'CHIDI', lname: 'NWOSU', role: 'ST', country: '🇳🇬 Nigeria', foot: 'Right', height: '184 CM', weight: '81 KG', dob: '1998-10-12', photo: '/images/player-placeholder.jpg' },
  { id: 'att3', pos: 'att', num: 11, name: 'PETER OYENIRAN', fname: 'PETER', lname: 'OYENIRAN', role: 'LW', country: '🇳🇬 Nigeria', foot: 'Right', height: '179 CM', weight: '73 KG', dob: '2000-05-19', photo: '/images/player-placeholder.jpg' },
  { id: 'att4', pos: 'att', num: 17, name: 'KELECHI AMADI', fname: 'KELECHI', lname: 'AMADI', role: 'ATT', country: '🇳🇬 Nigeria', foot: 'Left', height: '181 CM', weight: '76 KG', dob: '1999-08-03', photo: '/images/player-placeholder.jpg' }
];

const posIcons = { 'gk': '🧤', 'def': '🛡️', 'mid': '⚙️', 'att': '⚡' };
const posTitles = { 'gk': 'Goalkeepers', 'def': 'Defenders', 'mid': 'Midfielders', 'att': 'Attackers' };

function generatePlayerCards(group) {
  return playersData.filter(p => p.pos === group).map(p => `
    <div class="player-card" data-pos="${p.pos}">
      <div class="player-card-img">
        <div class="player-number">${p.num}</div>
        <div class="player-silhouette">${posIcons[p.pos]}</div>
        <span class="player-pos-badge">${p.role}</span>
      </div>
      <div class="player-card-body">
        <div class="player-name">${p.fname} <span class="last">${p.lname}</span></div>
        <div class="player-meta">
          <span>No. ${p.num}</span><span>${p.country}</span>
        </div>
        <button class="btn btn-primary btn-sm view-profile-btn" style="width: 100%; margin-top: 10px;" data-id="${p.id}">View Profile</button>
      </div>
    </div>
  `).join('');
}

export function render() {
  return `
<div class="page-hero">
  <div class="container">
    <h1 class="page-hero-title">Our <span>Squad</span></h1>
    <div class="breadcrumb"><a href="#home">Home</a><span class="breadcrumb-sep">/</span><span>Players</span></div>
  </div>
</div>

<section class="section">
  <div class="container">
    <div class="players-tabs" id="playerTabs">
      <button class="player-tab active" data-group="all">All Players</button>
      <button class="player-tab" data-group="gk">Goalkeepers</button>
      <button class="player-tab" data-group="def">Defenders</button>
      <button class="player-tab" data-group="mid">Midfielders</button>
      <button class="player-tab" data-group="att">Attackers</button>
    </div>

    <h3 class="squad-section-title" data-group="gk">Goalkeepers</h3>
    <div class="players-grid player-group" data-group="gk" style="margin-bottom:32px;">
      ${generatePlayerCards('gk')}
    </div>

    <h3 class="squad-section-title" data-group="def">Defenders</h3>
    <div class="players-grid player-group" data-group="def" style="margin-bottom:32px;">
      ${generatePlayerCards('def')}
    </div>

    <h3 class="squad-section-title" data-group="mid">Midfielders</h3>
    <div class="players-grid player-group" data-group="mid" style="margin-bottom:32px;">
      ${generatePlayerCards('mid')}
    </div>

    <h3 class="squad-section-title" data-group="att">Attackers</h3>
    <div class="players-grid player-group" data-group="att">
      ${generatePlayerCards('att')}
    </div>
  </div>
</section>

<!-- Player Profile Modal Popup -->
<div class="profile-modal-overlay" id="playerProfileModal">
  <div class="profile-modal-container">
    <button class="profile-modal-close" id="closeProfileModal">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#FFD700"/>
        <path d="M16 8L8 16M8 8L16 16" stroke="#001F5B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    
    <div class="profile-modal-content">
      <!-- Left side: Photo -->
      <div class="profile-modal-photo-area">
        <img src="/images/player-placeholder.jpg" alt="Player Photo" id="modalPlayerPhoto" />
      </div>
      
      <!-- Right side: Details -->
      <div class="profile-modal-details">
        <div class="profile-modal-header">
          <h4 id="modalPlayerFname">AHMED</h4>
          <h2 id="modalPlayerLname">ABUBAKAR</h2>
        </div>
        
        <div class="profile-stats-grid">
          <div class="profile-stat-box">
            <span class="stat-label">Position</span>
            <span class="stat-value text-gold" id="modalPlayerPos">MID</span>
          </div>
          <div class="profile-stat-box">
            <span class="stat-label">Squad No</span>
            <span class="stat-value text-gold" id="modalPlayerNum">26</span>
          </div>
          <div class="profile-stat-box">
            <span class="stat-label">DOB</span>
            <span class="stat-value text-gold" id="modalPlayerDob">2009-08-25</span>
          </div>
          <div class="profile-stat-box">
            <span class="stat-label">Foot</span>
            <span class="stat-value text-gold" id="modalPlayerFoot">RIGHT</span>
          </div>
          <div class="profile-stat-box">
            <span class="stat-label">Height</span>
            <span class="stat-value text-gold" id="modalPlayerHeight">175.3 CM</span>
          </div>
          <div class="profile-stat-box">
            <span class="stat-label">Weight</span>
            <span class="stat-value text-gold" id="modalPlayerWeight">64.7 KG</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<footer id="footer">
  <div class="container">
    <div class="footer-bottom">
      <span>NewHope Naija FC © 2026. All rights reserved.</span>
      <div class="footer-bottom-links"><a href="#home">Home</a><a href="#contact">Contact</a></div>
    </div>
  </div>
</footer>`;
}

export function init() {
  // Tab Switching Logic
  const tabs = document.querySelectorAll('#playerTabs .player-tab');
  const groups = document.querySelectorAll('.player-group');
  const titles = document.querySelectorAll('.squad-section-title');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const group = tab.dataset.group;
      groups.forEach(g => {
        const show = group === 'all' || g.dataset.group === group;
        g.style.display = show ? 'grid' : 'none';
      });
      titles.forEach(t => {
        const show = group === 'all' || t.dataset.group === group;
        t.style.display = show ? '' : 'none';
      });
    });
  });

  // Modal Logic
  const modal = document.getElementById('playerProfileModal');
  const closeBtn = document.getElementById('closeProfileModal');
  
  // Open modal and populate data
  document.querySelectorAll('.view-profile-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const playerId = e.currentTarget.dataset.id;
      const player = playersData.find(p => p.id === playerId);
      
      if (player) {
        document.getElementById('modalPlayerFname').textContent = player.fname;
        document.getElementById('modalPlayerLname').textContent = player.lname;
        document.getElementById('modalPlayerPos').textContent = player.role;
        document.getElementById('modalPlayerNum').textContent = player.num;
        document.getElementById('modalPlayerDob').textContent = player.dob;
        document.getElementById('modalPlayerFoot').textContent = player.foot;
        document.getElementById('modalPlayerHeight').textContent = player.height;
        document.getElementById('modalPlayerWeight').textContent = player.weight;
        
        // Use placeholder or actual photo if available
        const imgEl = document.getElementById('modalPlayerPhoto');
        // If there was a real image URL, we'd set it here. For now, just use the CSS placeholder styling if no img exists.
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // block scrolling
      }
    });
  });

  // Close modal
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(); // close on clicking background
  });
}
