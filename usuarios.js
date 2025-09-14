const form = document.getElementById("registro-usuario-form");
const mensaje = document.getElementById("mensaje-registro");
const botonRegistro = document.getElementById("boton-registro");
const tablaBody = document.querySelector("#tabla-usuarios tbody");
const botonPrev = document.getElementById("prev-pagina");
const botonNext = document.getElementById("next-pagina");
const paginaActualSpan = document.getElementById("pagina-actual");

// Cargar usuarios guardados al iniciar
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
let modoEdicion = false;
let indiceEdicion = null;

// Paginado de la tabla
let paginaActual = 1;
const usuariosPorPagina = 5;

renderizarTabla();

botonPrev.addEventListener("click", () => {
  if (paginaActual > 1) {
    paginaActual--;
    renderizarTabla();
  }
});

botonNext.addEventListener("click", () => {
  if ((paginaActual * usuariosPorPagina) < usuarios.length) {
    paginaActual++;
    renderizarTabla();
  }
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const rol = document.getElementById("rol").value;
  const contrasena = document.getElementById("contrasena").value;

  if (!nombre || !correo || !rol || !contrasena) {
    alert("Por favor completa todos los campos.");
    return;
  }

  if (modoEdicion) {
    usuarios[indiceEdicion] = { nombre, correo, rol, contrasena };
    modoEdicion = false;
    indiceEdicion = null;
    botonRegistro.textContent = "Registrar Usuario";
    mensaje.textContent = "✅ Usuario actualizado correctamente.";
  } else {
    usuarios.push({ nombre, correo, rol, contrasena });
    mensaje.textContent = "✅ Usuario registrado correctamente.";
  }

  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  mensaje.style.display = "block";
  form.reset();
  renderizarTabla();

  setTimeout(() => {
    mensaje.style.display = "none";
  }, 3000);
});

function renderizarTabla() {
  tablaBody.innerHTML = "";

  const inicio = (paginaActual - 1) * usuariosPorPagina;
  const fin = inicio + usuariosPorPagina;
  const usuariosPagina = usuarios.slice(inicio, fin);

  usuariosPagina.forEach((usuario, index) => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${usuario.nombre}</td>
      <td>${usuario.correo}</td>
      <td>${usuario.rol}</td>
      <td>
        <button onclick="editarUsuario(${index})">✏️</button>
        <button onclick="eliminarUsuario(${index})">🗑️</button>
      </td>
    `;

    tablaBody.appendChild(fila);
  });
  paginaActualSpan.textContent = `Página ${paginaActual}`;
  botonPrev.disabled = paginaActual === 1;
  botonNext.disabled = fin >= usuarios.length;
}

function eliminarUsuario(index) {
  if (confirm("¿Estás seguro de eliminar este usuario?")) {
    usuarios.splice(index, 1);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    renderizarTabla();
  }
}

function editarUsuario(index) {
  const usuario = usuarios[index];
  document.getElementById("nombre").value = usuario.nombre;
  document.getElementById("correo").value = usuario.correo;
  document.getElementById("rol").value = usuario.rol;
  document.getElementById("contrasena").value = usuario.contrasena;

  modoEdicion = true;
  indiceEdicion = index;

  botonRegistro.textContent = "Actualizar Usuario";
  mensaje.textContent = "✏️ Editando usuario...";
  mensaje.style.display = "block";
}