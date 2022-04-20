const fs = require("fs");
const path = require("path");
const db = require('../database/models'); 



function recordame (req, res , next){

    if(!req.session.usuarioLogueado && req.cookies.user){

        db.User.findByPk(req.cookies.user,{
           include:["category"] 
        })
        .then(function(userRemember){
           if(userRemember){
            let user = {
                id: userRemember.id,
                nombre: userRemember.nombre,
                apellido: userRemember.apellido,
                categoria: userRemember.category.name,
                email: userRemember.email,
                imagen: userRemember.image,
            }
    
            req.session.usuarioLogueado = user;
    
            return next()                
            }else{
             return next()
            }           
        })    
    }else{
        return next()
    }
}
module.exports = recordame;