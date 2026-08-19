// ========================================
// GLOBAL DAY / NIGHT MODE
// ========================================

(function () {

    const THEME_KEY = "birthday-theme";

    function getTheme() {

        try {
            return localStorage.getItem(THEME_KEY) || "day";
        } catch (error) {
            return "day";
        }
    }


    function saveTheme(theme) {

        try {
            localStorage.setItem(THEME_KEY, theme);
        } catch (error) {
            // Storage unavailable - theme still works
        }
    }


    function applyTheme() {

        const theme = getTheme();
        const night = theme === "night";

        document.body.classList.toggle(
            "night-mode",
            night
        );

        const button =
            document.getElementById("themeButton");

        if (button) {

            button.textContent =
                night
                    ? "☀️ Day Mode"
                    : "🌙 Night Mode";
        }
    }


    function toggleTheme(event) {

        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        const current = getTheme();

        const next =
            current === "night"
                ? "day"
                : "night";

        saveTheme(next);

        applyTheme();
    }


    // Make function available globally
    window.toggleGlobalTheme = toggleTheme;


    function initialize() {

        applyTheme();

        const button =
            document.getElementById("themeButton");

        if (!button) {
            return;
        }


        // Remove any previous handler
        if (button.__themeHandler) {

            button.removeEventListener(
                "click",
                button.__themeHandler
            );
        }


        button.__themeHandler = toggleTheme;


        button.addEventListener(
            "click",
            toggleTheme
        );
    }


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