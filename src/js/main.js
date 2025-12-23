const toggle = document.getElementById("visionToggle");
const veil = document.getElementById("visualVeil");
const systemText = document.getElementById("systemText");

let visionOn = false;

toggle.addEventListener("click", () => {
  visionOn = !visionOn;
  toggle.setAttribute("aria-checked", String(visionOn));
  veil.style.opacity = visionOn ? "0" : "1";
  veil.style.pointerEvents = visionOn ? "none" : "auto";
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
