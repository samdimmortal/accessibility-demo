/* ================= TOGGLE LOGIC ================= */

const toggle = document.getElementById("visionToggle");
const body = document.body;
const visual = document.getElementById("visualContent");

function setVision(on) {
  body.classList.toggle("vision-on", on);
  body.classList.toggle("vision-off", !on);
  toggle.setAttribute("aria-checked", String(on));
  visual.hidden = !on;
}

toggle.addEventListener("click", () => {
  const isOn = toggle.getAttribute("aria-checked") === "true";
  setVision(!isOn);
});

/* ================= OS DETECTION ================= */

const desc = document.getElementById("toggle-desc");
const ua = navigator.userAgent.toLowerCase();
const platform = navigator.platform.toLowerCase();

if (platform.includes("win")) {
  desc.textContent = "You're on Windows. Press NVDA + Ctrl + Q to toggle the screen reader.";
} else if (platform.includes("mac")) {
  desc.textContent = "You're on macOS. Press Cmd + F5 to toggle VoiceOver.";
} else if (/android/.test(ua)) {
  desc.textContent = "You're on Android. Enable TalkBack and swipe to navigate.";
} else if (/iphone|ipad/.test(ua)) {
  desc.textContent = "You're on iOS. Enable VoiceOver and swipe left or right.";
} else {
  desc.textContent = "Use your system's screen reader and keyboard navigation.";
}

/* ================= SEARCH ================= */

document.getElementById("searchForm").addEventListener("submit", e => {
  e.preventDefault();
  const q = searchInput.value.trim();
  if (q) {
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(q)}`,
      "_blank"
    );
  }
});

/* ================= EMOTE COUNTERS ================= */

document.querySelectorAll(".emotes button").forEach(btn => {
  btn.addEventListener("click", () => {
    const span = btn.querySelector("span");
    span.textContent = Number(span.textContent) + 1;
  });
});
