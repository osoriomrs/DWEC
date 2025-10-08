(function() {
    const infos=document.querySelectorAll('.card .info');
    infos.forEach(info=>{
        const pDuracion=document.createElement('p');
        pDuracion.textContent='Duración: 20 horas';
        pDuracion.classList.add('duracion');
        info.appendChild(pDuracion);
    });
})();