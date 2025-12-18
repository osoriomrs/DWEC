const libros = [
  { titulo: "Cien años de soledad", autor: "García Márquez", paginas: 410, categoria: "Ficción", precio: 25.00 },
  { titulo: "El poder del ahora", autor: "Eckhart Tolle", paginas: 235, categoria: "Autoayuda", precio: 15.50 },
  { titulo: "El código Da Vinci", autor: "Dan Brown", paginas: 689, categoria: "Misterio", precio: 12.75 },
  { titulo: "1984", autor: "George Orwell", paginas: 328, categoria: "Ficción", precio: 18.00 },
  { titulo: "Sapiens", autor: "Yuval Noah Harari", paginas: 498, categoria: "Historia", precio: 30.00 }
]; 

// Bloque 1: Iteración y Transformación
// Ejercicio 1.1:
libros.forEach(libro=>{
    console.log(`El libro ${libro.titulo} tiene ${libro.paginas} páginas`);
});
//Ejercicio 1.2:
const titulosYAutores=libros.map(libro=>{
    return{
        titulo:libro.titulo,
        autor:libro.autor
    };
});
console.log(titulosYAutores);

//Bloque 2: Filtrado y Búsqueda
//Ejercicio 2.1:
const librosDeFiccion=libros.filter(libro=>libro.categoria=='Ficción');
console.log(librosDeFiccion);