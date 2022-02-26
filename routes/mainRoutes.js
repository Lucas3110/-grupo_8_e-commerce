let express = require('express');

let router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.index);




module.exports = router;