export const title = 'Gallery';

export function render() {
  return `
<div class="page-hero">
  <div class="container">
    <h1 class="page-hero-title">Photo <span>Gallery</span></h1>
    <div class="breadcrumb"><a href="#home">Home</a><span class="breadcrumb-sep">/</span><span>Gallery</span></div>
  </div>
</div>

<section class="section">
  <div class="container">
    <div class="players-tabs" style="margin-bottom:40px;">
      <button class="player-tab active">All Photos</button>
      <button class="player-tab">Match Day</button>
      <button class="player-tab">Training</button>
      <button class="player-tab">Events</button>
    </div>
    <div class="gallery-masonry" style="columns:4;">
      <div class="gallery-item"><div class="gallery-placeholder" style="height:240px;background:linear-gradient(135deg,#cc000044,#001f5b33);font-size:3rem;">⚽</div><div class="gallery-overlay">🔍</div></div>
      <div class="gallery-item"><div class="gallery-placeholder" style="height:180px;background:linear-gradient(135deg,#001f5b44,#cc000033);font-size:3rem;">🏆</div><div class="gallery-overlay">🔍</div></div>
      <div class="gallery-item"><div class="gallery-placeholder" style="height:300px;background:linear-gradient(135deg,#cc000033,#001f5b55);font-size:3rem;">🦅</div><div class="gallery-overlay">🔍</div></div>
      <div class="gallery-item"><div class="gallery-placeholder" style="height:200px;background:linear-gradient(135deg,#001f5b33,#cc000055);font-size:3rem;">👥</div><div class="gallery-overlay">🔍</div></div>
      <div class="gallery-item"><div class="gallery-placeholder" style="height:200px;background:linear-gradient(135deg,#cc000055,#001f5b22);font-size:3rem;">📸</div><div class="gallery-overlay">🔍</div></div>
      <div class="gallery-item"><div class="gallery-placeholder" style="height:260px;background:linear-gradient(135deg,#001f5b55,#cc000033);font-size:3rem;">🎯</div><div class="gallery-overlay">🔍</div></div>
      <div class="gallery-item"><div class="gallery-placeholder" style="height:180px;background:linear-gradient(135deg,#cc000022,#001f5b44);font-size:3rem;">💪</div><div class="gallery-overlay">🔍</div></div>
      <div class="gallery-item"><div class="gallery-placeholder" style="height:220px;background:linear-gradient(135deg,#001f5b22,#cc000044);font-size:3rem;">🌟</div><div class="gallery-overlay">🔍</div></div>
      <div class="gallery-item"><div class="gallery-placeholder" style="height:160px;background:linear-gradient(135deg,#cc000033,#001f5b44);font-size:3rem;">🎉</div><div class="gallery-overlay">🔍</div></div>
      <div class="gallery-item"><div class="gallery-placeholder" style="height:240px;background:linear-gradient(135deg,#001f5b44,#cc000022);font-size:3rem;">⚡</div><div class="gallery-overlay">🔍</div></div>
      <div class="gallery-item"><div class="gallery-placeholder" style="height:200px;background:linear-gradient(135deg,#cc000055,#001f5b33);font-size:3rem;">🏟️</div><div class="gallery-overlay">🔍</div></div>
      <div class="gallery-item"><div class="gallery-placeholder" style="height:180px;background:linear-gradient(135deg,#001f5b33,#cc000055);font-size:3rem;">🥅</div><div class="gallery-overlay">🔍</div></div>
    </div>
  </div>
</section>

<!-- Video Highlights -->
<section class="section" style="background:var(--dark-2);">
  <div class="container">
    <div class="section-header reveal">
      <h2 class="section-title">Video <span>Highlights</span></h2>
      <p class="section-subtitle">Watch Our Best Moments</p>
    </div>
    <div class="highlights-grid">
      <div class="highlight-card featured">
        <div class="highlight-thumb"><div class="highlight-overlay"></div>
          <div class="highlight-play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div>
          <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:5rem;opacity:0.12;">🏟️</div></div>
        <div class="highlight-body"><div class="highlight-comp">Lagos Youth League · MD 14</div><div class="highlight-title">NEWHOPE NAIJA FC 3 – 1 SUNRISE FC · Full Match</div></div>
      </div>
      <div class="highlight-card">
        <div class="highlight-thumb" style="height:180px;"><div class="highlight-overlay"></div>
          <div class="highlight-play" style="width:44px;height:44px;"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div>
          <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:4rem;opacity:0.12;">⚡</div></div>
        <div class="highlight-body"><div class="highlight-comp">NNL Cup · MD 11</div><div class="highlight-title">NEWHOPE NAIJA FC 2 – 0 VICTORIA ISLAND FC</div></div>
      </div>
      <div class="highlight-card">
        <div class="highlight-thumb" style="height:180px;"><div class="highlight-overlay"></div>
          <div class="highlight-play" style="width:44px;height:44px;"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div>
          <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:4rem;opacity:0.12;">🎯</div></div>
        <div class="highlight-body"><div class="highlight-comp">Friendly</div><div class="highlight-title">NEWHOPE NAIJA FC 4 – 0 LAGOS STARS</div></div>
      </div>
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
  // Tab filter (visual)
  const tabs = document.querySelectorAll('.players-tabs .player-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });
}
