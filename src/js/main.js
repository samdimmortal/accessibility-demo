// =======================
// OS DETECTION
// =======================
const osInfo = document.getElementById("osInfo");

function detectOS() {
  const platform = navigator.platform.toLowerCase();

  if (platform.includes("win")) return "Windows: Shortcut Alt + Shift + S";
  if (platform.includes("mac")) return "macOS: Shortcut Control + Option + S";
  if (platform.includes("linux")) return "Linux: Shortcut Alt + Shift + S";

  return "Unknown OS";
}

osInfo.textContent = detectOS();

// =======================
// TOGGLE VISUAL MODE
// =======================
const toggle = document.getElementById("visionToggle");
const visualContent = document.getElementById("visualContent");

toggle.addEventListener("click", () => {
  const enabled = toggle.getAttribute("aria-pressed") === "true";

  toggle.setAttribute("aria-pressed", String(!enabled));
  visualContent.hidden = enabled;
});

// =======================
// SEARCH
// =======================
document.querySelector(".search").addEventListener("submit", (e) => {
  e.preventDefault();
  const q = document.getElementById("searchInput").value.trim();
  if (q) {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(q)}`, "_blank");
  }
});

// =======================
// MOOD COUNTER
// =======================
let count = 0;
const counter = document.getElementById("moodCount");

document.querySelectorAll(".mood-buttons button").forEach((btn) => {
  btn.addEventListener("click", () => {
    count++;
    counter.textContent = `Total clicks: ${count}`;
  });
});

// =======================
// SHEPHERD TOUR
// =======================
const tour = new Shepherd.Tour({
  defaultStepOptions: {
    scrollTo: true,
    cancelIcon: { enabled: true },
  },
});

tour.addStep({
  title: "Welcome",
  text: "This demo shows how accessibility-first design works.",
  attachTo: { element: "#visionToggle", on: "bottom" },
  buttons: [{ text: "Next", action: tour.next }],
});

tour.addStep({
  title: "Search",
  text: "This search behaves like Google.",
  attachTo: { element: ".search", on: "top" },
  buttons: [{ text: "Done", action: tour.complete }],
});

document.getElementById("tourBtn").addEventListener("click", () => {
  tour.start();
});
