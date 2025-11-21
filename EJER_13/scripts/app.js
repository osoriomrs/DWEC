const API_URL = "https://crudcrud.com/api/46411043821b4c4d8828300110750def/users";

const btnRefrescar = document.getElementById("btnRefrescar");
const formUsuario = document.getElementById("formUsuario");
const tablaUsuarios = document.getElementById("tablaUsuarios").querySelector("tbody");
const mensajes = document.getElementById("mensajes");
const inputBusqueda = document.createElement("input");
inputBusqueda.placeholder = "Buscar usuario...";
document.querySelector(".tabla-container").insertBefore(inputBusqueda, tablaUsuarios.parentNode);

let editandoId = null;
let usuarios = [];

const modalCalificaciones = document.getElementById("modalCalificaciones");
const modalNombre = document.getElementById("modalNombre");
const formCalificaciones = document.getElementById("formCalificaciones");
const btnGuardarCalificaciones = document.getElementById("btnGuardarCalificaciones");
const btnBorrarCalificaciones = document.getElementById("btnBorrarCalificaciones");
let usuarioActualCalificaciones = null;

function mostrarMensaje(msg, esError = false) {
  mensajes.textContent = msg;
  mensajes.classList.toggle("error", esError);
  setTimeout(() => mensajes.textContent = "", 3000);
}

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarURL(url) {
  try { new URL(url); return true; } 
  catch { return false; }
}

function validarFormulario(firstName, lastName, email, picture) {
  if (!firstName.trim()) { mostrarMensaje("El nombre es obligatorio", true); return false; }
  if (!lastName.trim()) { mostrarMensaje("El apellido es obligatorio", true); return false; }
  if (!validarEmail(email)) { mostrarMensaje("Email inválido", true); return false; }
  if (!validarURL(picture)) { mostrarMensaje("URL de imagen inválida", true); return false; }
  return true;
}

function validarCalificaciones(califs) {
  for (let key in califs) {
    const val = Number(califs[key]);
    if (isNaN(val) || val < 0 || val > 10) return false;
  }
  return true;
}

async function displayUsers(filtro = "") {
  tablaUsuarios.innerHTML = "";
  try {
    const res = await fetch(API_URL);
    usuarios = await res.json();

    const filtrados = usuarios.filter(u =>
      `${u.firstName} ${u.lastName}`.toLowerCase().includes(filtro.toLowerCase())
    );

    filtrados.forEach(user => {
      const fila = document.createElement("tr");
      const califHTML = user.calificaciones ? 
        Object.entries(user.calificaciones).map(([asig, val]) => `${asig}: ${val}`).join("<br>") : "";
      fila.innerHTML = `
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.email}</td>
        <td><img src="${user.picture}" width="50"></td>
        <td>${califHTML}</td>
        <td>
          <button class="edit-btn" onclick="editarUsuario('${user._id}')">Editar</button>
          <button class="delete-btn" onclick="eliminarUsuario('${user._id}')">Eliminar</button>
          <button class="calif-btn" onclick="abrirModalCalificaciones('${user._id}')">Calificaciones</button>
        </td>
      `;
      tablaUsuarios.appendChild(fila);
    });
  } catch {
    mostrarMensaje("Error al cargar usuarios", true);
  }
}

window.editarUsuario = async function(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const user = await res.json();
    editandoId = id;
    document.getElementById("firstName").value = user.firstName;
    document.getElementById("lastName").value = user.lastName;
    document.getElementById("email").value = user.email;
    document.getElementById("picture").value = user.picture;
  } catch {
    mostrarMensaje("Error al cargar datos del usuario", true);
  }
};

window.eliminarUsuario = async function(id) {
  const fila = Array.from(tablaUsuarios.children).find(tr => tr.querySelector(".delete-btn").onclick.toString().includes(id));
  fila.remove();

  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    mostrarMensaje("Usuario eliminado correctamente");
  } catch {
    tablaUsuarios.appendChild(fila);
    mostrarMensaje("Error al eliminar usuario", true);
  }
};

