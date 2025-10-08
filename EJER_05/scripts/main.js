function cambiarImagenPrincipal(indice) {
    (function() {
        const miniaturas=document.querySelectorAll('.miniatura img');
        const miniaturaSeleccionada=miniaturas[indice];
        const nuevoSrc=miniaturaSeleccionada.src;
        const imagenPrincipal=document.getElementById('imagen-principal');
        imagenPrincipal.setAttribute('src', nuevoSrc);
    })();
}