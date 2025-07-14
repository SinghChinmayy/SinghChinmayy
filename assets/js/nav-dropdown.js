// Dropdown menu logic for navigation

document.addEventListener('DOMContentLoaded', function() {
  const dropdown = document.querySelector('.nav-dropdown');
  if (dropdown) {
    const toggle = dropdown.querySelector('.nav-dropdown-toggle');
    const menu = dropdown.querySelector('.nav-dropdown-menu');

    // Desktop: hover/focus
    toggle.addEventListener('mouseenter', () => { menu.style.display = 'block'; });
    toggle.addEventListener('focus', () => { menu.style.display = 'block'; });
    dropdown.addEventListener('mouseleave', () => { menu.style.display = 'none'; });

    // Mobile: click/tap
    toggle.addEventListener('click', function(e) {
      e.stopPropagation();
      // Toggle menu
      if (menu.style.display === 'block') {
        menu.style.display = 'none';
      } else {
        menu.style.display = 'block';
      }
    });
    // Close dropdown when clicking outside (mobile)
    document.addEventListener('click', function(e) {
      if (!dropdown.contains(e.target)) {
        menu.style.display = 'none';
      }
    });
  }
}); 