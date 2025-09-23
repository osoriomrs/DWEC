//function retirarSaldo(saldo,retirar,tarjetaCredito){
    //if(saldo>=retirar){
      // console.log("Retiro exitoso.Saldo restante:", saldo-retirar);
    //}
    //else{
         //console.log("Saldo insuficiente");
    //}
//}

//Funcion con variable booleana tieneTarjetaCredito
function retirarSaldo(saldo,retirar,tieneTarjetaCredito){
    if(saldo>=retirar){
        console.log("Retiro exitoso.Saldo restante:", saldo-retirar);
    }
    else if(tieneTarjetaCredito){
         console.log("Saldo insuficiente, pagando con tarjeta de crédito");
    } 
    else{
        console.log("Saldo insuficiente");
    }          
}
console.log(retirarSaldo(1000,500,false));
console.log(retirarSaldo(1000,1500,true));
console.log(retirarSaldo(1000,1500,false));
