const tabla = document.getElementById("tablaEditable");

tabla.addEventListener("dblclick", (e) => {
    if(e.target.tagName === "TD"){
        const td = e.target;
        const valor = td.textContent;
        td.innerHTML = `<input value="${valor}">`;
        const input = td.firstChild;
        input.focus();

        input.addEventListener("blur", () => {
            td.textContent = input.value;
        });
    }
});
