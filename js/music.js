// ========================================
// GLOBAL BACKGROUND MUSIC
// ========================================

(function () {

    const musicKey = "birthday-music-enabled";
    const musicTimeKey = "birthday-music-time";

    let backgroundMusic = null;
    let musicButton = null;


    // ========================================
    // CREATE MUSIC
    // ========================================

    function createMusic() {

        if (backgroundMusic) {
            return backgroundMusic;
        }

        backgroundMusic =
            new Audio("../Sounds/cute_music.mp3");

        backgroundMusic.loop = true;
        backgroundMusic.volume = 0.8;
        backgroundMusic.preload = "auto";

        // Remember current position
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

        backgroundMusic.addEventListener(
            "play",
            updateMusicButton
        );

        backgroundMusic.addEventListener(
            "pause",
            updateMusicButton
        );

        return backgroundMusic;
    }


    // ========================================
    // FIND BUTTON
    // ========================================

    function findMusicButton() {

        musicButton =
            document.getElementById("musicButton");

        return musicButton;
    }


    // ========================================
    // UPDATE BUTTON
    // ========================================

    function updateMusicButton() {

        if (!musicButton || !backgroundMusic) {
            return;
        }

        if (backgroundMusic.paused) {

            musicButton.textContent =
                "Play Music";

        } else {

            musicButton.textContent =
                "Stop Music";
        }
    }


    // ========================================
    // START MUSIC
    // ========================================

    async function startMusic() {

        const audio = createMusic();

        // Restore previous position
        const savedTime =
            parseFloat(
                localStorage.getItem(musicTimeKey)
            );

        if (
            Number.isFinite(savedTime) &&
            audio.currentTime === 0
        ) {

            try {

                audio.currentTime =
                    savedTime;

            } catch (error) {
                // Ignore invalid saved position
            }
        }


        try {

            await audio.play();

            localStorage.setItem(
                musicKey,
                "on"
            );

            updateMusicButton();

            return true;

        } catch (error) {

            // Browser blocked autoplay.
            // Keep the music state ON so the
            // next touch/click can start it.

            localStorage.setItem(
                musicKey,
                "on"
            );

            updateMusicButton();

            return false;
        }
    }


    // ========================================
    // STOP MUSIC
    // ========================================

    function stopMusic() {

        if (!backgroundMusic) {
            createMusic();
        }

        backgroundMusic.pause();

        // Start again from beginning
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

    function setupMusicButton() {

        findMusicButton();

        if (!musicButton) {
            return;
        }

        createMusic();

        updateMusicButton();


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
    }


    // ========================================
    // AUTO RESUME
    // ========================================

    function tryResumeMusic() {

        if (
            localStorage.getItem(musicKey) !== "on"
        ) {
            return;
        }

        if (!backgroundMusic) {
            createMusic();
        }

        if (!backgroundMusic.paused) {
            return;
        }

        startMusic();
    }


    // ========================================
    // INITIALIZE
    // ========================================

    function initializeMusic() {

        setupMusicButton();

        const musicEnabled =
            localStorage.getItem(musicKey) === "on";


        if (musicEnabled) {

            // Try immediately
            startMusic();


            // Mobile browsers usually allow
            // playback after the first interaction.
            const resumeHandler = () => {

                if (
                    localStorage.getItem(musicKey) === "on"
                ) {

                    tryResumeMusic();
                }

            };


            document.addEventListener(
                "pointerdown",
                resumeHandler,
                {
                    passive: true
                }
            );

            document.addEventListener(
                "touchstart",
                resumeHandler,
                {
                    passive: true
                }
            );

            document.addEventListener(
                "click",
                resumeHandler,
                {
                    passive: true
                }
            );
        }
    }


    // ========================================
    // PAGE LOAD
    // ========================================

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            initializeMusic
        );

    } else {

        initializeMusic();

    }

})();