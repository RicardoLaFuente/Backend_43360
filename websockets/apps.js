import express from "express";
const port = 8080;
import fs from "fs";

import productRouter from "./src/routes/products.router.js";
import cartRouter from "./src/routes/carts.router.js";
import viewsRouter from "./src/routes/views.router.js";

import handlebars from "express-handlebars";
import { Server } from "socket.io";

const app = express();


app.use(express.json()); //para aceptar json
//app.use(express.urlencoded()); //para aceptar datos de un formulario HMTL
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views","/views");
app.use(express.static("/public"));

app.use("/api/products", productRouter),
    app.use("/api/carts", cartRouter),
    app.use("/", viewsRouter);

const httpServer = app.listen(port, () => {
    console.log("Aplicacion funcionando")
});

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
    console.log("nuevo cliente");
    const productos = JSON.parse(
        fs.readFileSync("./src/db/products.json", "utf-8")
    );
    socket.emit("cargaDeProductos", productos);
    socket.on("productoNuevo", (products) => {
        let id =
            productsJson.length > 0
                ? productsJson[productsJson.length - 1].id + 1
                : 1;
        let objetoNuevo = { id, ...products };
        productos.push(objetoNuevo);

        fs.writeFileSync("./src/db/products.json", JSON.stringify(productos))

        socket.emit("cargaDeProductos", productos);
    })

    socket.on("idaEliminar", (id) => {
        let arrayVacio = [];
        let productos = JSON.parse(
            fs.readFileSync("./src/db/products.json", "utf-8"));
        productos.map((product) => {
            if (product.id !== id) arrayVacio.push(product)

        })
        fs.writeFileSync("./src/db/products.json", JSON.stringify(arrayVacio))
    })

    socket.emit('cargaDeProductos', productos);

});