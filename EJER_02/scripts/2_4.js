const usuario={
    nombre:"Sergio",
    email:"sergio8@gmail.com"
}
const perfil={
    puesto:"Desarrollador",
    empresa:"Google"
}

const empleado={...usuario,...perfil}

console.log(empleado)
console.log(empleado.perfil?.direccion?.ciudad);

const resultado=null ?? "Ciudad no especificada";
console.log(resultado);