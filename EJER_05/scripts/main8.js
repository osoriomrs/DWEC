document.getElementById("boton-ordenar").addEventListener("click", () => {
    const lista = document.getElementById("mi-lista");
    const items = Array.from(lista.querySelectorAll("li"));
    items.sort((a, b) => a.textContent.localeCompare(b.textContent));
    lista.innerHTML = "";
    items.forEach(item => lista.appendChild(item));
});