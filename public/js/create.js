window.addEventListener('load', function () {

    let formulario = document.querySelector(".create-form"); 

    formulario.addEventListener("submit", function (e) {
        let name = document.getElementById('name');
        let description = document.getElementById('description'); 
        let image = document.getElementById('image');
        let ulErrores = document.getElementById("errores");
        let errores = [];

        if (name.value == "") {
            errores.push("El nombre no puede estar vacio");
        } else if (name.value.length < 5) {
            errores.push("El nombre debe tener al menos 5 caracteres");
        }

         if (description.value.length <= 20) {
            errores.push("La descripcion debe tener al menos 20 caracteres");
        }

        //Comienzo validacion custom imagen
        const allowedExtensions = /(.jpg|.jpeg|.png|.gif|.JPG|.JPEG|.PNG|.GIF)$/i; 
        var fileInput =  document.getElementById('image');

        if (!allowedExtensions.exec(fileInput.value)) { 
            errores.push("Formato de imagen no valida");            
        }
        //Fin validacion custom de imagen        

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
