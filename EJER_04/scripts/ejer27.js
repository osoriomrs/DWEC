(function() {
    const tarjetas=document.querySelectorAll('.card');
    const tarjetasNoPremium=
    Array.prototype.filter.call(tarjetas,function(tarjeta){
        return !tarjeta.classList.contains('premium');
    });
    tarjetasNoPremium.forEach(tarjeta=>{
        tarjeta.style.border='2px dotted black';
    });
})();