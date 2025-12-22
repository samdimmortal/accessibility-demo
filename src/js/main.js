document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const toggle = document.getElementById("visionToggle");
  const searchInput = document.getElementById("moodSearch");
  const searchBtn = document.getElementById("searchBtn");
  const liveRegion = document.getElementById("liveRegion");
  const tourBtn = document.getElementById("startTour");

  // DEFAULT: BLIND MODE
  html.classList.add("blind-mode");
  toggle.checked = false;
  searchInput.disabled = true;
  searchBtn.disabled = true;

  // TOGGLE VISUAL MODE
  toggle.addEventListener("change", () => {
    const enabled = toggle.checked;
    html.classList.toggle("blind-mode", !enabled);

    // WCAG 2.1.1: update ARIA attribute
    toggle.setAttribute("aria-checked", enabled);

    searchInput.disabled = !enabled;
    searchBtn.disabled = !enabled;
  });

  // GOOGLE SEARCH ONLY IN VISUAL MODE
  function openGoogleSearch() {
    if (html.classList.contains("blind-mode")) return;

    const query = searchInput.value.trim();
    if (!query) return;

    // WCAG 4.1.2: live region announcement
    liveRegion.textContent = "Opening Google search in a new tab";

    window.open(
      "https://www.google.com/search?q=" + encodeURIComponent(query),
      "_blank",
      "noopener"
    );
  }

  searchBtn.addEventListener("click", openGoogleSearch);
  searchInput.addEventListener("keydown", e => {
    if (e.key === "Enter") openGoogleSearch();
  });

  // SHEPHERD TOUR
  const tour = new Shepherd.Tour({
    useModalOverlay: true,
    defaultStepOptions: { cancelIcon: { enabled: true } }
  });

  tour.addStep({
    title: "Non-Visual Experience",
    text: "Page loads visually blank, but screen readers can access content.",
    buttons: [{ text: "Next", action: tour.next }]
  });

  tour.addStep({
    title: "Visual Toggle",
    text: "Enable this to restore the visual interface for sighted users.",
    attachTo: { element: "#visionToggle", on: "top" },
    buttons: [{ text: "Done", action: tour.complete }]
  });

  tourBtn.addEventListener("click", () => tour.start());
});