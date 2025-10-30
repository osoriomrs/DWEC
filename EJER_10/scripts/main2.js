let documentoActual = "xmls/documento_ultimo.xml";
let visitados = [];

const tituloEl = document.getElementById("doc-titulo");
const fechaEl = document.getElementById("doc-fecha");
const descripcionEl = document.getElementById("doc-descripcion");
const imagenEl = document.getElementById("doc-imagen");
const btnAnterior = document.getElementById("btn-anterior");
const btnSiguiente = document.getElementById("btn-siguiente");
const btnUltimo = document.getElementById("btn-ultimo");
const visitadosUl = document.getElementById("visitados");

function cargarDocumento(xmlFile) {
    fetch(xmlFile)
    .then(res => res.ok ? res.text() : Promise.reject("Archivo XML no encontrado"))
    .then(str => new DOMParser().parseFromString(str,"text/xml"))
    .then(xml => {
        const doc = xml.querySelector("documento");
        tituloEl.textContent = doc.querySelector("titulo").textContent;
        fechaEl.textContent = doc.querySelector("fecha").textContent;
        descripcionEl.textContent = doc.querySelector("descripcion").textContent;
        imagenEl.src = doc.querySelector("imagen").textContent;
        imagenEl.alt = doc.querySelector("titulo").textContent;

        const anterior = doc.querySelector("anterior").textContent;
        const siguiente = doc.querySelector("siguiente").textContent;
        btnAnterior.dataset.file = anterior !== "null" ? anterior : "";
        btnSiguiente.dataset.file = siguiente !== "null" ? siguiente : "";

        btnAnterior.disabled = !anterior || anterior === "null";
        btnSiguiente.disabled = !siguiente || siguiente === "null";

        documentoActual = xmlFile;

        if(!visitados.some(v => v.file === xmlFile)) {
            visitados.push({
                file: xmlFile,
                titulo: doc.querySelector("titulo").textContent,
                fecha: doc.querySelector("fecha").textContent
            });
            renderizarHistorial();
        }
    })
    .catch(e => alert(e));
}

function renderizarHistorial() {
    visitadosUl.innerHTML = visitados.map(v=>`
        <li class="list-group-item list-group-item-action" data-file="${v.file}">
            ${v.titulo} (${v.fecha})
        </li>
    `).join("");

    visitadosUl.querySelectorAll("li").forEach(li=>{
        li.addEventListener("click", ()=>{
            if(li.dataset.file) cargarDocumento(li.dataset.file);
        });
    });
}

btnAnterior.addEventListener("click", () => {
    if(btnAnterior.dataset.file) cargarDocumento(btnAnterior.dataset.file);
});
btnSiguiente.addEventListener("click", () => {
    if(btnSiguiente.dataset.file) cargarDocumento(btnSiguiente.dataset.file);
});
btnUltimo.addEventListener("click", () => cargarDocumento("xmls/documento_ultimo.xml"));

// Carga inicial
cargarDocumento(documentoActual);
