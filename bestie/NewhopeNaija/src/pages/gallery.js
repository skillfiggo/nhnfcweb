import { supabase } from '../lib/supabase.js';
import { t } from '../i18n.js';

export const title = 'Gallery';

export function render() {
  return `
<div class="page-hero">
  <div class="container">
    <h1 class="page-hero-title">${t('galleryPageTitle', 'Photo <span>Gallery</span>')}</h1>
    <div class="breadcrumb"><a href="#home">${t('footerHome', 'Home')}</a><span class="breadcrumb-sep">/</span><span>${t('historyGallery', 'Gallery')}</span></div>
  </div>
</div>

<section class="section">
  <div class="container">
    <div class="section-header reveal">
      <h2 class="section-title">${t('gallerySectionTitle', 'Club <span>Moments</span>')}</h2>
      <p class="section-subtitle">${t('gallerySectionSub', 'A Glimpse into NewHope Naija FC')}</p>
    </div>

    <div class="players-tabs" style="margin-bottom:40px;" id="galleryTabs">
      <button class="player-tab active" data-category="all">${t('galleryTabAll', 'All Photos')}</button>
      <button class="player-tab" data-category="Match Day">${t('galleryTabMatchDay', 'Match Day')}</button>
      <button class="player-tab" data-category="Training">${t('galleryTabTraining', 'Training')}</button>
      <button class="player-tab" data-category="Events">${t('galleryTabEvents', 'Events')}</button>
    </div>

    <div class="gallery-masonry" id="galleryGrid">
      <div class="panel-loading" style="grid-column: 1/-1; text-align:center; padding: 100px 0;">
        <div class="loader-spinner" style="margin: 0 auto 20px;"></div>
        <p style="color: var(--gray); font-weight: 500;">${t('loading', 'Loading our story...')}</p>
      </div>
    </div>
  </div>
</section>

<!-- Video Highlights -->
<section class="section" style="background:var(--dark-2);">
  <div class="container">
    <div class="section-header reveal">
      <h2 class="section-title">${t('galleryVideoTitle', 'Video <span>Highlights</span>')}</h2>
      <p class="section-subtitle">${t('highlightsSub', 'Watch Our Best Moments')}</p>
    </div>
    <div class="highlights-grid" id="galleryVideoGrid">
      <div class="panel-loading" style="grid-column:1/-1;text-align:center;color:var(--gray); padding: 40px 0;">
        <div class="loader-spinner" style="margin: 0 auto 15px; width:30px; height:30px;"></div>
        ${t('loading', 'Loading highlights...')}
      </div>
    </div>
  </div>
</section>

<!-- Lightbox Modal -->
<div class="modal-overlay" id="galleryLightbox">
  <div class="lightbox-content">
    <button class="modal-close" id="closeLightbox">✕</button>
    <img id="lightboxImg" src="" alt="" />
    <div id="lightboxCaption" class="lightbox-caption"></div>
  </div>
</div>

<footer id="footer">
  <div class="container">
    <div class="footer-bottom">
      <span>NewHope Naija FC © 2026. All rights reserved.</span>
      <div class="footer-bottom-links"><a href="#home">${t('footerHome', 'Home')}</a><a href="#contact">${t('footerContact', 'Contact')}</a></div>
    </div>
  </div>
</footer>
`;
}

export async function init() {
  window.scrollTo(0, 0);
  let allPhotos = [];
  let currentCategory = 'all';

  async function fetchPhotos() {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('gallery_photos')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      console.error('[Gallery] Supabase fetch error:', error);
      const grid = document.getElementById('galleryGrid');
      if (grid) {
        grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding: 80px 0; color: var(--gray);">
          <p>Could not load photos. Check console for details.</p>
          <p style="font-size:0.8rem; opacity:0.6; margin-top:8px;">${error.message}</p>
        </div>`;
      }
      return [];
    }
    return data || [];
  }

  function renderPhotos(photos) {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;

    if (!photos || photos.length === 0) {
      grid.innerHTML = `
        <div style="grid-column:1/-1; text-align:center; padding: 80px 0; background: rgba(255,255,255,0.02); border-radius: 20px; border: 1px dashed var(--glass-border);">
          <div style="font-size: 3rem; margin-bottom: 16px; opacity: 0.2;">🖼️</div>
          <p style="color: var(--gray); font-size: 1.1rem;">${t('noPhotos', 'No photos found in this category yet.')}</p>
          <p style="color: var(--gray-dark); font-size: 0.85rem; margin-top: 8px;">${t('noPhotosSub', 'Check back later for match updates!')}</p>
        </div>`;
      return;
    }


    grid.innerHTML = photos.map(p => `
      <div class="gallery-item" data-img="${p.image_url}" data-caption="${p.caption || ''}">
        <img src="${p.image_url}" alt="${p.caption || 'Gallery Photo'}" loading="lazy" />
        <div class="gallery-overlay">
          <span class="gallery-zoom-icon">🔍</span>
          ${p.category ? `<span class="gallery-tag">${p.category}</span>` : ''}
        </div>
      </div>
    `).join('');

    // Add Lightbox Event Listeners
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        const img = item.dataset.img;
        const caption = item.dataset.caption;
        const modal = document.getElementById('galleryLightbox');
        const modalImg = document.getElementById('lightboxImg');
        const modalCaption = document.getElementById('lightboxCaption');
        
        modalImg.src = img;
        modalCaption.textContent = caption;
        modal.classList.add('active');
      });
    });
  }

  // Close Lightbox
  document.getElementById('closeLightbox')?.addEventListener('click', () => {
    document.getElementById('galleryLightbox').classList.remove('active');
  });
  document.getElementById('galleryLightbox')?.addEventListener('click', (e) => {
    if (e.target.id === 'galleryLightbox') {
      document.getElementById('galleryLightbox').classList.remove('active');
    }
  });

  // Initial load
  allPhotos = await fetchPhotos();
  renderPhotos(allPhotos);

  // Tab filter
  const tabs = document.querySelectorAll('#galleryTabs .player-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.dataset.category;
      
      const filtered = currentCategory === 'all' 
        ? allPhotos 
        : allPhotos.filter(p => p.category === currentCategory);
      
      renderPhotos(filtered);
    });
  });

  // Fetch Highlights
  if (supabase) {
    supabase.from('site_settings').select('value').eq('key', 'home_highlights').maybeSingle().then(({ data }) => {
      const highlights = data?.value || [];
      const grid = document.getElementById('galleryVideoGrid');
      if (!grid) return;
      
      if (highlights.length === 0) {
        grid.innerHTML = `<p style="grid-column:1/-1; text-align:center; color:var(--gray); padding: 40px 0;">${t('noHighlights', 'No video highlights available available.')}</p>`;
        return;
      }

      grid.innerHTML = highlights.map(h => {
        const thumbContent = h.image
          ? `<img src="${h.image}" alt="${h.title}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;" />`
          : `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:5rem;opacity:0.15;">${h.emoji || '⚽'}</div>`;
        const cardTag = h.link ? `a href="${h.link}" target="_blank" rel="noopener"` : 'div';
        const cardClose = h.link ? 'a' : 'div';
        return `
          <${cardTag} class="highlight-card reveal">
            <div class="highlight-thumb">
              <div class="highlight-overlay"></div>
              <div class="highlight-play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div>
              ${thumbContent}
            </div>
            <div class="highlight-body">
              <div class="highlight-comp">${h.comp}</div>
              <div class="highlight-title">${h.title}</div>
            </div>
          </${cardClose}>`;
      }).join('');
    });
  }
}
