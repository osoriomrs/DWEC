const usuarios = [
    { nombre: "Juan", edad: 25, ciudad: "Madrid" },
    { nombre: "Ana", edad: 30, ciudad: "Barcelona" },
    { nombre: "Luis", edad: 28, ciudad: "Valencia" },
    { nombre: "Marta", edad: 22, ciudad: "Sevilla" }
];

function generarTabla(usuarios) {
    const tabla = document.createElement("table");
    
    for (let i = 0; i < usuarios.length; i++) {
        const fila = document.createElement("tr");
        
        const celdaNombre = document.createElement("td");
        celdaNombre.textContent = usuarios[i].nombre;
        fila.appendChild(celdaNombre);

        const celdaEdad = document.createElement("td");
        celdaEdad.textContent = usuarios[i].edad;
        fila.appendChild(celdaEdad);

        const celdaCiudad = document.createElement("td");
        celdaCiudad.textContent = usuarios[i].ciudad;
        fila.appendChild(celdaCiudad);

        tabla.appendChild(fila);
    }

    document.getElementById("contenedor-tabla").appendChild(tabla);
}
generarTabla(usuarios);



