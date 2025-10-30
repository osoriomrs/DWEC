const baseSelect = document.getElementById("base-select");
const mezclaSelect = document.getElementById("mezcla-select");
const boton = document.getElementById("sintetizar-btn");
const resultadoDiv = document.getElementById("resultado");
const historialUl = document.getElementById("historial");
let recetasXML = null;
let historial = [];

fetch("xmls/recetas.xml")
.then(res => res.ok ? res.text() : Promise.reject("Archivo XML no encontrado"))
.then(str => new DOMParser().parseFromString(str,"text/xml"))
.then(xml => {
    recetasXML = xml;
    const aleaciones = xml.querySelectorAll("aleacion");
    const bases = new Set();
    const mezclas = new Set();
    aleaciones.forEach(a=>{
        bases.add(a.querySelector("base").textContent);
        mezclas.add(a.querySelector("mezcla").textContent);
    });
    bases.forEach(b=>baseSelect.innerHTML += `<option value="${b}">${b}</option>`);
    mezclas.forEach(m=>mezclaSelect.innerHTML += `<option value="${m}">${m}</option>`);
})
.catch(e => resultadoDiv.textContent = e);

function sintetizar(base, mezcla) {
    const aleaciones = recetasXML.querySelectorAll("aleacion");
    let encontrada = null;
    aleaciones.forEach(a=>{
        if(a.querySelector("base").textContent === base &&
           a.querySelector("mezcla").textContent === mezcla){
               encontrada = a;
        }
    });
    if(encontrada){
        const res = encontrada.querySelector("resultado").textContent;
        const desc = encontrada.querySelector("descripcion").textContent;
        resultadoDiv.innerHTML = `<strong>${res}</strong>: ${desc}`;
        const entry = `${base} + ${mezcla} = ${res}`;
        if(!historial.some(h=>h.text === entry)){
            historial.push({base, mezcla, resultado: res, descripcion: desc, text: entry});
            renderizarHistorial();
        }
    } else {
        resultadoDiv.textContent = "Combinación no válida. No se ha producido ninguna aleación.";
    }
}

function renderizarHistorial(){
    historialUl.innerHTML = historial.map(h=>`<li class="list-group-item list-group-item-action">${h.text}</li>`).join("");
    historialUl.querySelectorAll("li").forEach((li, idx)=>{
        li.onclick = ()=>{
            const h = historial[idx];
            baseSelect.value = h.base;
            mezclaSelect.value = h.mezcla;
            resultadoDiv.innerHTML = `<strong>${h.resultado}</strong>: ${h.descripcion}`;
        }
    });
}

boton.addEventListener("click", ()=>{
    sintetizar(baseSelect.value, mezclaSelect.value);
});
