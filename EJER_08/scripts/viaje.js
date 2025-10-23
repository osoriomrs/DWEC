const actividades = [
  { id: 1, nombre: "Tour por París", destino: "París", precio: 300, tipo: "Cultural" },
  { id: 2, nombre: "Buceo en Cancún", destino: "México", precio: 400, tipo: "Aventura" },
  { id: 3, nombre: "Visita al Coliseo", destino: "Roma", precio: 200, tipo: "Cultural" },
  { id: 4, nombre: "Safari en Kenia", destino: "Nairobi", precio: 900, tipo: "Naturaleza" },
  { id: 5, nombre: "Clase de cocina japonesa", destino: "Tokio", precio: 150, tipo: "Gastronómico" }
];

const itinerario = [];

const listaActividades = document.getElementById("actividades");
const listaItinerario = document.getElementById("itinerario");
const filtroDestino = document.getElementById("filtro-destino");

function cargarDestinos() {
  const destinos = ["Todos", ...new Set(actividades.map(a => a.destino))];
  filtroDestino.innerHTML = destinos.map(d => `<option>${d}</option>`).join("");
}

function mostrarActividades() {
  const destino = filtroDestino.value;
  const filtradas = destino === "Todos"
    ? actividades
    : actividades.filter(a => a.destino === destino);

  listaActividades.innerHTML = filtradas.map(a => `
    <div>
      <strong>${a.nombre}</strong> (${a.destino}) - ${a.precio}€
      <button onclick="añadir(${a.id})">Añadir</button>
    </div>
  `).join("");
}

function añadir(id) {
  const act = actividades.find(a => a.id === id);
  if (!itinerario.includes(act)) itinerario.push(act);
  mostrarItinerario();
}

function mostrarItinerario() {
  listaItinerario.innerHTML = itinerario.map(a => `
    <li>${a.nombre} - ${a.precio}€ 
      <button onclick="quitar(${a.id})">Quitar</button>
    </li>
  `).join("");
  const total = itinerario.reduce((s, a) => s + a.precio, 0);
  document.getElementById("total").textContent = `Total: ${total}€`;
}

function quitar(id) {
  const i = itinerario.findIndex(a => a.id === id);
  if (i >= 0) itinerario.splice(i, 1);
  mostrarItinerario();
}

document.getElementById("confirmar").addEventListener("click", () => {
  if (itinerario.length === 0) return alert("No has elegido actividades.");
  alert("Reserva confirmada \n" + itinerario.map(a => a.nombre).join(", "));
});

cargarDestinos();
mostrarActividades();
filtroDestino.addEventListener("change", mostrarActividades);