let path = require ("path");

const controlador = {
    index: (req, res) => {
        
        res.sendFile(path.resolve("./views/home.html")); 
       
    }
};

module.exports = controlador;





