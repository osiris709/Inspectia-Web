// Elementos del DOM
const form = document.getElementById("inspeccion-form");
const productoInput = document.getElementById("producto");
const fechaInput = document.getElementById("fecha");
const observacionesInput = document.getElementById("observaciones");
const imagenInput = document.getElementById("imagen");
const previewImg = document.getElementById("preview-img");
const botonAdjuntar = document.getElementById("boton-adjuntar");

const spinner = document.querySelector(".spinner-container");
const statusMessage = document.querySelector(".status-message");
const detailsLink = document.querySelector(".details-link");

// Datos del usuario
const nombreUsuario = localStorage.getItem("usuario");

// Función para guardar inspección en localStorage
function guardarInspeccion(inspeccion) {
  const resultados = JSON.parse(localStorage.getItem("resultados")) || [];
  resultados.push(inspeccion);
  localStorage.setItem("resultados", JSON.stringify(resultados));
}

// Activar input de imagen al hacer clic en el botón
botonAdjuntar.addEventListener("click", () => {
  imagenInput.click();
});

// Mostrar vista previa de la imagen seleccionada
imagenInput.addEventListener("change", () => {
  const archivo = imagenInput.files[0];

  if (archivo && archivo.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.onload = (e) => {
      previewImg.src = e.target.result;
      previewImg.style.display = "block";
    };

    reader.readAsDataURL(archivo);
  } else {
    previewImg.src = "";
    previewImg.style.display = "none";
  }
});

// Manejo del envío del formulario
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const producto = productoInput.value.trim();
  const fecha = fechaInput.value;
  const observaciones = observacionesInput.value.trim();
  const imagen = imagenInput.files[0];

  // Validación de campos
  if (!producto) {
    alert("Por favor ingresa el nombre del producto.");
    productoInput.focus();
    return;
  }

  if (!fecha) {
    alert("Por favor selecciona una fecha.");
    fechaInput.focus();
    return;
  }

  if (!observaciones) {
    alert("Por favor escribe una descripción.");
    observacionesInput.focus();
    return;
  }

  if (!imagen) {
    alert("Por favor adjunta una imagen.");
    imagenInput.focus();
    return;
  }

  // Mostrar spinner y ocultar resultado
  spinner.style.display = "block";
  statusMessage.style.display = "none";
  detailsLink.style.display = "none";

  // Simulación de análisis IA
  setTimeout(() => {
    spinner.style.display = "none";
    statusMessage.style.display = "flex";
    detailsLink.style.display = "inline-block";

    // Resultado simulado
    statusMessage.querySelector("p").textContent = "Aprobada";
    statusMessage.querySelector(".check-icon").textContent = "✓";

    // Crear objeto de inspección
    const nuevaInspeccion = {
      producto,
      fecha,
      observaciones,
      estado: "Aprobada",
      inspector: nombreUsuario || "—",
      comentarios: "Inspección satisfactoria",
      observacionesDetalladas: [
        { item: "Estado general", estado: "✔️" }
      ]
    };

    guardarInspeccion(nuevaInspeccion);

    // Limpiar formulario
    form.reset();
    previewImg.src = "";
    previewImg.style.display = "none";
  }, 2000);
});