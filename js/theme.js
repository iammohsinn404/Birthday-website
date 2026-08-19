// ========================================
// GLOBAL DAY / NIGHT MODE
// ========================================

const themeKey =
    "birthday-theme";


// ========================================
// APPLY THEME
// ========================================

function applyGlobalTheme() {

    const theme =
        localStorage.getItem(themeKey) || "day";

    const isNight =
        theme === "night";


    document.body.classList.toggle(
        "night-mode",
        isNight
    );


    const themeButton =
        document.getElementById(
            "themeButton"
        );

    if (themeButton) {

        themeButton.textContent =
            isNight
                ? "☀️ Day Mode"
                : "🌙 Night Mode";
    }
}


// ========================================
// TOGGLE THEME
// ========================================

function toggleGlobalTheme() {

    const currentTheme =
        localStorage.getItem(themeKey) || "day";

    const newTheme =
        currentTheme === "night"
            ? "day"
            : "night";


    localStorage.setItem(
        themeKey,
        newTheme
    );


    applyGlobalTheme();
}


// ========================================
// INITIALIZE
// ========================================

function initializeTheme() {

    applyGlobalTheme();


    const themeButton =
        document.getElementById(
            "themeButton"
        );


    if (!themeButton) {
        return;
    }


    themeButton.addEventListener(
        "click",
        (event) => {

            event.preventDefault();
            event.stopPropagation();

            toggleGlobalTheme();
        }
    );
}


// ========================================
// START
// ========================================

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeTheme
    );

} else {

    initializeTheme();

}