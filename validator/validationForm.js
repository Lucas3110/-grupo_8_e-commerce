const { check, body } = require("express-validator")
const fs = require("fs");
const path = require("path");
const db = require('../database/models'); // aca agregamos lo de db



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
                return db.User.findOne({where: {email: value}}).then(function(res){
                    if(res){
                        return Promise.reject('Email ya registrado');
                    }                              
                })
            }),

                /* VIEJO CODIGO
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