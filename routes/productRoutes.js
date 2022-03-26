let express = require('express');

let router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require("../middlewares/authMiddleware");

router.get('/', productController.product);

router.get('/cart', authMiddleware, productController.cart);

router.get('/create', authMiddleware , productController.create);
//router.get('/productDetail', productController.productDetail);

/*** GET ONE PRODUCT ***/ 
router.get('/:id', productController.detail); 

/*** CREATE ONE PRODUCT ***/ 

router.post('/', productController.store);

/*** EDIT ONE PRODUCT ***/ 
router.get('/:id/edit2', authMiddleware, productController.edit); 
router.patch('/:id/edit2', productController.update); 
 

/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productController.destroy); 






module.exports = router;