const latInput = document.getElementById("latitud");
const lonInput = document.getElementById("longitud");
const btnAñadir = document.getElementById("btnAñadir");
const listaPuntos = document.getElementById("listaPuntos");
const distanciaTotalElem = document.getElementById("distanciaTotal");

let puntos = [];
let distanciaTotal = 0;

const mapa = L.map("mapa").setView([40.4168, -3.7038], 5);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(mapa);

const linea = L.polyline([], { color: "red" }).addTo(mapa);

function haversineDistance(c1, c2) {
  const toRad = x => x * Math.PI / 180;
  const R = 6371;
  const dLat = toRad(c2.lat - c1.lat);
  const dLon = toRad(c2.lon - c1.lon);
  const lat1 = toRad(c1.lat);
  const lat2 = toRad(c2.lat);
  const a = Math.sin(dLat / 2)**2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2)**2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

async function obtenerDireccion(lat, lon) {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`, {
      headers: { "User-Agent": "PlanificadorRutas/1.0 (correo@ejemplo.com)" }
    });
    const data = await res.json();
    return data.display_name || "Dirección no encontrada";
  } catch {
    return "Error al obtener dirección";
  }
}

async function añadirPunto() {
  const lat = parseFloat(latInput.value);
  const lon = parseFloat(lonInput.value);
  if (isNaN(lat) || isNaN(lon)) return;

  const direccion = await obtenerDireccion(lat, lon);
  const punto = { lat, lon, direccion };
  
  if (puntos.length > 0) {
    distanciaTotal += haversineDistance(puntos[puntos.length - 1], punto);
  }
  
  puntos.push(punto);

  const li = document.createElement("li");
  li.textContent = `${punto.direccion} (${lat.toFixed(4)}, ${lon.toFixed(4)})`;
  listaPuntos.appendChild(li);

  distanciaTotalElem.textContent = `Distancia total: ${distanciaTotal.toFixed(2)} km`;

  L.marker([lat, lon]).addTo(mapa).bindPopup(punto.direccion);
  linea.setLatLngs(puntos.map(p => [p.lat, p.lon]));
}

btnAñadir.addEventListener("click", añadirPunto);
