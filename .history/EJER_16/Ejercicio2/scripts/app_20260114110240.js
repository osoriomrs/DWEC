const eventosContainer = document.getElementById("eventosContainer")

function crearFecha(...args) {
  if (args.length === 1) {
    if (typeof args[0] === "number") return new Date(args[0])
    if (typeof args[0] === "string") return new Date(args[0])
  }
  if (args.length === 3) return new Date(args[0], args[1] - 1, args[2])
  return null
}

const ahora = new Date()
const tresDiasDespues = new Date(ahora.getTime() + 3 * 24 * 60 * 60 * 1000)

let eventos = [
  { nombre: "Año Nuevo Japón", descripcion: "Celebración del Año Nuevo en Japón", fecha: crearFecha("2026-01-01") },
  { nombre: "Cumbre Europea", descripcion: "Reunión de líderes europeos", fecha: crearFecha(2026, 3, 15) },
  { nombre: "Elecciones USA", descripcion: "Elecciones presidenciales en EE.UU.", fecha: crearFecha(1767225600000) },
  { nombre: "Juegos Olímpicos", descripcion: "Apertura de los Juegos Olímpicos de Verano", fecha: crearFecha("2026-07-24") },
  { nombre: "Conferencia Climática ONU", descripcion: "Evento internacional sobre el clima", fecha: crearFecha(2026, 11, 5) },
  { nombre: "Próximo Partido Real Oviedo", descripcion: "CA Osasuna - Real Oviedo", fecha: tresDiasDespues }
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
  eventosContainer.innerHTML = ""

  eventos.forEach((e, index) => {
    const card = document.createElement("div")
    card.className = "col-md-4"
    card.innerHTML = `
      <div class="card h-100">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${e.nombre}</h5>
          <p class="card-text">${e.descripcion}</p>
          <p><b>Fecha:</b> ${e.fecha.toLocaleString()}</p>
          <p><b>Tiempo restante:</b> <span id="tiempo-${index}"></span></p>
          <div class="input-group mb-2">
            <input type="number" class="form-control" id="dias-${index}" placeholder="Días a posponer">
            <button class="btn btn-primary" id="btn-${index}">Posponer</button>
          </div>
        </div>
      </div>
    `
    eventosContainer.appendChild(card)

    const btn = document.getElementById(`btn-${index}`)
    const input = document.getElementById(`dias-${index}`)
    btn.addEventListener("click", () => {
      const dias = Number(input.value)
      if (!isNaN(dias)) {
        e.fecha.setDate(e.fecha.getDate() + dias)
        ordenarEventos()
      }
    })
  })
}

function actualizarTiempos() {
  const ahora = Date.now()
  eventos.forEach((e, index) => {
    const tiempoSpan = document.getElementById(`tiempo-${index}`)
    if (!tiempoSpan) return
    const diff = e.fecha.getTime() - ahora
    tiempoSpan.textContent = diff > 0 ? formatear(diff) : "FINALIZADO"
    tiempoSpan.style.color = diff > 0 ? "green" : "red"
  })
}

ordenarEventos()
render()
setInterval(actualizarTiempos, 1000)
