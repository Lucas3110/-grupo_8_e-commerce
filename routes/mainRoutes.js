let express = require('express');

let router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.index);
router.get('/login', mainController.login);
router.get('/productCart', mainController.productCart);
router.get('/productDetail', mainController.productDetail);
router.get('/register', mainController.register);
router.get('/edit', mainController.edit);



module.exports = router;