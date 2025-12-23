/* =========================
   Toggle Visibility Logic
   WCAG: hidden attribute removes from visual AND AT
   ========================= */

const toggle = document.getElementById('visionToggle');
const visualElements = document.querySelectorAll('.visual-only');

toggle.addEventListener('click', () => {
  const enabled = toggle.getAttribute('aria-checked') === 'true';
  toggle.setAttribute('aria-checked', String(!enabled));

  visualElements.forEach(el => {
    el.hidden = enabled;
  });
});

/* =========================
   Search Logic
   ========================= */

document.getElementById('searchForm').addEventListener('submit', e => {
  e.preventDefault();
  const query = document.getElementById('searchInput').value.trim();
  if (query) {
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(query)}`,
      '_blank'
    );
  }
});

/* =========================
   Emoticon Counters
   ========================= */

document.querySelectorAll('.emotes button').forEach(btn => {
  btn.addEventListener('click', () => {
    const span = btn.querySelector('span');
    span.textContent = Number(span.textContent) + 1;
  });
});

/* =========================
   Shepherd Tour
   ========================= */

const tour = new Shepherd.Tour({
  useModalOverlay: true,
  defaultStepOptions: {
    scrollTo: true
  }
});

tour.addStep({
  title: 'Vision Toggle',
  text: 'This toggle controls whether visual elements are displayed.',
  attachTo: { element: '#visionToggle', on: 'bottom' },
  buttons: [{ text: 'Next', action: tour.next }]
});

tour.addStep({
  title: 'Search',
  text: 'This behaves like a standard web search.',
  attachTo: { element: '#searchInput', on: 'bottom' },
  buttons: [{ text: 'Finish', action: tour.complete }]
});

document.getElementById('tourBtn').addEventListener('click', () => {
  tour.start();
});