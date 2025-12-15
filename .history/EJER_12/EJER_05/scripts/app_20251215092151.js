const selectUsuario = document.getElementById("selectUsuario");
const estado = document.getElementById("estado");
const dashboard = document.getElementById("dashboard");

let usuarios = [];
let productos = [];
let pedidos = [];
let detalles = [];

async function cargarDatosIniciales() {
  estado.textContent = "Cargando datos maestros...";
  try {
    const [resUsuarios, resProductos, resPedidos, resDetalles] = await Promise.all([
      fetch("data/usuarios.json"),
      fetch("data/productos.json"),
      fetch("data/pedidos.json"),
      fetch("data/detalles_pedido.json")
    ]);

    usuarios = await resUsuarios.json();
    productos = await resProductos.json();
    pedidos = await resPedidos.json();
    detalles = await resDetalles.json();

    estado.textContent = "";
    inicializarDashboard();
  } catch {
    estado.textContent = "Error al cargar los datos.";
  }
}

function inicializarDashboard() {
  selectUsuario.innerHTML = "";
  usuarios.forEach(u => {
    const opt = document.createElement("option");
    opt.value = u.id;
    opt.textContent = u.nombre;
    selectUsuario.appendChild(opt);
  });

  selectUsuario.addEventListener("change", () => {
    mostrarDashboardUsuario(parseInt(selectUsuario.value));
  });
}

function mostrarDashboardUsuario(usuarioId) {
  dashboard.innerHTML = "";

  const usuario = usuarios.find(u => u.id === usuarioId);
  if (!usuario) return;

  const divUsuario = document.createElement("div");
  divUsuario.innerHTML = `
    <h2>Usuario: ${usuario.nombre}</h2>
    <p>Email: ${usuario.email}</p>
    <p>Fecha de registro: ${usuario.fechaRegistro}</p>
  `;
  dashboard.appendChild(divUsuario);

  const pedidosUsuario = pedidos.filter(p => p.usuarioId === usuarioId);
  let gastoTotal = 0;

  const divPedidos = document.createElement("div");
  divPedidos.innerHTML = "<h3>Pedidos</h3>";

  pedidosUsuario.forEach(p => {
    const detallesPedido = detalles
      .filter(d => d.pedidoId === p.id)
      .map(d => {
        const producto = productos.find(prod => prod.id === d.productoId);
        return {
          nombre: producto ? producto.nombre : "Producto no encontrado",
          cantidad: d.cantidad,
          precioUnitario: d.precioUnitario
        };
      });

    const totalPedido = detallesPedido.reduce(
      (sum, d) => sum + d.cantidad * d.precioUnitario,
      0
    );

    gastoTotal += totalPedido;

    const divPedido = document.createElement("div");
    divPedido.innerHTML = `
      <p>Pedido ${p.id} - ${p.fecha} - Estado: ${p.estado}</p>
      <ul>
        ${detallesPedido
          .map(d => `<li>${d.cantidad} x ${d.nombre} - ${d.precioUnitario} €</li>`)
          .join("")}
      </ul>
      <p>Total Pedido: ${totalPedido.toFixed(2)} €</p>
      <hr>
    `;
    divPedidos.appendChild(divPedido);
  });

  dashboard.appendChild(divPedidos);

  const divResumen = document.createElement("div");
  divResumen.innerHTML = `<h3>Gasto Total Acumulado: ${gastoTotal.toFixed(2)} €</h3>`;
  dashboard.appendChild(divResumen);
}

cargarDatosIniciales();
