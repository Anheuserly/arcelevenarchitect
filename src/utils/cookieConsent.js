// Cookie consent functionality
export const initCookieConsent = () => {
    const cookieConsent = document.getElementById('cookie-consent');
    const hasConsented = localStorage.getItem('cookie-consent');
    
    if (!hasConsented && cookieConsent) {
      // Create cookie consent content
      cookieConsent.innerHTML = `
        <div class="cookie-text">
          <p>We use cookies to enhance your experience on our website. By continuing to browse, you agree to our use of cookies.</p>
        </div>
        <div class="cookie-buttons">
          <button class="cookie-btn cookie-accept" id="accept-cookies">Accept All</button>
          <button class="cookie-btn cookie-decline" id="decline-cookies">Essential Only</button>
          <button class="cookie-btn cookie-settings" id="cookie-settings">Cookie Settings</button>
        </div>
      `;
      
      // Show cookie banner
      cookieConsent.style.display = 'flex';
      
      // Add event listeners
      document.getElementById('accept-cookies').addEventListener('click', () => {
        localStorage.setItem('cookie-consent', 'all');
        cookieConsent.style.display = 'none';
        // Here you would initialize analytics, etc.
      });
      
      document.getElementById('decline-cookies').addEventListener('click', () => {
        localStorage.setItem('cookie-consent', 'essential');
        cookieConsent.style.display = 'none';
        // Here you would disable non-essential cookies
      });
      
      document.getElementById('cookie-settings').addEventListener('click', () => {
        // Open cookie settings modal or redirect to cookie policy page
        window.location.href = '/cookie-policy';
      });
    }
  };