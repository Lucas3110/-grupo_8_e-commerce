window.addEventListener('load', function() {

    let formulario = document.querySelector(".register-form");
    let errores = [];

formulario.addEventListener("submit", function(e){

    let nombre = document.querySelector('#name');
    if(nombre.value == ""){
        errores.push("El nombre debe tener al menos 2 caracteres");
    } else if(nombre.value.length < 2) {
        errores.push("El nombre debe tener al menos 2 caracteres");
    }

    let apellido = document.querySelector('#apellido');
    if(apellido.value == ""){
        errores.push("El nombre debe tener al menos 2 caracteres");
    } else if(nombre.value.length < 2) {
        errores.push("El nombre debe tener al menos 2 caracteres");
    }     

    e.preventDefault();

})    

})




