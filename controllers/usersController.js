let path = require ("path");
let fs = require('fs');
const bcrypt = require('bcryptjs');
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const { validationResult } = require('express-validator');
const db = require('../database/models'); // aca agregamos lo de db
const sequelize = db.sequelize; // aca agregamos lo de db

function writeFile(array){
    const arrayString = JSON.stringify(array, null, 4)
    fs.writeFileSync(path.join(__dirname, "../data/users.json"), arrayString);
}

const controlador = {
    index: (req, res) => {        
        res.render("home");        
    },         
    login: (req, res) => {        
        res.render("login");        
    },    
    register: (req, res) => {        
        res.render("register");        
    },
    processRegister: function(req, res){
        const errors = validationResult(req)
        if(errors.errors.length > 0){
           return res.render("register", {errors: errors.mapped()})
        }
        db.User.create({
            name: req.body.name,
            last_name: req.body.last_name,
            password: req.body.password,           
            email: req.body.email,
            //image: req.file ? req.file.filename : "defaultPic.jpg"          
        })
        .then(movie => {
            res.redirect('/usersList');
         })
        
	},
    processLogin: function(req, res){
        const errors = validationResult(req);
        
        if(errors.errors.length > 0){
            res.render("login", {errorsLogin: errors.mapped()})
        }

        const userFound = users.find(function(user){
            return user.email == req.body.email && bcrypt.compareSync(req.body.contrasena, user.contrasena)
        })

        if(userFound){
            //proceso session
            let user = {
                id: userFound.id,
                nombre: userFound.nombre,
                apellido: userFound.apellido,
                categoria: userFound.categoria,
                email: userFound.email,
                imagen: userFound.imagen,
            }

            req.session.usuarioLogueado = user

            if(req.body.recordame){
                res.cookie("user", user.id, {maxAge: 60000 * 24})
            }

            res.redirect("/")

        }else{
            res.render("login", {errorMsg: "Error credenciales invalidas"})
        }
    },
    profile:(req, res) => {        
        res.render("profile");  
    },
    logout:function(req, res){
        req.session.destroy();       
        res.clearCookie("user");
        res.redirect("/");
    }        
};

module.exports = controlador;

