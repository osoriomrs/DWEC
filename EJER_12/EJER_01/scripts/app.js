const contenedor = document.getElementById("contenedorProductos");
const filtroCategoria = document.getElementById("filtroCategoria");
const estado = document.getElementById("estado");
const btnMenor = document.getElementById("ordenMenor");
const btnMayor = document.getElementById("ordenMayor");

let productos = [];

async function cargarProductos() {
  estado.textContent = "Cargando productos...";
  try {
    const res = await fetch("data/productos.json");
    productos = await res.json();
    estado.textContent = "";
    mostrarProductos(productos);
    poblarCategorias();
  } catch (err) {
    estado.textContent = "Error al cargar productos.";
    console.error(err);
  }
}

function mostrarProductos(lista) {
  contenedor.innerHTML = "";
  lista.forEach(p => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${p.nombre}</h3>
      <p>Precio: ${p.precio} €</p>
      <p>Stock: ${p.stock}</p>
      <p>Categoría: ${p.categoria}</p>
      <hr>
    `;
    contenedor.appendChild(div);
  });
}

function poblarCategorias() {
  const categorias = Array.from(new Set(productos.map(p => p.categoria)));
  filtroCategoria.innerHTML = '<option value="Todas">Todas</option>';
  categorias.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    filtroCategoria.appendChild(opt);
  });
}

filtroCategoria.addEventListener("change", () => {
  const cat = filtroCategoria.value;
  const filtrados = cat === "Todas" ? productos : productos.filter(p => p.categoria === cat);
  mostrarProductos(filtrados);
});

btnMenor.addEventListener("click", () => {
  const cat = filtroCategoria.value;
  const lista = cat === "Todas" ? productos : productos.filter(p => p.categoria === cat);
  lista.sort((a, b) => a.precio - b.precio);
  mostrarProductos(lista);
});

btnMayor.addEventListener("click", () => {
  const cat = filtroCategoria.value;
  const lista = cat === "Todas" ? productos : productos.filter(p => p.categoria === cat);
  lista.sort((a, b) => b.precio - a.precio);
  mostrarProductos(lista);
});

cargarProductos();
