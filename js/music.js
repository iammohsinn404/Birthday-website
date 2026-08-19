// ========================================
// BACKGROUND MUSIC
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    const musicButton =
        document.getElementById("musicButton");

    if (!musicButton) {
        return;
    }


    // ========================================
    // AUDIO
    // ========================================

    const backgroundMusic =
        new Audio("../Sounds/cute_music.mp3");

    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.8;
    backgroundMusic.preload = "auto";


    // ========================================
    // STORAGE
    // ========================================

    const musicKey =
        "birthday-music-enabled";

    const musicTimeKey =
        "birthday-music-time";


    // ========================================
    // BUTTON TEXT
    // ========================================

    function updateMusicButton() {

        musicButton.textContent =
            backgroundMusic.paused
                ? "Play Music"
                : "Stop Music";
    }


    // ========================================
    // SAVE POSITION
    // ========================================

    backgroundMusic.addEventListener(
        "timeupdate",
        () => {

            if (!backgroundMusic.paused) {

                localStorage.setItem(
                    musicTimeKey,
                    backgroundMusic.currentTime
                );
            }
        }
    );


    // ========================================
    // PLAY
    // ========================================

    async function startMusic() {

        const savedTime =
            parseFloat(
                localStorage.getItem(
                    musicTimeKey
                )
            );

        if (
            Number.isFinite(savedTime) &&
            backgroundMusic.currentTime === 0
        ) {

            try {
                backgroundMusic.currentTime =
                    savedTime;
            } catch (error) {}
        }


        try {

            await backgroundMusic.play();

            localStorage.setItem(
                musicKey,
                "on"
            );

            updateMusicButton();

            return true;

        } catch (error) {

            console.log(
                "Browser blocked automatic music playback."
            );

            updateMusicButton();

            return false;
        }
    }


    // ========================================
    // STOP
    // ========================================

    function stopMusic() {

        backgroundMusic.pause();

        backgroundMusic.currentTime = 0;

        localStorage.setItem(
            musicKey,
            "off"
        );

        localStorage.removeItem(
            musicTimeKey
        );

        updateMusicButton();
    }


    // ========================================
    // MUSIC BUTTON
    // ========================================

    musicButton.addEventListener(
        "click",
        async (event) => {

            event.preventDefault();
            event.stopPropagation();

            if (backgroundMusic.paused) {

                await startMusic();

            } else {

                stopMusic();
            }
        }
    );


    // ========================================
    // SAVED MUSIC STATE
    // ========================================

    const musicEnabled =
        localStorage.getItem(musicKey) === "on";


    if (musicEnabled) {

        /*
         * Try to continue automatically.
         * Mobile browsers may reject this.
         */
        startMusic();


        /*
         * If autoplay is blocked, wait for
         * ONE genuine page interaction.
         *
         * The music button is intentionally
         * ignored here so it cannot start and
         * immediately stop the music.
         */

        const resumeMusic = (event) => {

            if (
                event.target.closest &&
                event.target.closest("#musicButton")
            ) {
                return;
            }


            if (
                localStorage.getItem(musicKey) === "on" &&
                backgroundMusic.paused
            ) {

                startMusic();
            }


            document.removeEventListener(
                "pointerdown",
                resumeMusic
            );
        };


        document.addEventListener(
            "pointerdown",
            resumeMusic,
            {
                passive: true
            }
        );
    }


    // ========================================
    // INITIAL BUTTON STATE
    // ========================================

    updateMusicButton();

});