import { t } from '../i18n.js';

export const title = 'Home';

export function render() {
  return `
<!-- Hero Slider -->
<section id="hero-slider-wrap">
  <div class="secondary-menu container">
    <div class="secondary-menu-left">
      <a href="#gallery">${t('navGallery')}</a>
      <a href="#contact">${t('navContactUs')}</a>
    </div>

  </div>
  <div id="hero">
    <div class="hero-slides" id="heroSlides">
      <!-- Slide 1 -->
      <div class="hero-slide active">
        <div class="hero-bg"></div>
        <div class="hero-bg-image" style="background-image: url('/images/hero-slide-1.jpg');"></div>
        <div class="hero-gradient"></div>
        <div class="hero-pattern"></div>
        <div class="hero-grid-lines"></div>
        <div class="container slide-content-wrap">
          <div class="hero-content">
            <div class="hero-left">
              <div class="hero-tag">
                <span class="dot"></span>
                ${t('heroTag1')}
              </div>
              <div class="hero-welcome">${t('heroWelcome')}</div>
              <h1 class="hero-title">
                NEWHOPE<br>
                <span class="red">NAIJA</span><br>
                <span class="navy">${t('heroTitleNavy')}</span>
              </h1>
              <p class="hero-desc">
                ${t('heroDesc1')}
              </p>
              <div class="hero-actions">
                <a href="#news" class="btn btn-primary">${t('btnLatestNews')}</a>
                <a href="#players" class="btn btn-outline">${t('btnOurSquad')}</a>
              </div>
            </div>
            <div class="hero-right">
              <div class="hero-badge-wrap">
                <div class="hero-badge-ring"></div>
                <div class="hero-badge-ring-2"></div>
                <div class="hero-badge-glow"></div>
                <img src="/images/logo.png" alt="NewHope Naija FC" class="hero-logo-img" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Slide 2 -->
      <div class="hero-slide">
        <div class="hero-bg"></div>
        <div class="hero-bg-image" style="background-image: url('/images/hero-slide-2.jpg');"></div>
        <div class="hero-gradient"></div>
        <div class="hero-pattern"></div>
        <div class="hero-grid-lines"></div>
        <div class="container slide-content-wrap">
          <div class="hero-content">
            <div class="hero-left">
              <div class="hero-tag">
                <span class="dot"></span>
                ${t('heroTag2')}
              </div>
              <h1 class="hero-title">
                ${t('heroTitle2A')}<br>
                <span class="red">${t('heroTitle2B')}</span>
              </h1>
              <p class="hero-desc">
                ${t('heroDesc2')}
              </p>
              <div class="hero-actions">
                <a href="#contact" class="btn btn-primary">${t('btnRegister')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Slide 3 -->
      <div class="hero-slide">
        <div class="hero-bg"></div>
        <div class="hero-bg-image" style="background-image: url('/images/hero-slide-3.jpg');"></div>
        <div class="hero-gradient"></div>
        <div class="hero-pattern"></div>
        <div class="hero-grid-lines"></div>
        <div class="container slide-content-wrap">
          <div class="hero-content">
            <div class="hero-left">
              <div class="hero-tag">
                <span class="dot"></span>
                ${t('heroTag3')}
              </div>
              <h1 class="hero-title">
                ${t('heroTitle3A')}<br>
                <span>${t('heroTitle3B')}</span>
              </h1>
              <p class="hero-desc">
                ${t('heroDesc3')}
              </p>
              <div class="hero-actions">
                <a href="#gallery" class="btn btn-primary">${t('btnGallery')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    
    <!-- Pagination -->
    <div class="hero-pagination" id="heroPagination">
      <span class="hero-dot active" data-index="0"></span>
      <span class="hero-dot" data-index="1"></span>
      <span class="hero-dot" data-index="2"></span>
    </div>
  </div>
  
</section>


<!-- Ad Banner -->
<div class="ad-banner-wrap container">
  <div class="ad-banner">
    <span class="ad-banner-label">${t('adLabel')}</span>
    <div class="ad-banner-content">
      <!-- Replace this block with your ad tag / image / iframe -->
      <span>${t('adText')}</span>
    </div>
  </div>
</div>

<!-- Ticker -->
<div class="ticker-bar">
  <div class="ticker-inner">
    <div class="ticker-label">${t('tickerLabel')}</div>
    <div class="ticker-track" id="tickerTrack">
      <span class="ticker-item">NEWHOPE NAIJA FC 3 – 1 SUNRISE FC <span class="ticker-sep">|</span></span>
      <span class="ticker-item">LAGOS STARS 0 – 2 NEWHOPE NAIJA FC <span class="ticker-sep">|</span></span>
      <span class="ticker-item">NEWHOPE NAIJA FC 1 – 1 FUTURE EAGLES FC <span class="ticker-sep">|</span></span>
      <span class="ticker-item">VICTORIA FC 0 – 4 NEWHOPE NAIJA FC <span class="ticker-sep">|</span></span>
      <span class="ticker-item">UPCOMING: NEWHOPE NAIJA FC vs ABUJA UNITED — Mar 22 <span class="ticker-sep">|</span></span>
    </div>
  </div>
</div>

<!-- Matches -->
<section id="matches" class="section">
  <div class="container">
    <div class="section-header reveal">
      <h2 class="section-title">${t('latestMatches')} <span>${t('matchesSpan')}</span></h2>
      <p class="section-subtitle">${t('matchesSub')}</p>
    </div>
    <div class="matches-grid">
      <div class="match-card">
        <div class="match-comp">🏆 LAGOS YOUTH LEAGUE <span class="match-date">Mar 17, 2026</span></div>
        <div class="match-teams">
          <div class="match-team"><div class="match-team-name">SUNRISE FC</div><div class="match-team-tag">${t('matchHome')}</div></div>
          <div class="match-score"><span class="match-score-num">1</span><span class="match-score-sep">–</span><span class="match-score-num">3</span></div>
          <div class="match-team"><div class="match-team-name">NEWHOPE NAIJA FC</div><div class="match-team-tag">${t('matchAway')}</div></div>
        </div>
        <div class="match-result"><span class="match-won">${t('matchWin')}</span></div>
      </div>
      <div class="match-card">
        <div class="match-comp">🏆 NNL CUP <span class="match-date">Mar 14, 2026</span></div>
        <div class="match-teams">
          <div class="match-team"><div class="match-team-name">NEWHOPE NAIJA FC</div><div class="match-team-tag">${t('matchHome')}</div></div>
          <div class="match-score"><span class="match-score-num">2</span><span class="match-score-sep">–</span><span class="match-score-num">0</span></div>
          <div class="match-team"><div class="match-team-name">VICTORIA ISLAND FC</div><div class="match-team-tag">${t('matchAway')}</div></div>
        </div>
        <div class="match-result"><span class="match-won">${t('matchWin')}</span></div>
      </div>
      <div class="match-card">
        <div class="match-comp">🏆 LAGOS YOUTH LEAGUE <span class="match-date">Mar 10, 2026</span></div>
        <div class="match-teams">
          <div class="match-team"><div class="match-team-name">FUTURE EAGLES FC</div><div class="match-team-tag">${t('matchHome')}</div></div>
          <div class="match-score"><span class="match-score-num">1</span><span class="match-score-sep">–</span><span class="match-score-num">1</span></div>
          <div class="match-team"><div class="match-team-name">NEWHOPE NAIJA FC</div><div class="match-team-tag">${t('matchAway')}</div></div>
        </div>
        <div class="match-result"><span class="match-lost">${t('matchDraw')}</span></div>
      </div>
      <div class="match-card" style="border-left-color:#00c853;">
        <div class="match-comp">🏆 LAGOS YOUTH LEAGUE <span class="match-date">Mar 22, 2026</span></div>
        <div class="match-teams">
          <div class="match-team"><div class="match-team-name">NEWHOPE NAIJA FC</div><div class="match-team-tag">${t('matchHome')}</div></div>
          <div class="match-score" style="background:rgba(0,200,83,0.08);border:1px solid rgba(0,200,83,0.2);"><span class="match-score-num" style="font-size:1rem;color:var(--gray);">VS</span></div>
          <div class="match-team"><div class="match-team-name">ABUJA UNITED FC</div><div class="match-team-tag">${t('matchAway')}</div></div>
        </div>
        <div class="match-result"><span class="match-upcoming"><span class="live-dot"></span> ${t('matchUpcoming')} · 4:00 PM</span></div>
      </div>
    </div>
    <div style="text-align:center;margin-top:32px;">
      <a href="#matches-page" class="btn btn-outline">${t('btnViewFixtures')}</a>
    </div>
  </div>
</section>

<!-- Latest News -->
<section id="news-preview" class="section">
  <div class="container">
    <div class="section-header reveal">
      <h2 class="section-title"><span>${t('latestNews')}</span> ${t('newsSpan')}</h2>
      <p class="section-subtitle">${t('newsSub')}</p>
    </div>
    <div class="news-grid">
      <article class="news-card">
        <div class="news-img"><div class="news-img-placeholder" style="background:linear-gradient(135deg,#cc000033,#001f5b33);">🌍</div><span class="news-cat-badge">Transfer News</span></div>
        <div class="news-body"><div class="news-date">📅 Mar 15, 2026</div><h3 class="news-title">Emeka Okafor Signs for Belgian Top-Flight Club</h3><p class="news-excerpt">NewHope Naija FC's midfield maestro Emeka Okafor has completed a move to Belgian Pro League side, marking a massive milestone for the academy.</p></div>
        <div class="news-footer"><a href="#news" class="news-read-more">Read More →</a></div>
      </article>
      <article class="news-card">
        <div class="news-img"><div class="news-img-placeholder" style="background:linear-gradient(135deg,#001f5b33,#cc000033);">🦅</div><span class="news-cat-badge">National Team</span></div>
        <div class="news-body"><div class="news-date">📅 Mar 8, 2026</div><h3 class="news-title">Chidi Nwosu Earns Super Eagles U-20 Call-Up</h3><p class="news-excerpt">Academy striker Chidi Nwosu has been named in the Super Eagles U-20 squad for the upcoming WAFU Zone B Championship qualifiers.</p></div>
        <div class="news-footer"><a href="#news" class="news-read-more">Read More →</a></div>
      </article>
      <article class="news-card">
        <div class="news-img"><div class="news-img-placeholder" style="background:linear-gradient(135deg,#cc000022,#001f5b44);">🏆</div><span class="news-cat-badge">League Update</span></div>
        <div class="news-body"><div class="news-date">📅 Feb 28, 2026</div><h3 class="news-title">NewHope Naija FC Top Lagos Youth League Table</h3><p class="news-excerpt">After a dominant run of six consecutive wins, NewHope Naija FC sits at the top of the Lagos Youth League standings.</p></div>
        <div class="news-footer"><a href="#news" class="news-read-more">Read More →</a></div>
      </article>
      <article class="news-card">
        <div class="news-img"><div class="news-img-placeholder" style="background:linear-gradient(135deg,#001f5b22,#cc000044);">⚽</div><span class="news-cat-badge">Academy</span></div>
        <div class="news-body"><div class="news-date">📅 Feb 10, 2026</div><h3 class="news-title">New Season Trials: 2026/2027 Intake Now Open</h3><p class="news-excerpt">NewHope Naija FC is opening trials for the 2026/2027 season. Young players aged 12–19 across Nigeria are invited to showcase their talent.</p></div>
        <div class="news-footer"><a href="#news" class="news-read-more">Read More →</a></div>
      </article>
    </div>
    <div style="text-align:center;margin-top:32px;"><a href="#news" class="btn btn-navy">${t('btnViewNews')}</a></div>
  </div>
</section>

<!-- Players Preview -->
<section id="players-preview" class="section">
  <div class="container">
    <div class="section-header reveal">
      <h2 class="section-title">${t('ourPlayers')} <span>${t('playersSpan')}</span></h2>
      <p class="section-subtitle">${t('playersSub')}</p>
    </div>

    <div class="players-grid" id="playersGrid">
      <div class="player-card" data-pos="gk"><div class="player-card-img"><div class="player-number">1</div><div class="player-silhouette">🧤</div><span class="player-pos-badge">GK</span></div><div class="player-card-body"><div class="player-name">IBRAHIM <span class="last">MUSA</span></div><div class="player-meta"><span>No. 1</span><span>Nigeria</span></div></div></div>
      <div class="player-card" data-pos="def"><div class="player-card-img"><div class="player-number">4</div><div class="player-silhouette">🛡️</div><span class="player-pos-badge">DEF</span></div><div class="player-card-body"><div class="player-name">TAIWO <span class="last">ADEYEMI</span></div><div class="player-meta"><span>No. 4</span><span>Nigeria</span></div></div></div>
      <div class="player-card" data-pos="def"><div class="player-card-img"><div class="player-number">5</div><div class="player-silhouette">🛡️</div><span class="player-pos-badge">DEF</span></div><div class="player-card-body"><div class="player-name">CHUKWUMA <span class="last">EZE</span></div><div class="player-meta"><span>No. 5</span><span>Nigeria</span></div></div></div>
      <div class="player-card" data-pos="mid"><div class="player-card-img"><div class="player-number">8</div><div class="player-silhouette">⚙️</div><span class="player-pos-badge">MID</span></div><div class="player-card-body"><div class="player-name">EMEKA <span class="last">OKAFOR</span></div><div class="player-meta"><span>No. 8</span><span>Nigeria</span></div></div></div>
    </div>
    <div style="text-align:center;margin-top:32px;"><a href="#players" class="btn btn-primary">${t('btnSeePlayers')}</a></div>
  </div>
</section>

<!-- Standings -->
<section id="standings" class="section">
  <div class="container">
    <div class="section-header reveal">
      <h2 class="section-title">${t('leagueStandings')} <span>${t('standingsSpan')}</span></h2>
      <p class="section-subtitle">${t('standingsSub')}</p>
    </div>
    <div class="table-wrap reveal">
      <table class="standings-table">
        <thead><tr><th>#</th><th>Club</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GD</th><th>Pts</th><th>Form</th></tr></thead>
        <tbody>
          <tr class="highlight-row">
            <td><strong>1</strong></td>
            <td><div class="team-cell"><div class="team-badge">🔴</div><strong>NewHope Naija FC</strong></div></td>
            <td>14</td><td>10</td><td>2</td><td>2</td><td>+18</td>
            <td><strong style="color:var(--red-light)">32</strong></td>
            <td><div class="form-badges"><div class="form-w">W</div><div class="form-w">W</div><div class="form-d">D</div><div class="form-w">W</div><div class="form-w">W</div></div></td>
          </tr>
          <tr>
            <td>2</td><td><div class="team-cell"><div class="team-badge">⚡</div>Lagos Stars</div></td>
            <td>14</td><td>9</td><td>2</td><td>3</td><td>+14</td><td>29</td>
            <td><div class="form-badges"><div class="form-w">W</div><div class="form-l">L</div><div class="form-w">W</div><div class="form-w">W</div><div class="form-d">D</div></div></td>
          </tr>
          <tr>
            <td>3</td><td><div class="team-cell"><div class="team-badge">🌟</div>Sunrise FC</div></td>
            <td>14</td><td>8</td><td>3</td><td>3</td><td>+10</td><td>27</td>
            <td><div class="form-badges"><div class="form-d">D</div><div class="form-w">W</div><div class="form-l">L</div><div class="form-w">W</div><div class="form-w">W</div></div></td>
          </tr>
          <tr>
            <td>4</td><td><div class="team-cell"><div class="team-badge">🦅</div>Future Eagles FC</div></td>
            <td>14</td><td>7</td><td>4</td><td>3</td><td>+8</td><td>25</td>
            <td><div class="form-badges"><div class="form-w">W</div><div class="form-d">D</div><div class="form-d">D</div><div class="form-l">L</div><div class="form-w">W</div></div></td>
          </tr>
          <tr>
            <td>5</td><td><div class="team-cell"><div class="team-badge">🏙️</div>Victoria Island FC</div></td>
            <td>14</td><td>5</td><td>3</td><td>6</td><td>-4</td><td>18</td>
            <td><div class="form-badges"><div class="form-l">L</div><div class="form-l">L</div><div class="form-w">W</div><div class="form-d">D</div><div class="form-l">L</div></div></td>
          </tr>
          <tr>
            <td>6</td><td><div class="team-cell"><div class="team-badge">🏛️</div>Abuja United FC</div></td>
            <td>14</td><td>4</td><td>2</td><td>8</td><td>-12</td><td>14</td>
            <td><div class="form-badges"><div class="form-l">L</div><div class="form-w">W</div><div class="form-l">L</div><div class="form-l">L</div><div class="form-d">D</div></div></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<!-- Highlights -->
<section id="highlights" class="section">
  <div class="container">
    <div class="section-header reveal">
      <h2 class="section-title">${t('ourHighlights')} <span>${t('highlightsSpan')}</span></h2>
      <p class="section-subtitle">${t('highlightsSub')}</p>
    </div>
    <div class="highlights-grid">
      <div class="highlight-card">
        <div class="highlight-thumb">
          <div class="highlight-overlay"></div>
          <div class="highlight-play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div>
          <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:5rem;opacity:0.15;">⚽</div>
        </div>
        <div class="highlight-body"><div class="highlight-comp">Lagos Youth League · MD 14</div><div class="highlight-title">NEWHOPE NAIJA FC 3 – 1 SUNRISE FC · Full Match Highlights</div></div>
      </div>
      <div class="highlight-card">
        <div class="highlight-thumb">
          <div class="highlight-overlay"></div>
          <div class="highlight-play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div>
          <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:5rem;opacity:0.15;">🏆</div>
        </div>
        <div class="highlight-body"><div class="highlight-comp">NNL Cup · MD 11</div><div class="highlight-title">NEWHOPE NAIJA FC 2 – 0 VICTORIA ISLAND FC</div></div>
      </div>
      <div class="highlight-card">
        <div class="highlight-thumb">
          <div class="highlight-overlay"></div>
          <div class="highlight-play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div>
          <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:5rem;opacity:0.15;">⚡</div>
        </div>
        <div class="highlight-body"><div class="highlight-comp">Lagos Youth League · MD 13</div><div class="highlight-title">FUTURE EAGLES FC 1 – 1 NEWHOPE NAIJA FC</div></div>
      </div>
    </div>
    <div style="text-align:center;margin-top:32px;"><a href="#gallery" class="btn btn-outline">${t('btnMoreHighlights')}</a></div>
  </div>
</section>

<!-- CTA Banner -->
<div class="cta-banner">
  <div class="container" style="position:relative;z-index:1;">
    <h2 class="cta-banner-title">${t('ctaReady')}<span>${t('ctaNewHope')}</span> Naija FC?</h2>
    <p class="cta-banner-sub">${t('ctaSub')}</p>
    <div class="cta-banner-actions">
      <a href="#contact" class="btn btn-primary">${t('btnRegTrials')}</a>
      <a href="#contact" class="btn btn-outline">${t('btnContactClub')}</a>
    </div>
  </div>
</div>

${footerHTML()}
`;
}

