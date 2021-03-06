const db = require('../database/models'); 
const sequelize = db.sequelize; 
const { validationResult } = require('express-validator');
const { Op } = require("sequelize");



const controlador = {
    product: async (req, res) => {
        let products = await db.Product.findAll({
            include: [{ association: "collection" }]
        })
        res.render('product', { products })


    },

    // Detail - Detail from one product
    detail: (req, res) => {
        let product = db.Product.findByPk(req.params.id, {
            include: [{ association: "collection" }] 
        })
        let random = db.Product.findAll({ order: sequelize.literal('rand()'), limit: 4 })
        Promise.all([product, random])
            .then(function ([product, random]) {
                return res.render('detail', { product, random })
            })
    },

    search: async (req, res) => {
        const { findP } = req.query;
        products = await db.Product.findAll({
            where: {
                name: { [Op.like]: '%' + findP + '%' }
            }
        })
        res.render('product', { products })

    },

    create: (req, res) => {
        res.render("create");
    },

    // Create -  Method to store
    store: (req, res) => {
        const errors = validationResult(req)

        if (errors.errors.length > 0) {
            return res.render("create", { errors: errors.mapped() })
        }
        db.Product.create({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            image: req.file ? req.file.filename : "defaultPic.jpg",
            collection_id: req.body.collection_id,
        })
            .then(function () {
                return res.redirect("/")
            });
    },

    cart: (req, res) => {
        res.render("cart");
    },

    // Update - Form to edit
    edit: function (req, res) {
        let productToEdit = db.Product.findByPk(req.params.id, {
            include: [{ association: "collection" }]
        })
            .then(productToEdit => {
                res.render('edit', { productToEdit })
            });
    },

    // Update - Method to update
    update: (req, res) => {
        const errors = validationResult(req)

        if (errors.errors.length > 0) {
            db.Product.findByPk(req.params.id, {
                include: [{ association: "collection" }]
            }).then(productToEdit => {
                res.render('edit', { productToEdit, errors: errors.mapped() })
            });

        } else {
            db.Product.update({
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                image: req.file ? req.file.filename : "defaultPic.jpg",
                collection_id: req.body.collection_id
            }, {
                where: {
                    id: req.params.id
                }
            }).then(function () {
                return res.redirect('/');
            })
        }
    },

    // Delete - Delete one product from DB
    destroy: (req, res) => {
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







