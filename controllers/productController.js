let path = require ("path");
let fs = require('fs');
const db = require('../database/models'); // aca agregamos lo de db
const sequelize = db.sequelize; // aca agregamos lo de db

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
		db.Product.findByPk(req.params.id)
        .then(function(product){
            res.render('detail', {product});
        });
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
            image:"users/defaultPic.jpg" ,//req.body.image, lo dejo asi hasta q tenga multer
            collection_id: req.body.collection_id,
        })
        .then(function(){
           return res.redirect("/")
        });    	
	},

    cart: (req, res) => {        
        res.render("cart");        
    },       

    // Update - Form to edit
	edit: function(req, res) {
		let productToEdit = db.Product.findByPk(req.params.id)
			.then(productToEdit => {
				res.render('edit', {productToEdit})
			})       
	},

	// Update - Method to update
	update:(req, res) =>{
        db.Product.update({
            name:req.body.name,
            price:req.body.price,
            description:req.body.description,
            image:'coleccionJo/genshin1.jpg',//req.body.image, lo dejo asi hasta q tenga multer
           	collection_id: req.body.collection_id
        }, {
            where:{  
                id: req.params.id
            }
        })        
        .then(function(){
           return res.redirect('/');
        })		
	},      

    // Delete - Delete one product from DB
	destroy : (req, res) => {
		db.Product.destroy({
            where: {
               id: req.params.id
            }
         })
         .then(() => {
               res.redirect('/');
            })
    }		
};

module.exports = controlador;




