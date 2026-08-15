// ========================================
// BACKGROUND MUSIC
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    const musicButton = document.getElementById("musicButton");

    if (!musicButton) {
        console.error("Music button not found.");
        return;
    }

    const backgroundMusic = new Audio("../Sounds/cute_music.mp3");

    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.8;
    backgroundMusic.preload = "auto";

    backgroundMusic.addEventListener("error", () => {
        console.error("Music file could not be loaded.");
        console.error("Music URL:", backgroundMusic.src);
    });

    musicButton.addEventListener("click", async () => {

        if (backgroundMusic.paused) {

            try {

                await backgroundMusic.play();

                musicButton.textContent = "Stop Music";

            } catch (error) {

                console.error("Music failed to play:", error);

                musicButton.textContent = "Music Error";

            }

        } else {

            backgroundMusic.pause();

            musicButton.textContent = "Play Music";

        }

    });

});