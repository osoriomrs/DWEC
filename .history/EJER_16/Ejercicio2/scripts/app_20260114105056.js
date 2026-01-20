const lista = document.getElementById("lista")
const btn = document.getElementById("posponer")
const inputDias = document.getElementById("dias")

function crearFecha(...args) {
  if (args.length === 1) {
    if (typeof args[0] === "number") return new Date(args[0])
    if (typeof args[0] === "string") return new Date(args[0])
  }
  if (args.length === 3) return new Date(args[0], args[1] - 1, args[2])
  return null
}

let eventos = [
  { nombre: "Año Nuevo Japón", fecha: crearFecha("2026-01-01") },
  { nombre: "Cumbre Europea", fecha: crearFecha(2026, 3, 15) },
  { nombre: "Elecciones USA", fecha: crearFecha(1767225600000) },
  { nombre: "Evento Pasado", fecha: crearFecha("2023-05-10") },
  { nombre: "Juegos Olímpicos", fecha: crearFecha("2026-07-24") },
  { nombre: "Conferencia Climática ONU", fecha: crearFecha(2026, 11, 5) }
]

function ordenarEventos() {
  eventos.sort((a, b) => a.fecha - b.fecha)
}

function formatear(ms) {
  const s = Math.floor(ms / 1000)
  const d = Math.floor(s / 86400)
  const h = Math.floor((s % 86400) / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  return `${d} : ${h} : ${m} : ${sec}`
}

function render() {
  lista.innerHTML = ""
  const ahora = Date.now()

  eventos.forEach(e => {
    const diff = e.fecha.getTime() - ahora
    const li = document.createElement("li")
    li.className = "list-group-item d-flex justify-content-between align-items-center"

    if (diff > 0) {
      li.innerHTML = `
        <span>${e.nombre}</span>
        <span class="text-success fw-bold">${formatear(diff)}</span>
      `
    } else {
      li.innerHTML = `
        <span>${e.nombre}</span>
        <span class="text-danger fw-bold">FINALIZADO</span>
      `
    }

    lista.appendChild(li)
  })
}

btn.addEventListener("click", () => {
  const dias = Number(inputDias.value)
  if (isNaN(dias)) return
  eventos.forEach(e => e.fecha.setDate(e.fecha.getDate() + dias))
  ordenarEventos()
})

ordenarEventos()
render()
setInterval(render, 1000)
