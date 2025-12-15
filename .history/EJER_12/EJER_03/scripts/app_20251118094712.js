const nombre = document.getElementById("nombre");
const sku = document.getElementById("sku");
const precio = document.getElementById("precio");
const stock = document.getElementById("stock");
const categoria = document.getElementById("categoria");
const btnGuardar = document.getElementById("btnGuardar");

const errNombre = document.getElementById("errNombre");
const errSku = document.getElementById("errSku");
const errPrecio = document.getElementById("errPrecio");
const errStock = document.getElementById("errStock");
const errCategoria = document.getElementById("errCategoria");

const estadoSku = document.getElementById("estadoSku");
const mensajeExito = document.getElementById("mensajeExito");

let skuDisponible = false;

function validarNombre() {
  if (nombre.value.trim() === "") { errNombre.textContent = "El nombre es obligatorio."; return false; }
  errNombre.textContent = ""; return true;
}

function validarSkuBasico() {
  if (sku.value.trim().length < 5) { errSku.textContent = "El SKU debe tener al menos 5 caracteres."; return false; }
  errSku.textContent = ""; return true;
}

function validarPrecio() {
  if (precio.value <= 0) { errPrecio.textContent = "El precio debe ser mayor que 0."; return false; }
  errPrecio.textContent = ""; return true;
}

function validarStock() {
  if (stock.value < 0) { errStock.textContent = "El stock debe ser 0 o mayor."; return false; }
  errStock.textContent = ""; return true;
}

function validarCategoria() {
  if (categoria.value.trim() === "") { errCategoria.textContent = "La categoría es obligatoria."; return false; }
  errCategoria.textContent = ""; return true;
}

function validarFormulario() {
  const valido =
    validarNombre() &&
    validarSkuBasico() &&
    validarPrecio() &&
    validarStock() &&
    validarCategoria() &&
    skuDisponible;

  btnGuardar.disabled = !valido;
}

async function validarSkuAsincrono() {
  estadoSku.textContent = "Validando SKU...";
  const res = await fetch("data/productos.json");
  const productos = await res.json();

  const existe = productos.some(p => p.sku === sku.value.trim());

  if (existe) { estadoSku.textContent = "❌ SKU ya existe"; skuDisponible = false; }
  else { estadoSku.textContent = "✔ SKU disponible"; skuDisponible = true; }

  validarFormulario();
}

sku.addEventListener("blur", () => {
  if (validarSkuBasico()) validarSkuAsincrono();
});

[nombre, sku, precio, stock, categoria].forEach(input => input.addEventListener("input", validarFormulario));

const form = document.getElementById("formProducto");
form.addEventListener("submit", e => {
  e.preventDefault();
  mensajeExito.textContent = `Producto "${nombre.value}" guardado correctamente.`;
  form.reset();
  estadoSku.textContent = "";
  skuDisponible = false;
  btnGuardar.disabled = true;
});
