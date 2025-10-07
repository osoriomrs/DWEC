(function() {
    const footer = document.querySelector('footer-principal');
    if(footer && footer.previousElementSibling) {
        footer.previousElementSibling.style.border = '2px solid red';
    }
})();