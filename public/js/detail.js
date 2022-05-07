let clickAgregar = document.querySelector('.btn');

window.addEventListener('load', function() {

    clickAgregar.addEventListener("click", function(){
        clickAgregar.style.backgroundColor = '#3282B8';
        confirm("NFT agregado al carrito de compra");
    })
})
