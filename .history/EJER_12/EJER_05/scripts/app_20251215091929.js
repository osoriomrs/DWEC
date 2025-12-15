const selectUsuario = document.getElementById("selectUsuario")
const estado = document.getElementById("estado")
const dashboard = document.getElementById("dashboard")

let usuarios = []
let pedidos = []

async function cargarDatos() {
  estado.textContent = "Cargando datos maestros..."

  const resU = await fetch("data/usuarios.json")
  const resP = await fetch("data/pedidos.json")

  usuarios = await resU.json()
  pedidos = await resP.json()

  selectUsuario.innerHTML = '<option value="">Seleccione usuario</option>'
  usuarios.forEach(u => {
    const opt = document.createElement("option")
    opt.value = u.id
    opt.textContent = u.nombre
    selectUsuario.appendChild(opt)
  })

  estado.textContent = ""
}

selectUsuario.addEventListener("change", () => {
  dashboard.innerHTML = ""
  const userId = selectUsuario.value
  if (!userId) return

  const pedidosUsuario = pedidos.filter(p => p.userId === userId)

  if (pedidosUsuario.length === 0) {
    dashboard.textContent = "Este usuario no tiene ventas"
    return
  }

  const total = pedidosUsuario.reduce((s, p) => s + p.total, 0)

  dashboard.innerHTML = `
    <h3>Ventas</h3>
    <ul>
      ${pedidosUsuario.map(p => `<li>${p.producto} - ${p.total} €</li>`).join("")}
    </ul>
    <p>Total vendido: ${total} €</p>
  `
})

cargarDatos()
