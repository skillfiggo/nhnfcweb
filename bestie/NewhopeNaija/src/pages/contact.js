export const title = 'Contact Us';

export function render() {
  return `
<style>
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
  .contact-form { background: var(--card-bg); border: 1px solid var(--glass-border); border-radius: var(--radius); padding: 36px; }
  .form-group { margin-bottom: 20px; }
  .form-label { display: block; font-size: 0.75rem; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: var(--light-gray); margin-bottom: 8px; }
  .form-input, .form-textarea, .form-select { width: 100%; padding: 12px 16px; border-radius: var(--radius-sm); background: var(--dark-3); border: 1px solid var(--glass-border); color: var(--white); font-family: 'Inter', sans-serif; font-size: 0.9rem; transition: var(--transition); outline: none; }
  .form-input:focus, .form-textarea:focus, .form-select:focus { border-color: var(--red); box-shadow: 0 0 0 3px rgba(204,0,0,0.1); }
  .form-textarea { min-height: 120px; resize: vertical; }
  .form-select option { background: var(--dark-2); }
  .contact-info { display: flex; flex-direction: column; gap: 20px; }
  .info-card { background: var(--card-bg); border: 1px solid var(--glass-border); border-radius: var(--radius); padding: 24px; display: flex; gap: 16px; align-items: flex-start; transition: var(--transition); }
  .info-card:hover { border-color: rgba(204,0,0,0.3); transform: translateX(4px); }
  .info-icon { font-size: 1.8rem; flex-shrink: 0; }
  .info-title { font-family: 'Oswald', sans-serif; font-size: 0.85rem; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: var(--red-light); margin-bottom: 4px; }
  .info-text { font-size: 0.88rem; color: var(--light-gray); line-height: 1.6; }
  @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr; } }
</style>

<div class="page-hero">
  <div class="container">
    <h1 class="page-hero-title">Contact <span>Us</span></h1>
    <div class="breadcrumb"><a href="#home">Home</a><span class="breadcrumb-sep">/</span><span>Contact</span></div>
  </div>
</div>

<section class="section">
  <div class="container">
    <div class="contact-grid">
      <div class="contact-form reveal">
        <h2 style="font-family:'Bebas Neue',cursive;font-size:1.8rem;letter-spacing:2px;margin-bottom:6px;">Send Us a <span style="color:var(--red)">Message</span></h2>
        <p style="color:var(--gray);font-size:0.85rem;margin-bottom:24px;">We'll get back to you within 24 hours.</p>
        <form id="contactForm">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
            <div class="form-group"><label class="form-label">First Name</label><input type="text" class="form-input" placeholder="Emeka" required /></div>
            <div class="form-group"><label class="form-label">Last Name</label><input type="text" class="form-input" placeholder="Okafor" required /></div>
          </div>
          <div class="form-group"><label class="form-label">Email Address</label><input type="email" class="form-input" placeholder="emeka@example.com" required /></div>
          <div class="form-group"><label class="form-label">Phone Number</label><input type="tel" class="form-input" placeholder="+234 800 000 0000" /></div>
          <div class="form-group">
            <label class="form-label">Subject</label>
            <select class="form-select">
              <option>Trial Registration</option>
              <option>General Enquiry</option>
              <option>Sponsorship &amp; Partnership</option>
              <option>Media &amp; Press</option>
              <option>Other</option>
            </select>
          </div>
          <div class="form-group"><label class="form-label">Message</label><textarea class="form-textarea" placeholder="Write your message here..."></textarea></div>
          <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center;">Send Message ✉️</button>
        </form>
        <div id="formSuccess" style="display:none;margin-top:16px;background:rgba(0,200,83,0.1);border:1px solid rgba(0,200,83,0.3);color:#00c853;padding:14px 16px;border-radius:8px;font-size:0.88rem;text-align:center;">
          ✅ Message sent successfully! We'll be in touch soon.
        </div>
      </div>

      <div class="contact-info reveal-right">
        <div class="info-card">
          <div class="info-icon">📍</div>
          <div><div class="info-title">Location</div><div class="info-text">NewHope Naija FC Academy Ground<br/>Surulere Sports Complex, Lagos<br/>Lagos State, Nigeria</div></div>
        </div>
        <div class="info-card">
          <div class="info-icon">✉️</div>
          <div><div class="info-title">Email</div><div class="info-text">info@newhopefc.ng<br/>trials@newhopefc.ng</div></div>
        </div>
        <div class="info-card">
          <div class="info-icon">📞</div>
          <div><div class="info-title">Phone</div><div class="info-text">+234 123 456 7890<br/>+234 098 765 4321</div></div>
        </div>
        <div class="info-card">
          <div class="info-icon">🕐</div>
          <div><div class="info-title">Training Hours</div><div class="info-text">Monday – Friday: 6:00 AM – 9:00 AM<br/>Saturday: 7:00 AM – 11:00 AM<br/>Sunday: Rest Day</div></div>
        </div>
        <div>
          <div style="font-family:'Oswald',sans-serif;font-size:0.85rem;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:var(--white);margin-bottom:12px;">Follow Us</div>
          <div style="display:flex;gap:10px;flex-wrap:wrap;">
            <a href="#" class="footer-social" title="Instagram">📷</a>
            <a href="#" class="footer-social" title="Twitter/X">✖</a>
            <a href="#" class="footer-social" title="Facebook">📘</a>
            <a href="#" class="footer-social" title="YouTube">▶</a>
            <a href="#" class="footer-social" title="WhatsApp">💬</a>
            <a href="#" class="footer-social" title="TikTok">🎵</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<footer id="footer">
  <div class="container">
    <div class="footer-bottom">
      <span>NewHope Naija FC © 2026. All rights reserved.</span>
      <div class="footer-bottom-links"><a href="#home">Home</a><a href="#">Privacy Policy</a></div>
    </div>
  </div>
</footer>`;
}

export function init() {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      document.getElementById('formSuccess').style.display = 'block';
      form.reset();
    });
  }
}
