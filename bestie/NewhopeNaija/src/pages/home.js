import { t } from '../i18n.js';
import { supabase } from '../lib/supabase.js';

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
<div class="ad-banner-wrap container" id="adBannerWrapper" style="display: none;">
  <div class="ad-banner">
    <span class="ad-banner-label">${t('adLabel')}</span>
    <div class="ad-banner-content" id="adBannerContent">
      <!-- Dynamic content will be injected here -->
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
    <div class="news-grid" id="homeNewsGrid">
      <div class="panel-loading" style="grid-column: 1/-1; text-align: center; color: var(--gray);">Loading latest news...</div>
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
      <div class="panel-loading" style="grid-column: 1/-1; text-align: center; color: var(--gray);">Loading players...</div>
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


  // Fetch latest players
  if (supabase) {
    supabase.from('profiles').select('*').eq('role', 'player').order('created_at', { ascending: false }).limit(4).then(({ data, error }) => {
      const grid = document.getElementById('playersGrid');
      if (!grid) return;
      if (error || !data || data.length === 0) {
        grid.innerHTML = '<p class="table-empty" style="grid-column: 1/-1;">No players added yet.</p>';
        return;
      }
      grid.innerHTML = data.map(p => {
        let posBadge = 'PLY';
        let sil = '🏃‍♂️';
        if (p.position === 'Goalkeeper') { posBadge = 'GK'; sil = '🧤'; }
        else if (p.position === 'Defender') { posBadge = 'DEF'; sil = '🛡️'; }
        else if (p.position === 'Midfielder') { posBadge = 'MID'; sil = '⚙️'; }
        else if (p.position === 'Forward') { posBadge = 'FWD'; sil = '⚡'; }

        const imgHTML = p.avatar_url 
          ? `<img src="${p.avatar_url}" style="width:100%;height:100%;object-fit:cover;position:absolute;top:0;left:0;border-radius:12px;z-index:0;">`
          : `<div class="player-silhouette">${sil}</div>`;

        const names = (p.full_name || 'Unknown Player').split(' ');
        const firstName = names[0];
        const lastName = names.slice(1).join(' ');

        return `
          <div class="player-card">
            <div class="player-card-img" style="position:relative;">
              ${imgHTML}
              <div class="player-number" style="z-index:2;">${p.shirt_number || '-'}</div>
              <span class="player-pos-badge" style="z-index:2;">${posBadge}</span>
            </div>
            <div class="player-card-body">
              <div class="player-name">${firstName} <span class="last">${lastName}</span></div>
              <div class="player-meta"><span>No. ${p.shirt_number || '-'}</span><span>${p.nationality || 'Nigeria'}</span></div>
            </div>
          </div>`;
      }).join('');
    });
  }
  
  // Fetch latest news
  if (supabase) {
    supabase.from('news').select('*').eq('published', true).order('created_at', { ascending: false }).limit(4).then(({ data, error }) => {
      const grid = document.getElementById('homeNewsGrid');
      if (!grid) return;
      if (error || !data || data.length === 0) {
        grid.innerHTML = '<p class="table-empty" style="grid-column: 1/-1;">No news available at the moment.</p>';
        return;
      }
      grid.innerHTML = data.map(n => `
        <article class="news-card">
          <div class="news-img">
            ${n.image_url ? `<img src="${n.image_url}" alt="news image" style="width:100%;height:100%;object-fit:cover;">` : `<div class="news-img-placeholder" style="background:linear-gradient(135deg,#cc000033,#001f5b33);">📰</div>`}
            <span class="news-cat-badge">Club News</span>
          </div>
          <div class="news-body"><div class="news-date">📅 ${new Date(n.created_at).toLocaleDateString()}</div><h3 class="news-title">${n.title}</h3><p class="news-excerpt">${n.body.substring(0, 100)}...</p></div>
          <div class="news-footer"><a href="#news-article?id=${n.id}" class="news-read-more">Read More →</a></div>
        </article>
      `).join('');
    });
  }
  // Fetch Ad Banner
  if (supabase) {
    supabase.from('site_settings').select('value').eq('key', 'home_ad_banner').single().then(({ data }) => {
      const banner = data?.value;
      if (banner && banner.imageUrl) {
        const wrapper = document.getElementById('adBannerWrapper');
        const content = document.getElementById('adBannerContent');
        if (wrapper && content) {
          content.innerHTML = `
            <a href="${banner.link || '#'}" target="_blank" style="display:block; width:100%;">
              <img src="${banner.imageUrl}" alt="Advertisement" style="width:100%; height:auto; display:block;">
            </a>`;
          wrapper.style.display = 'block';
        }
      }
    });
  }

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
