let dragged = null

document.addEventListener("dragstart", e => {
  if (e.target.classList.contains("tarjeta")) {
    dragged = e.target
    e.dataTransfer.setData("application/json", JSON.stringify({
      id: dragged.id,
      status: dragged.parentElement.dataset.status
    }))
    dragged.classList.add("dragging")
  }
})

document.addEventListener("dragend", () => {
  if (dragged) dragged.classList.remove("dragging")
  dragged = null
})

document.querySelectorAll(".columna").forEach(col => {
  col.addEventListener("dragover", e => {
    e.preventDefault()
    col.classList.add("drag-over")
    const after = getAfterElement(col, e.clientY)
    if (!after) col.appendChild(dragged)
    else col.insertBefore(dragged, after)
  })

  col.addEventListener("dragleave", () => {
    col.classList.remove("drag-over")
  })

  col.addEventListener("drop", e => {
    e.preventDefault()
    col.classList.remove("drag-over")
    const data = JSON.parse(e.dataTransfer.getData("application/json"))
    dragged.dataset.status = col.dataset.status
  })
})

function getAfterElement(container, y) {
  const elements = [...container.querySelectorAll(".tarjeta:not(.dragging)")]

  return elements.reduce((closest, el) => {
    const box = el.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset, element: el }
    }
    return closest
  }, { offset: Number.NEGATIVE_INFINITY }).element
}

document.querySelectorAll(".tarjeta").forEach(t => {
  t.addEventListener("dragover", e => e.preventDefault())
  t.addEventListener("drop", e => {
    const files = e.dataTransfer.files
    if (files.length) {
      const span = document.createElement("span")
      span.textContent = `📎 ${files[0].name}`
      t.appendChild(span)
    }
  })
})
