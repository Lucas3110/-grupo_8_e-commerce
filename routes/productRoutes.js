let express = require('express');
let router = express.Router();
const path = require('path');
const productController = require('../controllers/productController');
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/products'))
    },
    filename: (req, file, cb) => {
        const newFilename = 'imagen-' + Date.now() + path.extname(file.originalname);
        cb(null, newFilename);
    }
});

const upload = multer({ storage: storage });


router.get('/', productController.product);

router.get('/cart', authMiddleware, productController.cart);

router.get('/create', authMiddleware , productController.create);


/*** GET ONE PRODUCT ***/ 
router.get('/:id', productController.detail); 

/*** CREATE ONE PRODUCT ***/ 

router.post('/', upload.single('image'), productController.store);

/*** EDIT ONE PRODUCT ***/ 
router.get('/:id/edit2', authMiddleware, productController.edit); 
router.patch('/:id/edit2', productController.update); 
 

/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productController.destroy); 






module.exports = router;