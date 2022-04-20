let express = require('express');
let router = express.Router();
const path = require('path');
const multer = require('multer');
const usersController = require('../controllers/usersController');
const { check } = require('express-validator');
const validator = require("../validator/validationForm");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

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
router.get('/login', guestMiddleware, usersController.login);
router.post('/login', validator.login , usersController.processLogin);


/*** CREATE A USER ***/ 
router.get('/register', guestMiddleware, usersController.register);
router.post('/', upload.single('image'), validator.register , usersController.processRegister);

/*** PROFILE PAGE ***/ 
router.get('/profile', authMiddleware , usersController.profile);

/*** EDIT PAGE ***/ 
router.get('/:id/userEdit', authMiddleware , usersController.edit); 
router.patch('/:id/userEdit', validator.register, usersController.update); 

router.post("/logout", usersController.logout);

module.exports = router;