const btnMostrar = document.getElementById("mostrarModal");
const modalDiv = document.querySelector(".oculto");

modalDiv.innerHTML = `
    <div id="modalContent">
        <h2>Ventana Modal</h2>
        <p>Este es un ejemplo simple.</p>
        <button id="cerrarModal">Cerrar</button>
    </div>
`;

modalDiv.style.display = "none";

btnMostrar.addEventListener("click", () => {
    modalDiv.style.display = "block";
});

document.getElementById("cerrarModal").addEventListener("click", () => {
    modalDiv.style.display = "none";
});


