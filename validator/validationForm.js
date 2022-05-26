const { check, body } = require("express-validator")
const fs = require("fs");
const path = require("path");
const db = require('../database/models');


const validator = {
    login: [
        check("email")
            .notEmpty()
            .withMessage("Email vacio")
            .isEmail(),
        check("password")
            .notEmpty()
            .withMessage("Contraseña vacio")

    ],
    register: [
        check("email")
            .notEmpty()
            .withMessage("Email vacio")
            .bail()
            .isEmail()
            .withMessage("formato de email incorrecto")
            .custom(function (value) {
                return db.User.findOne({ where: { email: value } }).then(function (res) {
                    if (res) {
                        return Promise.reject('Email ya registrado');
                    }
                })
            }),

        check("name")
            .notEmpty()
            .withMessage("Nombre vacio")
            .isLength({ min: 2 })
            .withMessage("Ingrese minimo 2 caracteres"),
        check("last_name")
            .notEmpty()
            .withMessage("Apellido vacio")
            .isLength({ min: 2 })
            .withMessage("Ingrese minimo 2 caracteres"),
        check("password")
            .notEmpty()
            .withMessage("Contraseña vacio")
            .isLength({ min: 8 })
            .withMessage("Ingrese minimo 8 caracteres"),

        check("image")
            .custom(function(value, {req}){ //valido si llega el file o no
                return req.file;
            })
            .withMessage("Imagen Obligatoria")
            .bail()
            .custom(function(value, {req} ){
                const imagenesValidas = [".jpg", ".jpeg", ".png", ".gif", ".JPG", ".PNG", ".JPEG", ".GIF"] //pueden venir en mayuscula
                const extension = path.extname(req.file.originalname);
                return imagenesValidas.includes(extension);               
            })
            .withMessage("Archivo no valido")
    ],
    product: [
        check("name")
            .notEmpty()
            .withMessage("Nombre vacio")
            .isLength({ min: 5 })
            .withMessage("Ingrese minimo 5 caracteres"),
        check("description")
            .isLength({ min: 20 })
            .withMessage("Ingrese minimo 20 caracteres"),
        check("image")
            .custom(function(value, {req}){ 
                return req.file;
            })
            .withMessage("Imagen Obligatoria")             
            .bail()
            .custom(function(value, {req} ){
                const imagenesValidas = [".jpg", ".jpeg", ".png", ".gif", ".JPG", ".PNG", ".JPEG", ".GIF"] //pueden venir en mayuscula
                const extension = path.extname(req.file.originalname);
                return imagenesValidas.includes(extension);               
            })
            .withMessage("Archivo no valido")

    ]

}

module.exports = validator