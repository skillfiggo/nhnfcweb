import { supabase } from '../lib/supabase.js';
import { showToast } from '../lib/utils.js';

export const title = 'Reset Password';

export function render() {
  return `
    <div class="login-page-wrap">
      <div class="login-left">
        <div class="login-slide active" style="background-image: url('/images/hero-slide-3.jpg');"></div>
        <div class="login-overlay"></div>
        <div class="login-left-content">
          <img src="/images/logo.png" alt="Logo" class="login-brand-logo" />
          <h2 class="login-welcome-title">Secure Your <span>Account</span></h2>
          <p class="login-welcome-desc">Choose a strong, unique password to protect your NewHope Naija FC account.</p>
        </div>
      </div>
      
  <div class="login-right">
        <div class="login-form-container">
          <div class="login-header">
            <h2>Reset Your Password</h2>
            <p>Enter your new password below</p>
          </div>
          
          <form class="login-form" id="resetPasswordForm">
            <div class="form-group">
              <label for="newPassword">New Password</label>
              <div class="input-wrap">
                <span class="input-icon">🔒</span>
                <input type="password" id="newPassword" class="form-input" placeholder="Min. 6 characters" required minlength="6" />
              </div>
            </div>
            
            <div class="form-group">
              <label for="confirmPassword">Confirm Password</label>
              <div class="input-wrap">
                <span class="input-icon">🛡️</span>
                <input type="password" id="confirmPassword" class="form-input" placeholder="Repeat new password" required minlength="6" />
              </div>
            </div>
            
            <div id="resetError" class="auth-error" style="display: none; margin-bottom: 20px;"></div>
            
            <button type="submit" class="btn btn-primary login-submit-btn" id="resetSubmitBtn" style="width: 100%; justify-content: center;">
              Update Password
            </button>
          </form>
          
          <div class="login-footer">
            <p>Need help? <a href="#contact">Contact Support</a></p>
          </div>
        </div>
      </div>
    </div>
  `;
}

export async function init() {
  // Hide global elements
  const navbar = document.getElementById('navbar');
  const footer = document.getElementById('footer');
  const topbar = document.getElementById('topbar');
  if (navbar) navbar.style.display = 'none';
  if (footer) footer.style.display = 'none';
  if (topbar) topbar.style.display = 'none';

  window.addEventListener('hashchange', function onHash() {
    if (window.location.hash !== '#reset-password') {
      if (navbar) navbar.style.display = '';
      if (footer) footer.style.display = '';
      if (topbar) topbar.style.display = '';
      window.removeEventListener('hashchange', onHash);
    }
  });

  const form = document.getElementById('resetPasswordForm');
  const errorDiv = document.getElementById('resetError');
  const submitBtn = document.getElementById('resetSubmitBtn');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const pwd = document.getElementById('newPassword').value;
      const confirm = document.getElementById('confirmPassword').value;

      if (pwd !== confirm) {
        errorDiv.textContent = "Passwords do not match.";
        errorDiv.style.display = 'block';
        return;
      }

      errorDiv.style.display = 'none';
      submitBtn.textContent = 'Updating...';
      submitBtn.disabled = true;

      try {
        const { error } = await supabase.auth.updateUser({ password: pwd });

        if (error) throw error;
        
        submitBtn.textContent = 'Success! Redirecting to login...';
        showToast('Password updated successfully!');
        
        await supabase.auth.signOut();
        
        setTimeout(() => { window.location.hash = '#login'; }, 1500);

      } catch (error) {
        if (error.message && error.message.includes('Auth session missing')) {
          errorDiv.innerHTML = "<strong>Security Link Expired!</strong><br>We cannot verify your secure session. This usually happens if the link expired, if an email scanner clicked it automatically, or if you refreshed the page. Please request a FRESH password reset link.";
        } else {
          errorDiv.textContent = error.message;
        }
        errorDiv.style.display = 'block';
        submitBtn.textContent = 'Update Password';
        submitBtn.disabled = false;
      }
    });
  }
}
