const fs = require("fs");
const path = require("path");

function findAll(){
    const users = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/users.json")));
    return users;
}

function recordame (req, res , next){
    if(!req.session.usuarioLogueado && req.cookies.user){
        let users = findAll()
        const usuarioCookies = users.find(function(user){
            return user.id == req.cookies.user
        })

        let user = {
            id: usuarioCookies.id,
            nombre: usuarioCookies.nombre,
            apellido: usuarioCookies.apellido,
            categoria: usuarioCookies.categoria,
            imagen: usuarioCookies.imagen,
        }

        req.session.usuarioLogueado = user;

        return next()

    }else{
        return next()
    }
}
module.exports = recordame;