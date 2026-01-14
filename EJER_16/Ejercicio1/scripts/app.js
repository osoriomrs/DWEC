const tabla = document.getElementById("tabla")
const totalDiv = document.getElementById("total")

async function cargarLogs() {
  try {
    const res = await fetch("data/logs.txt")
    if (!res.ok) throw new Error()
    const texto = await res.text()
    procesarLogs(texto)
  } catch {
    totalDiv.className = "alert alert-danger"
    totalDiv.textContent = "Error cargando el archivo de logs"
  }
}

function procesarLogs(texto) {
  const lineas = texto.split("\n")
  let totalMB = 0

  lineas.forEach(linea => {
    const limpia = linea.trim()
    if (!limpia) return

    const idParte = limpia.slice(limpia.indexOf("ID:") + 3, limpia.indexOf("|")).trim()
    const id = idParte.slice(idParte.indexOf("-") + 1)

    const usuario = limpia
      .slice(limpia.indexOf("user:") + 5, limpia.indexOf("| consumo"))
      .trim()
      .toLowerCase()

    const consumoStr = limpia
      .slice(limpia.indexOf("consumo:") + 8, limpia.indexOf("bytes"))
      .trim()

    const bytes = Number(consumoStr)
    const mb = bytes / 1024 / 1024
    totalMB += mb

    const error = limpia.includes("ERROR")

    const tr = document.createElement("tr")
    if (error) tr.classList.add("table-danger")

    const estadoBtn = error
      ? `<button class="btn btn-danger btn-sm">ERROR</button>`
      : `<button class="btn btn-success btn-sm">OK</button>`

    tr.innerHTML = `
      <td>${id}</td>
      <td>${usuario}</td>
      <td>${mb.toFixed(2)}</td>
      <td>${estadoBtn}</td>
    `

    tabla.appendChild(tr)
  })

  totalDiv.textContent = `Consumo total: ${totalMB.toFixed(2)} MB`
}

cargarLogs()
