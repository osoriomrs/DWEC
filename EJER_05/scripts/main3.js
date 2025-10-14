function generarInformeDeValidacion() {
    const nombre=document.getElementById("nombre").value;
    const email=document.getElementById("email").value;

    const divErrrores=document.getElementById("informe-errores");
    divErrrores.innerHTML="";

    let esValido=true;

    if (nombre.length<3) {
        const pError=document.createElement("p");
        pError.textContent="El nombre es incorrecto.";
        divErrrores.appendChild(pError);
        esValido=false;
    }

    if(!email.includes("@")) {
        const pError=document.createElement("p");
        pError.textContent="El email debe contener un '@'.";
        divErrrores.appendChild(pError);
        esValido=false;
    }

    if (esValido) {
        const pValido=document.createElement("p");
        pValido.textContent="Formulario válido.";
        divErrrores.appendChild(pValido);
    }

}

generarInformeDeValidacion();