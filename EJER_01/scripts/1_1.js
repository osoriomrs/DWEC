const nombre='Sergio';

let edad=20;

let tieneMascota=false;

edad=21;
tieneMascota=true;

console.log("Nombre:",nombre," |Tipo",typeof nombre);
console.log("Edad:",edad," |Tipo",typeof edad);
console.log("¿Tiene Mascota?:",tieneMascota," |Tipo",typeof tieneMascota);

const frase = `${nombre} tiene ${edad} años y ${tieneMascota ? "sí tiene mascota" : "no tiene mascota"}.`;
console.log(frase);