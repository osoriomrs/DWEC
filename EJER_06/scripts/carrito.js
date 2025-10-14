let carrito = [];

const botones = document.querySelectorAll(".agregar");
const listaCarrito = document.getElementById("listaCarrito");
const totalDOM = document.getElementById("total");

botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const productoDiv = boton.parentElement;
        const nombre = productoDiv.querySelector(".nombre").textContent;
        const precio = parseFloat(productoDiv.querySelector(".precio").textContent);

        const productoExistente = carrito.find(p => p.nombre === nombre);
        if(productoExistente){
            productoExistente.cantidad += 1;
        } else {
            carrito.push({ nombre, precio, cantidad: 1 });
        }

        renderizarCarrito();
        calcularTotal();
    });
});

function renderizarCarrito(){
    listaCarrito.innerHTML = ""; 
    carrito.forEach(p => {
        const li = document.createElement("li");
        li.textContent = `${p.nombre} (x${p.cantidad}) - ${p.precio} €`;
        listaCarrito.appendChild(li);
    });
}

function calcularTotal(){
    const total = carrito.reduce((suma, p) => suma + p.precio * p.cantidad, 0);
    totalDOM.textContent = total.toFixed(2);
}