formUsuario.addEventListener("submit", async e => {
  e.preventDefault();
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const picture = document.getElementById("picture").value;

  if (!validarFormulario(firstName, lastName, email, picture)) return;

  const usuarioData = { firstName, lastName, email, picture };
  formUsuario.querySelector("button[type='submit']").disabled = true;

  if (editandoId) {
    try {
      await fetch(`${API_URL}/${editandoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioData)
      });
      editandoId = null;
      formUsuario.reset();
      mostrarMensaje("Usuario actualizado correctamente");
      await displayUsers(inputBusqueda.value);
    } catch {
      mostrarMensaje("Error al actualizar usuario", true);
    }
  } else {
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioData)
      });
      formUsuario.reset();
      mostrarMensaje("Usuario añadido correctamente");
      await displayUsers(inputBusqueda.value);
    } catch {
      mostrarMensaje("Error al añadir usuario", true);
    }
  }
  formUsuario.querySelector("button[type='submit']").disabled = false;
});

document.getElementById("btnCancelarEdicion").addEventListener("click", () => {
  formUsuario.reset();
  editandoId = null;
});

btnRefrescar.addEventListener("click", () => {
  uploadInitialUsers();
});

inputBusqueda.addEventListener("input", e => {
  displayUsers(e.target.value);
});

window.abrirModalCalificaciones = async function(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const user = await res.json();
    usuarioActualCalificaciones = user;
    modalNombre.textContent = `${user.firstName} ${user.lastName}`;

    const califs = user.calificaciones || { Matemáticas:"", Historia:"", Ciencia:"", Inglés:"", Arte:"" };
    formCalificaciones["Matemáticas"].value = califs.Matemáticas;
    formCalificaciones["Historia"].value = califs.Historia;
    formCalificaciones["Ciencia"].value = califs.Ciencia;
    formCalificaciones["Inglés"].value = califs.Inglés;
    formCalificaciones["Arte"].value = califs.Arte;

    modalCalificaciones.style.display = "block";
  } catch {
    mostrarMensaje("Error al cargar calificaciones", true);
  }
};

btnGuardarCalificaciones.addEventListener("click", async () => {
  const califs = {
    Matemáticas: Number(formCalificaciones["Matemáticas"].value),
    Historia: Number(formCalificaciones["Historia"].value),
    Ciencia: Number(formCalificaciones["Ciencia"].value),
    Inglés: Number(formCalificaciones["Inglés"].value),
    Arte: Number(formCalificaciones["Arte"].value)
  };

  if (!validarCalificaciones(califs)) {
    mostrarMensaje("Las calificaciones deben estar entre 0 y 10", true);
    return;
  }

  const usuarioActualizado = {
    firstName: usuarioActualCalificaciones.firstName,
    lastName: usuarioActualCalificaciones.lastName,
    email: usuarioActualCalificaciones.email,
    picture: usuarioActualCalificaciones.picture,
    calificaciones: califs
  };

  try {
    await fetch(`${API_URL}/${usuarioActualCalificaciones._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuarioActualizado)
    });
    modalCalificaciones.style.display = "none";
    mostrarMensaje("Calificaciones guardadas correctamente");
    await displayUsers(inputBusqueda.value);
  } catch {
    mostrarMensaje("Error al guardar calificaciones", true);
  }
});

btnBorrarCalificaciones.addEventListener("click", async () => {
  if (!confirm("¿Desea borrar todas las calificaciones de este usuario?")) return;

  const usuarioSinCalif = {
    firstName: usuarioActualCalificaciones.firstName,
    lastName: usuarioActualCalificaciones.lastName,
    email: usuarioActualCalificaciones.email,
    picture: usuarioActualCalificaciones.picture
  };

  try {
    await fetch(`${API_URL}/${usuarioActualCalificaciones._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuarioSinCalif)
    });
    modalCalificaciones.style.display = "none";
    mostrarMensaje("Calificaciones borradas correctamente");
    await displayUsers(inputBusqueda.value);
  } catch {
    mostrarMensaje("Error al borrar calificaciones", true);
  }
});

document.getElementById("btnCerrarModal").addEventListener("click", () => {
  modalCalificaciones.style.display = "none";
});

window.onload = async () => {
  await displayUsers();
};
