window.addEventListener('load', function () {

    let formulario = document.querySelector(".login-form"); 

    formulario.addEventListener("submit", function (e) {
        let email = document.getElementById('email');
        let password = document.getElementById('password');
        let ulErrores = document.getElementById("errores");
        let errores = [];

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
