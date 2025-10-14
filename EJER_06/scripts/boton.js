const checkbox = document.getElementById("terminos");
const btnEnviar = document.getElementById("enviar");

checkbox.addEventListener("change", () => {
    btnEnviar.disabled = !checkbox.checked;
});
