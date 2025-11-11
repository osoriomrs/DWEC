document.addEventListener("DOMContentLoaded", function() {
  const userInfoDiv = document.getElementById("user-info");
  const editBtn = document.getElementById("edit-btn");
  const message = document.getElementById("message");

  let userData = {};
  let editMode = false;

  const xhr = new XMLHttpRequest();
  xhr.open("GET", "user_data.json", true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      try {
        userData = JSON.parse(xhr.responseText);
        renderUserData(userData, false);
      } catch (err) {
        message.textContent = "Error: el archivo JSON está malformado.";
        message.className = "text-danger fw-bold";
      }
    } else {
      showLoadError();
    }
  };
  xhr.onerror = function() {
    showLoadError();
  };
  xhr.send();

  function showLoadError() {
    message.innerHTML = `
      <span class="text-danger fw-bold">
        Error al cargar los datos del usuario.<br>
        ⚠️ Probablemente necesites abrir el proyecto desde un servidor local
        (por ejemplo, Live Server en VS Code o "python -m http.server").
      </span>
    `;
    editBtn.disabled = true;
  }

  function renderUserData(data, editable) {
    const { personalInfo, address, hobbies } = data;
    userInfoDiv.innerHTML = `
      <div class="mb-3">
        <label class="form-label">Nombre:</label>
        <input type="text" id="firstName" class="form-control" value="${personalInfo.firstName}" ${!editable ? "disabled" : ""}>
      </div>

      <div class="mb-3">
        <label class="form-label">Apellidos:</label>
        <input type="text" id="lastName" class="form-control" value="${personalInfo.lastName}" ${!editable ? "disabled" : ""}>
      </div>

      <div class="mb-3">
        <label class="form-label">Email:</label>
        <input type="text" id="email" class="form-control" value="${personalInfo.email}" ${!editable ? "disabled" : ""}>
      </div>

      <div class="mb-3">
        <label class="form-label">Teléfono:</label>
        <input type="text" id="phone" class="form-control" value="${personalInfo.phone}" ${!editable ? "disabled" : ""}>
      </div>

      <div class="mb-3">
        <label class="form-label">Dirección:</label>
        <textarea id="address" class="form-control" rows="2" ${!editable ? "disabled" : ""}>${address.street}, ${address.city}, ${address.zipCode}, ${address.country}</textarea>
      </div>

      <div class="mb-3">
        <label class="form-label">Hobbies:</label>
        <input type="text" id="hobbies" class="form-control" value="${hobbies.join(", ")}" ${!editable ? "disabled" : ""}>
      </div>
    `;
  }

  editBtn.addEventListener("click", function() {
    if (!editMode) {
      renderUserData(userData, true);
      editBtn.textContent = "Guardar cambios";
      editBtn.classList.replace("btn-primary", "btn-success");
      editMode = true;
    } else {
      const updatedData = {
        ...userData,
        personalInfo: {
          firstName: document.getElementById("firstName").value,
          lastName: document.getElementById("lastName").value,
          email: document.getElementById("email").value,
          phone: document.getElementById("phone").value
        },
        address: {
          street: document.getElementById("address").value.split(",")[0].trim(),
          city: document.getElementById("address").value.split(",")[1]?.trim() || "",
          zipCode: document.getElementById("address").value.split(",")[2]?.trim() || "",
          country: document.getElementById("address").value.split(",")[3]?.trim() || ""
        },
        hobbies: document.getElementById("hobbies").value.split(",").map(h => h.trim())
      };

      editBtn.disabled = true;
      message.textContent = "Guardando cambios...";
      message.className = "text-primary fw-bold";

      const xhrPost = new XMLHttpRequest();
      const url = 	"https://webhook.site/1342c671-ca15-4ba0-98d8-0b5f0379827b"; 
      xhrPost.open("POST", url, true);
      xhrPost.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

      xhrPost.onload = function() {
        editBtn.disabled = false;
        if (xhrPost.status >= 200 && xhrPost.status < 300) {
          message.textContent = "Cambios guardados correctamente.";
          message.className = "text-success fw-bold";
          userData = updatedData;
          renderUserData(userData, false);
          editBtn.textContent = "Editar";
          editBtn.classList.replace("btn-success", "btn-primary");
          editMode = false;
        } else {
          message.textContent = "Error al guardar los cambios.";
          message.className = "text-danger fw-bold";
        }
      };

      xhrPost.onerror = function() {
        editBtn.disabled = false;
        message.textContent = "Error de conexión.";
        message.className = "text-danger fw-bold";
      };

      xhrPost.send(JSON.stringify(updatedData));
    }
  });
});
