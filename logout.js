// Manejo del cierre de sesión
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logout");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", (event) => {
      event.preventDefault();
      confirmarLogout();
    });
  }
});

// Confirmación antes de cerrar sesión
function confirmarLogout() {
  const confirmar = confirm("¿Estás seguro de que quieres cerrar la sesión?");

  if (confirmar) {
    // Limpieza de datos
    localStorage.clear();
    window.location.href = "login.html";
  } else {
    alert("Acción cancelada.");
  }
}