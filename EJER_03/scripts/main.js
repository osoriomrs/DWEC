import { agregarEmpleado } from "./empleados.js";
import { eliminarEmpleado } from "./empleados.js";
import { buscarPorDepartamento } from "./empleados.js";
import { calcularSalarioPromedio } from "./empleados.js";
import { obtenerEmpleadosOrdenadosPorSalario } from "./empleados.js";

const nuevoEmpleado = {id:8, nombre:"Pedro", departamento:"Ventas", salario:2900};
agregarEmpleado(nuevoEmpleado);
console.log("Empleado agregado:", nuevoEmpleado);
const empleadosDespuesAgregar = buscarPorDepartamento("Ventas");
console.log("Empleados en Ventas después de agregar:", empleadosDespuesAgregar);

const eliminado = eliminarEmpleado(3);
console.log("Empleado con ID 3 eliminado:", eliminado);
const empleadosDespuesEliminar = buscarPorDepartamento("Desarrollo");
console.log("Empleados en Desarrollo después de eliminar:", empleadosDespuesEliminar);    


const empleadosMarketing = buscarPorDepartamento("Marketing");
console.log("Empleados en Marketing:", empleadosMarketing);

const salarioPromedio = calcularSalarioPromedio();
console.log("Salario promedio de los empleados:", salarioPromedio);

const empleadosOrdenados = obtenerEmpleadosOrdenadosPorSalario();
console.log("Empleados ordenados por salario:", empleadosOrdenados);

