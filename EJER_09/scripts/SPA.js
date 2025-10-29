const pages = {
  inicio: '<h1>Página de Inicio</h1><p>Bienvenido a nuestra web.</p>',
  productos: '<h1>Productos</h1><p>Descubre nuestra gama de productos...</p>',
  contacto: '<h1>Contacto</h1><p>Contacta con nosotros...</p>'
};

const main = document.getElementById('contenido');
const enlaces = document.querySelectorAll('nav a');

function marcarActivo(ruta) {
  enlaces.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === ruta);
  });
}

function navegar(ruta) {
  const nombreRuta = ruta.replace('/', '') || 'inicio';
  const contenido = pages[nombreRuta] || '<h1>404</h1><p>Página no encontrada.</p>';
  main.innerHTML = contenido;
  history.pushState({ pagina: nombreRuta }, '', ruta);
  marcarActivo(ruta);
}

enlaces.forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    navegar(a.getAttribute('href'));
  });
});

window.addEventListener('popstate', e => {
  const pagina = e.state?.pagina || 'inicio';
  const ruta = `/${pagina}`;
  main.innerHTML = pages[pagina];
  marcarActivo(ruta);
});

document.addEventListener('DOMContentLoaded', () => {
  const ruta = window.location.pathname;
  const nombreRuta = ruta.replace('/', '') || 'inicio';
  main.innerHTML = pages[nombreRuta];
  history.replaceState({ pagina: nombreRuta }, '', ruta);
  marcarActivo(ruta);
});