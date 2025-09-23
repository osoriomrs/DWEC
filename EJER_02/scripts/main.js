import { crearPerfil } from "./gestorUsuarios.js";
import mostrarPerfil from "./gestorUsuarios.js";
import { esMayorDeEdad, obtenerMayoresDeEdad, calcularPromedioEdad } from "./gestorUsuarios.js";

const perfil1 = crearPerfil("Ana","ana8@gmail.com",24);
const perfil2 = crearPerfil("Luis","luis7@gmail.com",15);
const perfil3 = crearPerfil("Sergio","sergio6@gmail.com",20);
const perfil4 = crearPerfil("María","maria4@gmail.com",17);
const perfil5 = crearPerfil("Gema","gema7@gmail.com",30);

const usuarios=[perfil1,perfil2,perfil3,perfil4,perfil5];

usuarios.forEach(usuario => {
    console.log(mostrarPerfil(usuario));
});

const mayoresDeEdad = obtenerMayoresDeEdad(usuarios);
console.log("Usuarios mayores de edad:");
mayoresDeEdad.forEach(usuario => mostrarPerfil(usuario));

const promedioEdad = calcularPromedioEdad(usuarios);
console.log("La edad promedio de los usuarios es:",promedioEdad);
