document.addEventListener("DOMContentLoaded", function() {
  const productList = document.getElementById("product-list");
  const filterCategory = document.getElementById("filter-category");
  const filterBrand = document.getElementById("filter-brand");
  const sortPrice = document.getElementById("sort-price");

  let products = [];

  fetch("json/productos.json")
    .then(res => res.json())
    .then(data => {
      products = data;
      populateFilters();
      renderProducts(products);
    })
    .catch(() => {
      productList.innerHTML = '<p class="text-danger">Error al cargar los productos.</p>';
    });

  function populateFilters() {
    const categories = [...new Set(products.map(p => p.category))];
    categories.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat;
      filterCategory.appendChild(option);
    });

    const brands = [...new Set(products.map(p => p.brand))];
    brands.forEach(br => {
      const option = document.createElement("option");
      option.value = br;
      option.textContent = br;
      filterBrand.appendChild(option);
    });
  }

  function renderProducts(items) {
    productList.innerHTML = "";
    if(items.length === 0){
      productList.innerHTML = '<p class="text-muted">No hay productos que coincidan.</p>';
      return;
    }
    items.forEach(p => {
      const card = document.createElement("div");
      card.className = "col-md-4";
      card.innerHTML = `
        <div class="card h-100 shadow-sm">
          <img src="${p.imageUrl}" class="card-img-top" alt="${p.name}">
          <div class="card-body">
            <h5 class="card-title">${p.name}</h5>
            <p class="card-text">${p.description}</p>
            <p class="card-text"><strong>Precio:</strong> $${p.price.toFixed(2)}</p>
            <p class="card-text"><small class="text-muted">${p.category} | ${p.brand}</small></p>
          </div>
        </div>
      `;
      productList.appendChild(card);
    });
  }

  function applyFilters() {
    let filtered = [...products];
    if(filterCategory.value) filtered = filtered.filter(p => p.category === filterCategory.value);
    if(filterBrand.value) filtered = filtered.filter(p => p.brand === filterBrand.value);
    if(sortPrice.value === "asc") filtered.sort((a,b)=>a.price-b.price);
    if(sortPrice.value === "desc") filtered.sort((a,b)=>b.price-a.price);
    renderProducts(filtered);
  }

  filterCategory.addEventListener("change", applyFilters);
  filterBrand.addEventListener("change", applyFilters);
  sortPrice.addEventListener("change", applyFilters);
});
