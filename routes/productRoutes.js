let express = require('express');

let router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.product);

router.get('/cart', productController.cart);

router.get('/create', productController.create);
//router.get('/productDetail', productController.productDetail);

/*** GET ONE PRODUCT ***/ 
router.get('/:id', productController.detail); 

/*** CREATE ONE PRODUCT ***/ 

router.post('/', productController.store);

/*** EDIT ONE PRODUCT ***/ 
router.get('/:id/edit', productController.edit); 
router.patch('/:id/edit', productController.update); 
 

/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productController.destroy); 






module.exports = router;