import { supabase } from '../lib/supabase.js';
import { showToast } from '../lib/utils.js';

export const title = 'Forgot Password';

export function render() {
  return `
    <div class="login-page-wrap">
      <div class="login-left">
        <div class="login-slide active" style="background-image: url('/images/hero-slide-1.jpg');"></div>
        <div class="login-overlay"></div>
        
        <div class="login-left-content">
          <img src="/images/logo.png" alt="Logo" class="login-brand-logo" />
          <h2 class="login-welcome-title">Recover Your <span>Account</span></h2>
          <p class="login-welcome-desc">Don't worry! Enter your registered email address and we will send you a secure link to reset your password.</p>
        </div>
      </div>
      
      <div class="login-right">
        <div class="login-form-container">
          <div class="login-header">
            <a href="#login" class="login-back-btn">← Back to Login</a>
            <h2>Forgot Password</h2>
            <p>Enter your email address to receive a recovery link.</p>
          </div>
          
          <form class="login-form" id="forgotPasswordForm">
            <div class="form-group">
              <label for="resetEmail">Email Address</label>
              <div class="input-wrap">
                <span class="input-icon">✉️</span>
                <input type="email" id="resetEmail" class="form-input" placeholder="Enter your registered email" required />
              </div>
            </div>
            
            <button type="submit" class="btn btn-primary login-submit-btn" id="forgotSubmitBtn">
              Send Recovery Email
            </button>
          </form>
          
          <div class="login-footer">
            <p>Remembered your password? <a href="#login">Sign In</a></p>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function init() {
  // Hide Navbar and Footer when in Login Page to make it a full-screen experience
  const navbar = document.getElementById('navbar');
  const footer = document.getElementById('footer');
  const topbar = document.getElementById('topbar');
  
  if (navbar) navbar.style.display = 'none';
  if (footer) footer.style.display = 'none';
  if (topbar) topbar.style.display = 'none';
  
  window.addEventListener('hashchange', function onHashChange() {
    if (window.location.hash !== '#forgot-password') {
      if (navbar) navbar.style.display = '';
      if (footer) footer.style.display = '';
      if (topbar) topbar.style.display = '';
      window.removeEventListener('hashchange', onHashChange);
    }
  });

  const form = document.getElementById('forgotPasswordForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      if (!supabase) {
        showToast('Supabase is not configured!', 'error');
        return;
      }

      const btn = document.getElementById('forgotSubmitBtn');
      const email = document.getElementById('resetEmail').value;

      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.style.opacity = '0.7';
      btn.style.pointerEvents = 'none';
      
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          // Pass the clean origin without a hash, so Supabase can safely append #access_token
          // Our router already intercepts type=recovery and securely routes the user.
          redirectTo: window.location.origin + '/'
        });

        if (error) throw error;

        showToast('Recovery email sent! Please check your inbox.', 'info');
        form.reset();
      } catch (error) {
        showToast('Error: ' + error.message, 'error');
      } finally {
        btn.textContent = originalText;
        btn.style.opacity = '1';
        btn.style.pointerEvents = 'auto';
      }
    });
  }
}
