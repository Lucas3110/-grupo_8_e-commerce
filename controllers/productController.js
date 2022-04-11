let path = require ("path");
let fs = require('fs');
const db = require('../database/models'); // aca agregamos lo de db
const sequelize = db.sequelize; // aca agregamos lo de db


const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));



/*const coleccionJo = products.filter(function(product){
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
}) */
const controlador = {    
    product: (req, res) => {        
        db.Product.findAll({
			include: [{association: "collection"}]
		})  
            .then(products => {
                res.render('product', {products})
            })
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
		db.Product.create({
            name:req.body.name,
            price:req.body.price,
            description:req.body.description,
            image:'default-image.png',//req.body.image, lo dejo asi hasta q tenga multer
            collection_id: req.body.collection_id,
        })
        .then(function(){
           return res.redirect("/")
        });    
			/*image: 'default-image.png' aca hay q agregar el multer*/
		
		
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
			imagen: productToEdit.imagen,
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




