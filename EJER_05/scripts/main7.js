const listaProductos = document.getElementById("lista-productos");
const carrito = document.getElementById("carrito");
const totalSpan = document.getElementById("total");

function calcularTotal() {
  const items = carrito.querySelectorAll("li");
  let total = 0;
  items.forEach(item => {
    total += parseFloat(item.getAttribute("data-price"));
  });
  totalSpan.textContent = total.toFixed(2);
}

listaProductos.addEventListener("click", e => {
  if (e.target.tagName === "BUTTON") {
    const producto = e.target.parentNode;
    const clon = producto.cloneNode(true);

    const boton = clon.querySelector("button");
    boton.textContent = "Quitar";

    carrito.appendChild(clon);
    calcularTotal();
  }
});

carrito.addEventListener("click", e => {
  if (e.target.tagName === "BUTTON") {
    e.target.parentNode.remove();
    calcularTotal();
  }
});
