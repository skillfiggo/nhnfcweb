import { supabase } from '../lib/supabase.js';

export const title = 'Set Your Password';

export function render() {
  return `
    <section class="auth-section">
      <div class="auth-container reveal">
        <h2 class="auth-title">Welcome to the Team!</h2>
        <p class="auth-subtitle">Please set a secure password for your account to continue.</p>
        <form id="setupPasswordForm" class="auth-form">
          <div class="form-group">
            <label>New Password</label>
            <input type="password" id="newPassword" class="form-input" required minlength="6" />
          </div>
          <div class="form-group">
            <label>Confirm Password</label>
            <input type="password" id="confirmPassword" class="form-input" required minlength="6" />
          </div>
          <div id="setupError" class="auth-error" style="display: none;"></div>
          <button type="submit" class="auth-submit btn btn-primary w-100" id="setupSubmitBtn">Set Password</button>
        </form>
      </div>
    </section>
  `;
}

export function init() {
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
      errorDiv.textContent = "";
      submitBtn.textContent = 'Saving...';
      submitBtn.disabled = true;

      const { data, error } = await supabase.auth.updateUser({
        password: pwd
      });

      if (error) {
        errorDiv.textContent = error.message;
        errorDiv.style.display = 'block';
        submitBtn.textContent = 'Set Password';
        submitBtn.disabled = false;
      } else {
        // Success
        submitBtn.textContent = 'Success! Redirecting...';
        // Give the session a moment to be fully established and acknowledged, then route to the dashboard
        setTimeout(() => {
          window.location.hash = '#player-dashboard';
        }, 1500);
      }
    });
  }
}
