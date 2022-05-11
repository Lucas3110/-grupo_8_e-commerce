window.addEventListener('load', function () {

    let formulario = document.querySelector(".login-form"); 

    formulario.addEventListener("submit", function (e) {
        let email = document.getElementById('email');
        let password = document.getElementById('password');
        let ulErrores = document.getElementById("errores");
        let errores = [];

        if (email.value == "") {
            errores.push("El nombre no puede estar vacio");
        }

        if (password.value == "") {
            errores.push("La contraseña no puede estar vacia");
        }

        if (errores.length > 0) {
            e.preventDefault();

            for (let i = 0; i < errores.length; i++) {
                ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
            }
            ulErrores.style.color = 'red';

        }

    })

})
