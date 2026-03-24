export const title = 'Latest News';

export function render() {
  return `
<div class="page-hero">
  <div class="container">
    <h1 class="page-hero-title">Latest <span>News</span></h1>
    <div class="breadcrumb"><a href="#home">Home</a><span class="breadcrumb-sep">/</span><span>News</span></div>
  </div>
</div>

<section class="section">
  <div class="container">
    <div class="players-tabs" style="margin-bottom:40px;">
      <button class="player-tab active">All</button>
      <button class="player-tab">Transfer News</button>
      <button class="player-tab">National Team</button>
      <button class="player-tab">League Update</button>
      <button class="player-tab">Academy</button>
    </div>
    <div class="news-grid">
      <article class="news-card">
        <div class="news-img"><div class="news-img-placeholder" style="background:linear-gradient(135deg,#cc000033,#001f5b33);">🌍</div><span class="news-cat-badge">Transfer News</span></div>
        <div class="news-body"><div class="news-date">📅 Mar 15, 2026</div><h2 class="news-title">Emeka Okafor Signs for Belgian Top-Flight Club</h2><p class="news-excerpt">NewHope Naija FC's midfield maestro Emeka Okafor has completed a move to Belgian Pro League side K.A.A. Gent, marking a massive milestone for the academy. Okafor, 19, rose through the ranks of NewHope Naija FC's youth system.</p></div>
        <div class="news-footer"><a href="#" class="news-read-more">Read Full Story →</a></div>
      </article>
      <article class="news-card">
        <div class="news-img"><div class="news-img-placeholder" style="background:linear-gradient(135deg,#001f5b33,#cc000033);">🦅</div><span class="news-cat-badge">National Team</span></div>
        <div class="news-body"><div class="news-date">📅 Mar 8, 2026</div><h2 class="news-title">Chidi Nwosu Earns Super Eagles U-20 Call-Up</h2><p class="news-excerpt">Academy striker Chidi Nwosu has been named in the Super Eagles U-20 squad for the upcoming WAFU Zone B Championship qualifiers. The 18-year-old has scored 12 goals this season.</p></div>
        <div class="news-footer"><a href="#" class="news-read-more">Read Full Story →</a></div>
      </article>
      <article class="news-card">
        <div class="news-img"><div class="news-img-placeholder" style="background:linear-gradient(135deg,#cc000022,#001f5b44);">🏆</div><span class="news-cat-badge">League Update</span></div>
        <div class="news-body"><div class="news-date">📅 Feb 28, 2026</div><h2 class="news-title">NewHope Naija FC Top Lagos Youth League Table</h2><p class="news-excerpt">After a dominant run of six consecutive wins, NewHope Naija FC sits at the top of the Lagos Youth League standings with 32 points from 14 games.</p></div>
        <div class="news-footer"><a href="#" class="news-read-more">Read Full Story →</a></div>
      </article>
      <article class="news-card">
        <div class="news-img"><div class="news-img-placeholder" style="background:linear-gradient(135deg,#001f5b22,#cc000044);">⚽</div><span class="news-cat-badge">Academy</span></div>
        <div class="news-body"><div class="news-date">📅 Feb 10, 2026</div><h2 class="news-title">New Season Trials: 2026/2027 Intake Now Open</h2><p class="news-excerpt">NewHope Naija FC is opening trials for the 2026/2027 season. Young players aged 12–19 across Nigeria are invited. Trials will be held in Lagos, Abuja, and Port Harcourt.</p></div>
        <div class="news-footer"><a href="#" class="news-read-more">Read Full Story →</a></div>
      </article>
      <article class="news-card">
        <div class="news-img"><div class="news-img-placeholder" style="background:linear-gradient(135deg,#cc000055,#001f5b22);">🎓</div><span class="news-cat-badge">Academy</span></div>
        <div class="news-body"><div class="news-date">📅 Jan 22, 2026</div><h2 class="news-title">NewHope Naija Partners with Lagos State Sports Council</h2><p class="news-excerpt">The club has signed a landmark partnership agreement to provide scholarship opportunities and enhanced training facilities to academy players.</p></div>
        <div class="news-footer"><a href="#" class="news-read-more">Read Full Story →</a></div>
      </article>
      <article class="news-card">
        <div class="news-img"><div class="news-img-placeholder" style="background:linear-gradient(135deg,#001f5b55,#cc000033);">🥇</div><span class="news-cat-badge">League Update</span></div>
        <div class="news-body"><div class="news-date">📅 Jan 10, 2026</div><h2 class="news-title">Player of the Month: Ahmed Lawal Named Best in Lagos League</h2><p class="news-excerpt">Winger Ahmed Lawal has been named the Lagos Youth League Player of the Month for December 2025 after a stunning run that included 4 goals and 3 assists in 3 matches.</p></div>
        <div class="news-footer"><a href="#" class="news-read-more">Read Full Story →</a></div>
      </article>
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
  // News category tabs (visual only for now)
  const tabs = document.querySelectorAll('.players-tabs .player-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });
}
