const express = require("express");
const path = require("path");
let rutasMain = require('./routes/mainRoutes.js');

const app = express();

const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath));

app.listen(3000, () => {
    console.log("Servidor corriendo");
});

app.set('view engine', 'ejs');
app.use('/', rutasMain);



