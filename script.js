// script.js - interactive features for the portfolio

// Grab the elements we need once, when the page loads
const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement; // the <html> element

// Show or hide the navigation on mobile (hamburger menu)
function toggleMenu() {
  const isOpen = siteNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen); // keeps screen readers in sync
}

// Close the mobile menu (used after a link is clicked)
function closeMenu() {
  siteNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}

// Apply a theme ("light" or "dark") and update the button label
function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  themeToggle.textContent = theme === "dark" ? "Light mode" : "Dark mode";
}

// Switch between light and dark, and remember the choice
function toggleTheme() {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  try {
    localStorage.setItem("theme", next);
  } catch (error) {
    // Storage can be blocked; the toggle still works for this visit
  }
}

// Load the saved theme, or fall back to the visitor's system preference
function loadSavedTheme() {
  let saved = null;
  try {
    saved = localStorage.getItem("theme");
  } catch (error) {
    // Ignore storage errors
  }
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved || (prefersDark ? "dark" : "light"));
}

// Wire up events
menuToggle.addEventListener("click", toggleMenu);
themeToggle.addEventListener("click", toggleTheme);
siteNav.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", closeMenu);
});

// Set the theme as soon as the script runs
loadSavedTheme();
