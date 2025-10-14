const cuadricula = document.getElementById("cuadricula");
let dibujando = false;

for(let i=0;i<400;i++){
    const div = document.createElement("div");
    div.style.width = "20px";
    div.style.height = "20px";
    div.style.border = "1px solid #ccc";
    div.style.display = "inline-block";
    div.style.margin = "0";
    div.style.padding = "0";
    cuadricula.appendChild(div);

    div.addEventListener("mousedown", () => dibujando = true);
    div.addEventListener("mouseup", () => dibujando = false);
    div.addEventListener("mouseover", () => {
        if(dibujando) div.style.backgroundColor = "black";
    });
}
document.addEventListener("mouseup", () => dibujando = false);
