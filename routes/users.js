let express = require('express');
let router = express.Router();
const path = require('path');
const multer = require('multer');
const usersController = require('../controllers/usersController');
const { check } = require('express-validator');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/users'))
    },
    filename: (req, file, cb) => {
        const newFilename = 'imagen-' + Date.now() + path.extname(file.originalname);
        cb(null, newFilename);
    }
});

const upload = multer({ storage: storage });



router.get('/', usersController.index);


/*** LOGIN USER ***/ 
router.get('/login', usersController.login);
router.post('/', [
    check('email').isEmail().withMessage('Email invalido'),
    check('contrasena').isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres'),
], usersController.processLogin);



/*** CREATE A USER ***/ 
router.get('/register', usersController.register);
router.post('/', upload.single('imagen') , usersController.store);



module.exports = router;