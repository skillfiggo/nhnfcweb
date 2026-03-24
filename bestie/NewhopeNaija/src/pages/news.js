import { supabase } from '../lib/supabase.js';

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
    <div class="news-grid" id="newsPageGrid">
      <div class="panel-loading" style="grid-column: 1/-1; text-align: center; color: var(--gray);">Loading news...</div>
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

  if (supabase) {
    supabase.from('news').select('*').eq('published', true).order('created_at', { ascending: false }).then(({ data, error }) => {
      const grid = document.getElementById('newsPageGrid');
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
          <div class="news-body"><div class="news-date">📅 ${new Date(n.created_at).toLocaleDateString()}</div><h2 class="news-title">${n.title}</h2><p class="news-excerpt">${n.body.substring(0, 150)}...</p></div>
          <div class="news-footer"><a href="#" class="news-read-more">Read Full Story →</a></div>
        </article>
      `).join('');
    });
  }
}
