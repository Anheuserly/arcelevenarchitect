// scripts.js

document.addEventListener('DOMContentLoaded', function () {
    // Your preloader script
    window.onload = function() {
      const preloader = document.getElementById('preloader');
      preloader.style.display = 'none'; // Hide preloader after page is loaded
    };
    
    // Your cookie consent script
    const cookieConsent = document.getElementById('cookie-consent');
    if (!localStorage.getItem('cookie-consent')) {
      cookieConsent.style.display = 'block';
    }
    
    // Handle cookie consent
    document.getElementById('accept-cookies').addEventListener('click', function() {
      localStorage.setItem('cookie-consent', 'accepted');
      cookieConsent.style.display = 'none';
    });
  });
  