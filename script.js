const weddingDate = new Date("2027-01-20T09:00:00+05:30").getTime();

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function updateCountdown() {
  let diff = Math.max(0, weddingDate - Date.now());

  const days = Math.floor(diff / 86400000);
  diff %= 86400000;

  const hours = Math.floor(diff / 3600000);
  diff %= 3600000;

  const minutes = Math.floor(diff / 60000);
  diff %= 60000;

  const seconds = Math.floor(diff / 1000);

  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

function setMusicButton(playing) {
  musicBtn.textContent = playing ? "❚❚" : "♪";
  musicBtn.classList.toggle("playing", playing);
  musicBtn.setAttribute("aria-label", playing ? "Pause music" : "Play music");
}

async function startMusic() {
  try {
    await music.play();
    setMusicButton(true);
  } catch (error) {
    // Browsers may block unmuted autoplay until the visitor interacts.
    setMusicButton(false);
  }
}

musicBtn.addEventListener("click", async () => {
  if (music.paused) {
    await startMusic();
  } else {
    music.pause();
    setMusicButton(false);
  }
});

["pointerdown", "touchstart", "keydown"].forEach(eventName => {
  window.addEventListener(eventName, () => {
    if (music.paused) startMusic();
  }, { once: true, passive: true });
});

// Attempt autoplay when the page loads.
window.addEventListener("load", startMusic);
