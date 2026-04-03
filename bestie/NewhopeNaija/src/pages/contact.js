import { t } from '../i18n.js';
import { supabase } from '../lib/supabase.js';
import { showToast } from '../lib/utils.js';

export const title = 'Contact Us';

export function render() {
  return `
<!-- Hero Section (Homepage Style) -->
<section id="hero" style="min-height: 80vh;">
  <div class="hero-slides">
    <div class="hero-slide active">
      <div class="hero-bg"></div>
      <div class="hero-bg-image" style="background-image: url('/images/contact-hero.jpg');"></div>
      <div class="hero-gradient"></div>
      <div class="hero-pattern"></div>
      <div class="hero-grid-lines"></div>
      <div class="container slide-content-wrap">
        <div class="hero-content" style="padding-top: 220px;">
          <div class="hero-left">
            <div class="hero-tag">
              <span class="dot"></span>
              ${t('contactHeroTag', 'CONTACT US')}
            </div>
            <h1 class="hero-title">
              ${t('contactHeroTitleA', 'GET IN')}<br>
              <span class="red">${t('contactHeroTitleB', 'TOUCH')}</span>
            </h1>
            <p class="hero-desc">
              ${t('contactDesc', 'Have questions about trials, sponsorships, or general inquiries? We would love to hear from you.')}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Contact Details & Form Section -->
<section class="section" style="background-color: var(--dark-2); position: relative; z-index: 10; margin-top: -60px; padding-top: 100px;">
  <div class="container">
    <div class="contact-grid">
      
      <!-- Left Column: Info Cards -->
      <div class="contact-info-col">
        <div class="section-header" style="text-align: left; margin-bottom: 32px;">
          <h2 class="section-title" style="font-size: 2.2rem;">${t('contactClubDetails', 'CLUB')} <span>${t('contactClubDetails', 'DETAILS')}</span></h2>
          <p class="section-subtitle">${t('contactReachOut', 'Reach out directly')}</p>
        </div>
        
        <div class="contact-info-cards">
          <div class="info-card">
            <div class="info-icon">✉️</div>
            <div class="info-content">
              <h3>${t('contactEmailTitle', 'Email Us')}</h3>
              <p><a href="mailto:newhopenaijafc@gmail.com">newhopenaijafc@gmail.com</a></p>
            </div>
          </div>
          
          <div class="info-card">
            <div class="info-icon">📞</div>
            <div class="info-content">
              <h3>${t('contactPhoneTitle', 'Call Us')}</h3>
              <p>+234 8093578888</p>
              <p>${t('contactPhoneHours', 'Mon - Fri, 9:00 AM - 5:00 PM')}</p>
            </div>
          </div>
          
          <div class="info-card">
            <div class="info-icon">📍</div>
            <div class="info-content">
              <h3>${t('contactVisitTitle', 'Visit Us')}</h3>
              <p>${t('contactVisitAddress', 'No.111 Ejinrin road, Orunfan Junction,<br>Ijebu-Ode, Ogun State, Nigeria')}</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Right Column: Form -->
      <div class="contact-form-col">
        <div class="contact-form-wrapper">
          <h3 class="form-title">${t('contactFormTitle', 'Send a Message')}</h3>
          <form class="contact-form" id="contactForm" onsubmit="event.preventDefault();">
            <div class="form-row">
              <div class="form-group">
                <label for="name">${t('contactFieldName', 'Your Name')}</label>
                <input type="text" id="name" class="form-input" placeholder="${t('contactPlaceholderName', 'John Doe')}" required>
              </div>
              <div class="form-group">
                <label for="email">${t('contactFieldEmail', 'Email Address')}</label>
                <input type="email" id="email" class="form-input" placeholder="${t('contactPlaceholderEmail', 'john@example.com')}" required>
              </div>
            </div>
            <div class="form-group">
              <label for="subject">${t('contactFieldSubject', 'Subject')}</label>
              <select id="subject" class="form-input">
                <option value="general">${t('contactSubjectGeneral', 'General Inquiry')}</option>
                <option value="trials">${t('contactSubjectTrials', 'Academy Trials')}</option>
                <option value="sponsorship">${t('contactSubjectSponsorship', 'Sponsorship')}</option>
                <option value="press">${t('contactSubjectPress', 'Press & Media')}</option>
              </select>
            </div>
            <div class="form-group" style="margin-top: 15px;">
              <label for="message" style="margin-bottom: 10px; display: block;">${t('contactFieldMessage', 'Message')}</label>
              <div class="form-textarea-wrapper">
                <textarea id="message" class="form-textarea-premium" rows="7" placeholder="${t('contactPlaceholderMsg', 'How can we help you?')}" required></textarea>
              </div>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center;">${t('contactSendBtn', 'Send Message')}</button>
          </form>
        </div>
      </div>
      
    </div>
  </div>
</section>

${footerHTML()}
`;
}

export function init() {
  window.scrollTo(0, 0);

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = t('loading', 'Sending...');

      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
      };

      try {
        if (!supabase) throw new Error('Supabase not initialized');

        // 1. Save to Database
        const { error: dbError } = await supabase
          .from('contact_messages')
          .insert([formData]);

        if (dbError) throw dbError;

        // 2. Send Email Notification via Edge Function
        // Notifying the club admin about the new message
        const emailBody = `
          <h2>New Contact Message</h2>
          <p><strong>From:</strong> ${formData.name} (${formData.email})</p>
          <p><strong>Subject:</strong> ${formData.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${formData.message.replace(/\n/g, '<br>')}</p>
        `;

        await supabase.functions.invoke('send-email', {
          body: {
            to: 'newhopenaijafc@gmail.com',
            subject: `New Contact: ${formData.subject}`,
            html: emailBody
          }
        }).catch(err => console.warn('Email notification failed:', err));

        showToast(t('contactSuccess', 'Message sent successfully! We will get back to you soon.'), 'success');
        contactForm.reset();
      } catch (error) {
        console.error('Contact form error:', error);
        showToast(t('contactError', 'Failed to send message. Please try again later.'), 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
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
      <p class="footer-brand-desc">${t('heroDesc1') || 'Empowering the next generation of football stars.'}</p>
      <div class="footer-socials">
        <a href="#" class="footer-social" title="Twitter/X">
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <a href="#" class="footer-social" title="Instagram">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
        </a>
        <a href="#" class="footer-social" title="TikTok">
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2-1.74 2.89 2.89 0 0 1 2.89-2.89 2.89 2.89 0 0 1 1.5.42V7.71a6.08 6.08 0 0 0-4.39-.51 6.32 6.32 0 0 0-4.63 4.29 6.3 6.3 0 0 0 1 6.39 6.32 6.32 0 0 0 5.09 2.05 6.32 6.32 0 0 0 6.06-6.19V8.67a8.21 8.21 0 0 0 4.9 1.63V6.86a4.81 4.81 0 0 1-0-0.17z"/></svg>
        </a>
        <a href="#" class="footer-social" title="YouTube">
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
