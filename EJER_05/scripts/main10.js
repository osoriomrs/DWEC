const inputCantidad = document.getElementById("cantidad");
const botonGenerar = document.getElementById("btn-generar");
const divResultado = document.getElementById("resultado");

botonGenerar.addEventListener("click", () => {
    const cantidad = parseInt(inputCantidad.value);
    divResultado.innerHTML = "";

    if (isNaN(cantidad) || cantidad <= 0) {
        divResultado.textContent = "Por favor, introduce un número válido.";
        return;
    }

    const fragmento = document.createDocumentFragment();
    const texto="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

    for (let i = 0; i < cantidad; i++) {
        const p = document.createElement("p");
        p.textContent = texto;
        fragmento.appendChild(p);
    }

    divResultado.appendChild(fragmento);
}); 
