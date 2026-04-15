import { t, getLang } from '../i18n.js';
import { supabase } from '../lib/supabase.js';

export const title = 'Home';

export function render() {
  return `
<!-- Hero Slider -->
<section id="hero-slider-wrap">
  <div class="secondary-menu container" style="min-height: 40px;"></div>
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
<div class="ad-banner-wrap" id="adBannerWrapper" style="display: none;">
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
      <span class="ticker-item">Loading latest results...</span>
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
    <div class="matches-grid" id="homeMatchesGrid">
      <div class="panel-loading" style="grid-column: 1/-1; text-align: center; color: var(--gray);">Loading latest matches...</div>
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
        <tbody id="standingsBody">
          <!-- Dynamic Standings -->
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
    <div class="highlights-grid" id="highlightsGrid">
      <div class="panel-loading" style="grid-column:1/-1;text-align:center;color:var(--gray);">Loading highlights...</div>
    </div>
    <div style="text-align:center;margin-top:32px;"><a href="#tv" class="btn btn-outline">${t('btnMoreHighlights')}</a></div>
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

<!-- Video Lightbox Modal -->
<div id="videoLightbox" class="video-lightbox">
  <div class="video-lightbox-content">
    <div id="closeVideoLightbox">✕</div>
    <div class="video-player-container" id="videoPlayerContainer">
      <!-- Dynamic Iframe or Video will be injected here -->
    </div>
    <div class="video-info-overlay">
      <div class="video-title-wrap">
        <h3 id="videoModalTitle">Video Highlight</h3>
        <p id="videoModalComp" style="color:var(--red-light); font-size: 0.8rem; text-transform: uppercase; margin-top: 5px;"></p>
      </div>
    </div>
  </div>
</div>
`;
}

