let express = require('express');
let router = express.Router();
const path = require('path');
const multer = require('multer');
const usersController = require('../controllers/usersController');
const { check } = require('express-validator');
const validator = require("../validator/validationForm");

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
router.post('/login', validator.login , usersController.processLogin);


/*** CREATE A USER ***/ 
router.get('/register', usersController.register);
router.post('/', upload.single('imagen'), validator.register ,usersController.processRegister);;

router.post("/logout", usersController.logout);

module.exports = router;