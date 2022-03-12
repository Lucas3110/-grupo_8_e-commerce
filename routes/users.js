let express = require('express');

let router = express.Router();
const usersController = require('../controllers/usersController');


router.get('/login', usersController.login);

/*** CREATE A USER ***/ 
router.get('/register', usersController.register);
router.post('/', usersController.store);




module.exports = router;