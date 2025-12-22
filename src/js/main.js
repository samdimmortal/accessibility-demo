document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('visionToggle');
  const html = document.documentElement;
  const liveRegion = document.getElementById('liveRegion');
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('moodSearch');
  const startTour = document.getElementById('startTour');
  const moodButtons = document.querySelectorAll('.mood-btn');

  // Start in blind mode by default
  html.classList.add('blind-mode');
  toggle.checked = false;

  // Toggle sighted mode
  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      html.classList.remove('blind-mode');
      toggle.setAttribute('aria-checked', 'true');
      liveRegion.textContent = 'Sighted mode enabled';
    } else {
      html.classList.add('blind-mode');
      toggle.setAttribute('aria-checked', 'false');
      liveRegion.textContent = 'Blind mode enabled';
    }
  });

  // Search button opens Google in a new tab
  searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
      liveRegion.textContent = 'Opening Google search';
      window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
    }
  });

  // Enter key triggers search
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchBtn.click();
  });

  // Mood rating selection
  moodButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const emoji = btn.dataset.emoji;
      liveRegion.textContent = `You selected ${emoji} as your mood`;
      // Optional visual feedback
      moodButtons.forEach(b => b.style.transform = 'scale(1)');
      btn.style.transform = 'scale(1.5)';
    });
  });

  // Shepherd tour setup
  const tour = new Shepherd.Tour({
    defaultStepOptions: {
      scrollTo: true,
      cancelIcon: { enabled: true }
    }
  });

  tour.addStep({
    title: 'Header',
    text: 'This is the header with logo and navigation. Use the Tour button to explore features.',
    attachTo: { element: 'header', on: 'bottom' },
    buttons: [{ text: 'Next', action: tour.next }]
  });

  tour.addStep({
    title: 'Search',
    text: 'Here you can type your mood and search Google.',
    attachTo: { element: '#moodSearch', on: 'bottom' },
    buttons: [{ text: 'Next', action: tour.next }]
  });

  tour.addStep({
    title: 'Mood Ratings',
    text: 'Select an emoji that represents how you feel today.',
    attachTo: { element: '#moodRatings', on: 'top' },
    buttons: [{ text: 'Done', action: tour.complete }]
  });

  startTour.addEventListener('click', () => tour.start());
});