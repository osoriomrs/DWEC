const input = document.getElementById("texto");
const boton = document.getElementById("boton-add");
const lista = document.getElementById("lista");

function añadirTarea() {
  const texto = input.value.trim();
  if (!texto) return;

  const li = document.createElement("li");
  li.innerHTML = texto + ' <button>Eliminar</button>';
  lista.appendChild(li);

  input.value = "";
  input.focus();
}

lista.addEventListener("click", function(e) {
  if (e.target.tagName === "BUTTON") {
    e.target.parentNode.remove();
  }
});

boton.addEventListener("click", añadirTarea);
input.addEventListener("keypress", function(e) {
  if (e.key === "Enter") añadirTarea();
});
