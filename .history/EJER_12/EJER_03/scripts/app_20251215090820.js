const nombre = document.getElementById("nombre");
const sku = document.getElementById("sku");
const precio = document.getElementById("precio");
const stock = document.getElementById("stock");
const categoria = document.getElementById("categoria");
const btnGuardar = document.getElementById("btnGuardar");
const estadoSku = document.getElementById("estadoSku");

let skuValido = false;

async function validarSku(valor) {
  estadoSku.textContent = "Validando SKU...";
  const res = await fetch("data/productos.json");
  const productos = await res.json();
  const existe = productos.some(p => p.sku === valor);
  estadoSku.textContent = existe ? "SKU ya existe" : "SKU disponible";
  skuValido = !existe;
  validarFormulario();
}

function validarFormulario() {
  btnGuardar.disabled = !(
    nombre.value &&
    sku.value.length >= 5 &&
    precio.value > 0 &&
    stock.value >= 0 &&
    categoria.value &&
    skuValido
  );
}

sku.addEventListener("blur", () => {
  if (sku.value.length >= 5) validarSku(sku.value);
});

[nombre, sku, precio, stock, categoria].forEach(campo =>
  campo.addEventListener("input", validarFormulario)
);

document.getElementById("formProducto").addEventListener("submit", e => {
  e.preventDefault();
  document.getElementById("mensajeExito").textContent =
    `Producto "${nombre.value}" guardado correctamente`;
  e.target.reset();
  btnGuardar.disabled = true;
});
