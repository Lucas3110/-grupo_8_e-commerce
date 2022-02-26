let express = require('express');

let router = express.Router();
const productController = require('../controllers/productController');


router.get('/productCart', productController.productCart);
router.get('/productDetail', productController.productDetail);
router.get('/edit', productController.edit);
router.get('/productos', productController.productos);
router.get('/create', productController.create);



module.exports = router;