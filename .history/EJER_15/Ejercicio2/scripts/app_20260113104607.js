const columnas = document.querySelectorAll(".columna");
let tareas = [];
let tareaArrastrada = null;

fetch("https://jsonplaceholder.typicode.com/todos?_limit=12")
  .then(res => res.json())
  .then(data => {
    tareas = data.map(t => ({
      id: "task-" + t.id,
      texto: t.title,
      estado: t.completed ? "finalizado" : "todo"
    }));
    renderizar();
  });

function renderizar() {
  columnas.forEach(c => c.querySelector(".lista").innerHTML = "");
  tareas.forEach(t => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta";
    tarjeta.draggable = true;
    tarjeta.id = t.id;
    tarjeta.textContent = t.texto;

    tarjeta.addEventListener("dragstart", e => {
      tareaArrastrada = tarjeta;
      e.dataTransfer.setData("text/plain", JSON.stringify({ id: t.id, estado: t.estado }));
      setTimeout(() => tarjeta.classList.add("dragging"), 0);
    });

    tarjeta.addEventListener("dragend", () => {
      tarjeta.classList.remove("dragging");
      tareaArrastrada = null;
    });

    const columna = document.querySelector(`[data-estado="${t.estado}"] .lista`);
    columna.appendChild(tarjeta);
  });
}

columnas.forEach(col => {
  const lista = col.querySelector(".lista");

  col.addEventListener("dragover", e => {
    e.preventDefault();
    const despues = obtenerElementoDespues(lista, e.clientY);
    if (despues == null) lista.appendChild(tareaArrastrada);
    else lista.insertBefore(tareaArrastrada, despues);
  });

  col.addEventListener("drop", e => {
    const data = JSON.parse(e.dataTransfer.getData("text/plain"));
    const estadoNuevo = col.dataset.estado;
    tareas = tareas.map(t =>
      t.id === data.id ? { ...t, estado: estadoNuevo } : t
    );
  });
});

function obtenerElementoDespues(contenedor, y) {
  const elementos = [...contenedor.querySelectorAll(".tarjeta:not(.dragging)")];
  return elementos.reduce((masCercano, el) => {
    const box = el.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > masCercano.offset) {
      return { offset, element: el };
    } else {
      return masCercano;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

