const express = require("express");
const path = require("path");

const app = express();

const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath));

app.listen(3000, () => {
    console.log("Servidor corriendo");
});

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/home.html"))
})

/*
app.get("shopping-cart", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/shopping-cart.html"))
})
 -No puedo hacer que me mande a la pag del carrito | Lucas- */