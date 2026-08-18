// ========================================
// GLOBAL DAY / NIGHT MODE
// ========================================

const themeKey = "birthday-theme";

// ========================================
// APPLY THEME
// ========================================

function applyGlobalTheme() {
  const savedTheme = localStorage.getItem(themeKey) || "day";

  const isNight = savedTheme === "night";

  // ----------------------------------------
  // BODY
  // ----------------------------------------

  document.body.classList.toggle("night-mode", isNight);

  // ----------------------------------------
  // BUTTON
  // ----------------------------------------

  const themeButton = document.getElementById("themeButton");

  if (themeButton) {
    themeButton.textContent = isNight ? "☀️ Day Mode" : "🌙 Night Mode";
  }
}

// ========================================
// TOGGLE THEME
// ========================================

function toggleGlobalTheme() {
  const currentTheme = localStorage.getItem(themeKey) || "day";

  const newTheme = currentTheme === "night" ? "day" : "night";

  localStorage.setItem(themeKey, newTheme);

  applyGlobalTheme();
}

// ========================================
// INITIALIZE
// ========================================

function initializeTheme() {
  applyGlobalTheme();

  const themeButton = document.getElementById("themeButton");

  if (!themeButton) {
    return;
  }

  // ========================================
  // PHONE + DESKTOP
  // ========================================

  themeButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    toggleGlobalTheme();
  });
}

// ========================================
// START
// ========================================

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeTheme);
} else {
  initializeTheme();
}
