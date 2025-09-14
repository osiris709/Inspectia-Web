// Simula datos de sesión
localStorage.setItem("token", "fake-token");
function obtenerRol() {
  return localStorage.getItem("rol");
}

// Verifica si hay token
function obtenerToken() {
  return localStorage.getItem("token");
}

// Verifica si hay rol
function obtenerRol() {
  return localStorage.getItem("rol");
}

// Redirige si no hay sesión
function verificarAutenticacion() {
  const token = obtenerToken();
  if (!token) {
    window.location.href = "index.html";
  }
}

// Mostrar u ocultar elementos según permisos
function mostrarSegunPermiso(selector, accion) {
  const elemento = document.querySelector(selector);
  if (elemento) {
    if (tienePermiso(accion)) {
      elemento.style.display = "block";
    } else {
      elemento.style.display = "none";
    }
  }
}

// Inicializa la protección de la página
function iniciarProteccion() {
  verificarAutenticacion();

}

// Mostrar nombre del usuario en el header
function mostrarNombreUsuario() {
  const username = localStorage.getItem("usuario");
  const userSpan = document.querySelector(".user-info span");
  if (userSpan && username) {
    userSpan.textContent = username;
  }
}

// Mostrar menú lateral según el rol
function mostrarMenuPorRol() {
  const rol = obtenerRol();

  if (rol === "admin") {
    document.getElementById("nav-usuarios")?.classList.remove("oculto");
    document.getElementById("nav-inspecciones")?.classList.remove("oculto");
    document.getElementById("nav-resultados")?.classList.remove("oculto");
  } else if (rol === "inspector") {
    document.getElementById("nav-inspecciones")?.classList.remove("oculto");
  } else if (rol === "cliente") {
    document.getElementById("nav-resultados")?.classList.remove("oculto");
  }

}

// Marcar opción activa en el menú
function resaltarOpcionActiva() {
  const path = window.location.pathname;
  document.querySelectorAll("#sidebar a").forEach(link => {
    if (link.getAttribute("href") === path) {
      link.classList.add("activo");
    }
  });
}

// Cerrar sesión
function configurarLogout() {
  const logoutBtn = document.getElementById("logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      confirmLogout();localStorage.clear();
    });
  }
}

function confirmLogout() {

  const resultado = confirm('¿Estás seguro de que quieres cerrar la sesión?');

  if (resultado) {
    window.location.href = 'index.html';
  } else {
    alert('Acción cancelada.');
  }
}

// Inicialización completa
document.addEventListener("DOMContentLoaded", () => {
  iniciarProteccion();
  mostrarNombreUsuario();
  mostrarMenuPorRol();
  resaltarOpcionActiva();
  configurarLogout();
});// Simulación de sesión (solo para pruebas)
localStorage.setItem("token", "fake-token");

// Utilidades de sesión
function obtenerToken() {
  return localStorage.getItem("token");
}

function obtenerRol() {
  return localStorage.getItem("rol");
}

// Verifica si hay sesión activa
function verificarAutenticacion() {
  const token = obtenerToken();
  if (!token) {
    window.location.href = "index.html";
  }
}

// Mostrar nombre del usuario en el header
function mostrarNombreUsuario() {
  const username = localStorage.getItem("usuario");
  const userSpan = document.querySelector(".user-info span");
  if (userSpan && username) {
    userSpan.textContent = username;
  }
}

// Mostrar menú lateral según el rol
function mostrarMenuPorRol() {
  const rol = obtenerRol();

  if (rol === "admin") {
    document.getElementById("nav-usuarios")?.classList.remove("oculto");
    document.getElementById("nav-inspecciones")?.classList.remove("oculto");
    document.getElementById("nav-resultados")?.classList.remove("oculto");
  } else if (rol === "inspector") {
    document.getElementById("nav-inspecciones")?.classList.remove("oculto");
  } else if (rol === "cliente") {
    document.getElementById("nav-resultados")?.classList.remove("oculto");
  }
}

// Marcar opción activa en el menú lateral
function resaltarOpcionActiva() {
  const path = window.location.pathname;
  document.querySelectorAll("#sidebar a").forEach(link => {
    if (link.getAttribute("href") === path) {
      link.classList.add("activo");
    }
  });
}

// Configurar botón de logout
function configurarLogout() {
  const logoutBtn = document.getElementById("logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      confirmLogout();
      localStorage.clear();
    });
  }
}

function confirmLogout() {
  const resultado = confirm("¿Estás seguro de que quieres cerrar la sesión?");
  if (resultado) {
    window.location.href = "index.html";
  } else {
    alert("Acción cancelada.");
  }
}

// Inicialización al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  verificarAutenticacion();
  mostrarNombreUsuario();
  mostrarMenuPorRol();
  resaltarOpcionActiva();
  configurarLogout();
});
