function revelarRespuesta(h2) {
    ocultarTodasLasRespuestas();
        var respuesta=h2.nextElementSibling;
        respuesta.classList.remove('oculto');
}
revelarRespuesta(document.getElementById('pregunta2'));

function ocultarTodasLasRespuestas() {
    (function() {
        const todasLasRespuestas=document.querySelectorAll('.p');
        todasLasRespuestas.forEach(respuesta => {
            respuesta.classList.add('oculto');
        });
    })();
}