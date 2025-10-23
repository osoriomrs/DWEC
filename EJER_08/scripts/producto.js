const productos = [
  { id: 1, nombre: "PC Gamer", precio: 1200, categoria: "Tecnología", imagen: "https://tse1.mm.bing.net/th/id/OIP.yi4L9-ePwev0Jp62oQPikgHaFG?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 2, nombre: "Cafetera Automática", precio: 250, categoria: "Hogar", imagen: "https://i0.wp.com/capuchinox.com/wordpress/wp-content/uploads/2016/02/Saeco_Poemia_Cafetera_espresso_manual.jpg" },
  { id: 3, nombre: "Camiseta Exclusiva Manga Larga Real Oviedo", precio: 500, categoria: "Deportes", imagen: "https://pbs.twimg.com/media/DYq_GGAWsAAjoyC.jpg" },
  { id: 4, nombre: "Auriculares Bluetooth", precio: 90, categoria: "Tecnología", imagen: "https://tse1.mm.bing.net/th/id/OIP._1fhqi9CmUc-wf7WIEpHFwHaEJ?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 5, nombre: "Smartwatch", precio: 180, categoria: "Tecnología", imagen: "https://th.bing.com/th/id/R.31a7dccb46e1a8dc5cf1272ca540090e?rik=WX5crTcasKFipQ&riu=http%3a%2f%2fmedia.gadgetsin.com%2f2014%2f09%2fsony_smartwatch_3_smart_watch_announced_1.jpg&ehk=j38NkUAVfcZbGzm3EIYey7MjioJwYm4QhDd4wLLygZk%3d&risl=&pid=ImgRaw&r=0" },
  { id: 6, nombre: "Tostadora", precio: 40, categoria: "Hogar", imagen: "https://th.bing.com/th/id/R.79c6d553543e0a0f55ac82b05f0a7e31?rik=lURusoR1MICq4Q&pid=ImgRaw&r=0" },
  { id: 7, nombre: "Camiseta Real Madrid", precio: 120, categoria: "Deportes", imagen: "https://th.bing.com/th/id/R.4dd58a65b122b4179d36346883fb376f?rik=TuzkYiEdGdpJhw&riu=http%3a%2f%2f1.bp.blogspot.com%2f-SaGRcAQgE0s%2fTfeH7ABbOOI%2fAAAAAAAADRE%2fnmOnEe5vV9o%2fs1600%2fcamiseta-Real-Madrid-Champions-2012.jpg&ehk=iHEiqe7FXudpE4ZGOEYQOA8bU1wbNmM8MBeOKI6cOYI%3d&risl=&pid=ImgRaw&r=0" },
  { id: 8, nombre: "PlayStation 6", precio: 900, categoria: "Tecnología", imagen: "https://tse2.mm.bing.net/th/id/OIP.xhNla3iMpcTdcuQioN-0TAHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 9, nombre: "Silla ergonómica", precio: 300, categoria: "Oficina", imagen: "https://th.bing.com/th/id/R.d66aa5a73701e696463c3be02e093f85?rik=3uSqf6VL0YQLkw&pid=ImgRaw&r=0" },
  { id: 10, nombre: "Aspirador Dyson", precio: 100, categoria: "Hogar", imagen: "https://www.miperromolamogollon.com/wp-content/uploads/2018/07/aspiradora-sin-cable-dyson-animal-1-773x1024.jpg" }
];

const contenedor = document.getElementById("productos");
const buscar = document.getElementById("buscar");
const categoria = document.getElementById("categoria");
const precioMax = document.getElementById("precio-max");
const precioValor = document.getElementById("precio-valor");
const ordenRadios = document.querySelectorAll("input[name='orden']");

function cargarCategorias() {
  const categorias = ["Todas", ...new Set(productos.map(p => p.categoria))];
  categoria.innerHTML = categorias.map(c => `<option>${c}</option>`).join("");
}

function mostrarProductos(lista) {
  contenedor.innerHTML = lista.length
    ? lista.map(p => `
        <div>
          <img src="${p.imagen}" alt="${p.nombre}" width="100"><br>
          <strong>${p.nombre}</strong><br>
          ${p.categoria} - ${p.precio}€
        </div>
      `).join("")
    : "<p>No se encontraron productos.</p>";
}

function filtrar() {
  let lista = [...productos];
  const texto = buscar.value.toLowerCase();
  const cat = categoria.value;
  const max = parseFloat(precioMax.value);
  const orden = document.querySelector("input[name='orden']:checked")?.value;

  if (texto) lista = lista.filter(p => p.nombre.toLowerCase().includes(texto));
  if (cat !== "Todas") lista = lista.filter(p => p.categoria === cat);
  lista = lista.filter(p => p.precio <= max);

  if (orden === "precio-asc") lista.sort((a, b) => a.precio - b.precio);
  if (orden === "precio-desc") lista.sort((a, b) => b.precio - a.precio);
  if (orden === "nombre") lista.sort((a, b) => a.nombre.localeCompare(b.nombre));

  mostrarProductos(lista);
}

buscar.addEventListener("input", filtrar);
categoria.addEventListener("change", filtrar);
precioMax.addEventListener("input", () => {
  precioValor.textContent = precioMax.value;
  filtrar();
});
ordenRadios.forEach(r => r.addEventListener("change", filtrar));

cargarCategorias();
mostrarProductos(productos);