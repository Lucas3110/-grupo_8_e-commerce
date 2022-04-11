const { check, body } = require("express-validator")
const fs = require("fs");
const path = require("path");

function findAll(){
    const users = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/users.json")));
    return users; //donde uso este users? lo copie de algo de mati creo
                    //sera por esto q no funca el errores ahora?
}

const validator = {
    login:[
        check("email")
            .notEmpty()
            .withMessage("Email vacio"),
        check("contrasena")
            .notEmpty()
            .withMessage("Contraseña vacio")
    ],
    register:[
        check("email")
            .notEmpty()
            .withMessage("Email vacio")
            .bail()
            .isEmail()
            .withMessage("formato de email incorrecto")
            .bail()
            /* .custom(function(value){
                let users = findAll()   Habria q pasar esta logica a sequelize
                //busco al usuario
                let userFound = users.find(function(user){
                    return user.email == value
                })
                //si existe un usuario devuelvo el error
                if(userFound){
                    throw new Error("Email ya registrado!");
                }
                //sino devuelvo true 
                return true
            }) */
            ,
        check("name")
            .notEmpty()
            .withMessage("Nombre vacio"),
        check("last_name")
            .notEmpty()
            .withMessage("Apellido vacio"),
        check("password")
            .notEmpty()
            .withMessage("Contraseña vacio")
    ]
}

module.exports = validator