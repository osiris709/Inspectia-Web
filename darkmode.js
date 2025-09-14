// Toggle entre modo claro y oscuro
document.getElementById("toggleTheme").addEventListener("click", () => {
  const isDark = document.documentElement.classList.toggle("dark-mode");
  actualizarLogo(isDark);
});

// Aplica modo oscuro
function applyDarkMode() {
  document.documentElement.classList.add("dark-mode");
  actualizarLogo(true);
}

// Aplica modo claro
function applyLightMode() {
  document.documentElement.classList.remove("dark-mode");
  actualizarLogo(false);
}

// Actualiza el logo según el tema
function actualizarLogo(isDark) {
  const logo = document.getElementById("logo");
  if (logo) {
    logo.src = isDark ? "logo-dark.png" : "logo-light.png";
  }
}