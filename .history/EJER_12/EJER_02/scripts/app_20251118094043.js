const formBusqueda = document.getElementById("formBusqueda");
const emailInput = document.getElementById("emailInput");
const estado = document.getElementById("estado");
const resultados = document.getElementById("resultados");

function emailValido(email) {
  return email.includes("@") && email.trim() !== "";
}

async function buscarUsuarioYPedidos(email) {
  const resUsuarios = await fetch("data/usuarios.json");
  const usuarios = await resUsuarios.json();

  const usuario = usuarios.find(u => u.email === email);
  if (!usuario) throw new Error("Usuario no encontrado");

  const resPedidos = await fetch("data/pedidos.json");
  const pedidos = await resPedidos.json();

  const pedidosUsuario = pedidos.filter(p => p.usuarioId === usuario.id);
  return { usuario, pedidosUsuario };
}

function mostrarResultados(data) {
  resultados.innerHTML = "";
  const { usuario, pedidosUsuario } = data;

  const divUsuario = document.createElement("div");
  divUsuario.innerHTML = `
    <h2>Usuario encontrado</h2>
    <p><strong>Nombre:</strong> ${usuario.nombre}</p>
    <p><strong>Fecha de registro:</strong> ${usuario.fechaRegistro}</p>
    <hr>
    <h3>Pedidos:</h3>
  `;
  resultados.appendChild(divUsuario);

  if (pedidosUsuario.length === 0) {
    resultados.innerHTML += `<p>Este usuario no tiene pedidos registrados.</p>`;
    return;
  }

  pedidosUsuario.forEach(p => {
    const divPedido = document.createElement("div");
    divPedido.innerHTML = `
      <p><strong>ID Pedido:</strong> ${p.id}</p>
      <p><strong>Fecha:</strong> ${p.fecha}</p>
      <p><strong>Estado:</strong> ${p.estado}</p>
      <hr>
    `;
    resultados.appendChild(divPedido);
  });
}

formBusqueda.addEventListener("submit", async e => {
  e.preventDefault();
  const email = emailInput.value.trim();

  if (!emailValido(email)) {
    estado.textContent = "Introduce un email válido.";
    return;
  }

  estado.textContent = "Buscando usuario...";
  resultados.innerHTML = "";

  try {
    const datos = await buscarUsuarioYPedidos(email);
    estado.textContent = "";
    mostrarResultados(datos);
  } catch (error) {
    estado.textContent = error.message;
  }
});
