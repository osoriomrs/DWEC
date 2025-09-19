const coche={
    marca:"Kia",
    modelo:"Xceed",
    año:2022,
    precio:21000,
    estaDisponible:false
}
console.table(coche)
console.log(coche.marca)

const marca=coche.marca
const modelo=coche.modelo
console.log(marca)
console.log(modelo)

coche.estaDisponible=true

coche["color"]="Blanco"

delete coche.año

console.table(coche)

