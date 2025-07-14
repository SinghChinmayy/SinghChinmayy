// Dark mode toggle logic

document.addEventListener('DOMContentLoaded', function() {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const body = document.body;
  if (!darkModeToggle) return;
  // Check for saved theme preference or default to light mode
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  // Set initial theme
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
    darkModeToggle.title = 'Switch to light mode';
  } else {
    body.classList.remove('dark-mode');
    darkModeToggle.textContent = '🌙';
    darkModeToggle.title = 'Switch to dark mode';
  }
  // Toggle dark mode
  darkModeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
      darkModeToggle.textContent = '☀️';
      darkModeToggle.title = 'Switch to light mode';
    } else {
      localStorage.setItem('theme', 'light');
      darkModeToggle.textContent = '🌙';
      darkModeToggle.title = 'Switch to dark mode';
    }
  });
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️';
        darkModeToggle.title = 'Switch to light mode';
      } else {
        body.classList.remove('dark-mode');
        darkModeToggle.textContent = '🌙';
        darkModeToggle.title = 'Switch to dark mode';
      }
    }
  });
}); 