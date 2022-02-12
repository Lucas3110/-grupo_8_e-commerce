let path = require ("path");

const controlador = {
    index: (req, res) => {        
        res.render("home");        
    },
    login: (req, res) => {        
        res.render("login");        
    },
    productCart: (req, res) => {        
        res.render("productCart");        
    },
    productDetail: (req, res) => {        
        res.render("productDetail");        
    },
    register: (req, res) => {        
        res.render("register");        
    }
};

module.exports = controlador;





