window.addEventListener('load', function () {

    let formulario = document.querySelector(".register-form");

    formulario.addEventListener("submit", function (e) {
        let nombre = document.querySelector('#name');
        let apellido = document.querySelector('#last_name');
        let password = document.querySelector('#password');
        let email = document.querySelector('#email');
        let ulErrores = document.getElementById("errores");
        let errores = [];


        if (nombre.value == "") {
            errores.push("El nombre no puede estar vacio");
        } else if (nombre.value.length < 2) {
            errores.push("El nombre debe tener al menos 5 caracteres");
        }

        if (apellido.value == "") {
            errores.push("El apellido no puede estar vacio");
        } else if (apellido.value.length < 2) {
            errores.push("El apellido debe tener al menos 5 caracteres");
        }

        if (password.value == "") {
            errores.push("La contraseña no puede estar vacia");
        } else if (password.value.length < 8) {
            errores.push("La contraseña debe tener al menos 5 caracteres");
        }

        //Validacion custom de email valido
        valor = email.value;
        function validateEmail(mail) {
            var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            return emailPattern.test(mail);
        }

        if (!validateEmail(valor)) {
            errores.push("El email no es valido");
        }
        //Fin validacion custom de email valido
        
        if (errores.length > 0) {
            e.preventDefault();
            ulErrores.innerHTML = "";
            for (let i = 0; i < errores.length; i++) {
                ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
            }
            ulErrores.style.color = 'red';

        }



    })

})


