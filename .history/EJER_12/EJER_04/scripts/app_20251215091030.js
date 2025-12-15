const estado = document.getElementById("estado")
const contenedor = document.getElementById("contenedorPedidos")

async function cargarPanel() {
  estado.textContent = "Cargando datos del panel..."

  try {
    const [resUsuarios, resPedidos] = await Promise.all([
      fetch("data/usuarios.json"),
      fetch("data/pedidos.json")
    ])

    const usuarios = await resUsuarios.json()
    const pedidos = await resPedidos.json()

    estado.textContent = ""
    contenedor.innerHTML = ""

    usuarios.forEach(u => {
      const pedidosUsuario = pedidos.filter(p => p.userId === u.id)
      const total = pedidosUsuario.reduce((s, p) => s + p.total, 0)

      const div = document.createElement("div")
      div.innerHTML = `
        <h3>${u.nombre}</h3>
        <p>Pedidos: ${pedidosUsuario.length}</p>
        <p>Total gastado: ${total} €</p>
        <hr>
      `
      contenedor.appendChild(div)
    })
  } catch {
    estado.textContent = "Error al cargar el panel"
  }
}

cargarPanel()
