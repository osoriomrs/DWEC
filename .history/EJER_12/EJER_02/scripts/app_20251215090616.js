const form = document.getElementById("formBusqueda");
const emailInput = document.getElementById("emailInput");
const resultados = document.getElementById("resultados");
const estado = document.getElementById("estado");

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
    const resUsuarios = await fetch("data/usuarios.json");
    const usuarios = await resUsuarios.json();
    const usuario = usuarios.find(u => u.email === email);

    if (!usuario) {
      estado.textContent = "Usuario no encontrado";
      return;
    }

    const resPedidos = await fetch("data/pedidos.json");
    const pedidos = await resPedidos.json();
    const pedidosUsuario = pedidos.filter(p => p.usuarioId === usuario.id);

    estado.textContent = "";

    let html = `
      <h3>${usuario.nombre}</h3>
      <p>Fecha registro: ${usuario.fechaRegistro}</p>
      <h4>Pedidos</h4>
    `;

    if (pedidosUsuario.length === 0) {
      html += "<p>Este usuario no tiene pedidos</p>";
    } else {
      html += "<ul>";
      pedidosUsuario.forEach(p => {
        html += `<li>Pedido ${p.id} - ${p.fecha} - ${p.estado}</li>`;
      });
      html += "</ul>";
    }

    resultados.innerHTML = html;
  } catch {
    estado.textContent = "Error al cargar datos";
  }
});
