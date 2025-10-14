    const botones = document.getElementById('botones-pestanas');
    const contenidos=document.querySelectorAll('.pestana');
    botones.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const dataId=event.target.getAttribute('data-id');
            contenidos.forEach(div=> div.classList.add('oculto'));
            const contenidoSeleccionado=document.getElementById("contenido-"+dataId);
            if (contenidoSeleccionado) {
                contenidoSeleccionado.classList.remove('oculto');
            }
        }
    });
            