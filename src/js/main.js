// =====================
// Toggle visual content
// =====================
const toggle = document.getElementById("visionToggle");
const visualContent = document.getElementById("visualContent");
const osShortcut = document.getElementById("osShortcut");

toggle.addEventListener("click", () => {
  const isOn = toggle.getAttribute("aria-pressed") === "true";
  toggle.setAttribute("aria-pressed", String(!isOn));

  if (isOn) {
    // Back to blind mode
    visualContent.classList.add("visually-hidden");
    document.body.style.background = "black";
  } else {
    // Visual mode
    visualContent.classList.remove("visually-hidden");
    document.body.style.background = "";
  }
});

// =====================
// Detect OS and show shortcut
// =====================
const platform = navigator.platform.toLowerCase();
if (platform.includes("win")) {
  osShortcut.textContent = "OS Detected: Windows => Shortcut key: Ctrl + Alt + T";
} else if (platform.includes("mac")) {
  osShortcut.textContent = "OS Detected: Mac => Shortcut key: Cmd + Option + T";
} else {
  osShortcut.textContent = "OS Detected: Other => Shortcut key: Ctrl + Alt + T";
}

// =====================
// Mood counter logic
// =====================
document.querySelectorAll(".mood-counter button").forEach((btn) => {
  const countSpan = btn.querySelector(".count");
  let count = 0;
  btn.addEventListener("click", () => {
    count++;
    countSpan.textContent = count;
  });
});

// =====================
// Shepherd tour
// =====================
const tour = new Shepherd.Tour({
  useModalOverlay: true,
  defaultStepOptions: {
    cancelIcon: { enabled: true },
    scrollTo: { behavior: 'smooth', block: 'center' }
  }
});

tour.addStep({
  id: 'step-1',
  text: 'This is the search bar where users can search.',
  attachTo: { element: '.search', on: 'bottom' },
  buttons: [
    { text: 'Next', action: tour.next }
  ]
});

tour.addStep({
  id: 'step-2',
  text: 'These are mood buttons. Click to increase counter.',
  attachTo: { element: '.mood-counter', on: 'top' },
  buttons: [
    { text: 'Back', action: tour.back },
    { text: 'Done', action: tour.complete }
  ]
});

document.getElementById("tourBtn").addEventListener("click", () => {
  visualContent.classList.remove("visually-hidden"); // Ensure visible
  toggle.setAttribute("aria-pressed", "true");
  tour.start();
});