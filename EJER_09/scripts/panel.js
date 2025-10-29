function actualizarPanel() {
  document.getElementById('viewport').textContent = `${window.innerWidth} x ${window.innerHeight}`;
  document.getElementById('outer').textContent = `${window.outerWidth} x ${window.outerHeight}`;
  document.getElementById('resolucion').textContent = `${screen.width} x ${screen.height}`;
  document.getElementById('disponible').textContent = `${screen.availWidth} x ${screen.availHeight}`;
  document.getElementById('conexion').textContent = navigator.onLine ? "Online " : "Offline ";
}

let lastX = window.screenX;
let lastY = window.screenY;

function actualizarPosicion() {
  if (window.screenX !== lastX || window.screenY !== lastY) {
    lastX = window.screenX;
    lastY = window.screenY;
    document.getElementById('posicion').textContent = `${lastX}, ${lastY}`;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  actualizarPanel();
  document.getElementById('posicion').textContent = `${window.screenX}, ${window.screenY}`;
});

window.addEventListener('resize', actualizarPanel);
window.addEventListener('online', actualizarPanel);
window.addEventListener('offline', actualizarPanel);

setInterval(actualizarPosicion, 250);