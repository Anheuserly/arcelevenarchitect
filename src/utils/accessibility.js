// Accessibility enhancements
export const enhanceAccessibility = () => {
    // Add role attributes to improve screen reader experience
    const addRoleAttributes = () => {
      const mainContent = document.querySelector('.project-container');
      if (mainContent) {
        mainContent.setAttribute('role', 'main');
        mainContent.setAttribute('id', 'main-content');
      }
      
      const filterButtons = document.querySelectorAll('.filter-btn');
      filterButtons.forEach(button => {
        button.setAttribute('role', 'tab');
      });
      
      const projectItems = document.querySelectorAll('.project-item, .featured-item');
      projectItems.forEach(item => {
        item.setAttribute('role', 'article');
      });
    };
    
    // Enhance keyboard navigation
    const enhanceKeyboardNavigation = () => {
      // Make project items focusable
      const projectItems = document.querySelectorAll('.project-item, .featured-item');
      projectItems.forEach(item => {
        item.setAttribute('tabindex', '0');
        
        // Handle keyboard events
        item.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            item.click(); // Trigger click event
          }
        });
      });
    };
    
    // Initialize when DOM is loaded
    window.addEventListener('DOMContentLoaded', () => {
      addRoleAttributes();
      enhanceKeyboardNavigation();
    });
  };