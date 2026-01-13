const dropZone = document.getElementById("dropZone");
const preview = document.getElementById("preview");
const btnProcesar = document.getElementById("procesar");

let archivos = []

dropZone.addEventListener("dragover", e => {
  e.preventDefault()
})

dropZone.addEventListener("drop", e => {
  e.preventDefault()
  archivos = [...e.dataTransfer.files].filter(f => f.type.startsWith("image/"))
  preview.innerHTML = ""
  archivos.forEach(file => {
    const reader = new FileReader()
    reader.onload = e => {
      const img = document.createElement("img")
      img.src = e.target.result
      img.width = 120
      preview.appendChild(img)
    }
    reader.readAsDataURL(file)
  })
})

btnProcesar.addEventListener("click", async () => {
  const texto = document.getElementById("marcaAgua").value
  const maxWidth = Number(document.getElementById("maxWidth").value)
  const formato = document.getElementById("formato").value

  const zip = new JSZip()
  const carpeta = zip.folder("imagenes")

  for (const file of archivos) {
    const img = await cargarImagen(file)
    const scale = maxWidth ? maxWidth / img.width : 1
    const w = img.width * scale
    const h = img.height * scale

    const canvas = document.createElement("canvas")
    canvas.width = w
    canvas.height = h

    const ctx = canvas.getContext("2d")
    ctx.drawImage(img, 0, 0, w, h)
    ctx.font = "20px Arial"
    ctx.fillStyle = "rgba(255,255,255,0.7)"
    ctx.fillText(texto, 10, h - 10)

    const blob = await new Promise(res => canvas.toBlob(res, formato))
    carpeta.file(`editada-${file.name}`, blob)
  }

  const contenido = await zip.generateAsync({ type: "blob" })
  const a = document.createElement("a")
  a.href = URL.createObjectURL(contenido)
  a.download = "imagenes_editadas.zip"
  a.click()
})

function cargarImagen(file) {
  return new Promise(res => {
    const img = new Image()
    img.onload = () => res(img)
    img.src = URL.createObjectURL(file)
  })
}
