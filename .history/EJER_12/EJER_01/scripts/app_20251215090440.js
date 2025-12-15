const contenedor = document.getElementById("contenedorProductos");
const filtroCategoria = document.getElementById("filtroCategoria");
const estado = document.getElementById("estado");
const btnMenor = document.getElementById("ordenMenor");
const btnMayor = document.getElementById("ordenMayor");
const btnClaro = document.getElementById("temaClaro");
const btnOscuro = document.getElementById("temaOscuro");

let productos = [];

async function cargarProductos() {
  estado.textContent = "Cargando productos...";
  try {
    const res = await fetch("data/productos.json");
    productos = await res.json();
    estado.textContent = "";
    poblarCategorias();
    mostrarProductos(productos);
  } catch {
    estado.textContent = "Error al cargar productos.";
  }
}

function mostrarProductos(lista) {
  contenedor.innerHTML = "";
  lista.forEach(p => {
    const div = document.createElement("div");
    div.className = "card p-3 mb-2";
    div.innerHTML = `
      <h3>${p.nombre}</h3>
      <p>Precio: ${p.precio} €</p>
      <p>Stock: ${p.stock}</p>
      <p>Categoría: ${p.categoria}</p>
    `;
    contenedor.appendChild(div);
  });
}

function poblarCategorias() {
  const categorias = [...new Set(productos.map(p => p.categoria))];
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
  const lista = cat === "Todas" ? productos : productos.filter(p => p.categoria === cat);
  mostrarProductos(lista);
});

btnMenor.addEventListener("click", () => {
  const cat = filtroCategoria.value;
  const lista = cat === "Todas" ? [...productos] : productos.filter(p => p.categoria === cat);
  lista.sort((a, b) => a.precio - b.precio);
  mostrarProductos(lista);
});

btnMayor.addEventListener("click", () => {
  const cat = filtroCategoria.value;
  const lista = cat === "Todas" ? [...productos] : productos.filter(p => p.categoria === cat);
  lista.sort((a, b) => b.precio - a.precio);
  mostrarProductos(lista);
});

function aplicarTema(tema) {
  document.body.classList.remove("bg-dark", "text-white");
  if (tema === "oscuro") {
    document.body.classList.add("bg-dark", "text-white");
  }
  sessionStorage.setItem("tema", tema);
}

btnClaro.addEventListener("click", () => aplicarTema("claro"));
btnOscuro.addEventListener("click", () => aplicarTema("oscuro"));

const temaGuardado = sessionStorage.getItem("tema");
if (temaGuardado) aplicarTema(temaGuardado);

cargarProductos();
