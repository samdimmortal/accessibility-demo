// main.js
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('visionToggle');
  const liveRegion = document.getElementById('liveRegion');
  const body = document.body;
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('moodSearch');
  const screenReaderHint = document.getElementById('screenReaderHint');
  const startTourBtn = document.getElementById('startTour');

  // Initialize Shepherd tour
  const tour = new Shepherd.Tour({
    defaultStepOptions: {
      cancelIcon: {
        enabled: true
      },
      scrollTo: { behavior: 'smooth', block: 'center' }
    }
  });

  tour.addStep({
    id: 'welcome',
    title: 'Welcome to MoodSense',
    text: 'This tour will guide you through the main features of this page.',
    buttons: [
      {
        text: 'Next',
        action: tour.next
      }
    ]
  });

  tour.addStep({
    id: 'search',
    title: 'Search Box',
    text: 'Use this box to type your mood or any search term. Press enter or the arrow to search Google.',
    attachTo: {
      element: '#moodSearch',
      on: 'bottom'
    },
    buttons: [
      {
        text: 'Back',
        action: tour.back
      },
      {
        text: 'Next',
        action: tour.next
      }
    ]
  });

  tour.addStep({
    id: 'moodRating',
    title: 'Rate Your Mood',
    text: 'Select an emoji that best describes your current mood.',
    attachTo: {
      element: '[aria-label="Mood emoji rating"]',
      on: 'top'
    },
    buttons: [
      {
        text: 'Back',
        action: tour.back
      },
      {
        text: 'Done',
        action: tour.complete
      }
    ]
  });

  // Start tour on button click
  startTourBtn.addEventListener('click', () => {
    tour.start();
  });

  // Toggle vision mode
  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      // Visual mode: show colors, enable aria
      body.classList.remove('blind-mode');
      toggle.setAttribute('aria-checked', 'true');
      liveRegion.textContent = 'Visual mode enabled.';
      screenReaderHint.classList.remove('hidden');
    } else {
      // Blind mode: blank screen, minimal visible elements
      body.classList.add('blind-mode');
      toggle.setAttribute('aria-checked', 'false');
      liveRegion.textContent = 'Blind mode enabled. Visual elements hidden.';
      screenReaderHint.classList.add('hidden');
    }
  });

  // On page load start in blind mode (unchecked)
  toggle.checked = false;
  toggle.dispatchEvent(new Event('change'));

  // Google search form handler
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query.length) {
      // Open Google search in new tab
      window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
      liveRegion.textContent = 'Opening Google search.';
    }
  });
});