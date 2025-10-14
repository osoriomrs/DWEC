const btnAgregar = document.getElementById("btnAgregar");
const cuerpoTabla = document.getElementById("cuerpoTabla");

btnAgregar.addEventListener("click", () => {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;

    const fila = document.createElement("tr");
    const celdaNombre = document.createElement("td");
    const celdaApellido = document.createElement("td");

    celdaNombre.textContent = nombre;
    celdaApellido.textContent = apellido;

    fila.appendChild(celdaNombre);
    fila.appendChild(celdaApellido);

    cuerpoTabla.appendChild(fila);
});
