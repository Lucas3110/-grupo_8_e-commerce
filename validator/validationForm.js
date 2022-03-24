const { check, body } = require("express-validator")
const fs = require("fs");
const path = require("path");

function findAll(){
    const users = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/users.json")));
    return users;
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
            .custom(function(value){
                let users = findAll()
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
            })
            ,
        check("nombre")
            .notEmpty()
            .withMessage("Nombre vacio"),
        check("apellido")
            .notEmpty()
            .withMessage("Apellido vacio"),
        check("contrasena")
            .notEmpty()
            .withMessage("Contraseña vacio")
    ]
}

module.exports = validator