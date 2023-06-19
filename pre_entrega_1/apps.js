import  express  from "express";
const port = 8080

import productRouter from "./src/routes/products.router.js";
import cartRouter from "./src/routes/carts.router.js"

const app = express();


app.use(express.json()); //para aceptar json
//app.use(express.urlencoded()); //para aceptar datos de un formulario HMTL
app.use(express.urlencoded({extended: true}));

app.use("/api/products", productRouter),
app.use("/api/carts", cartRouter),

app.listen(port , ()=>{console.log("Aplicacion funcionando")} )