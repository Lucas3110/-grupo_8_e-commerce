const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const db = require('../database/models'); 
const sequelize = db.sequelize; 

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
            password: bcrypt.hashSync(req.body.password,10),           
            email: req.body.email,
            image: req.file ? req.file.filename : "defaultPic.jpg",
            category_id: req.body.category_id         
        })
        .then(movie => {
            res.redirect('/users/login');
         })
        
	},
    processLogin: function(req, res){   
        const errors = validationResult(req);
        
        if(errors.errors.length > 0){
            res.render("login", {errorsLogin: errors.mapped()})
        } 
         
            db.User.findOne({
            where: { email: req.body.email},
            include:[{association: "category"}]
            
            }).then(function(userFound) {
                               
                if(userFound && bcrypt.compareSync(req.body.password, userFound.password)){
                    //proceso session
                    let user = {
                        id: userFound.id,
                        nombre: userFound.name,
                        apellido: userFound.last_name,
                        categoria: userFound.category.name,  //creo q seria asi para acceder el FK
                        email: userFound.email,
                        imagen: userFound.image,
                    }
        
                    req.session.usuarioLogueado = user
        
                    if(req.body.recordame){
                        res.cookie("user", user.id, {maxAge: 60000 * 24})
                    }
                    
                    res.redirect("/")
        
                }else{
                    res.render("login", {errorMsg: "Error credenciales invalidas"})
                }
            }) 
       
    },
    profile:(req, res) => {        
        res.render("profile");  
    },
    // Update - Form to edit
	edit: function(req, res) {
		let userToEdit = db.User.findByPk(req.params.id)
			.then(userToEdit => {
				res.render('userEdit', {userToEdit})
			});            
	},

	// Update - Method to update
	update:(req, res) =>{
        db.User.update({
            name: req.body.name,
            last_name: req.body.last_name,
            password: req.body.password ? bcrypt.hashSync(req.body.password,10) :  db.User.password,          
            email: req.body.email,
            image: req.file ? req.file.filename : "defaultPic.jpg",
        }, {
            where:{  
                id: req.params.id
            }
        })        
        .then(function(){
           return res.render("profile");
        })		
	},      

    logout:function(req, res){
        req.session.destroy();       
        res.clearCookie("user");
        res.redirect("/");
    }        
};

module.exports = controlador;

