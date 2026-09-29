/* ==========================================================================
   PORTFOLIO — MULTI-TAB PAGE SWITCHER LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initHeaderScroll();
  initTabNavigation();
  initMobileNav();
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});

/* --------------------------------------------------------------------------
   1. STICKY HEADER SCROLL DETECTION (Header-1 Style)
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   2. THEME SWITCHER WITH MOONSIMPLEICON HOVER ANIMATION
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeBtn = document.getElementById('themeToggleBtn');
  if (!themeBtn) return;

  const MOON_SVG = `<svg width="22" height="22" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path class="moon-icon-path" fill="none" stroke="currentColor" stroke-dasharray="62" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3c-4.97 0 -9 4.03 -9 9c0 4.97 4.03 9 9 9c3.53 0 6.59 -2.04 8.06 -5c0 0 -6.06 1.5 -9.06 -3c-3 -4.5 1 -10 1 -10Z"><animate id="moonAnim" fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="62;0"/></path></svg>`;

  const SUN_SVG = `<svg width="22" height="22" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3.75"/><path class="sun-ray ray-0" d="M12 3V5.25"><animate fill="freeze" attributeName="opacity" dur="0.3s" begin="0s" values="0;1"/></path><path class="sun-ray ray-1" d="M18.364 5.63604L16.773 7.22703"><animate fill="freeze" attributeName="opacity" dur="0.3s" begin="0.04s" values="0;1"/></path><path class="sun-ray ray-2" d="M21 12H18.75"><animate fill="freeze" attributeName="opacity" dur="0.3s" begin="0.08s" values="0;1"/></path><path class="sun-ray ray-3" d="M18.364 18.364L16.773 16.773"><animate fill="freeze" attributeName="opacity" dur="0.3s" begin="0.12s" values="0;1"/></path><path class="sun-ray ray-4" d="M12 18.75V21"><animate fill="freeze" attributeName="opacity" dur="0.3s" begin="0.16s" values="0;1"/></path><path class="sun-ray ray-5" d="M7.22703 16.773L5.63604 18.364"><animate fill="freeze" attributeName="opacity" dur="0.3s" begin="0.2s" values="0;1"/></path><path class="sun-ray ray-6" d="M5.25 12H3"><animate fill="freeze" attributeName="opacity" dur="0.3s" begin="0.24s" values="0;1"/></path><path class="sun-ray ray-7" d="M7.22703 7.22703L5.63604 5.63604"><animate fill="freeze" attributeName="opacity" dur="0.3s" begin="0.28s" values="0;1"/></path></svg>`;

  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  setTheme(savedTheme);

  themeBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  });

  // Re-trigger animation on hover for both Sun and Moon icons
  themeBtn.addEventListener('mouseenter', () => {
    const anims = themeBtn.querySelectorAll('animate');
    anims.forEach(anim => {
      if (typeof anim.beginElement === 'function') {
        anim.beginElement();
      }
    });
  });

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);

    if (theme === 'light') {
      themeBtn.innerHTML = MOON_SVG;
      themeBtn.setAttribute('title', 'Cambiar a modo oscuro');
    } else {
      themeBtn.innerHTML = SUN_SVG;
      themeBtn.setAttribute('title', 'Cambiar a modo claro');
    }
  }
}

/* --------------------------------------------------------------------------
   3. MULTI-TAB PAGE SWITCHING & HASH SYNC
   -------------------------------------------------------------------------- */
function initTabNavigation() {
  const tabViews = document.querySelectorAll('.tab-view');
  const navLinks = document.querySelectorAll('[data-tab]');

  function switchTab(tabId) {
    // Hide all views
    tabViews.forEach(view => {
      view.classList.remove('active');
    });

    // Show target view
    const targetView = document.getElementById(tabId);
    if (targetView) {
      targetView.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Update active state in nav links
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-tab') === tabId) {
        link.classList.add('active');
      }
    });

    // Re-initialize Lucide icons for the newly visible view
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    // Update URL hash
    if (window.location.hash !== `#${tabId}`) {
      history.pushState(null, '', `#${tabId}`);
    }
  }

  // Delegated click handler for tab switching
  document.addEventListener('click', (e) => {
    const tabBtn = e.target.closest('[data-tab]');
    if (tabBtn) {
      e.preventDefault();
      const tabId = tabBtn.getAttribute('data-tab');
      switchTab(tabId);

      // Close mobile menu if active and unlock scroll
      const navMenu = document.getElementById('navMenu');
      const mobileNavToggle = document.getElementById('mobileNavToggle');
      if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        if (mobileNavToggle) {
          mobileNavToggle.classList.remove('active', 'open');
        }
        document.body.style.overflow = '';
      }
    }
  });

  // Handle URL hash on initial load
  const initialHash = window.location.hash.replace('#', '');
  if (initialHash && document.getElementById(initialHash)) {
    switchTab(initialHash);
  } else {
    switchTab('inicio');
  }

  // Handle browser Back / Forward buttons
  window.addEventListener('popstate', () => {
    const hash = window.location.hash.replace('#', '') || 'inicio';
    if (document.getElementById(hash)) {
      switchTab(hash);
    }
  });
}

/* --------------------------------------------------------------------------
   4. MOBILE NAVIGATION DRAWER TOGGLE (Header-1 Style Portal)
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const navMenu = document.getElementById('navMenu');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isActive = navMenu.classList.toggle('active');
    toggleBtn.classList.toggle('active', isActive);
    toggleBtn.classList.toggle('open', isActive);
    
    // Prevent body scroll when mobile menu is active
    if (isActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });
}
