let path = require ("path");
let fs = require('fs');
const bcrypt = require('bcryptjs');
let { check, validationResult, body } = require('express-validator');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

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
            imagen: req.file ? req.file.filename : "defaultPic"
        }

        users.push(newUser);

        writeFile(users)

        res.redirect("/users/login");

	},
    processLogin: function(req, res) {
        let errors = validationResult(req);

        if(errors.isEmpty()){
            for (let i = 0; i < users.length; i++){
                if (users[i].email == req.body.email){
                    if(bcrypt.compareSync(req.body.contrasena, users[i].contrasena)){
                        var usuarioALoguearse = users[i];
                        break;
                    }
                }
            }

            if(usuarioALoguearse == undefined) {
                return res.render('login', {errors: [
                    {msg: 'Credenciales invalidas'}
                ]})
            }            
            req.session.usuarioALogueado = usuarioALoguearse;
            return res.render('login', {user: req.session.usuarioALogueado})
        } else{
            return res.render('login', {errors: errors.errors})
        }
    }    
};

module.exports = controlador;

