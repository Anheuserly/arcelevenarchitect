// Preloader functionality
export const handlePreloader = () => {
    const preloader = document.getElementById('preloader');
    
    if (preloader) {
      // Hide preloader after content loads
      window.addEventListener('load', () => {
        preloader.classList.add('preloader-hidden');
        
        // Remove preloader from DOM after animation completes
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500);
      });
      
      // Fallback: Hide preloader after 3 seconds even if content hasn't fully loaded
      setTimeout(() => {
        preloader.classList.add('preloader-hidden');
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500);
      }, 3000);
    }
  };