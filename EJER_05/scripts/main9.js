const filtro = document.getElementById("filtro");
const ciudades = document.querySelectorAll("ciudades");

filtro.addEventListener("input", () => {
    const texto = filtro.value.toLowerCase();
    ciudades.forEach(ciudad => {
        const contenido=ciudad.textContent.toLowerCase();
        ciudad.style.display = contenido.includes(texto) ? "" : "none";
    });
});