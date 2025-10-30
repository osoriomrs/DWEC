let fragmentoActual = "";
let letraSeleccionada = "";
let intentos = 0;

const empezarBtn = document.getElementById("empezar-btn");
const textoEl = document.getElementById("fragmento-texto");
const pistaEl = document.getElementById("fragmento-pista");
const alfabetoEl = document.getElementById("alfabeto");
const contadorEl = document.getElementById("contador-intentos");

function crearAlfabeto() {
    alfabetoEl.innerHTML = "";
    for(let i=65;i<=90;i++) {
        const div = document.createElement("div");
        div.className = "letra";
        div.textContent = String.fromCharCode(i);
        div.addEventListener("click", () => {
            document.querySelectorAll(".letra").forEach(l=>l.classList.remove("seleccionada"));
            div.classList.add("seleccionada");
            letraSeleccionada = div.textContent;
        });
        alfabetoEl.appendChild(div);
    }
}

function cargarFragmento(xmlFile) {
    fetch(`xmls/${xmlFile}`)
    .then(res => res.ok ? res.text() : Promise.reject("Archivo XML no encontrado"))
    .then(str => new DOMParser().parseFromString(str, "text/xml"))
    .then(xml => {
        const frag = xml.querySelector("manuscrito");
        textoEl.textContent = frag.querySelector("texto").textContent;
        pistaEl.textContent = frag.querySelector("pista").textContent;
        fragmentoActual = xmlFile;

        const solucion = frag.querySelector("selector_solucion").textContent;
        const letraClave = frag.querySelector("letra_clave").textContent;
        const siguiente = frag.querySelector("siguiente_fragmento").textContent;

        document.onclick = e => {
            if(e.target.matches(solucion)) {
                if(letraSeleccionada === letraClave) {
                    letraSeleccionada = "";
                    document.querySelectorAll(".letra").forEach(l=>l.classList.remove("seleccionada"));
                    if(siguiente !== "") cargarFragmento(siguiente);
                } else {
                    intentos++;
                    contadorEl.textContent = `Intentos: ${intentos}`;
                    e.target.classList.add("fallo");
                    setTimeout(()=> e.target.classList.remove("fallo"), 500);
                }
            }
        }
    })
    .catch(e => alert(e));
}

empezarBtn.addEventListener("click", () => {
    crearAlfabeto();
    intentos = 0;
    contadorEl.textContent = `Intentos: ${intentos}`;
    cargarFragmento("fragmento1.xml");
});
