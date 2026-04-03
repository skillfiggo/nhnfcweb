import { t } from '../i18n.js';

export const title = 'Our History';

export function render() {
  return `
<div class="page-hero" style="background-image: linear-gradient(rgba(7,7,15,0.8), rgba(7,7,15,0.8)), url('/images/hero-slide-1.jpg'); background-size: cover; background-position: center;">
  <div class="container">
    <h1 class="page-hero-title">${t('historyPageTitle', 'OUR HISTORY').replace('OUR ', 'OUR <span>').replace('HISTORY', 'HISTORY</span>')}</h1>
    <div class="breadcrumb"><a href="#home">Home</a><span class="breadcrumb-sep">/</span><span>${t('historyBreadcrumb', 'History')}</span></div>
  </div>
</div>

<section class="section">
  <div class="container">
      <div class="history-content-grid" style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 60px; align-items: center;">
        <div class="history-card reveal-left" style="background: white; padding: 48px; border-radius: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
          <div class="section-header" style="text-align: left; margin-bottom: 32px;">
            <h2 class="section-title" style="color: var(--red);">${t('historyFoundationTitle', 'FOUNDATION')} <span style="color: var(--red);">${t('historyFoundationSpan', '& ROOTS')}</span></h2>
            <p class="section-subtitle" style="color: var(--navy-dark); font-weight: 600;">${t('historyFoundationSub', 'The NewHope Naija Journey')}</p>
          </div>
          <div class="history-text">
            <p style="font-size: 1.1rem; line-height: 1.8; color: #1a1a1a; margin-bottom: 24px;">
              ${t('historyPara1', 'Founded with a vision to revolutionize youth football in Nigeria, NewHope Naija FC was established in 2025 in the historic city of Ijebu-Ode, Ogun State. Our journey started with a simple belief: that every talented young player deserves a path to professional excellence, regardless of their background.')}
            </p>
            <p style="font-size: 1.1rem; line-height: 1.8; color: #1a1a1a;">
              ${t('historyPara2', 'Over the years, we have grown from a handful of players into a premier developmental institution, producing international talents and competing at the highest levels of youth football. Our history is written in the sweat of our athletes and the dedication of our coaching staff.')}
            </p>
          </div>
        </div>
        <div class="history-feature-img" style="position: relative;">
          <div style="aspect-ratio: 4/5; background: var(--dark-2); border-radius: 12px; overflow: hidden; border: 1px solid var(--glass-border);">
            <img src="/images/hero-slide-2.jpg" alt="Club History" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.8;" />
          </div>
          <div style="position: absolute; bottom: -20px; right: -20px; width: 140px; height: 140px; background: var(--red); border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 12px 30px rgba(204,0,0,0.3); z-index: 2;">
            <span style="font-family: 'Staatliches', sans-serif; font-size: 2.5rem; color: white; line-height: 1;">2025</span>
            <span style="font-size: 0.7rem; color: rgba(255,255,255,0.8); letter-spacing: 1px; font-weight: 700; text-transform: uppercase;">${t('historyYearLabel', 'Year Established')}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section" style="background: var(--dark-2);">
  <div class="container">
    <div class="section-header reveal">
      <h2 class="section-title">${t('historyTimelineTitle', 'CLUB')} <span>${t('historyTimelineSpan', 'TIMELINE')}</span></h2>
      <p class="section-subtitle">${t('historyTimelineSub', 'Key Milestones & Achievements')}</p>
    </div>
    
    <div class="timeline">
      <div class="timeline-item reveal-left">
        <div class="timeline-dot"></div>
        <div class="timeline-date">${t('historyT1Date', 'JAN 2025')}</div>
        <div class="timeline-content">
          <h3>${t('historyT1Title', 'The Foundation')}</h3>
          <p>${t('historyT1Body', 'Official registration of NewHope Naija FC in Ijebu-Ode, Ogun State.')}</p>
        </div>
      </div>
      
      <div class="timeline-item reveal-right">
        <div class="timeline-dot"></div>
        <div class="timeline-date">${t('historyT2Date', 'JUN 2025')}</div>
        <div class="timeline-content">
          <h3>${t('historyT2Title', 'Academy Launch')}</h3>
          <p>${t('historyT2Body', 'First open trials held at Ijebu-Ode. Over 200 young talents attended.')}</p>
        </div>
      </div>
      
      <div class="timeline-item reveal-left">
        <div class="timeline-dot"></div>
        <div class="timeline-date">${t('historyT3Date', 'NOV 2025')}</div>
        <div class="timeline-content">
          <h3>${t('historyT3Title', 'Early Success')}</h3>
          <p>${t('historyT3Body', 'Secured our first trophy by winning the Ogun Youth Invitation Cup.')}</p>
        </div>
      </div>
      
      <div class="timeline-item reveal-right">
        <div class="timeline-dot"></div>
        <div class="timeline-date">${t('historyT4Date', '2026')}</div>
        <div class="timeline-content">
          <h3>${t('historyT4Title', 'The Digital Frontier')}</h3>
          <p>${t('historyT4Body', 'Launching of our official club website and the transition to a data-driven system.')}</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="mission-vision-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 32px;">
      <div class="mv-card reveal">
        <div class="mv-icon">🎯</div>
        <h3 class="mv-title">${t('historyMissionTitle', 'OUR MISSION')}</h3>
        <p class="mv-desc">${t('historyMissionDesc', 'To identify, nurture, and transition the most talented young Nigerian footballers into global professional careers.')}</p>
      </div>
      <div class="mv-card reveal">
        <div class="mv-icon">👁️</div>
        <h3 class="mv-title">${t('historyVisionTitle', 'OUR VISION')}</h3>
        <p class="mv-desc">${t('historyVisionDesc', 'To become the benchmark for youth football development in Africa.')}</p>
      </div>
      <div class="mv-card reveal">
        <div class="mv-icon">💎</div>
        <h3 class="mv-title">${t('historyValuesTitle', 'OUR VALUES')}</h3>
        <p class="mv-desc">${t('historyValuesDesc', 'Discipline, Excellence, Community, and Innovation.')}</p>
      </div>
    </div>
  </div>
</section>


<style>
.timeline {
  position: relative;
  max-width: 900px;
  margin: 60px auto 0;
  padding: 40px 0;
}
.timeline::after {
  content: '';
  position: absolute;
  width: 2px;
  background: var(--glass-border);
  top: 0; bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
.timeline-item {
  padding: 10px 40px;
  position: relative;
  width: 50%;
  box-sizing: border-box;
}
.timeline-item:nth-child(odd) { left: 0; text-align: right; }
.timeline-item:nth-child(even) { left: 50%; text-align: left; }

.timeline-dot {
  position: absolute;
  width: 20px; height: 20px;
  background: var(--red);
  border: 4px solid var(--dark);
  border-radius: 50%;
  top: 15px;
  z-index: 1;
}
.timeline-item:nth-child(odd) .timeline-dot { right: -10px; }
.timeline-item:nth-child(even) .timeline-dot { left: -10px; }

.timeline-date {
  font-family: 'Staatliches', sans-serif;
  font-size: 1.5rem;
  color: var(--red-light);
  margin-bottom: 8px;
}

.timeline-content {
  background: var(--glass-bg);
  padding: 24px;
  border-radius: 12px;
  border: 1px solid var(--glass-border);
}
.timeline-content h3 {
  font-family: 'Bebas Neue', cursive;
  font-size: 1.4rem;
  margin-bottom: 12px;
  color: var(--white);
  letter-spacing: 1px;
}
.timeline-content p {
  color: var(--gray);
  line-height: 1.6;
}

.mv-card {
  background: var(--glass-bg);
  padding: 40px;
  border-radius: 20px;
  border: 1px solid var(--glass-border);
  text-align: center;
  transition: transform 0.3s ease;
}
.mv-card:hover { transform: translateY(-10px); background: rgba(255,255,255,0.05); }
.mv-icon { font-size: 3rem; margin-bottom: 24px; }
.mv-title { font-family: 'Bebas Neue', cursive; font-size: 1.8rem; margin-bottom: 16px; letter-spacing: 2px; color: var(--white); }
.mv-desc { color: var(--gray); line-height: 1.7; font-size: 1.05rem; }

@media (max-width: 768px) {
  .timeline::after { left: 31px; }
  .timeline-item { width: 100%; padding-left: 70px; padding-right: 25px; text-align: left !important; }
  .timeline-item:nth-child(even) { left: 0; }
  .timeline-dot { left: 21px !important; }
  .history-content-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
}
</style>

<footer id="footer">
  <div class="container">
    <div class="footer-bottom">
      <span>NewHope Naija FC © 2026. All rights reserved.</span>
      <div class="footer-bottom-links"><a href="#home">Home</a><a href="#contact">Contact</a></div>
    </div>
  </div>
</footer>
`;
}

export function init() {
  // Page initialization logic if needed
}
