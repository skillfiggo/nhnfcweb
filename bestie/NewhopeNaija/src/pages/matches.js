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
    <div class="matches-grid" style="margin-bottom:40px;">
      <div class="match-card" style="border-left-color:#00c853;">
        <div class="match-comp">🏆 LAGOS YOUTH LEAGUE <span class="match-date">Mar 22, 2026</span></div>
        <div class="match-teams">
          <div class="match-team"><div class="match-team-name">NEWHOPE NAIJA FC</div><div class="match-team-tag">(H)</div></div>
          <div class="match-score" style="background:rgba(0,200,83,0.08);border:1px solid rgba(0,200,83,0.2);"><span class="match-score-num" style="font-size:1rem;color:var(--gray);">VS</span></div>
          <div class="match-team"><div class="match-team-name">ABUJA UNITED FC</div><div class="match-team-tag">(A)</div></div>
        </div>
        <div class="match-result"><span class="match-upcoming"><span class="live-dot"></span> Upcoming · 4:00 PM</span></div>
      </div>
      <div class="match-card" style="border-left-color:#00c853;">
        <div class="match-comp">🏆 NNL CUP <span class="match-date">Mar 29, 2026</span></div>
        <div class="match-teams">
          <div class="match-team"><div class="match-team-name">DELTA FORCE FC</div><div class="match-team-tag">(H)</div></div>
          <div class="match-score" style="background:rgba(0,200,83,0.08);border:1px solid rgba(0,200,83,0.2);"><span class="match-score-num" style="font-size:1rem;color:var(--gray);">VS</span></div>
          <div class="match-team"><div class="match-team-name">NEWHOPE NAIJA FC</div><div class="match-team-tag">(A)</div></div>
        </div>
        <div class="match-result"><span class="match-upcoming"><span class="live-dot"></span> Upcoming · 3:30 PM</span></div>
      </div>
    </div>

    <h3 style="font-family:'Bebas Neue',cursive;font-size:1.2rem;letter-spacing:2px;color:var(--gray);margin-bottom:16px;padding-bottom:8px;border-bottom:1px solid var(--glass-border);">✅ Recent Results</h3>
    <div class="matches-grid">
      <div class="match-card"><div class="match-comp">🏆 LAGOS YOUTH LEAGUE <span class="match-date">Mar 17, 2026</span></div>
        <div class="match-teams"><div class="match-team"><div class="match-team-name">SUNRISE FC</div><div class="match-team-tag">(H)</div></div><div class="match-score"><span class="match-score-num">1</span><span class="match-score-sep">–</span><span class="match-score-num">3</span></div><div class="match-team"><div class="match-team-name">NEWHOPE NAIJA FC</div><div class="match-team-tag">(A)</div></div></div>
        <div class="match-result"><span class="match-won">✓ Win</span></div></div>
      <div class="match-card"><div class="match-comp">🏆 NNL CUP <span class="match-date">Mar 14, 2026</span></div>
        <div class="match-teams"><div class="match-team"><div class="match-team-name">NEWHOPE NAIJA FC</div><div class="match-team-tag">(H)</div></div><div class="match-score"><span class="match-score-num">2</span><span class="match-score-sep">–</span><span class="match-score-num">0</span></div><div class="match-team"><div class="match-team-name">VICTORIA ISLAND FC</div><div class="match-team-tag">(A)</div></div></div>
        <div class="match-result"><span class="match-won">✓ Win</span></div></div>
      <div class="match-card"><div class="match-comp">🏆 LAGOS YOUTH LEAGUE <span class="match-date">Mar 10, 2026</span></div>
        <div class="match-teams"><div class="match-team"><div class="match-team-name">FUTURE EAGLES FC</div><div class="match-team-tag">(H)</div></div><div class="match-score"><span class="match-score-num">1</span><span class="match-score-sep">–</span><span class="match-score-num">1</span></div><div class="match-team"><div class="match-team-name">NEWHOPE NAIJA FC</div><div class="match-team-tag">(A)</div></div></div>
        <div class="match-result"><span class="match-lost">= Draw</span></div></div>
      <div class="match-card"><div class="match-comp">🏆 LAGOS YOUTH LEAGUE <span class="match-date">Mar 3, 2026</span></div>
        <div class="match-teams"><div class="match-team"><div class="match-team-name">NEWHOPE NAIJA FC</div><div class="match-team-tag">(H)</div></div><div class="match-score"><span class="match-score-num">4</span><span class="match-score-sep">–</span><span class="match-score-num">0</span></div><div class="match-team"><div class="match-team-name">LAGOS STARS</div><div class="match-team-tag">(A)</div></div></div>
        <div class="match-result"><span class="match-won">✓ Win</span></div></div>
      <div class="match-card"><div class="match-comp">🏆 NNL CUP <span class="match-date">Feb 24, 2026</span></div>
        <div class="match-teams"><div class="match-team"><div class="match-team-name">NEWHOPE NAIJA FC</div><div class="match-team-tag">(H)</div></div><div class="match-score"><span class="match-score-num">3</span><span class="match-score-sep">–</span><span class="match-score-num">1</span></div><div class="match-team"><div class="match-team-name">KANO PILLARS YOUTH</div><div class="match-team-tag">(A)</div></div></div>
        <div class="match-result"><span class="match-won">✓ Win</span></div></div>
      <div class="match-card"><div class="match-comp">🏆 LAGOS YOUTH LEAGUE <span class="match-date">Feb 17, 2026</span></div>
        <div class="match-teams"><div class="match-team"><div class="match-team-name">SUNSHINE FC</div><div class="match-team-tag">(H)</div></div><div class="match-score"><span class="match-score-num">2</span><span class="match-score-sep">–</span><span class="match-score-num">1</span></div><div class="match-team"><div class="match-team-name">NEWHOPE NAIJA FC</div><div class="match-team-tag">(A)</div></div></div>
        <div class="match-result"><span class="match-lost">✗ Loss</span></div></div>
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
}
