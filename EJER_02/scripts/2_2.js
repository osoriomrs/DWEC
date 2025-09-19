function calcularAreaRectangulo(base, altura) {
    return base * altura;
}
console.log("Área del rectángulo:",calcularAreaRectangulo(5, 10)); 

//const areaTriangulo=function(base, altura) {
    //return (base * altura) / 2;
//}
//console.log("Área del triángulo:", areaTriangulo(5, 10));

const areaTriangulo=(base,altura)=> (base * altura) / 2;
console.log("Área del triángulo:", areaTriangulo(5, 10));