export function init() {
  // Hero Slider Initialization function
  const setupSlider = () => {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    if (slides.length === 0) return;

    // Reset loop
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[0].classList.add('active');
    if (dots[0]) dots[0].classList.add('active');

    let currentSlide = 0;
    
    if (window.heroSlideTimer) clearInterval(window.heroSlideTimer);

    const goToSlide = (index) => {
      slides[currentSlide].classList.remove('active');
      if (dots[currentSlide]) dots[currentSlide].classList.remove('active');
      currentSlide = index;
      slides[currentSlide].classList.add('active');
      if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    };

    const nextSlide = () => goToSlide((currentSlide + 1) % slides.length);

    const startTimer = () => { window.heroSlideTimer = setInterval(nextSlide, 5000); };
    const stopTimer = () => { clearInterval(window.heroSlideTimer); };

    startTimer();
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        stopTimer();
        goToSlide(index);
        startTimer();
      });
    });
  };

  setupSlider(); // Initial statics

  // Fetch Custom Slider Data
  if (supabase) {
    supabase.from('site_settings').select('value').eq('key', 'home_slider').single().then(({ data }) => {
      const slidesData = data?.value;
      if (slidesData && slidesData.length > 0) {
        const slidesContainer = document.getElementById('heroSlides');
        const dotsContainer = document.getElementById('heroPagination');
        
        if (slidesContainer && dotsContainer) {
          slidesContainer.innerHTML = slidesData.map((s, i) => `
            <div class="hero-slide ${i === 0 ? 'active' : ''}">
              <div class="hero-bg"></div>
              <div class="hero-bg-image" style="background-image: url('${s.image || ''}');"></div>
              <div class="hero-gradient"></div>
              <div class="hero-pattern"></div>
              <div class="hero-grid-lines"></div>
              <div class="container slide-content-wrap">
                <div class="hero-content">
                  <div class="hero-left">
                    <div class="hero-tag"><span class="dot"></span>${s.tagline || ''}</div>
                    <h1 class="hero-title">${s.title || ''}</h1>
                  </div>
                  ${i === 0 ? `
                  <div class="hero-right">
                    <div class="hero-badge-wrap">
                      <div class="hero-badge-ring"></div>
                      <div class="hero-badge-ring-2"></div>
                      <div class="hero-badge-glow"></div>
                      <img src="/images/logo.png" alt="NewHope Naija FC" class="hero-logo-img" />
                    </div>
                  </div>` : ''}
                </div>
              </div>
            </div>
          `).join('');

          dotsContainer.innerHTML = slidesData.map((_, i) => `<span class="hero-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>`).join('');
          
          setupSlider(); // Reinitialize
        }
      }
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
      grid.innerHTML = data.map(n => {
        const lang = getLang();
        const title = (lang === 'zh' && n.title_zh) ? n.title_zh : n.title;
        const body = (lang === 'zh' && n.body_zh) ? n.body_zh : n.body;
        return `
        <article class="news-card">
          <div class="news-img">
            ${n.image_url ? `<img src="${n.image_url}" alt="news image" style="width:100%;height:100%;object-fit:cover;">` : `<div class="news-img-placeholder" style="background:linear-gradient(135deg,#cc000033,#001f5b33);">📰</div>`}
            <span class="news-cat-badge">Club News</span>
          </div>
          <div class="news-body"><div class="news-date">📅 ${new Date(n.created_at).toLocaleDateString()}</div><h3 class="news-title">${title}</h3><p class="news-excerpt">${body.substring(0, 100)}...</p></div>
          <div class="news-footer"><a href="#news-article?id=${n.id}" class="news-read-more">Read More →</a></div>
        </article>`;
      }).join('');
    });
  }
  // Fetch latest fixtures
  if (supabase) {
    supabase.from('fixtures').select('*').order('match_date', { ascending: false }).limit(4).then(({ data, error }) => {
      const grid = document.getElementById('homeMatchesGrid');
      if (!grid) return;
      if (error || !data || data.length === 0) {
        grid.innerHTML = '<p class="table-empty" style="grid-column: 1/-1;">No matches scheduled yet.</p>';
        return;
      }
      grid.innerHTML = data.map(f => {
        let resultLabel = '';
        let scoreUI = `<span class="match-score-num">${f.home_score ?? 0}</span><span class="match-score-sep">–</span><span class="match-score-num">${f.away_score ?? 0}</span>`;
        
        if (f.status === 'scheduled') {
          scoreUI = `<div class="match-score" style="background:rgba(0,200,83,0.08);border:1px solid rgba(0,200,83,0.2);"><span class="match-score-num" style="font-size:1rem;color:var(--gray);">VS</span></div>`;
          resultLabel = `<span class="match-upcoming"><span class="live-dot"></span> ${t('matchUpcoming')}</span>`;
        } else if (f.status === 'live') {
          resultLabel = `<span class="match-live"><span class="live-dot badge-pulse"></span> LIVE</span>`;
        } else if (f.status === 'completed') {
          const isHomeWin = (f.home_score > f.away_score);
          const isDraw = (f.home_score === f.away_score);
          if (isDraw) resultLabel = `<span class="match-lost">${t('matchDraw')}</span>`;
          else resultLabel = `<span class="match-won">${t('matchWin')}</span>`;
        }

        const dateStr = new Date(f.match_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const timeStr = new Date(f.match_date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

        return `
          <div class="match-card" ${f.status === 'scheduled' ? 'style="border-left-color:#00c853;"' : ''}>
            <div class="match-comp">🏆 ${f.competition || 'MATCH'} <span class="match-date">${dateStr}</span></div>
            <div class="match-teams">
              <div class="match-team home-side">
                <div class="match-team-info">
                  <div class="match-team-name">${f.home_team}</div>
                  <div class="match-team-tag">${f.home_team === 'NewHope Naija FC' ? t('matchHome') : ''}</div>
                </div>
                ${f.home_logo ? `<img src="${f.home_logo}" class="team-logo" alt="${f.home_team}">` : ''}
              </div>
              <div class="match-scorebox">
                ${f.status === 'scheduled' ? scoreUI : `<div class="match-score">${scoreUI}</div>`}
              </div>
              <div class="match-team away-side">
                ${f.away_logo ? `<img src="${f.away_logo}" class="team-logo" alt="${f.away_team}">` : ''}
                <div class="match-team-info">
                  <div class="match-team-name">${f.away_team}</div>
                  <div class="match-team-tag">${f.away_team === 'NewHope Naija FC' ? t('matchAway') : ''}</div>
                </div>
              </div>
            </div>
            <div class="match-result">${resultLabel} ${f.status === 'scheduled' ? ` · ${timeStr}` : ''}</div>
          </div>`;
      }).join('');
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

  // Fetch Highlights
  if (supabase) {
    const isVideo = (url) => url && (url.includes('.mp4') || url.includes('.webm') || url.includes('.ogg'));
    const getYouTubeId = (url) => {
      if (!url) return null;
      const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
      return match ? match[1] : null;
    };

    supabase.from('site_settings').select('value').eq('key', 'home_highlights').single().then(({ data }) => {
      const highlights = data?.value;
      const grid = document.getElementById('highlightsGrid');
      if (!grid) return;
      if (!highlights || highlights.length === 0) {
        grid.innerHTML = '<p class="table-empty" style="grid-column:1/-1;text-align:center;">No highlights added yet.</p>';
        return;
      }
      grid.innerHTML = highlights.map(h => {
        let thumbContent = '';
        const ytId = getYouTubeId(h.link);

        if (h.image) {
          thumbContent = `<img src="${h.image}" alt="${h.title}" />`;
        } else if (isVideo(h.link)) {
          thumbContent = `<video src="${h.link}" muted autoplay loop playsinline poster="/images/logo.png"></video>`;
        } else if (ytId) {
          thumbContent = `<img src="https://img.youtube.com/vi/${ytId}/maxresdefault.jpg" alt="${h.title}" onerror="this.src='https://img.youtube.com/vi/${ytId}/mqdefault.jpg'" />`;
        } else {
          thumbContent = `<div style="display:flex;align-items:center;justify-content:center;font-size:5rem;opacity:0.15;">${h.emoji || '⚽'}</div>`;
        }

        return `
          <div class="highlight-card" data-video-link="${h.link || ''}" data-video-title="${h.title || ''}" data-video-comp="${h.comp || ''}">
            <div class="highlight-thumb">
              <div class="highlight-overlay"></div>
              <div class="highlight-play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div>
              ${thumbContent}
            </div>
            <div class="highlight-body">
              <div class="highlight-comp">${h.comp}</div>
              <div class="highlight-title">${h.title}</div>
            </div>
          </div>`;
      }).join('');

      // Add Event Listeners for Video Lightbox
      document.querySelectorAll('.highlight-card').forEach(card => {
        card.addEventListener('click', () => {
          const link = card.dataset.videoLink;
          const title = card.dataset.videoTitle;
          const comp = card.dataset.videoComp;
          if (!link) return;
          
          openVideoModal(link, title, comp);
        });
      });
    });
  }

  function openVideoModal(link, title, comp) {
    const modal = document.getElementById('videoLightbox');
    const container = document.getElementById('videoPlayerContainer');
    const titleEl = document.getElementById('videoModalTitle');
    const compEl = document.getElementById('videoModalComp');
    if (!modal || !container) return;

    titleEl.textContent = title;
    compEl.textContent = comp;
    
    const ytId = isYouTube(link);
    if (ytId) {
      container.innerHTML = `<iframe src="https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    } else {
      container.innerHTML = `<video src="${link}" controls autoplay class="modal-video-main"></video>`;
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scroll
  }

  function isYouTube(url) {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  }

  const closeBtn = document.getElementById('closeVideoLightbox');
  const modal = document.getElementById('videoLightbox');
  
  const closeModal = () => {
    if (modal) {
      modal.classList.remove('active');
      const container = document.getElementById('videoPlayerContainer');
      if (container) container.innerHTML = ''; // Stop video
      document.body.style.overflow = '';
    }
  };

  closeBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target.id === 'videoLightbox') closeModal();
  });

  // Fetch Ticker Data
  if (supabase) {
    supabase.from('fixtures').select('*').order('match_date', { ascending: false }).then(({ data, error }) => {
      const ticker = document.getElementById('tickerTrack');
      if (ticker && data && data.length > 0) {
        ticker.innerHTML = data.map(f => {
          if (f.status === 'completed' || f.status === 'live') {
            const statusLabel = f.status === 'live' ? '<span style="color:var(--red-light);font-weight:bold;">LIVE</span> ' : '';
            return `<span class="ticker-item">${statusLabel}${f.home_team} ${f.home_score ?? 0} – ${f.away_score ?? 0} ${f.away_team} <span class="ticker-sep">|</span></span>`;
          } else if (f.status === 'scheduled') {
            const d = new Date(f.match_date);
            const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            return `<span class="ticker-item">UPCOMING: ${f.home_team} vs ${f.away_team} — ${dateStr} <span class="ticker-sep">|</span></span>`;
          }
          return '';
        }).join('') || '<span class="ticker-item">Season 2026/2027 Underway <span class="ticker-sep">|</span></span>';
        
        // Loop the content for a continuous animation
        if (data.length > 2) {
          ticker.innerHTML += ticker.innerHTML;
        }
      }
    });
  }

  // Fetch Standings
  if (supabase) {
    supabase.from('league_standings').select('*')
      .order('points', { ascending: false })
      .order('goals_for', { ascending: false })
      .then(({ data, error }) => {
        const tbody = document.getElementById('standingsBody');
        if (!tbody) return;
        if (error || !data || data.length === 0) return;
        tbody.innerHTML = data.map((s, idx) => {
          const gd = (s.goals_for || 0) - (s.goals_against || 0);
          const formHTML = (s.form || []).map(r => `<div class="form-${r.toLowerCase()}">${r}</div>`).join('');
          const badgeHTML = s.club_badge?.startsWith('http') 
            ? `<img src="${s.club_badge}" style="width:20px;height:20px;object-fit:contain;"/>` 
            : (s.club_badge || '⚽');
          return `
            <tr class="${s.is_highlighted ? 'highlight-row' : ''}">
              <td><strong>${idx + 1}</strong></td>
              <td><div class="team-cell"><div class="team-badge">${badgeHTML}</div>${s.is_highlighted ? `<strong>${s.club_name}</strong>` : s.club_name}</div></td>
              <td>${s.played}</td><td>${s.won}</td><td>${s.drawn}</td><td>${s.lost}</td><td>${gd > 0 ? '+' : ''}${gd}</td>
              <td><strong ${s.is_highlighted ? 'style="color:var(--red-light)"' : ''}>${s.points}</strong></td>
              <td><div class="form-badges">${formHTML}</div></td>
            </tr>`;
        }).join('');
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
        <a href="https://www.facebook.com/profile.php?id=61583600303362" target="_blank" class="footer-social" title="Facebook">
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.325-.597 1.325-1.326V1.326C24 .597 23.403 0 22.675 0z"/></svg>
        </a>
        <a href="https://www.instagram.com/newhopenaijafc" target="_blank" class="footer-social" title="Instagram">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
        </a>
        <a href="https://www.tiktok.com/@newhopenaijafc" target="_blank" class="footer-social" title="TikTok">
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2-1.74 2.89 2.89 0 0 1 2.89-2.89 2.89 2.89 0 0 1 1.5.42V7.71a6.08 6.08 0 0 0-4.39-.51 6.32 6.32 0 0 0-4.63 4.29 6.3 6.3 0 0 0 1 6.39 6.32 6.32 0 0 0 5.09 2.05 6.32 6.32 0 0 0 6.06-6.19V8.67a8.21 8.21 0 0 0 4.9 1.63V6.86a4.81 4.81 0 0 1-0-0.17z"/></svg>
        </a>
        <a href="https://www.youtube.com/@newhopenaijafc" target="_blank" class="footer-social" title="YouTube">
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.95C18.88 4 12 4 12 4s-6.88 0-8.6.47a2.78 2.78 0 0 0-1.94 1.95C1 8.16 1 12 1 12s0 3.84.46 5.58a2.78 2.78 0 0 0 1.94 1.95C5.12 20 12 20 12 20s6.88 0 8.6-.47a2.78 2.78 0 0 0 1.94-1.95C23 15.84 23 12 23 12s0-3.84-.46-5.58zM9.54 15.18V8.82L15.46 12z"/></svg>
        </a>
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
