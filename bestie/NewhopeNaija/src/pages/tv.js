import { supabase } from '../lib/supabase.js';
import { t } from '../i18n.js';

export const title = 'NewHope TV';

export function render() {
  return `
<div class="page-hero tv-hero">
  <div class="tv-hero-bg"></div>
  <div class="container tv-hero-content">
    <div class="tv-logo-badge">
      <span class="tv-play-icon">▶</span>
      <span>${t('tvBadge', 'NEWHOPE TV')}</span>
    </div>
    <h1 class="page-hero-title" style="max-width:700px; margin: 12px auto 0;">${t('tvHeroTitle', 'Match Highlights &amp; <span>Club Videos</span>')}</h1>
    <p style="color:var(--gray); margin-top: 12px; font-size: 0.9rem; letter-spacing: 1px; text-transform: uppercase;">${t('tvHeroSub', 'Relive Every Moment · Goals · Celebrations · Behind the Scenes')}</p>
    <div class="breadcrumb" style="justify-content:center; margin-top:20px;">
      <a href="#home">${t('footerHome', 'Home')}</a><span class="breadcrumb-sep">/</span><span>${t('tvBadge', 'NewHope TV')}</span>
    </div>
  </div>
</div>

<!-- Featured Video Player -->
<section class="section" style="padding-top: 0; background: var(--dark-2);">
  <div class="container">
    <div id="tvFeaturedWrap" class="tv-featured-wrap">
      <div class="tv-featured-player" id="tvFeaturedPlayer">
        <div class="tv-player-placeholder" id="tvPlayerPlaceholder">
          <div class="tv-player-logo">▶</div>
          <p>${t('tvSelectVideo', 'Select a video to watch')}</p>
        </div>
        <iframe id="tvIframe" class="tv-iframe" style="display:none;" allowfullscreen allow="autoplay; encrypted-media" frameborder="0"></iframe>
      </div>
      <div class="tv-featured-info" id="tvFeaturedInfo">
        <span class="tv-featured-comp" id="tvFeaturedComp">—</span>
        <h2 class="tv-featured-title" id="tvFeaturedTitle">${t('tvChooseHighlight', 'Choose a highlight from the list below')}</h2>
        <p class="tv-featured-desc" id="tvFeaturedDesc" style="color:var(--gray); font-size:0.9rem; margin-top:8px;">
          ${t('tvClickToLoad', 'Click any video card to load it in the player above.')}
        </p>
        <a href="#" class="btn btn-primary" id="tvWatchBtn" style="margin-top:20px; display:none;" target="_blank" rel="noopener noreferrer">
          <span>▶</span> ${t('tvWatchFull', 'Watch Full Video')}
        </a>
      </div>
    </div>
  </div>
</section>

<!-- Video Grid -->
<section class="section" id="tvHighlightsSection">
  <div class="container">
    <div class="section-header reveal">
      <h2 class="section-title">${t('tvAllVideos', 'All <span>Videos</span>')}</h2>
      <p class="section-subtitle">${t('tvAllVideosSub', 'Match Highlights, Goals &amp; Club Videos')}</p>
    </div>
    <div class="tv-video-grid" id="tvVideoGrid">
      <div class="panel-loading" style="grid-column: 1/-1; text-align:center; padding: 60px 0;">
        <div style="font-size: 3rem; margin-bottom: 16px; opacity: 0.3;">📺</div>
        <p style="color: var(--gray);">${t('loading', 'Loading videos...')}</p>
      </div>
    </div>
  </div>
</section>

<footer id="footer">
  <div class="container">
    <div class="footer-bottom">
      <span>NewHope Naija FC © 2026. All rights reserved.</span>
      <div class="footer-bottom-links"><a href="#home">${t('footerHome', 'Home')}</a><a href="#contact">${t('footerContact', 'Contact')}</a></div>
    </div>
  </div>
</footer>`;
}

