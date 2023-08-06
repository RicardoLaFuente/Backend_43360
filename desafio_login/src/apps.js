import express from "express";
import session from "express-session"
import mongoose from "mongoose";
import MongoStore from "connect-mongo";

import dotenv from "dotenv";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import viewRoutes from "./routes/views.routes.js";
import sessionRouter from "./routes/sessions.router.js";
import handlebars from "express-handlebars"
import dbConnect from "./mongo.js";
import __dirname from "./utils.js"


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080 ;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;
const RUTADB = process.env.RUTADB;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.use(session({
    store: MongoStore.create({
        mongoUrl:'mongodb+srv://ricardo:lafuente@cluster0.s0s53vt.mongodb.net/?retryWrites=true&w=majority',
        mongoOptions:{ useNewUrlParser:true, useUnifiedTopology:true},
        ttl:3600
    }),
    secret:"12345abcd",
    resave:false,
    saveUninitialized:false

}))

app.engine('handlebars',handlebars.engine())
app.set('views',__dirname+'/views')
app.set('view engine','handlebars')

app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/", viewRoutes);
app.use('/api/sessions',sessionRouter)



const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

server.on("error", (err) => {
  console.log("Error starting server: ", err);
});

dbConnect();