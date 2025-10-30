let agenteEncontrado = null;
let codigoValido = false;
let claveValida = false;

const codigoInput = document.getElementById("codigo");
const claveInput = document.getElementById("clave");
const mensajeCodigo = document.getElementById("mensaje-codigo");
const mensajeClave = document.getElementById("mensaje-clave");
const btnAcceder = document.querySelector("button");

function actualizarBoton() {
    btnAcceder.disabled = !(codigoValido && claveValida);
}

codigoInput.addEventListener("blur", () => {
    fetch("xmls/personal.xml")
        .then(res => res.ok ? res.text() : Promise.reject("Archivo XML no encontrado"))
        .then(str => new DOMParser().parseFromString(str, "text/xml"))
        .then(xml => {
            const codigo = codigoInput.value.trim();
            const agente = xml.querySelector(`agente[codigo="${codigo}"]`);
            
            if (agente) {
                agenteEncontrado = agente;
                codigoValido = true;
                mensajeCodigo.textContent = `Bienvenido, ${agente.querySelector("nombre").textContent}`;
                mensajeCodigo.className = "text-success";
            } else {
                agenteEncontrado = null;
                codigoValido = false;
                mensajeCodigo.textContent = "Código de agente no reconocido";
                mensajeCodigo.className = "text-danger";
            }

            claveValida = false;
            mensajeClave.textContent = "";
            actualizarBoton();
        })
        .catch(e => {
            codigoValido = false;
            mensajeCodigo.textContent = e;
            mensajeCodigo.className = "text-danger";
            actualizarBoton();
        });
});

claveInput.addEventListener("blur", () => {
    if (!codigoValido) {
        mensajeClave.textContent = "Introduce primero un código válido.";
        mensajeClave.className = "text-warning";
        claveValida = false;
        actualizarBoton();
        return;
    }

    const claveIntroducida = claveInput.value.trim();
    const claveCorrecta = agenteEncontrado.querySelector("clave").textContent;

    if (claveIntroducida === claveCorrecta) {
        mensajeClave.textContent = "Clave correcta. Acceso permitido.";
        mensajeClave.className = "text-success";
        claveValida = true;
    } else {
        mensajeClave.textContent = "Clave incorrecta.";
        mensajeClave.className = "text-danger";
        claveValida = false;
    }

    actualizarBoton();
});

btnAcceder.addEventListener("click", () => {
    if (codigoValido && claveValida) {
        alert(`¡Acceso concedido a ${agenteEncontrado.querySelector("nombre").textContent}!`);
    }
});