export function init() {
  // Hero Slider
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  let currentSlide = 0;
  let slideTimer;

  const goToSlide = (index) => {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  };

  const nextSlide = () => goToSlide((currentSlide + 1) % slides.length);

  const startTimer = () => { slideTimer = setInterval(nextSlide, 5000); };
  const stopTimer = () => { clearInterval(slideTimer); };

  if (slides.length > 0) {
    startTimer();
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        stopTimer();
        goToSlide(index);
        startTimer();
      });
    });
  }

  // Ticker duplicate
  const ticker = document.getElementById('tickerTrack');
  if (ticker) ticker.innerHTML += ticker.innerHTML;

  // Stat counters
  document.querySelectorAll('.hero-stat-value[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    let current = 0;
    const step = Math.ceil(target / 50);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + (el.dataset.suffix || '');
      if (current >= target) clearInterval(timer);
    }, 40);
  });


}

function footerHTML() {
  return `
<footer id="footer">
  <div class="container">
    <div class="footer-centered">
      <img src="/images/footer-logo.png" alt="NewHope Naija FC" class="footer-brand-logo" />
      <div class="footer-brand-name">NEWHOPE <span>NAIJA</span> FC</div>
      <p class="footer-brand-desc">${t('heroDesc1')}</p>
      <div class="footer-socials">
        <a href="#" class="footer-social" title="Instagram">📷</a>
        <a href="#" class="footer-social" title="Twitter/X">✖</a>
        <a href="#" class="footer-social" title="Facebook">📘</a>
        <a href="#" class="footer-social" title="YouTube">▶</a>
        <a href="#" class="footer-social" title="WhatsApp">💬</a>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="footer-bottom" style="justify-content:center;">
      <span>NewHope Naija FC © 2026. All rights reserved.</span>
    </div>
  </div>
</footer>`;
}
