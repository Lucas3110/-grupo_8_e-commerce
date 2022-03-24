let path = require ("path");
let fs = require('fs');
const bcrypt = require('bcryptjs');
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const { validationResult } = require('express-validator');

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
        
        const newUser = {
            id: users.length + 1,            
            ...req.body,           
            contrasena: bcrypt.hashSync(req.body.contrasena,10),           
            imagen: req.file ? req.file.filename : "defaultPic.jpg"
        }

        users.push(newUser);

        writeFile(users)

        res.redirect("/users/login");

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
                imagen: userFound.imagen,
            }

            req.session.usuarioLogueado = user

            if(req.body.remember){
                res.cookie("user", user.id, {maxAge: 60000 * 24})
            }

            res.redirect("/")

        }else{
            res.render("login", {errorMsg: "Error credenciales invalidas"})
        }
    }
};

module.exports = controlador;

