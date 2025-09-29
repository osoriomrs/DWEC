import { obtenerLibros } from "./biblioteca.js";
import { agregarLibro } from "./biblioteca.js";
import { buscarLibro } from "./biblioteca.js";
import { eliminarLibro } from "./biblioteca.js";
import { calcularTotalPaginas } from "./biblioteca.js";
import { ordenarPorPaginas } from "./biblioteca.js";
import {hayLibrosLargos} from "./biblioteca.js";
import {todosSonLibrosCortos} from "./biblioteca.js";

const libros = obtenerLibros();
console.log(libros);

const nuevoLibro = {id:11, titulo:"La Iliada", autor:"Homero", paginas:560};
agregarLibro(nuevoLibro);

console.log("Después de agregar un libro:");
const librosActualizados = obtenerLibros();
console.log(librosActualizados);

const buscarLibroporID=buscarLibro(3);
console.log("Libro con ID 3:",buscarLibroporID);

eliminarLibro(2);
console.log("Después de eliminar el libro con ID 2:");
const librosDespuesEliminacion = obtenerLibros();
console.log(librosDespuesEliminacion);

const totalPaginas = calcularTotalPaginas();
console.log("Total de páginas en la biblioteca:", totalPaginas);

const librosOrdenados = ordenarPorPaginas();
console.log("Libros ordenados por número de páginas:");
console.log(librosOrdenados);

const hayLargos = hayLibrosLargos(500);
console.log("¿Hay libros con más de 500 páginas?", hayLargos);  

const todosCortos = todosSonLibrosCortos(1000);
console.log("¿Todos los libros tienen menos de 1000 páginas?", todosCortos);


