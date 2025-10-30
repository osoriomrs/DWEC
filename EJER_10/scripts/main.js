let inventario = [];


fetch("xmls/soporte_vital.xml")
.then(res => res.ok ? res.text() : Promise.reject("soporte_vital.xml no encontrado"))
.then(str => new DOMParser().parseFromString(str,"text/xml"))
.then(xml => {
    const m = xml.querySelector("medicion"); 
    document.getElementById("soporte-vital").innerHTML = `
        <ul class="mb-0">
            <li>Oxígeno: ${m.querySelector("oxigeno").textContent}%</li>
            <li>Temperatura: ${m.querySelector("temperatura").textContent}°C</li>
            <li>Presión: ${m.querySelector("presion").textContent} hPa</li>
        </ul>
    `;
})
.catch(e => {
    document.getElementById("soporte-vital").textContent = e;
});

fetch("xmls/inventario.xml")
.then(res => res.ok ? res.text() : Promise.reject("inventario.xml no encontrado"))
.then(str => new DOMParser().parseFromString(str,"text/xml"))
.then(xml => {
    inventario = Array.from(xml.querySelectorAll("item")).map(i=>({
        id: i.getAttribute("id"),
        nombre: i.querySelector("nombre").textContent,
        cantidad: parseFloat(i.querySelector("cantidad").textContent),
        unidad: i.getAttribute("unidad"),
        consumo: parseFloat(i.querySelector("consumo").textContent)
    }));

    const select = document.getElementById("item-select");
    const errorDiv = document.getElementById("error-inventario");
    errorDiv.textContent = ""; 
    select.innerHTML = inventario.map(i=>`<option value="${i.id}">${i.nombre}</option>`).join("");
    mostrarCantidad();
    select.addEventListener("change", mostrarCantidad);
})
.catch(e => {
    document.getElementById("item-select").innerHTML = ""; 
    document.getElementById("error-inventario").textContent = e; 
});


function mostrarCantidad() {
    const sel = document.getElementById("item-select");
    const item = inventario.find(i=>i.id===sel.value);
    document.getElementById("cantidad-disponible").textContent = item ? 
        `Disponible: ${item.cantidad} ${item.unidad}` : "";
}


document.getElementById("calcular").addEventListener("click", ()=>{
    const sel = document.getElementById("item-select");
    const item = inventario.find(i=>i.id===sel.value);
    if(!item){ 
        document.getElementById("resultado").textContent="Selecciona un ítem"; 
        return; 
    }
    const dias = Math.floor(item.cantidad / (item.consumo * 4)); 
    document.getElementById("resultado").textContent = `Autonomía de ${item.nombre}: ${dias} días`;
});
