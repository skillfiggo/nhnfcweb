import { t } from '../i18n.js';
import { supabase } from '../lib/supabase.js';

export const title = 'Login';

export function render() {
  return `
    <div class="login-page-wrap">
      <div class="login-left">
        <!-- Slider Images -->
        <div class="login-slider" id="loginSlider">
          <div class="login-slide active" style="background-image: url('/images/hero-slide-1.jpg');"></div>
          <div class="login-slide" style="background-image: url('/images/hero-slide-2.jpg');"></div>
          <div class="login-slide" style="background-image: url('/images/hero-slide-3.jpg');"></div>
        </div>
        <!-- Gradient overlay -->
        <div class="login-overlay"></div>
        
        <!-- Welcome Text / Slider Content -->
        <div class="login-left-content">
          <img src="/images/logo.png" alt="Logo" class="login-brand-logo" />
          <h2 class="login-welcome-title">Welcome Back to <span>NewHope Naija</span></h2>
          <p class="login-welcome-desc">Sign in to access exclusive content, player stats, and manage your academy profile.</p>
          
          <div class="login-slider-dots" id="loginSliderDots">
            <span class="login-dot active" data-index="0"></span>
            <span class="login-dot" data-index="1"></span>
            <span class="login-dot" data-index="2"></span>
          </div>
        </div>
      </div>
      
      <div class="login-right">
        <div class="login-form-container">
          <div class="login-header">
            <a href="#home" class="login-back-btn">← Back to Home</a>
            <h2>Login to Your Account</h2>
            <p>Enter your credentials to continue</p>
          </div>
          
          <form class="login-form" id="loginForm">
            <div class="form-group">
              <label for="email">Email Address</label>
              <div class="input-wrap">
                <span class="input-icon">✉️</span>
                <input type="email" id="email" class="form-input" placeholder="Enter your email" required />
              </div>
            </div>
            
            <div class="form-group">
              <label for="password">Password</label>
              <div class="input-wrap">
                <span class="input-icon">🔒</span>
                <input type="password" id="password" class="form-input" placeholder="Enter your password" required />
              </div>
            </div>
            
            <div class="form-options">
              <label class="checkbox-label">
                <input type="checkbox" />
                <span class="checkmark"></span>
                Remember me
              </label>
              <a href="#" class="forgot-link">Forgot Password?</a>
            </div>
            
            <button type="submit" class="btn btn-primary login-submit-btn">
              Sign In
            </button>
          </form>
          
          <div class="login-footer">
            <p>Don't have an account? <a href="#contact">Register for Trials</a></p>
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
  
  // Cleanup function when leaving the route
  window.addEventListener('hashchange', function onHashChange() {
    if (window.location.hash !== '#login') {
      if (navbar) navbar.style.display = '';
      if (footer) footer.style.display = '';
      if (topbar) topbar.style.display = '';
      window.removeEventListener('hashchange', onHashChange);
    }
  });

  // Slider Logic
  const slides = document.querySelectorAll('.login-slide');
  const dots = document.querySelectorAll('.login-dot');
  let currentSlide = 0;
  let timer;

  const goToSlide = (index) => {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  };

  const nextSlide = () => goToSlide((currentSlide + 1) % slides.length);
  const startTimer = () => { timer = setInterval(nextSlide, 4500); };
  const stopTimer = () => { clearInterval(timer); };

  if (slides.length > 0) {
    startTimer();
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        stopTimer();
        goToSlide(index);
        startTimer();
      });
    });
  }

  // Form submission logic with Supabase
  const form = document.getElementById('loginForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      if (!supabase) {
        alert('Supabase is not configured! Please add your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to the .env file and restart the dev server.');
        return;
      }

      const btn = form.querySelector('.login-submit-btn');
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      const originalText = btn.textContent;
      btn.textContent = 'Signing In...';
      btn.style.opacity = '0.7';
      btn.style.pointerEvents = 'none';
      
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) throw error;

        console.log('[Login Success] User ID:', data.user.id);

        // Check profile role to determine where to route
        let role = 'player'; // default
        try {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', data.user.id)
            .single();
          
          if (profileError) {
            console.error('[Login] Profile Fetch Error:', profileError.message);
          } else {
            role = profile?.role || 'player';
            console.log('[Login] Profile found. Role:', role);
          }
        } catch (profileFetchErr) {
          console.error('[Login] Profile fetch exception:', profileFetchErr);
        }

        // Cache role in localStorage for instant routing
        localStorage.setItem('nhfc_user_role', role);
        localStorage.setItem('nhfc_user_id', data.user.id);

        console.log('[Login] Final role cached:', role);
        alert('Login successful! Welcome back.');
        
        const target = role === 'admin' ? 'admin-dashboard' : 'player-dashboard';
        window.location.hash = '#' + target;
      } catch (error) {
        alert('Login Failed: ' + error.message);
      } finally {
        btn.textContent = originalText;
        btn.style.opacity = '1';
        btn.style.pointerEvents = 'auto';
      }
    });
  }
}
