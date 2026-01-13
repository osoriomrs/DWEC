const columnas = document.querySelectorAll(".columna")
let tareas = []
let tareaArrastrada = null

fetch("https://jsonplaceholder.typicode.com/todos?_limit=12") //implemento una API para no tener que crear un json con tareas
  .then(res => res.json())
  .then(data => {
    tareas = data.map(t => ({
      id: "task-" + t.id,
      texto: t.title,
      estado: t.completed ? "finalizado" : "todo",
      adjuntos: []
    }))
    renderizar()
  })

function renderizar() {
  columnas.forEach(c => c.innerHTML = `<h2>${c.dataset.titulo}</h2>`)
  tareas.forEach(t => {
    const tarjeta = document.createElement("div")
    tarjeta.className = "tarjeta"
    tarjeta.draggable = true
    tarjeta.id = t.id

    tarjeta.innerHTML = `
      <div>${t.texto}</div>
      ${t.adjuntos.map(a => `<div class="adjunto">📎 ${a}</div>`).join("")}
    `

    tarjeta.addEventListener("dragstart", e => {
      tareaArrastrada = tarjeta
      e.dataTransfer.setData("text/plain", JSON.stringify({ id: t.id }))
      setTimeout(() => tarjeta.classList.add("dragging"), 0)
    })

    tarjeta.addEventListener("dragend", () => {
      tarjeta.classList.remove("dragging")
      tareaArrastrada = null
    })

    tarjeta.addEventListener("dragover", e => e.preventDefault())

    tarjeta.addEventListener("drop", e => {
      e.preventDefault()
      const files = [...e.dataTransfer.files]
      if (files.length) {
        tareas = tareas.map(task =>
          task.id === t.id
            ? { ...task, adjuntos: [...task.adjuntos, ...files.map(f => f.name)] }
            : task
        )
        renderizar()
      }
    })

    document.querySelector(`.columna[data-estado="${t.estado}"]`).appendChild(tarjeta)
  })
}

columnas.forEach(col => {
  col.addEventListener("dragover", e => {
    e.preventDefault()
    col.classList.add("drag-over")
    const despues = obtenerElementoDespues(col, e.clientY)
    if (despues == null) col.appendChild(tareaArrastrada)
    else col.insertBefore(tareaArrastrada, despues)
  })

  col.addEventListener("dragleave", () => {
    col.classList.remove("drag-over")
  })

  col.addEventListener("drop", e => {
    col.classList.remove("drag-over")
    const data = JSON.parse(e.dataTransfer.getData("text/plain"))
    tareas = tareas.map(t =>
      t.id === data.id ? { ...t, estado: col.dataset.estado } : t
    )
  })
})

function obtenerElementoDespues(contenedor, y) {
  const elementos = [...contenedor.querySelectorAll(".tarjeta:not(.dragging)")]
  return elementos.reduce((masCercano, el) => {
    const box = el.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > masCercano.offset) {
      return { offset, element: el }
    } else {
      return masCercano
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}
