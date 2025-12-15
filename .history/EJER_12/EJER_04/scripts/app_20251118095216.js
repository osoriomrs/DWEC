const contenedorPedidos = document.getElementById("contenedorPedidos");
const estado = document.getElementById("estado");

async function cargarPanel() {
  estado.textContent = "Cargando datos del panel...";
  try {
    const [resPedidos, resDetalles, resProductos] = await Promise.all([
      fetch("data/pedidos.json"),
      fetch("data/detalles_pedido.json"),
      fetch("data/productos.json")
    ]);

    const pedidos = await resPedidos.json();
    const detalles = await resDetalles.json();
    const productos = await resProductos.json();

    const pedidosEnriquecidos = combinarDatos(pedidos, detalles, productos);
    estado.textContent = "";
    mostrarPanel(pedidosEnriquecidos);

  } catch (err) {
    estado.textContent = "Error al cargar los datos del panel.";
    console.error(err);
  }
}

function combinarDatos(pedidos, detalles, productos) {
  return pedidos.map(pedido => {
    const detallesPedido = detalles
      .filter(d => d.pedidoId === pedido.id)
      .map(d => {
        const producto = productos.find(prod => prod.id === d.productoId);
        return {
          cantidad: d.cantidad,
          precioUnitario: d.precioUnitario,
          nombreProducto: producto ? producto.nombre : "Producto no encontrado"
        };
      });

    const totalPedido = detallesPedido.reduce((sum, d) => sum + d.cantidad * d.precioUnitario, 0);

    return { ...pedido, detalles: detallesPedido, totalPedido };
  });
}

function mostrarPanel(pedidosEnriquecidos) {
  contenedorPedidos.innerHTML = "";
  pedidosEnriquecidos.forEach(p => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>Pedido ${p.id} - ${p.fecha}</h3>
      <p>Estado: ${p.estado}</p>
      <p>Total: ${p.totalPedido.toFixed(2)} €</p>
      <ul>
        ${p.detalles.map(d => `<li>${d.cantidad} x ${d.nombreProducto} - ${d.precioUnitario} €</li>`).join('')}
      </ul>
      <hr>
    `;
    contenedorPedidos.appendChild(div);
  });
}

cargarPanel();
