const ciudades=[
    "Madrid","Buenos Aires","Tokio",
    "Nueva York","París"
]

ciudades.push("Roma")

const ciudadesMayusculas=ciudades.map(function(city) {
    return city.toUpperCase();
});

const ciudadesFiltradas=ciudades.filter(function(city){
    return city.length>6;
});

console.log(ciudades,ciudadesMayusculas,ciudadesFiltradas)