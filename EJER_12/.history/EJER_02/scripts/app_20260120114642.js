const form = document.getElementById("formBusqueda");
const emailInput = document.getElementById("emailInput");
const resultados = document.getElementById("resultados");
const estado = document.getElementById("estado");
const btnUsuarios = document.getElementById("btnUsuarios");

form.addEventListener("submit", async e => {
  e.preventDefault();
  resultados.innerHTML = "";
  estado.textContent = "Buscando...";

  const email = emailInput.value.trim();
  if (!email || !email.includes("@")) {
    estado.textContent = "Email no válido";
    return;
  }

  try {
    const datos = await buscarUsuarioYPedidos(email);
    mostrarResultados(datos);
    estado.textContent = "";
  } catch (err) {
    estado.textContent = err.message;
    resultados.innerHTML = "";
  }
});

btnUsuarios.addEventListener("click", async () => {
  resultados.innerHTML = "";
  estado.textContent = "Cargando usuarios...";
  try {
    const resUsuarios = await fetch("data/usuarios.json");
    const usuarios = await resUsuarios.json();

    if (usuarios.length === 0) {
      resultados.innerHTML = "<p>No hay usuarios registrados.</p>";
      estado.textContent = "";
      return;
    }

    let html = `<h3>Usuarios registrados</h3><ul class="list-group">`;
    usuarios.forEach(u => {
      html += `<li class="list-group-item"><strong>${u.nombre}</strong> - ${u.email}</li>`;
    });
    html += `</ul>`;

    resultados.innerHTML = html;
    estado.textContent = "";
  } catch {
    estado.textContent = "Error al cargar usuarios";
    resultados.innerHTML = "";
  }
});

async function buscarUsuarioYPedidos(email) {
  const resUsuarios = await fetch("data/usuarios.json");
  const usuarios = await resUsuarios.json();
  const usuario = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!usuario) throw new Error("Usuario no encontrado");

  const resPedidos = await fetch("data/pedidos.json");
  const pedidos = await resPedidos.json();
  const pedidosUsuario = pedidos.filter(p => p.usuarioId === usuario.id);

  return { usuario, pedidos: pedidosUsuario };
}

function mostrarResultados({ usuario, pedidos }) {
  let html = `
    <div class="card p-3 mb-3">
      <h3>${usuario.nombre}</h3>
      <p>Fecha de registro: ${usuario.fechaRegistro}</p>
    </div>
    <div>
      <h4>Pedidos</h4>
  `;

  if (pedidos.length === 0) {
    html += `<p>Este usuario no tiene pedidos registrados</p>`;
  } else {
    html += `<ul class="list-group">`;
    pedidos.forEach(p => {
      html += `<li class="list-group-item">
        Pedido <strong>${p.id}</strong> - Fecha: ${p.fecha} - Estado: ${p.estado}
      </li>`;
    });
    html += `</ul>`;
  }

  html += `</div>`;
  resultados.innerHTML = html;
}
