//Crear (CREATE)
const tareas=[
  { id: 1, descripcion: "Revisar correos", completada: false },
  { id: 2, descripcion: "Preparar presentación", completada: true },
  { id: 3, descripcion: "Actualizar documentación", completada: false },
  { id: 4, descripcion: "Hacer backup del proyecto", completada: true }
];
const tareasConNueva=[...tareas,{ id: 5, descripcion: "Investigar nueva librería JS", completada: false }];
console.log(tareasConNueva);

//LEER (READ)
const pendientes=tareas.filter(tarea=>!tarea.completada);
console.log(pendientes);

const tareaEspecifica=tareas.find(tarea=>tarea.id==3);
console.log(tareaEspecifica);

//Actualizar (UPDATE)
const tareasActualizadas=tareas.map(tarea=>{
    if(tarea.id===4){
        tarea.completada==true;
    }
    else return tarea.id===4;
})