import { supabase } from '../lib/supabase.js';
import { getLang } from '../i18n.js';

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


  if (supabase) {
    supabase.from('news').select('*').eq('published', true).order('created_at', { ascending: false }).then(({ data, error }) => {
      const grid = document.getElementById('newsPageGrid');
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
          <div class="news-body"><div class="news-date">📅 ${new Date(n.created_at).toLocaleDateString()}</div><h2 class="news-title">${title}</h2><p class="news-excerpt">${body.substring(0, 150)}...</p></div>
          <div class="news-footer"><a href="#news-article?id=${n.id}" class="news-read-more">Read Full Story →</a></div>
        </article>`;
      }).join('');
    });
  }
}
