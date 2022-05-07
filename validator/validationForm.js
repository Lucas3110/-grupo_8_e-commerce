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
        /*
    check("image")
        .customfunction(value, filename) {
            let extension = (path.extname(filename)).toLowerCase();
            switch (extension) {
                case '.jpg': 
                    return '.jpg'; esta bien asi? o return true?

                case '.jpeg':
                    return '.jpeg';

                case  '.png':
                    return '.png';

                default:
                    return false; 
            }
        }     nos falta algun parentesis o algo
             */

    ]

}

module.exports = validator