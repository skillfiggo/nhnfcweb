import { supabase } from '../lib/supabase.js';
import { t } from '../i18n.js';

export const title = 'Fixtures & Results';

export function render() {
  return `
<div class="page-hero">
  <div class="container">
    <h1 class="page-hero-title">Fixtures &amp; <span>Results</span></h1>
    <div class="breadcrumb"><a href="#home">Home</a><span class="breadcrumb-sep">/</span><span>Matches</span></div>
  </div>
</div>

<section class="section">
  <div class="container">
    <div class="players-tabs" style="margin-bottom:40px;">
      <button class="player-tab active">All</button>
      <button class="player-tab">Lagos Youth League</button>
      <button class="player-tab">NNL Cup</button>
      <button class="player-tab">Friendlies</button>
    </div>

    <h3 style="font-family:'Bebas Neue',cursive;font-size:1.2rem;letter-spacing:2px;color:var(--red-light);margin-bottom:16px;padding-bottom:8px;border-bottom:1px solid var(--glass-border);">📅 Upcoming Fixtures</h3>
    <div class="matches-grid" id="upcomingMatchesGrid" style="margin-bottom:40px;">
      <div class="panel-loading" style="grid-column: 1/-1; text-align: center; color: var(--gray);">Loading upcoming fixtures...</div>
    </div>

    <h3 style="font-family:'Bebas Neue',cursive;font-size:1.2rem;letter-spacing:2px;color:var(--gray);margin-bottom:16px;padding-bottom:8px;border-bottom:1px solid var(--glass-border);">✅ Recent Results</h3>
    <div class="matches-grid" id="recentResultsGrid">
      <div class="panel-loading" style="grid-column: 1/-1; text-align: center; color: var(--gray);">Loading recent results...</div>
    </div>
  </div>
</section>

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
  // Filter tabs (visual only)
  const tabs = document.querySelectorAll('.players-tabs .player-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  if (supabase) {
    supabase.from('fixtures').select('*').order('match_date', { ascending: false }).then(({ data, error }) => {
      const upcomingGrid = document.getElementById('upcomingMatchesGrid');
      const recentGrid = document.getElementById('recentResultsGrid');
      
      if (!upcomingGrid || !recentGrid) return;
      if (error || !data || data.length === 0) {
        upcomingGrid.innerHTML = '<p class="table-empty" style="grid-column: 1/-1;">No upcoming matches.</p>';
        recentGrid.innerHTML = '<p class="table-empty" style="grid-column: 1/-1;">No recent results.</p>';
        return;
      }

      const upcomingItems = data.filter(f => f.status === 'scheduled' || f.status === 'live');
      const recentItems = data.filter(f => f.status === 'completed' || f.status === 'postponed');

      const renderMatch = (f) => {
        let resultLabel = '';
        let scoreUI = `<span class="match-score-num">${f.home_score ?? 0}</span><span class="match-score-sep">–</span><span class="match-score-num">${f.away_score ?? 0}</span>`;
        
        if (f.status === 'scheduled') {
          scoreUI = `<div class="match-score" style="background:rgba(0,200,83,0.08);border:1px solid rgba(0,200,83,0.2);"><span class="match-score-num" style="font-size:1rem;color:var(--gray);">VS</span></div>`;
          resultLabel = `<span class="match-upcoming"><span class="live-dot"></span> ${t('matchUpcoming')}</span>`;
        } else if (f.status === 'live') {
          resultLabel = `<span class="match-live"><span class="live-dot badge-pulse"></span> LIVE</span>`;
        } else if (f.status === 'completed') {
          const isDraw = (f.home_score === f.away_score);
          if (isDraw) resultLabel = `<span class="match-lost">${t('matchDraw')}</span>`;
          else resultLabel = `<span class="match-won">${t('matchWin')}</span>`;
        } else if (f.status === 'postponed') {
          resultLabel = `<span class="match-lost" style="color:var(--gray);">Postponed</span>`;
        }

        const dateStr = new Date(f.match_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const timeStr = new Date(f.match_date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

        return `
          <div class="match-card" ${f.status === 'scheduled' ? 'style="border-left-color:#00c853;"' : ''}>
            <div class="match-comp">🏆 ${f.competition || 'MATCH'} <span class="match-date">${dateStr}</span></div>
            <div class="match-teams">
              <div class="match-team"><div class="match-team-name">${f.home_team}</div><div class="match-team-tag">${f.home_team === 'NewHope Naija FC' ? t('matchHome') : ''}</div></div>
              ${f.status === 'scheduled' ? scoreUI : `<div class="match-score">${scoreUI}</div>`}
              <div class="match-team"><div class="match-team-name">${f.away_team}</div><div class="match-team-tag">${f.away_team === 'NewHope Naija FC' ? t('matchAway') : ''}</div></div>
            </div>
            <div class="match-result">${resultLabel} ${f.status === 'scheduled' ? ` · ${timeStr}` : ''}</div>
          </div>`;
      };

      upcomingGrid.innerHTML = upcomingItems.length > 0 ? upcomingItems.map(renderMatch).join('') : '<p class="table-empty" style="grid-column: 1/-1;">No upcoming matches.</p>';
      recentGrid.innerHTML = recentItems.length > 0 ? recentItems.map(renderMatch).join('') : '<p class="table-empty" style="grid-column: 1/-1;">No recent results.</p>';
    });
  }
}
