const estudiantes=[
{
    nombre:"Sergio",
    apellidos:"Osorio Fernández",
    calificacion:4,
    aprobado:true
},
{
    nombre:"Luis",
    apellidos:"Súarez Menéndez",
    calificacion:4,
    aprobado:false
},
{
    nombre:"María",
    apellidos:"García Gómez",
    calificacion:9,
    aprobado:true
}
];

const estudiantesConID=estudiantes.map((estudiantes,index)=>{
    return{
        ...estudiantes,
        id:index+1
    };
});

const estudiantesAprobados=estudiantes.filter((estudiantes,calificacion)=>{

    if(estudiantes.calificacion>=5){

        return console.log("Felicidades",estudiantes.nombre,
            "has aprobado con",estudiantes.calificacion);
    }
});
console.log(estudiantesAprobados)

console.table(estudiantes)
console.log(estudiantesConID)


estudiantes.forEach(est => {
  let estaAprobado = est.calificacion >= 5;

  if (est.aprobado !== estaAprobado) {
    console.log("Incoherencia en el registro de",est.nombre,
        ":calificación=",est.calificacion,"aprobado=",est.aprobado);
  }
});
