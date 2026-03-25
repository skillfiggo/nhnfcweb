import { supabase } from '../lib/supabase.js';

export function render() {
  return `
    <div class="login-page-wrap">
      <div class="login-left">
        <div class="login-slide active" style="background-image: url('/images/hero-slide-2.jpg');"></div>
        <div class="login-overlay"></div>
        <div class="login-left-content">
          <img src="/images/logo.png" alt="Logo" class="login-brand-logo" />
          <h2 class="login-welcome-title">Welcome to the <span>Academy</span></h2>
          <p class="login-welcome-desc">Join the next generation of football stars. Set your secure password to access your player profile and training schedule.</p>
        </div>
      </div>
      
      <div class="login-right">
        <div class="login-form-container">
          <div class="login-header">
            <h2>Activate Your Account</h2>
            <p>Set a secure password for your new profile</p>
          </div>
          
          <form class="login-form" id="setupPasswordForm">
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
                <input type="password" id="confirmPassword" class="form-input" placeholder="Repeat password" required minlength="6" />
              </div>
            </div>
            
            <div id="setupError" class="auth-error" style="display: none; margin-bottom: 20px;"></div>
            
            <button type="submit" class="btn btn-primary login-submit-btn" id="setupSubmitBtn" style="width: 100%; justify-content: center;">
              Complete Registration
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

export function init() {
  // Hide global elements
  const navbar = document.getElementById('navbar');
  const footer = document.getElementById('footer');
  const topbar = document.getElementById('topbar');
  if (navbar) navbar.style.display = 'none';
  if (footer) footer.style.display = 'none';
  if (topbar) topbar.style.display = 'none';

  window.addEventListener('hashchange', function onHash() {
    if (window.location.hash !== '#setup-password') {
      if (navbar) navbar.style.display = '';
      if (footer) footer.style.display = '';
      if (topbar) topbar.style.display = '';
      window.removeEventListener('hashchange', onHash);
    }
  });

  const form = document.getElementById('setupPasswordForm');
  const errorDiv = document.getElementById('setupError');
  const submitBtn = document.getElementById('setupSubmitBtn');

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
      submitBtn.textContent = 'Saving...';
      submitBtn.disabled = true;

      const { error } = await supabase.auth.updateUser({ password: pwd });

      if (error) {
        errorDiv.textContent = error.message;
        errorDiv.style.display = 'block';
        submitBtn.textContent = 'Complete Registration';
        submitBtn.disabled = false;
      } else {
        submitBtn.textContent = 'Success! Redirecting...';
        setTimeout(() => { window.location.hash = '#player-dashboard'; }, 1500);
      }
    });
  }
}
