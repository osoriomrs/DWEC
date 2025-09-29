const empleados=[
    {id:1, nombre:"Ana", departamento:"Ventas", salario:3000},
    {id:2, nombre:"Luis", departamento:"Marketing", salario:3500},
    {id:3, nombre:"Sergio", departamento:"Desarrollo", salario:4000},
    {id:4, nombre:"María", departamento:"Recursos Humanos", salario:3200},
    {id:5, nombre:"Gema", departamento:"Ventas", salario:2800},
    {id:6, nombre:"Carlos", departamento:"Desarrollo", salario:4500},
    {id:7, nombre:"Lucía", departamento:"Marketing", salario:3300},
]
export function agregarEmpleado(nuevoEmpleado){
    empleados.push(nuevoEmpleado);
}
export function eliminarEmpleado(id){
    const index = empleados.findIndex(empleado => empleado.id === id);
    if(index !== -1){
        empleados.splice(index,1);
        return true;
    }
    return false;
}
export function buscarPorDepartamento(departamento){
    const empleadosDept=[
        ...empleados.filter(empleado => empleado.departamento === departamento)
    ];
    return empleadosDept;
}
export function calcularSalarioPromedio(){
    const totalSalarios = empleados.reduce((total,empleado) => total + empleado.salario,0);
    return totalSalarios / empleados.length;
}
export function obtenerEmpleadosOrdenadosPorSalario(){
    const empleadosOrdenados = [...empleados];
    return empleadosOrdenados.sort((a,b) => a.salario - b.salario);
}