// ========================================
// GLOBAL DAY / NIGHT MODE
// ========================================

const themeKey = "birthday-theme";

function applyGlobalTheme() {

    const theme =
        localStorage.getItem(themeKey) || "day";

    // Apply theme to the page
    document.documentElement.classList.toggle(
        "night-mode",
        theme === "night"
    );

    document.body.classList.toggle(
        "night-mode",
        theme === "night"
    );

    // Update button
    const themeButton =
        document.getElementById("themeButton");

    if (themeButton) {

        themeButton.textContent =
            theme === "night"
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
// APPLY SAVED THEME
// ========================================

function initializeTheme() {

    applyGlobalTheme();

    // Make sure the button is updated after
    // the page has finished loading.
    requestAnimationFrame(() => {
        applyGlobalTheme();
    });
}


// ========================================
// THEME BUTTON
// ========================================

document.addEventListener(
    "click",
    (event) => {

        const button =
            event.target.closest("#themeButton");

        if (!button) return;

        event.preventDefault();
        event.stopPropagation();

        toggleGlobalTheme();
    },
    true
);


// ========================================
// START
// ========================================

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        initializeTheme
    );

} else {

    initializeTheme();

}