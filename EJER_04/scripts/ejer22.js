(function() {
    const formularioContacto=document.getElementById('formulario-contacto');
    if(formularioContacto) {
        formularioContacto.addEventListener('submit',function(event) {
            event.preventDefault();
            const nombre=document.getElementById('nombre').value;
            const mensaje=document.getElementById('mensaje').value;
            console.log("Ejercicio 22: Nombre:",nombre,"Mensaje:",mensaje);
        });
    }
})();