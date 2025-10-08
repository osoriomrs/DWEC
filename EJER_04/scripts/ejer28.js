(function() {
    const categorias=document.querySelectorAll('.categoria');
    const nombreCategorias=
    Array.prototype.map.call(categorias,function(categoria){
        return categoria.textContent;
    });
    console.log('Ejercicio 28:', nombreCategorias);
})();