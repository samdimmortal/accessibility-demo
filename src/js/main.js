const toggle = document.getElementById("visionToggle");
const veil = document.getElementById("visualVeil");
const systemText = document.getElementById("systemText");
const searchInput = document.getElementById("searchInput");
const tourBtn = document.getElementById("tourBtn");

let visionOn = false;

toggle.addEventListener("click", () => {
  visionOn = !visionOn;
  toggle.setAttribute("aria-checked", visionOn.toString());

  if (visionOn) {
    veil.classList.add("veil-hidden");
  } else {
    veil.classList.remove("veil-hidden");
  }
});

/* OS hint */
const ua = navigator.userAgent.toLowerCase();
if (ua.includes("windows")) {
  systemText.textContent =
    "You're on Windows. Screen readers can navigate this page without visuals.";
} else if (ua.includes("mac")) {
  systemText.textContent =
    "You're on macOS. VoiceOver users can explore this page non-visually.";
} else {
  systemText.textContent =
    "This page is usable with screen readers and keyboard navigation.";
}

/* Search functionality */
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const query = searchInput.value.trim();
    if (query) {
      const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      window.open(url, "_blank");
      searchInput.value = "";
    }
  }
});

/* TODO: Add Shepherd tour initialization here */
tourBtn.addEventListener("click", () => {
  alert("Tour feature coming soon!");
});