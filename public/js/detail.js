let clickAgregar = document.querySelector('.btn');

window.addEventListener('load', function() {

    clickAgregar.addEventListener("click", function(){
        document.getElementById('modal').classList.add("modal--show");

    })
})



