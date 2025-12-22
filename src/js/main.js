document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const visionToggle = document.getElementById('visionToggle');
  const mainContent = document.getElementById('mainContent');
  const liveRegion = document.getElementById('liveRegion');
  const screenReaderTips = document.getElementById('screenReaderTips');
  const emojiContainer = document.getElementById('emojiContainer');
  const moodCounts = document.getElementById('moodCounts');
  const searchForm = document.getElementById('searchForm');
  const moodSearch = document.getElementById('moodSearch');

  // Mood emojis and counts
  const emojis = [
    { symbol: '🤩', label: 'Excited', count: 0 },
    { symbol: '😀', label: 'Happy', count: 0 },
    { symbol: '🙂', label: 'Content', count: 0 },
    { symbol: '😐', label: 'Neutral', count: 0 },
    { symbol: '😕', label: 'Confused', count: 0 },
    { symbol: '🙁', label: 'Sad', count: 0 },
    { symbol: '☹️', label: 'Very Sad', count: 0 },
    { symbol: '😣', label: 'Stressed', count: 0 },
    { symbol: '😖', label: 'Frustrated', count: 0 },
    { symbol: '😭', label: 'Crying', count: 0 },
  ];

  // Initialize mode from localStorage or default to blind mode (dark)
  function setMode(visual) {
    if (visual) {
      body.classList.remove('blind-mode');
      body.classList.add('visual-mode');
      visionToggle.checked = true;
      visionToggle.setAttribute('aria-checked', 'true');
      mainContent.style.opacity = '1';
      mainContent.style.pointerEvents = 'auto';
      screenReaderTips.style.display = 'block';
      body.style.backgroundColor = '';
      liveRegion.textContent = 'Visual mode enabled. Colors and content are visible.';
    } else {
      body.classList.remove('visual-mode');
      body.classList.add('blind-mode');
      visionToggle.checked = false;
      visionToggle.setAttribute('aria-checked', 'false');
      mainContent.style.opacity = '0';
      mainContent.style.pointerEvents = 'none';
      screenReaderTips.style.display = 'none';
      body.style.backgroundColor = 'black';
      liveRegion.textContent = 'Blind mode enabled. Screen reader tips shown.';
    }
  }

  // Load initial mode state
  const savedMode = localStorage.getItem('moodSenseMode');
  setMode(savedMode === 'visual');

  // Toggle handler
  visionToggle.addEventListener('change', () => {
    const isVisual = visionToggle.checked;
    setMode(isVisual);
    localStorage.setItem('moodSenseMode', isVisual ? 'visual' : 'blind');
  });

  // Render emoji buttons dynamically
  function renderEmojis() {
    emojiContainer.innerHTML = '';
    emojis.forEach((emo, i) => {
      const btn = document.createElement('button');
      btn.className = 'rounded-full bg-white text-4xl w-14 h-14 flex items-center justify-center shadow hover:scale-110 transition-transform duration-150';
      btn.type = 'button';
      btn.setAttribute('aria-label', `Select mood ${emo.label}`);
      btn.textContent = emo.symbol;
      btn.addEventListener('click', () => {
        emojis[i].count++;
        updateMoodCounts();
        liveRegion.textContent = `Mood ${emo.label} selected. Total count: ${emojis[i].count}`;
      });
      emojiContainer.appendChild(btn);
    });
  }

  // Update mood counts display
  function updateMoodCounts() {
    moodCounts.innerHTML = '';
    emojis.forEach((emo) => {
      if (emo.count > 0) {
        const span = document.createElement('span');
        span.textContent = `${emo.symbol} ${emo.count}`;
        span.className = 'inline-block mx-2 text-xl font-semibold drop-shadow';
        moodCounts.appendChild(span);
      }
    });
  }

  renderEmojis();

  // Search submit handler - open Google search with query
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = moodSearch.value.trim();
    if (query.length > 0) {
      liveRegion.textContent = 'Opening Google search.';
      window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
    }
  });

  // Shepherd tour setup
  const tour = new Shepherd.Tour({
    useModalOverlay: true,
    defaultStepOptions: {
      scrollTo: { behavior: 'smooth', block: 'center' },
      cancelIcon: { enabled: true },
      classes: 'shadow-md rounded-md',
    },
  });

  tour.addStep({
    title: 'MoodSense Experience',
    text: 'Welcome! Use the toggle below to switch between blind (dark) and visual modes.',
    attachTo: { element: '#visionToggle', on: 'top' },
    buttons: [
      { text: 'Next', action: tour.next },
    ],
  });
  tour.addStep({
    title: 'Search Box',
    text: 'Type your mood and click the arrow to search Google.',
    attachTo: { element: '#moodSearch', on: 'bottom' },
    buttons: [
      { text: 'Next', action: tour.next },
      { text: 'Skip', action: tour.cancel },
    ],
  });
  tour.addStep({
    title: 'Mood Rating',
    text: 'Click any emoji to rate your mood. Counts will show below.',
    attachTo: { element: '#emojiContainer', on: 'top' },
    buttons: [
      { text: 'Finish', action: tour.complete },
      { text: 'Back', action: tour.back },
    ],
  });

  // Start tour button
  document.getElementById('startTour').addEventListener('click', () => {
    tour.start();
  });

});
