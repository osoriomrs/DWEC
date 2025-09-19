const cursos = [
    {
        nombre: "DWEC",
        profesor: "Pablo",
        estudiantes: [
            { nombre: "Sergio", calificacion: 4 },
            { nombre: "Luis", calificacion: 8 },
            { nombre: "María", calificacion: 6 }
        ]
    },
    {
        nombre: "DWES",
        profesor: "Ana",
        estudiantes: [ 
            { nombre: "Lucía", calificacion: 9 },
            { nombre: "Javier", calificacion: 5 },
            { nombre: "Marta", calificacion: 3 }
        ]
    },
    {
        nombre: "DAW",
        profesor: "Luis",
        estudiantes: [
            { nombre: "Alberto", calificacion: 7 },
            { nombre: "Sofía", calificacion: 10 },
            { nombre: "Diego", calificacion: 2 }
        ]
    }
 ];

 const resumenCursos=cursos.map(function(cursos) {
    
    return {
        nombreCurso: cursos.nombre,
        promedioCalificaciones: (
            cursos.estudiantes.reduce((acc, estudiante) => acc + estudiante.calificacion, 0)
            / cursos.estudiantes.length
        )
    };
 });

console.table(resumenCursos);

const cursosDestacados=resumenCursos.filter(function(cursos){
    return cursos.promedioCalificaciones>=6;
});

console.table(cursosDestacados);

cursosDestacados.forEach(curso => {
    console.log("El curso",curso.nombreCurso,"tiene un promedio de"
        ,curso.promedioCalificaciones,"y es considerado destacado");
});

cursos.forEach(curso=>{
    let suspensos=curso.estudiantes.filter(est=>est.calificacion<4);

    if(suspensos.length>0){
        console.log("Atención: En el curso",curso.nombre,
            "hay calificaciones muy bajas");
    }
})
