// ========================================
// GLOBAL THEME + PROFILE MENU CONTROLLER
// ========================================

(function () {

    "use strict";

    const THEME_KEY = "birthday-theme";


    // ========================================
    // STORAGE
    // ========================================

    function getTheme() {

        try {
            return localStorage.getItem(THEME_KEY) || "day";
        } catch (error) {
            return "day";
        }
    }


    function setTheme(theme) {

        try {
            localStorage.setItem(THEME_KEY, theme);
        } catch (error) {
            // Theme still works if storage is unavailable
        }
    }


    // ========================================
    // APPLY THEME
    // ========================================

    function applyTheme() {

        const night =
            getTheme() === "night";


        document.body.classList.toggle(
            "night-mode",
            night
        );


        const themeButton =
            document.getElementById("themeButton");


        if (themeButton) {

            themeButton.textContent =
                night
                    ? "☀️ Day Mode"
                    : "🌙 Night Mode";
        }
    }


    // ========================================
    // TOGGLE THEME
    // ========================================

    function toggleTheme(event) {

        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }


        const newTheme =
            getTheme() === "night"
                ? "day"
                : "night";


        setTheme(newTheme);

        applyTheme();
    }


    // ========================================
    // PROFILE MENU
    // ========================================

    function setupProfileMenu() {

        const profileButton =
            document.getElementById("profileBtn");

        const profileMenu =
            document.getElementById("profileMenu");


        if (!profileButton || !profileMenu) {
            return;
        }


        // Prevent duplicate setup
        if (
            profileButton.dataset.menuReady === "true"
        ) {
            return;
        }


        profileButton.dataset.menuReady = "true";


        profileButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                profileMenu.classList.toggle(
                    "show"
                );
            }
        );


        // Close menu when clicking outside
        document.addEventListener(
            "click",
            function (event) {

                if (
                    !profileMenu.contains(event.target) &&
                    !profileButton.contains(event.target)
                ) {

                    profileMenu.classList.remove(
                        "show"
                    );
                }
            }
        );
    }


    // ========================================
    // THEME BUTTON
    // ========================================

    function setupThemeButton() {

        const themeButton =
            document.getElementById("themeButton");


        if (!themeButton) {
            return;
        }


        // Prevent duplicate setup
        if (
            themeButton.dataset.themeReady === "true"
        ) {
            return;
        }


        themeButton.dataset.themeReady = "true";


        /*
         * IMPORTANT:
         *
         * We use ONE click handler.
         *
         * No pointerdown.
         * No touchstart.
         *
         * This prevents mobile browsers from
         * triggering the action twice.
         */

        themeButton.addEventListener(
            "click",
            toggleTheme
        );
    }


    // ========================================
    // INITIALIZE
    // ========================================

    function initializeThemeSystem() {

        applyTheme();

        setupProfileMenu();

        setupThemeButton();
    }


    // ========================================
    // GLOBAL FUNCTION
    // ========================================

    window.toggleGlobalTheme =
        toggleTheme;


    // ========================================
    // START
    // ========================================

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initializeThemeSystem
        );

    } else {

        initializeThemeSystem();
    }


})();