let path = require ("path");

const controlador = {    
    login: (req, res) => {        
        res.render("login");        
    },    
    register: (req, res) => {        
        res.render("register");        
    },    
};

module.exports = controlador;

