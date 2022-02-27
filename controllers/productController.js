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
    create: (req, res) => {        
        res.render("create");        
    }, 
    // Create -  Method to store
	store: (req, res) => {
		let newProduct = {
			id: products[products.length - 1].id + 1,
			...req.body,
			/*image: 'default-image.png'*/
		};
		products.push(newProduct)
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
		res.redirect('/');
	},
    productCart: (req, res) => {        
        res.render("productCart");        
    },   
    edit: (req, res) => {        
        res.render("edit");       
    }       

};

module.exports = controlador;




