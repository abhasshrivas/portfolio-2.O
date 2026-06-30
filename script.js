const THEME_KEY = "preferred-theme";

function getStoredTheme() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch (_) {
    return null;
  }
}

function storeTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (_) {}
}

function applyTheme(theme) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  const toggle = document.getElementById("theme-toggle");
  if (toggle) toggle.querySelector(".icon").textContent = theme === "dark" ? "☀️" : "🌙";
}

function initTheme() {
  const stored = getStoredTheme();
  if (stored === "light" || stored === "dark") {
    applyTheme(stored);
  } else {
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(prefersDark ? "dark" : "light");
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
  storeTheme(next);
}

function initMenuToggle() {
  const menuButton = document.getElementById("menu-toggle");
  const nav = document.getElementById("primary-nav");
  if (!menuButton || !nav) return;
  menuButton.addEventListener("click", () => {
    nav.classList.toggle("show");
  });
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => nav.classList.remove("show")));
}

function initYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());
}

window.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initMenuToggle();
  initYear();
  const toggle = document.getElementById("theme-toggle");
  if (toggle) toggle.addEventListener("click", toggleTheme);
});


