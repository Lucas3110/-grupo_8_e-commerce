const db = require('../database/models'); 



const apis = {
    productList: function (req, res) {
        db.Product.findAll({
            include: [{ association: "collection" }]
        }).then(products => {
            let newProduct = products.map(product => {
                return {
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    collection: product.collection,
                    detail: "/api/products/" + product.id
                }
            })
            let respuesta = {
                meta: {
                    status: 200,
                    count: products.length, //faltaria el countByCategory
                    url: "/api/products"
                    /*countByCategory: [
                        newProduct.collection
                    ]              */      
                },
                products: newProduct
            }
            res.json(respuesta)
        })
    },
    productDetail: function (req, res) {        
        db.Product.findByPk(req.params.id,{            
            include: [{ association: "collection" }]
        }).then(product => {   
            if(product.collection.name == "Genshin")
            {
                var imagen = "http://localhost:3000/images/" + product.image
            }
            if(product.collection.name == "Van-Gogh")
            {
                var imagen = "http://localhost:3000/images/" + product.image
            } 
            if(product.collection.name == "Punks")
            {
                var imagen = "http://localhost:3000/images/" + product.image
            } 
            if(product.collection.name == "Magic")
            {
                var imagen = "http://localhost:3000/images/" + product.image
            }          
            let jsonProducto = {
                meta: {
                    status: 200,
                    url: "/api/products/" + req.params.id
                },
                data: {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    image: imagen, //aca habria q poner URL img
                    collection: product.collection.name
                }
            }
            res.json(jsonProducto);
        })
    },

    //APIs USER

    userList: function (req, res) {
        db.User.findAll({
            include: [{ association: "category" }]
        }).then(users => {
            let newUser = users.map(user => {
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    detail: "http://localhost:3000/api/users/" + user.id,                    
                }
            })
            let respuesta = {
                meta: {
                    status: 200,
                    count: users.length, //faltaria el countByCategory
                    url: "/api/users"
                },
                users: newUser //chequear q dsp no haya conflicto por cambiarle el name "data"
            }
            res.json(respuesta)
        })
    },
    userDetail: function (req, res) {
        db.User.findByPk(req.params.id).then(user => {
            let jsonProducto = {
                meta: {
                    status: 200,
                    url: "/api/users/" + req.params.id
                },
                data: {
                    id: user.id,
                    name: user.name,
                    last_name: user.last_name,
                    email: user.email,
                    image: "http://localhost:3000/images/users/"+ user.image                   
                } 
            }
            res.json(jsonProducto);
        })
    },
}
module.exports = apis