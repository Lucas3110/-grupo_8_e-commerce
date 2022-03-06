let path = require ("path");
let fs = require('fs');


const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));



const coleccionJo = products.filter(function(product){
	return product.coleccion == 'Genshin'
})
const coleccionL = products.filter(function(product){
	return product.coleccion == 'Punks'
})
const coleccionN = products.filter(function(product){
	return product.coleccion == 'Magic'
})
const coleccionJ = products.filter(function(product){
	return product.coleccion == 'Van-Gogh' 
})
const controlador = {    
    list: (req, res) => {        
        res.render('list', {
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
		res.render('detail', {
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
    cart: (req, res) => {        
        res.render("cart");        
    },       
    	// Update - Form to edit
	edit: (req, res) => {
		let id = req.params.id
		let productToEdit = products.find(product => product.id == id)
		res.render('edit', {productToEdit})
	},
	// Update - Method to update
	update: (req, res) => {
		let id = req.params.id;
		let productToEdit = products.find(product => product.id == id)

		productToEdit = {
			id: productToEdit.id,
			...req.body,
			image: productToEdit.image,
		};
		
		let newProducts = products.map(product => {
			if (product.id == productToEdit.id) {
				return product = {...productToEdit};
			}
			return product;
		})

		fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, ' '));
		res.redirect('/');
	},       
    // Delete - Delete one product from DB
	destroy : (req, res) => {
		let id = req.params.id;
		let finalProducts = products.filter(product => product.id != id);
		fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));
		res.redirect('/');		
	}
};

module.exports = controlador;




