// ========================================
// GLOBAL BACKGROUND MUSIC
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const musicButton =
            document.getElementById(
                "musicButton"
            );


        if (!musicButton) {
            return;
        }


        // ====================================
        // AUDIO
        // ====================================

        const backgroundMusic =
            new Audio(
                "../Sounds/cute_music.mp3"
            );


        backgroundMusic.loop = true;

        backgroundMusic.volume = 0.8;

        backgroundMusic.preload = "auto";


        // ====================================
        // STORAGE
        // ====================================

        const musicKey =
            "birthday-music-enabled";


        const timeKey =
            "birthday-music-time";


        // ====================================
        // UPDATE BUTTON
        // ====================================

        function updateMusicButton() {

            musicButton.textContent =
                backgroundMusic.paused
                    ? "Play Music"
                    : "Stop Music";
        }


        // ====================================
        // SAVE POSITION
        // ====================================

        backgroundMusic.addEventListener(
            "timeupdate",
            function () {

                if (
                    !backgroundMusic.paused
                ) {

                    try {

                        localStorage.setItem(
                            timeKey,
                            String(
                                backgroundMusic.currentTime
                            )
                        );

                    } catch (error) {}
                }
            }
        );


        // ====================================
        // RESTORE POSITION
        // ====================================

        function restorePosition() {

            let savedTime = null;


            try {

                savedTime =
                    parseFloat(
                        localStorage.getItem(
                            timeKey
                        )
                    );

            } catch (error) {

                return;
            }


            if (
                !Number.isFinite(savedTime) ||
                savedTime < 0
            ) {

                return;
            }


            try {

                backgroundMusic.currentTime =
                    savedTime;

            } catch (error) {}
        }


        // ====================================
        // PLAY
        // ====================================

        async function startMusic() {

            restorePosition();


            try {

                await backgroundMusic.play();


                try {

                    localStorage.setItem(
                        musicKey,
                        "on"
                    );

                } catch (error) {}


                updateMusicButton();


                return true;

            } catch (error) {

                /*
                 * The browser rejected automatic
                 * playback.
                 *
                 * This is normal on mobile.
                 * The next real click will retry.
                 */

                updateMusicButton();

                return false;
            }
        }


        // ====================================
        // STOP
        // ====================================

        function stopMusic() {

            backgroundMusic.pause();


            try {

                backgroundMusic.currentTime =
                    0;

            } catch (error) {}


            try {

                localStorage.setItem(
                    musicKey,
                    "off"
                );

                localStorage.removeItem(
                    timeKey
                );

            } catch (error) {}


            updateMusicButton();
        }


        // ====================================
        // MUSIC BUTTON
        // ====================================

        musicButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                if (
                    backgroundMusic.paused
                ) {

                    startMusic();

                } else {

                    stopMusic();
                }

            }
        );


        // ====================================
        // MUSIC STATE
        // ====================================

        let musicEnabled = false;


        try {

            musicEnabled =
                localStorage.getItem(
                    musicKey
                ) === "on";

        } catch (error) {

            musicEnabled = false;
        }


        // ====================================
        // TRY TO RESUME
        // ====================================

        if (musicEnabled) {

            startMusic();


            /*
             * If mobile autoplay is blocked,
             * wait for the first normal click.
             *
             * The music button itself is ignored
             * so it cannot trigger twice.
             */

            function resumeAfterInteraction(
                event
            ) {

                const clickedMusicButton =
                    event.target.closest &&
                    event.target.closest(
                        "#musicButton"
                    );


                if (clickedMusicButton) {
                    return;
                }


                if (
                    backgroundMusic.paused
                ) {

                    startMusic();
                }


                document.removeEventListener(
                    "click",
                    resumeAfterInteraction
                );
            }


            document.addEventListener(
                "click",
                resumeAfterInteraction
            );
        }


        // ====================================
        // INITIAL BUTTON
        // ====================================

        updateMusicButton();

    }
);