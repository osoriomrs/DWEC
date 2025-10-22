document.addEventListener('DOMContentLoaded', () => {
    console.log('%cDocumento listo.', 'color: green; font-size: 16px; font-weight: bold;');
    console.log('%cEscribe las soluciones en main.js', 'color: red; font-size: 18px; font-weight: bold;');


    // --- Solución Ejercicio 1 y 4 ---
    const outerBox = document.getElementById('outer-box');

  outerBox.addEventListener('click', (event) => {
    console.clear();
    console.log('Elemento pulsado:', event.target.id);
    console.log('Elemento que gestiona el evento:', event.currentTarget.id);

    if (event.target.classList.contains('box')) {
      document.querySelectorAll('.box').forEach(box => (box.style.backgroundColor = ''));
      event.target.style.backgroundColor = 'coral';
    }
  });

  const middleBox = document.getElementById('middle-box');

  middleBox.addEventListener('click', (event) => {
    console.log('Click en middle-box');
    event.stopPropagation(); 
    middleBox.style.backgroundColor = 'lightgreen';
  });


    // --- Solución Ejercicio 2 ---
const testLink= document.getElementById('test-link');

if (testLink) {
  testLink.addEventListener('click', (event) => {
    event.preventDefault();
    console.log('Navegación prevenida');
  });
}

    // --- Solución Ejercicio 3 ---
const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 250) {
        backToTopBtn.classList.remove('hidden');
      } else {
        backToTopBtn.classList.add('hidden');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

    // --- Solución Ejercicio 5 ---
   const notificationBtn = document.getElementById('notification-btn');
  const notificationArea = document.getElementById('notification-area');

  if (!notificationBtn || !notificationArea) {
    console.warn('No se encontró el botón o el área de notificación');
    return; // evita errores si no existen
  }

  // Listener en body
  document.body.addEventListener('notification', (event) => {
    const { mensaje, fecha } = event.detail;
    notificationArea.innerHTML = `<p>${fecha} - ${mensaje}</p>`;
    console.log('Evento personalizado recibido:', event.detail);
  });

  // Disparar evento al hacer clic
  notificationBtn.addEventListener('click', () => {
    const eventoPersonalizado = new CustomEvent('notification', {
      detail: {
        mensaje: '¡Nueva notificación lanzada!',
        fecha: new Date().toLocaleString(),
      }
    });
    document.body.dispatchEvent(eventoPersonalizado);
  });

});