function getYouTubeId(url) {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

function isVideoUrl(url) {
  return url && (url.includes('.mp4') || url.includes('.webm') || url.includes('.ogg'));
}

function getThumbnail(videoData) {
  if (videoData.image) return videoData.image;
  const ytId = getYouTubeId(videoData.link);
  // Return high-res YouTube thumbnail if possible
  if (ytId) return `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
  return null;
}

function renderVideoCard(v, index) {
  const thumb = getThumbnail(v);
  const ytId = getYouTubeId(v.link);
  const isVideo = isVideoUrl(v.link);
  
  let thumbHtml = '';
  if (v.image) {
    thumbHtml = `<img src="${v.image}" class="tv-card-thumb-img" alt="${v.title}" loading="lazy" />`;
  } else if (isVideo) {
    thumbHtml = `<video src="${v.link}" class="tv-card-thumb-video" muted autoplay loop playsinline poster="/images/logo.png"></video>`;
  } else if (thumb) {
    // YouTube high-res with mqdefault fallback
    thumbHtml = `<img src="${thumb}" class="tv-card-thumb-img" alt="${v.title}" loading="lazy" onerror="this.src='https://img.youtube.com/vi/${ytId}/mqdefault.jpg'" />`;
  } else {
    thumbHtml = `<div class="tv-card-thumb-placeholder"><span style="font-size:2.5rem;">${v.emoji || '📺'}</span></div>`;
  }

  return `
    <div class="tv-video-card reveal" data-index="${index}">
      <div class="tv-card-thumb">
        ${thumbHtml}
        <div class="tv-card-overlay">
          <div class="tv-card-play">
            <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
        ${v.comp ? `<div class="tv-card-badge">${v.comp}</div>` : ''}
      </div>
      <div class="tv-card-body">
        <div class="tv-card-title">${v.title}</div>
      </div>
    </div>`;
}

function loadVideoIntoPlayer(v) {
  const iframe = document.getElementById('tvIframe');
  const placeholder = document.getElementById('tvPlayerPlaceholder');
  const featuredComp = document.getElementById('tvFeaturedComp');
  const featuredTitle = document.getElementById('tvFeaturedTitle');
  const featuredDesc = document.getElementById('tvFeaturedDesc');
  const watchBtn = document.getElementById('tvWatchBtn');
  if (!iframe || !placeholder) return;

  featuredComp.textContent = v.comp || 'NewHope FC';
  featuredTitle.textContent = v.title;
  featuredDesc.textContent = v.description || t('tvDefaultDesc', 'Watch the full match highlights from NewHope Naija FC.');

  const ytId = getYouTubeId(v.link);
  if (ytId) {
    iframe.src = `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`;
    iframe.style.display = 'block';
    placeholder.style.display = 'none';
    watchBtn.href = v.link;
    watchBtn.style.display = 'inline-flex';
  } else if (v.link) {
    iframe.style.display = 'none';
    placeholder.style.display = 'flex';
    placeholder.innerHTML = `<div class="tv-player-logo">🔗</div><p>${t('tvExternalLink', 'External video link')}</p>`;
    watchBtn.href = v.link;
    watchBtn.style.display = 'inline-flex';
  } else {
    iframe.style.display = 'none';
    placeholder.style.display = 'flex';
    placeholder.innerHTML = `<div class="tv-player-logo">▶</div><p>${t('tvNoLink', 'No video link available')}</p>`;
    watchBtn.style.display = 'none';
  }

  // Scroll to player
  document.getElementById('tvFeaturedPlayer').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export async function init() {
  window.scrollTo(0, 0);
  let highlights = [];

  if (supabase) {
    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'home_highlights')
      .maybeSingle();

    if (!error && data?.value) {
      highlights = data.value;
    }
  }

  const grid = document.getElementById('tvVideoGrid');
  if (!grid) return;

  if (highlights.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding: 80px 0;">
        <div style="font-size: 4rem; margin-bottom: 16px; opacity: 0.2;">📺</div>
        <p style="color: var(--gray); font-size: 1rem;">${t('tvNoVideos', 'No videos have been uploaded yet.')}</p>
        <p style="color: var(--gray); font-size: 0.85rem; margin-top: 8px;">${t('tvCheckBack', 'Check back soon or ask an admin to add highlights in the dashboard.')}</p>
      </div>`;
    return;
  }

  // Render all cards
  grid.innerHTML = highlights.map((v, i) => renderVideoCard(v, i)).join('');

  // Card click handlers
  document.querySelectorAll('.tv-video-card').forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.dataset.index);
      loadVideoIntoPlayer(highlights[idx]);
      // Highlight active card
      document.querySelectorAll('.tv-video-card').forEach(c => c.classList.remove('tv-card-active'));
      card.classList.add('tv-card-active');
    });
  });

  // Auto-load first video
  if (highlights[0]) {
    loadVideoIntoPlayer(highlights[0]);
    document.querySelector('.tv-video-card')?.classList.add('tv-card-active');
  }
}
