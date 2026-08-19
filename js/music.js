// ========================================
// GLOBAL BACKGROUND MUSIC
// ========================================

(function () {

    const MUSIC_KEY =
        "birthday-music-enabled";

    const TIME_KEY =
        "birthday-music-time";


    let audio = null;
    let button = null;


    // ========================================
    // SAFE STORAGE
    // ========================================

    function getStorage(key) {

        try {
            return localStorage.getItem(key);
        } catch (error) {
            return null;
        }
    }


    function setStorage(key, value) {

        try {
            localStorage.setItem(
                key,
                value
            );
        } catch (error) {
            // Storage unavailable
        }
    }


    function removeStorage(key) {

        try {
            localStorage.removeItem(key);
        } catch (error) {
            // Storage unavailable
        }
    }


    // ========================================
    // CREATE AUDIO
    // ========================================

    function createAudio() {

        if (audio) {
            return audio;
        }


        const musicURL =
            new URL(
                "../Sounds/cute_music.mp3",
                document.baseURI
            ).href;


        audio = new Audio(musicURL);

        audio.loop = true;

        audio.volume = 0.8;

        audio.preload = "auto";

        /*
         * Important for mobile browsers.
         */
        audio.setAttribute(
            "playsinline",
            ""
        );


        audio.addEventListener(
            "play",
            updateButton
        );


        audio.addEventListener(
            "pause",
            updateButton
        );


        audio.addEventListener(
            "ended",
            updateButton
        );


        audio.addEventListener(
            "error",
            () => {

                console.error(
                    "Birthday music failed to load:",
                    musicURL
                );
            }
        );


        return audio;
    }


    // ========================================
    // BUTTON
    // ========================================

    function getButton() {

        if (!button) {

            button =
                document.getElementById(
                    "musicButton"
                );
        }

        return button;
    }


    // ========================================
    // UPDATE BUTTON
    // ========================================

    function updateButton() {

        const btn =
            getButton();

        if (!btn) {
            return;
        }


        btn.textContent =
            audio && !audio.paused
                ? "Stop Music"
                : "Play Music";
    }


    // ========================================
    // RESTORE POSITION
    // ========================================

    function restorePosition() {

        const saved =
            parseFloat(
                getStorage(TIME_KEY)
            );


        if (
            !Number.isFinite(saved) ||
            saved < 0
        ) {
            return;
        }


        try {

            audio.currentTime =
                saved;

        } catch (error) {

            // Ignore invalid position
        }
    }


    // ========================================
    // SAVE POSITION
    // ========================================

    function savePosition() {

        if (
            audio &&
            !audio.paused &&
            Number.isFinite(
                audio.currentTime
            )
        ) {

            setStorage(
                TIME_KEY,
                String(audio.currentTime)
            );
        }
    }


    // ========================================
    // PLAY MUSIC
    // ========================================

    async function playMusic() {

        const music =
            createAudio();


        restorePosition();


        try {

            await music.play();

            setStorage(
                MUSIC_KEY,
                "on"
            );

            updateButton();

            return true;

        } catch (error) {

            console.warn(
                "Music playback was blocked by the browser."
            );

            updateButton();

            return false;
        }
    }


    // ========================================
    // STOP MUSIC
    // ========================================

    function stopMusic() {

        const music =
            createAudio();


        music.pause();


        try {
            music.currentTime = 0;
        } catch (error) {}


        setStorage(
            MUSIC_KEY,
            "off"
        );


        removeStorage(
            TIME_KEY
        );


        updateButton();
    }


    // ========================================
    // MUSIC BUTTON
    // ========================================

    function handleMusicButton(event) {

        event.preventDefault();
        event.stopPropagation();


        const music =
            createAudio();


        if (music.paused) {

            playMusic();

        } else {

            stopMusic();
        }
    }


    // ========================================
    // INITIALIZE
    // ========================================

    function initialize() {

        button =
            document.getElementById(
                "musicButton"
            );


        if (!button) {
            return;
        }


        createAudio();


        /*
         * One clean click handler.
         *
         * No global pointerdown handler.
         * No global touchstart handler.
         */
        button.addEventListener(
            "click",
            handleMusicButton
        );


        updateButton();


        // Save position periodically
        setInterval(
            savePosition,
            1000
        );


        /*
         * If music was ON before changing
         * pages, try to continue it.
         *
         * If the mobile browser blocks this,
         * the user can press the button once.
         */
        if (
            getStorage(MUSIC_KEY) === "on"
        ) {

            playMusic();
        }
    }


    // ========================================
    // GLOBAL FUNCTIONS
    // ========================================

    window.playBirthdayMusic =
        playMusic;

    window.stopBirthdayMusic =
        stopMusic;


    // ========================================
    // START
    // ========================================

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initialize
        );

    } else {

        initialize();
    }

})();