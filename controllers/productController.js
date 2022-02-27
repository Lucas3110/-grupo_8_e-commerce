let path = require ("path");
let fs = require('fs');


const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));



const coleccionJo = products.filter(function(product){
	return product.coleccion == 'Genshin'
})
const coleccionL = products.filter(function(product){
	return product.coleccion == 'in-sale'
})
const coleccionN = products.filter(function(product){
	return product.coleccion == 'visited'
})
const coleccionJ = products.filter(function(product){
	return product.coleccion == 'Van-Gohg' //cambiar el JSON con "-" en vez de espacio
})
const controlador = {    
    productos: (req, res) => {        
        res.render('productlist', {
            coleccionJo,
            coleccionL,
            coleccionN,
            coleccionJ           
        });   
    },
    // Detail - Detail from one product
	detail: (req, res) => {
		let id = req.params.id
		let product = products.find(product => product.id == id)
		res.render('productDetail', {
			product			
		})
    },       
    productCart: (req, res) => {        
        res.render("productCart");        
    },
    productDetail: (req, res) => {        
        res.render("productDetail");        
    },   
    edit: (req, res) => {        
        res.render("edit");        
    },     
    create: (req, res) => {        
        res.render("create");        
    }, 
};

module.exports = controlador;




