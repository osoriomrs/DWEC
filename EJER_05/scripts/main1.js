function cambiarImagenPrincipal(indice) {
    (function() {
        const miniaturas=document.querySelectorAll('.miniatura img');
        const miniaturaSeleccionada=miniaturas[indice];
        const nuevoSrc=miniaturaSeleccionada.src;
        const imagenPrincipal=document.getElementById('imagen-principal');
        imagenPrincipal.setAttribute('src', nuevoSrc);
    })();
}
cambiarImagenPrincipal(1);

function resaltarMiniatura(indice) {
    (function() {
        const miniaturas=document.querySelectorAll('.miniatura img');
        miniaturas.forEach((miniatura, i) => {
            if (i === indice) {
                miniatura.classList.add('resaltada');
                miniatura.style.border = '3px solid red';
            } else {
                miniatura.classList.remove('resaltada');
            }       
        });
    })();
}

resaltarMiniatura(1);

