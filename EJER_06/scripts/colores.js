const contenedor = document.getElementById("colores");

contenedor.addEventListener("click", (event) => {
    if(event.target !== contenedor){
        document.body.style.backgroundColor = event.target.style.backgroundColor;
    }
});
