// Elementos del DOM
const loginForm = document.getElementById("loginForm");
const usuarioInput = document.getElementById("usuario");
const contraseñaInput = document.getElementById("contraseña");
const errorMessage = document.getElementById("errorMessage");

// Limpia el mensaje de error al escribir
usuarioInput.addEventListener("input", () => {
  errorMessage.textContent = "";
});

contraseñaInput.addEventListener("input", () => {
  errorMessage.textContent = "";
});

// Usuarios de prueba
const usuarios = {
  "javier.709": {
    contraseña: "123456",
    rol: "inspector",
    nombre: "Javier Pacheco"
  },
  "admin.001": {
    contraseña: "123456",
    rol: "admin",
    nombre: "Administrador"
  },
  "cliente.001": {
    contraseña: "123456",
    rol: "cliente",
    nombre: "Cliente Prueba"
  }
};

// Manejo del login
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const usuario = usuarioInput.value.trim();
  const contraseña = contraseñaInput.value;

  const datosUsuario = usuarios[usuario];

  if (datosUsuario && datosUsuario.contraseña === contraseña) {
    localStorage.setItem("rol", datosUsuario.rol);
    localStorage.setItem("usuario", datosUsuario.nombre);
    window.location.href = "inicio.html";
  } else {
    errorMessage.textContent = "Usuario o contraseña incorrectos";
  }
});