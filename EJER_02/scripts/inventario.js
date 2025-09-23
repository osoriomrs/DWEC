const inventario=[
    {nombre:"Camisa",categoria:"Ropa",precio:20,stock:100},
    {nombre:"Pantalones",categoria:"Ropa",precio:30,stock:60}]

export function crearProducto(nombre,categoria,precio,stock){
    const producto={nombre,categoria,precio,stock};
    return(producto);
}
export function filtrarPorCategoria(inventario,categoria){
    return inventario.filter(producto => producto.categoria === categoria);
}
export function listarProductosAgotados(inventario){
    return inventario.filter(producto => producto.stock === 0);
}
export function calcularValorTotalInventario(inventario){
    return inventario.reduce((total,producto) => total + (producto.precio * producto.stock),0);
}
export default function resumenInventario(inventario){
    console.log("Resumen del Inventario:");
    inventario.forEach(producto => {
        console.log("Nombre:",producto.nombre,
            "Categoría:",producto.categoria,
            "Precio:",producto.precio,
            "Stock:",producto.stock
        );
    });
}