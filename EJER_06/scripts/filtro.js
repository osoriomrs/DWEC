const filtro = document.getElementById("filtro");
const lista = document.getElementById("lista");
const items = lista.getElementsByTagName("li");

filtro.addEventListener("input", () => {
    const texto = filtro.value.toLowerCase();
    for(let li of items){
        li.style.display = li.textContent.toLowerCase().includes(texto) ? "" : "none";
    }
});
