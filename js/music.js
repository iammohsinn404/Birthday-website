// ========================================
// BACKGROUND MUSIC
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    const musicButton =
        document.getElementById("musicButton");

    if (!musicButton) {
        return;
    }


    const backgroundMusic =
        new Audio("../Sounds/cute_music.mp3");


    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.8;
    backgroundMusic.preload = "auto";


    const musicKey = "birthday-music-enabled";


    function updateMusicButton() {

        if (backgroundMusic.paused) {

            musicButton.textContent =
                "Play Music";

        } else {

            musicButton.textContent =
                "Stop Music";

        }

    }


    async function startMusic() {

        try {

            await backgroundMusic.play();

            localStorage.setItem(
                musicKey,
                "on"
            );

            updateMusicButton();

        } catch (error) {

            /*
             * Browser may block autoplay after
             * moving to another page.
             *
             * The next user interaction will
             * start it automatically.
             */

            console.log(
                "Music waiting for user interaction."
            );

        }

    }


    function stopMusic() {

        backgroundMusic.pause();

        backgroundMusic.currentTime = 0;

        localStorage.setItem(
            musicKey,
            "off"
        );

        updateMusicButton();

    }


    /* ----------------------------------------
       MUSIC BUTTON
    ---------------------------------------- */

    musicButton.addEventListener(
        "click",
        async (event) => {

            event.preventDefault();

            if (backgroundMusic.paused) {

                await startMusic();

            } else {

                stopMusic();

            }

        }
    );


    /* ----------------------------------------
       REMEMBER MUSIC STATE
    ---------------------------------------- */

    const musicEnabled =
        localStorage.getItem(musicKey) === "on";


    if (musicEnabled) {

        /*
         * Try to continue automatically.
         */
        startMusic();

        /*
         * If browser blocks autoplay,
         * start on the next user interaction.
         */
        const resumeMusic = () => {

            if (
                localStorage.getItem(musicKey) === "on" &&
                backgroundMusic.paused
            ) {

                startMusic();

            }

        };


        document.addEventListener(
            "click",
            resumeMusic,
            { once: true }
        );

    }


    updateMusicButton();

});