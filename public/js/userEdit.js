window.addEventListener('load', function() {

    let formulario = document.querySelector(".register-form");

formulario.addEventListener("submit", function(e){

    let nombre = document.querySelector('#name');
    if(nombre.value == ""){
        alert("El nombre debe tener al menos 2 caracteres");
    } else if(nombre.value.length < 2) {
        alert("El nombre debe tener al menos 2 caracteres");
    }
    e.preventDefault();

})    

})




