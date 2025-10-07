(function() {
    const segundoEnlace = document.querySelector('.navegacion a:nth-child(2)');
    if(segundoEnlace && segundoEnlace.parentElement
        && segundoEnlace.parentElement.previousElementSibling) {
        const h1=segundoEnlace.parentElement.previousElementSibling.style.color='orange';
        }
})();