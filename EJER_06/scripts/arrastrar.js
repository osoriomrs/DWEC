const arrastrable = document.getElementById("arrastrable");
const contenedor = document.getElementById("contenedor");
let offsetX, offsetY;
let arrastrando = false;

arrastrable.addEventListener("mousedown", (e) => {
    arrastrando = true;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
});

document.addEventListener("mousemove", (e) => {
    if(arrastrando){
        let x = e.clientX - contenedor.offsetLeft - offsetX;
        let y = e.clientY - contenedor.offsetTop - offsetY;
        // Limitar dentro del contenedor
        x = Math.max(0, Math.min(x, contenedor.clientWidth - arrastrable.clientWidth));
        y = Math.max(0, Math.min(y, contenedor.clientHeight - arrastrable.clientHeight));
        arrastrable.style.left = x + "px";
        arrastrable.style.top = y + "px";
    }
});

document.addEventListener("mouseup", () => {
    arrastrando = false;
});
