(function() {
    const tarjetas=document.querySelectorAll('.card');
    tarjetas.forEach(tarjeta=>{
        const img=tarjeta.querySelector('img');
        if(img){
            img.classList.add('imagen-curso');
        }
    });
})();
