const nombre = document.getElementById("nombre")
const sku = document.getElementById("sku")
const precio = document.getElementById("precio")
const stock = document.getElementById("stock")
const categoria = document.getElementById("categoria")
const btnGuardar = document.getElementById("btnGuardar")

const errNombre = document.getElementById("errNombre")
const errSku = document.getElementById("errSku")
const errPrecio = document.getElementById("errPrecio")
const errStock = document.getElementById("errStock")
const errCategoria = document.getElementById("errCategoria")

const estadoSku = document.getElementById("estadoSku")
const mensajeExito = document.getElementById("mensajeExito")

let skuDisponible = false

function validarNombre() {
  if (nombre.value.trim() === "") { errNombre.textContent = "El nombre es obligatorio"; return false }
  errNombre.textContent = ""; return true
}

function validarSkuBasico() {
  if (sku.value.trim().length < 5) { errSku.textContent = "El SKU debe tener al menos 5 caracteres"; return false }
  errSku.textContent = ""; return true
}

function validarPrecio() {
  if (precio.value <= 0) { errPrecio.textContent = "El precio debe ser mayor que 0"; return false }
  errPrecio.textContent = ""; return true
}

function validarStock() {
  if (stock.value < 0) { errStock.textContent = "El stock debe ser 0 o mayor"; return false }
  errStock.textContent = ""; return true
}

function validarCategoria() {
  if (categoria.value.trim() === "") { errCategoria.textContent = "La categoría es obligatoria"; return false }
  errCategoria.textContent = ""; return true
}

function validarFormulario() {
  btnGuardar.disabled = !(
    validarNombre() &&
    validarSkuBasico() &&
    validarPrecio() &&
    validarStock() &&
    validarCategoria() &&
    skuDisponible
  )
}

async function validarSkuAsincrono() {
  estadoSku.textContent = "Validando SKU..."
  const res = await fetch("data/productos.json")
  const productos = await res.json()
  const existe = productos.some(p => p.sku === sku.value.trim())
  if (existe) { estadoSku.textContent = "❌ SKU ya existe"; skuDisponible = false }
  else { estadoSku.textContent = "✔ SKU disponible"; skuDisponible = true }
  validarFormulario()
}

sku.addEventListener("blur", () => {
  if (validarSkuBasico()) validarSkuAsincrono()
})

;[nombre, sku, precio, stock, categoria].forEach(i =>
  i.addEventListener("input", validarFormulario)
)

document.getElementById("formProducto").addEventListener("submit", e => {
  e.preventDefault()
  mensajeExito.textContent = `Producto "${nombre.value}" guardado correctamente`
  e.target.reset()
  estadoSku.textContent = ""
  skuDisponible = false
  btnGuardar.disabled = true
})

function getCookie(nombre) {
  const valor = document.cookie.split("; ").find(row => row.startsWith(nombre + "="))
  return valor ? decodeURIComponent(valor.split("=")[1]) : null
}

function setCookie(nombre, valor, dias) {
  const fecha = new Date()
  fecha.setTime(fecha.getTime() + dias * 24 * 60 * 60 * 1000)
  document.cookie = `${nombre}=${encodeURIComponent(valor)}; expires=${fecha.toUTCString()}; path=/`
}

const ultimaVisita = getCookie("ultimaVisita")

if (ultimaVisita) {
  const banner = document.createElement("div")
  banner.style.background = "#f1f1f1"
  banner.style.padding = "10px"
  banner.style.display = "flex"
  banner.style.justifyContent = "space-between"
  banner.innerHTML = `
    <span>Bienvenido de nuevo. Tu última visita fue el ${ultimaVisita}</span>
    <button id="cerrarBanner">Cerrar</button>
  `
  document.body.prepend(banner)
  document.getElementById("cerrarBanner").onclick = () => banner.remove()
}

setCookie("ultimaVisita", new Date().toLocaleString(), 30)
