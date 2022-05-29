var express = require('express');
var router = express.Router();
const apiController= require("../controllers/apiController");
const app = express();

const cors = require('cors');


app.use(cors());


router.get('/users', apiController.userList);
router.get("/users/:id" , apiController.userDetail);
router.get('/products', apiController.productList);
router.get("/products/:id", apiController.productDetail);
router.get("/collections", apiController.collectionTotal);


module.exports = router;