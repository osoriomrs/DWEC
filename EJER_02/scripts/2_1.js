const numeros=[15,22,33,4,5,9,];
console.log(numeros);

const dobles=numeros.map(function(num){
    return num*2;
});
console.log(dobles);

const pares=numeros.filter(function(num){
    return num%2===0;
});
console.log(pares);

for(let i=0;i<pares.length;i++){
    console.log(pares[i]);
}