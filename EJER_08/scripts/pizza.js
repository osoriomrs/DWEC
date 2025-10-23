document.addEventListener('DOMContentLoaded', () => {
  const radiosTamaño = document.querySelectorAll('input[name="tamaño"]');
  const extras = document.querySelectorAll('input[type="checkbox"]');
  const masa = document.getElementById('masa');
  const precio = document.getElementById('precio-total');
  const boton = document.getElementById('btn-pedido');

  function actualizarPrecio() {
    let total = 0;

    const tamañoSel = document.querySelector('input[name="tamaño"]:checked');
    if (tamañoSel) total += parseFloat(tamañoSel.value);

    total += parseFloat(masa.value);

    extras.forEach(chk => {
      if (chk.checked) total += parseFloat(chk.value);
    });

    precio.textContent = `Precio Total: ${total.toFixed(2)} €`;
  }

  radiosTamaño.forEach(r => r.addEventListener('change', actualizarPrecio));
  extras.forEach(c => c.addEventListener('change', actualizarPrecio));
  masa.addEventListener('change', actualizarPrecio);

  boton.addEventListener('click', () => {
    const tamañoSel = document.querySelector('input[name="tamaño"]:checked');
    const extrasSel = [...extras].filter(e => e.checked).map(e => e.dataset.label);
    const masaSel = masa.options[masa.selectedIndex].dataset.label;
    const total = precio.textContent;

    alert(
      `Pedido:\n` +
      `Tamaño: ${tamañoSel ? tamañoSel.dataset.label : 'No seleccionado'}\n` +
      `Masa: ${masaSel}\n` +
      `Extras: ${extrasSel.length ? extrasSel.join(', ') : 'Ninguno'}\n` +
      `${total}`
    );
  });
});

