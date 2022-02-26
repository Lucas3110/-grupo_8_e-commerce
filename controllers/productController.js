let path = require ("path");

const controlador = {        
    productCart: (req, res) => {        
        res.render("productCart");        
    },
    productDetail: (req, res) => {        
        res.render("productDetail");        
    },   
    edit: (req, res) => {        
        res.render("edit");        
    }, 
    productos: (req, res) => {        
        res.render("productlist");        
    },
    create: (req, res) => {        
        res.render("create");        
    }, 
};

module.exports = controlador;





