const libros=[
    {id:1, titulo:"El Quijote", autor:"Miguel de Cervantes", paginas:863},
    {id:2, titulo:"Cien años de soledad", autor:"Gabriel García Márquez", paginas:417},
    {id:3, titulo:"La sombra del viento", autor:"Carlos Ruiz Zafón", paginas:576},
    {id:4, titulo:"1984", autor:"George Orwell", paginas:328},
    {id:5, titulo:"El amor en los tiempos del cólera", autor:"Gabriel García Márquez", paginas:368},
    {id:6, titulo:"Don Juan Tenorio", autor:"José Zorrilla", paginas:192},
    {id:7, titulo:"La casa de los espíritus", autor:"Isabel Allende", paginas:448},
    {id:8, titulo:"Ficciones", autor:"Jorge Luis Borges", paginas:224},
    {id:9, titulo:"Rayuela", autor:"Julio Cortázar", paginas:576},
    {id:10, titulo:"El túnel", autor:"Ernesto Sabato", paginas:160}

]
export function agregarLibro(nuevoLibro){
    libros.push(nuevoLibro);
}
export function obtenerLibros(){
    return libros;
}
export function buscarLibro(id){
    return libros.find(libro => libro.id === id);
}
export function eliminarLibro(id){
    const index = libros.findIndex(libro => libro.id === id);
    if(index !== -1){
        libros.splice(index,1);
        return true;
    }   
    return false;
}
export function calcularTotalPaginas(){
    return libros.reduce((total,libro) => total + libro.paginas,0);
}
export function ordenarPorPaginas(){
    return libros.sort((a,b) => a.paginas - b.paginas);
}
export function hayLibrosLargos(limitePaginas){
    return libros.some(libro => libro.paginas > limitePaginas);
}
export function todosSonLibrosCortos(limitePaginas){
    return libros.every(libro => libro.paginas < limitePaginas);
}

