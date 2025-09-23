import { crearProducto, filtrarPorCategoria, listarProductosAgotados, calcularValorTotalInventario } from "./inventario.js";
import resumenInventario from "./inventario.js";

const inventario=[];
inventario.push(crearProducto("Camisa","Ropa",20,100));
inventario.push(crearProducto("Pantalones","Ropa",30,60));
inventario.push(crearProducto("Zapatos","Calzado",50,80));
inventario.push(crearProducto("Sandalias","Calzado",25,0));
inventario.push(crearProducto("Sombrero","Accesorios",15,40));
inventario.push(crearProducto("Cinturón","Accesorios",10,0));

const ropa = filtrarPorCategoria(inventario,"Ropa");
console.log("Productos en la categoría Ropa:");
ropa.forEach(producto => {
    console.log(producto);
});

const productosAgotados = listarProductosAgotados(inventario);
console.log("Productos agotados:");
productosAgotados.forEach(producto => {
    console.log(producto);
});

const valorTotal = calcularValorTotalInventario(inventario);
console.log("Valor total del inventario:",valorTotal);

resumenInventario(inventario);
