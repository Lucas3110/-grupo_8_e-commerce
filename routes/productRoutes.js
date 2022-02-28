let express = require('express');

let router = express.Router();
const productController = require('../controllers/productController');


router.get('/cart', productController.cart);

//router.get('/productDetail', productController.productDetail);

/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', productController.detail); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productController.create);
router.patch('/', productController.store); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productController.edit); 
router.put('/edit/:id', productController.update); 

router.get('/list', productController.list);




module.exports = router;