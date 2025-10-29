let popupWindow = null;

function abrirPopup() {
  if (!popupWindow || popupWindow.closed) {
    const width = 400;
    const height = 300;
    const left = (window.innerWidth - width) / 2;
    const top = 100;

    popupWindow = window.open(
      "popup.html",
      "Popup",
      `width=${width},height=${height},left=${left},top=${top}`
    );
  } else {
    popupWindow.focus();
  }
}

document.getElementById("open-popup").addEventListener("click", abrirPopup);

document.getElementById("close-popup").addEventListener("click", () => {
  if (popupWindow && !popupWindow.closed) {
    popupWindow.close();
  }
});

window.addEventListener("load", () => {
  setTimeout(abrirPopup, 5000);
});
