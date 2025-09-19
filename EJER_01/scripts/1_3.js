const producto ={
    nombre:'Manzana',
    precio:2
}

const cliente={
    nombreCliente:'Sergio',
    esPremium:false
}

const pedido={
    ...producto,
    ...cliente
}

console.table(pedido)

//el objeto que aparece después en la combinación sobreescribe al primero
const producto2={
    nombre:'Manzana'
}
const combinado=Object.assign(producto2,cliente)
console.log(combinado)
