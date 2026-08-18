// ========================================
// GLOBAL BACKGROUND MUSIC
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  const musicButton = document.getElementById("musicButton");

  if (!musicButton) {
    return;
  }

  // ========================================
  // AUDIO
  // ========================================

  const backgroundMusic = new Audio("../Sounds/cute_music.mp3");

  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.8;
  backgroundMusic.preload = "auto";

  // ========================================
  // STORAGE
  // ========================================

  const musicKey = "birthday-music-enabled";

  const musicTimeKey = "birthday-music-time";

  // ========================================
  // UPDATE BUTTON
  // ========================================

  function updateMusicButton() {
    if (backgroundMusic.paused) {
      musicButton.textContent = "Play Music";
    } else {
      musicButton.textContent = "Stop Music";
    }
  }

  // ========================================
  // SAVE MUSIC POSITION
  // ========================================

  backgroundMusic.addEventListener("timeupdate", () => {
    if (!backgroundMusic.paused) {
      localStorage.setItem(musicTimeKey, String(backgroundMusic.currentTime));
    }
  });

  // ========================================
  // AUDIO ERROR CHECK
  // ========================================

  backgroundMusic.addEventListener("error", () => {
    console.error("Music could not be loaded.");

    console.error("Music URL:", backgroundMusic.src);
  });

  // ========================================
  // RESTORE POSITION
  // ========================================

  function restoreMusicPosition() {
    const savedTime = parseFloat(localStorage.getItem(musicTimeKey));

    if (Number.isFinite(savedTime) && savedTime >= 0) {
      try {
        backgroundMusic.currentTime = savedTime;
      } catch (error) {
        console.warn("Could not restore music position.");
      }
    }
  }

  // ========================================
  // START MUSIC
  // ========================================

  async function startMusic() {
    restoreMusicPosition();

    try {
      await backgroundMusic.play();

      localStorage.setItem(musicKey, "on");

      updateMusicButton();

      return true;
    } catch (error) {
      updateMusicButton();

      return false;
    }
  }

  // ========================================
  // STOP MUSIC
  // ========================================

  function stopMusic() {
    backgroundMusic.pause();

    backgroundMusic.currentTime = 0;

    localStorage.setItem(musicKey, "off");

    localStorage.removeItem(musicTimeKey);

    updateMusicButton();
  }

  // ========================================
  // MUSIC BUTTON
  // ========================================

  musicButton.addEventListener("click", async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (backgroundMusic.paused) {
      await startMusic();
    } else {
      stopMusic();
    }
  });

  // ========================================
  // REMEMBER MUSIC STATE
  // ========================================

  const musicEnabled = localStorage.getItem(musicKey) === "on";

  // ========================================
  // AUTO RESUME
  // ========================================

  if (musicEnabled) {
    startMusic();

    const resumeMusic = (event) => {
      if (event.target.closest && event.target.closest("#musicButton")) {
        return;
      }

      if (localStorage.getItem(musicKey) === "on" && backgroundMusic.paused) {
        startMusic();
      }
    };

    document.addEventListener("pointerdown", resumeMusic, {
      passive: true,
    });
  }

  // ========================================
  // INITIAL BUTTON STATE
  // ========================================

  updateMusicButton();
});
