let express = require('express');
let router = express.Router();
const path = require('path');
const productController = require('../controllers/productController');
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require('multer');
const { check } = require('express-validator'); //me parece que hay que borarrlo
const validator = require("../validator/validationForm");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/products'))
    },
    filename: (req, file, cb) => {
        const newFilename = 'imagen-' + Date.now() + path.extname(file.originalname);
        cb(null, newFilename);
    }
});

const upload = multer({ 
    storage: storage ,
    fileFilter: function(req, file, cb){
        const imagenesValidas = [".jpg", ".jpeg", ".png", ".gif", ".JPG", ".PNG", ".JPEG", ".GIF"]
        const extension = path.extname(file.originalname);
        const resultado = imagenesValidas.includes(extension)
        if(resultado == false){
            req.file = file;
        }
        cb(null, resultado)
    }
});

router.get('/', productController.product);

router.get('/search', productController.search);

router.get('/cart', authMiddleware, productController.cart);

router.get('/create', authMiddleware , productController.create);


/*** GET ONE PRODUCT ***/ 
router.get('/:id', productController.detail); 

/*** CREATE ONE PRODUCT ***/ 

router.post('/', upload.single('image'), validator.product, productController.store);

/*** EDIT ONE PRODUCT ***/ 
router.get('/:id/edit', authMiddleware, productController.edit); 
router.patch('/:id/edit', upload.single('image'), validator.product, productController.update); 
 //no sale el msg error en product edit img, aunque el error lo detecta y tira el e.preventDefault

/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productController.destroy); 






module.exports = router;