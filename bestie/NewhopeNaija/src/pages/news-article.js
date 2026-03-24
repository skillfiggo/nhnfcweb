import { supabase } from '../lib/supabase.js';

export const title = 'News Article';

export function render() {
  return `
<div class="page-hero">
  <div class="container">
    <h1 class="page-hero-title">Latest <span>News</span></h1>
    <div class="breadcrumb"><a href="#home">Home</a><span class="breadcrumb-sep">/</span><a href="#news">News</a><span class="breadcrumb-sep">/</span><span>Article</span></div>
  </div>
</div>

<section class="section">
  <div class="container">
    <div id="articleContent">
      <div class="panel-loading" style="text-align: center; color: var(--gray); font-size: 1.2rem; padding: 40px;">Loading full story...</div>
    </div>
  </div>
</section>
`;
}

export function init() {
  const hash = window.location.hash;
  const urlParams = new URLSearchParams(hash.split('?')[1]);
  const articleId = urlParams.get('id');

  if (!articleId || !supabase) {
    document.getElementById('articleContent').innerHTML = '<p class="table-empty">Article not found.</p>';
    return;
  }

  supabase.from('news').select('*').eq('id', articleId).single().then(({ data, error }) => {
    const container = document.getElementById('articleContent');
    if (!container) return;
    if (error || !data) {
      container.innerHTML = '<p class="table-empty">Article not found or has been deleted.</p>';
      return;
    }

    const imgHTML = data.image_url 
      ? `<img src="${data.image_url}" alt="News Image" style="width:100%; max-height: 500px; object-fit:cover; border-radius: 8px; margin-bottom: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">`
      : `<div style="width:100%; height:80px; background:linear-gradient(135deg,var(--navy-dark),var(--red-dark)); border-radius:8px; margin-bottom:24px;"></div>`;

    container.innerHTML = `
      <article class="single-article" style="max-width: 800px; margin: 0 auto; background: #ffffff; padding: 40px 30px; border-radius: 12px; box-shadow: 0 5px 20px rgba(0,0,0,0.08);">
        <header style="margin-bottom: 24px; text-align: center;">
          <h1 style="font-size: 2.8rem; color: var(--navy-dark); margin-bottom: 12px; font-family: 'Oswald', sans-serif; line-height: 1.2;">${data.title}</h1>
          <div class="news-date" style="color: var(--gray); font-weight: 500; font-size: 1.1rem;">Published on ${new Date(data.created_at).toLocaleDateString()}</div>
        </header>
        ${imgHTML}
        <div class="article-body" style="font-size: 1.15rem; line-height: 1.8; color: #222; white-space: pre-wrap; font-family: 'Inter', sans-serif;">
          ${data.body}
        </div>
        <div style="margin-top: 60px; text-align: center; border-top: 1px solid #eee; padding-top: 30px;">
          <a href="#news" class="btn" style="background-color: #cc0000; border-color: #cc0000; color: white;">← Return to News</a>
        </div>
      </article>
    `;
  });
}
