// Shepherd tour setup
const tour = new Shepherd.Tour({
  defaultStepOptions: {
    cancelIcon: {
      enabled: true,
    },
    scrollTo: { behavior: 'smooth', block: 'center' },
  }
});

tour.addStep({
  id: 'intro',
  text: 'Welcome to the Accessibility Demo! This tour will guide you through the key features.',
  attachTo: { element: '.md3-top-app-bar', on: 'bottom' },
  buttons: [
    {
      text: 'Next',
      action: tour.next
    }
  ]
});

tour.addStep({
  id: 'toggle',
  text: 'Use this toggle button at the bottom to switch between blind and visual modes.',
  attachTo: { element: '#toggleVisual', on: 'top' },
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
  id: 'search',
  text: 'Here you can search for anything. Your query opens in a new tab.',
  attachTo: { element: '#searchInput', on: 'bottom' },
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

// Elements references
const toggleBtn = document.getElementById('toggleVisual');
const body = document.body;
const osDesc = document.getElementById('osDesc');
const moodCounter = document.getElementById('moodCounter');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const tourBtn = document.getElementById('tourBtn');

const moods = [
  { emoji: "😃", count: 0, label: "Happy" },
  { emoji: "🙂", count: 0, label: "Content" },
  { emoji: "😞", count: 0, label: "Sad" },
  { emoji: "😡", count: 0, label: "Angry" },
  { emoji: "😍", count: 0, label: "Loving" },
  { emoji: "🤢", count: 0, label: "Sick" },
  { emoji: "😴", count: 0, label: "Sleepy" },
  { emoji: "🤯", count: 0, label: "Surprised" },
  { emoji: "🥳", count: 0, label: "Party" },
  { emoji: "😎", count: 0, label: "Cool" },
];

// Detect OS and provide shortcut key hint
function detectOS() {
  const userAgent = navigator.userAgent;
  if (userAgent.indexOf("Win") !== -1) {
    return { os: "Windows", shortcut: "Ctrl + Alt + T" };
  } else if (userAgent.indexOf("Mac") !== -1) {
    return { os: "Mac", shortcut: "Cmd + Option + T" };
  } else if (userAgent.indexOf("Linux") !== -1) {
    return { os: "Linux", shortcut: "Ctrl + Alt + T" };
  } else {
    return { os: "Unknown OS", shortcut: "N/A" };
  }
}

// Initialize mood buttons and counters
function setupMoodButtons() {
  moods.forEach((mood, index) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('aria-label', `${mood.label} mood counter`);
    btn.innerHTML = `${mood.emoji} <span aria-live="polite" aria-atomic="true" class="count">${mood.count}</span>`;
    btn.addEventListener('click', () => {
      moods[index].count++;
      btn.querySelector('.count').textContent = moods[index].count;
    });
    moodCounter.appendChild(btn);
  });
}

// Handle toggle for visual mode
function toggleVisualMode() {
  const isVisual = body.classList.toggle('visual-mode');
  if (isVisual) {
    body.classList.remove('hidden-visual');
    toggleBtn.setAttribute('aria-pressed', 'true');
  } else {
    body.classList.add('hidden-visual');
    toggleBtn.setAttribute('aria-pressed', 'false');
  }
}

// Handle search form submission
function handleSearch(event) {
  event.preventDefault();
  const query = searchInput.value.trim();
  if (query) {
    const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    window.open(url, '_blank', 'noopener');
  }
}

// Initialize OS description
function initOSDescription() {
  const osInfo = detectOS();
  osDesc.textContent = `OS Detected: ${osInfo.os} => Shortcut key: ${osInfo.shortcut}`;
}

// Attach event listeners
toggleBtn.addEventListener('click', toggleVisualMode);
searchForm.addEventListener('submit', handleSearch);
tourBtn.addEventListener('click', () => {
  tour.start();
});

// Initialization on page load
document.addEventListener('DOMContentLoaded', () => {
  // Start with blind mode active
  body.classList.add('hidden-visual');
  toggleBtn.setAttribute('aria-pressed', 'false');

  setupMoodButtons();
  initOSDescription();
});
