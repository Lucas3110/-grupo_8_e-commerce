let express = require('express');

let router = express.Router();
const productController = require('../controllers/productController');


router.get('/cart', productController.cart);

//router.get('/productDetail', productController.productDetail);

/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', productController.detail); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productController.create);
router.post('/', productController.store); 


router.get('/edit', productController.edit);

router.get('/list', productController.list);




module.exports = router;