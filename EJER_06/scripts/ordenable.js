const lista = document.getElementById("listaOrdenable");
const btnSubir = document.getElementById("subir");
const btnBajar = document.getElementById("bajar");

btnSubir.addEventListener("click", () => {
    const last = lista.lastElementChild;
    if(last.previousElementSibling){
        lista.insertBefore(last, last.previousElementSibling);
    }
});

btnBajar.addEventListener("click", () => {
    const first = lista.firstElementChild;
    if(first.nextElementSibling){
        lista.insertBefore(first.nextElementSibling, first);
    }
});

