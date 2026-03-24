import { supabase } from '../lib/supabase.js';

export const title = 'Our Squad';

let livePlayersData = [];

const posIcons = { 'gk': '🧤', 'def': '🛡️', 'mid': '⚙️', 'att': '⚡' };

function generatePlayerCards(group) {
  return livePlayersData.filter(p => p.pos === group).map(p => `
    <div class="player-card" data-pos="${p.pos}">
      <div class="player-card-img" style="position:relative;">
        ${p.photo ? `<img src="${p.photo}" style="width:100%;height:100%;object-fit:cover;position:absolute;top:0;left:0;border-radius:12px;z-index:0;">` : `<div class="player-silhouette">${posIcons[p.pos] || '⚽'}</div>`}
        <div class="player-number" style="z-index:2;">${p.num}</div>
        <span class="player-pos-badge" style="z-index:2;">${p.role}</span>
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
      <div class="panel-loading" style="grid-column: 1/-1;">Loading players...</div>
    </div>

    <h3 class="squad-section-title" data-group="def">Defenders</h3>
    <div class="players-grid player-group" data-group="def" style="margin-bottom:32px;"></div>

    <h3 class="squad-section-title" data-group="mid">Midfielders</h3>
    <div class="players-grid player-group" data-group="mid" style="margin-bottom:32px;"></div>

    <h3 class="squad-section-title" data-group="att">Attackers</h3>
    <div class="players-grid player-group" data-group="att"></div>
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
        <img src="/images/player-placeholder.jpg" alt="Player Photo" id="modalPlayerPhoto" style="width:100%;height:100%;object-fit:cover;" />
      </div>
      
      <!-- Right side: Details -->
      <div class="profile-modal-details">
        <div class="profile-modal-header">
          <h4 id="modalPlayerFname"></h4>
          <h2 id="modalPlayerLname"></h2>
        </div>
        
        <div class="profile-stats-grid">
          <div class="profile-stat-box">
            <span class="stat-label">Position</span>
            <span class="stat-value text-gold" id="modalPlayerPos"></span>
          </div>
          <div class="profile-stat-box">
            <span class="stat-label">Squad No</span>
            <span class="stat-value text-gold" id="modalPlayerNum"></span>
          </div>
          <div class="profile-stat-box">
            <span class="stat-label">DOB</span>
            <span class="stat-value text-gold" id="modalPlayerDob"></span>
          </div>
          <div class="profile-stat-box">
            <span class="stat-label">Nationality</span>
            <span class="stat-value text-gold" id="modalPlayerFoot"></span>
          </div>
          <div class="profile-stat-box">
            <span class="stat-label">Height</span>
            <span class="stat-value text-gold" id="modalPlayerHeight"></span>
          </div>
          <div class="profile-stat-box">
            <span class="stat-label">Weight</span>
            <span class="stat-value text-gold" id="modalPlayerWeight"></span>
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

  const modal = document.getElementById('playerProfileModal');
  const closeBtn = document.getElementById('closeProfileModal');

  function attachModalListeners() {
    document.querySelectorAll('.view-profile-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const playerId = e.currentTarget.dataset.id;
        const player = livePlayersData.find(p => p.id === playerId);
        
        if (player) {
          document.getElementById('modalPlayerFname').textContent = player.fname;
          document.getElementById('modalPlayerLname').textContent = player.lname;
          document.getElementById('modalPlayerPos').textContent = player.role;
          document.getElementById('modalPlayerNum').textContent = player.num;
          document.getElementById('modalPlayerDob').textContent = player.dob;
          document.getElementById('modalPlayerFoot').textContent = player.country.replace('🇳🇬 ', '');
          document.getElementById('modalPlayerHeight').textContent = player.height;
          document.getElementById('modalPlayerWeight').textContent = player.weight;
          
          const imgEl = document.getElementById('modalPlayerPhoto');
          if (player.photo) {
            imgEl.src = player.photo;
          } else {
            imgEl.src = '/images/player-placeholder.jpg';
          }
          
          modal.classList.add('active');
          document.body.style.overflow = 'hidden'; 
        }
      });
    });
  }
  
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  if(closeBtn) closeBtn.addEventListener('click', closeModal);
  if(modal) modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(); 
  });

  // Fetch Live Players
  if (supabase) {
    supabase.from('profiles').select('*').eq('role', 'player').order('shirt_number', { ascending: true }).then(({ data, error }) => {
      if (!error && data) {
        livePlayersData = data.map(p => {
          let posGroup = 'mid';
          let roleShort = 'MID';
          if (p.position === 'Goalkeeper') { posGroup = 'gk'; roleShort = 'GK'; }
          else if (p.position === 'Defender') { posGroup = 'def'; roleShort = 'DEF'; }
          else if (p.position === 'Forward') { posGroup = 'att'; roleShort = 'FWD'; }
          
          const names = (p.full_name || 'Unknown Player').split(' ');
          
          return {
            id: p.id,
            pos: posGroup,
            num: p.shirt_number || '-',
            role: roleShort,
            fname: names[0],
            lname: names.slice(1).join(' '),
            country: p.nationality ? `🇳🇬 ${p.nationality}` : '🇳🇬 Nigeria',
            height: p.height_cm ? `${p.height_cm} CM` : '--',
            weight: p.weight_kg ? `${p.weight_kg} KG` : '--',
            dob: p.date_of_birth || '--',
            photo: p.avatar_url || null
          };
        });
        
        ['gk', 'def', 'mid', 'att'].forEach(g => {
          const grid = document.querySelector(`.player-group[data-group="${g}"]`);
          if (grid) {
            const html = generatePlayerCards(g);
            grid.innerHTML = html || '<p class="table-empty" style="grid-column:1/-1;">No players in this category yet.</p>';
          }
        });
        attachModalListeners();
      }
    });
  }
}
