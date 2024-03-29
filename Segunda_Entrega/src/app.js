import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import viewRoutes from "./routes/views.routes.js";
import { engine } from "express-handlebars";
import dbConnect from "./mongo.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3737;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;
const RUTADB = process.env.RUTADB;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/views", viewRoutes);

app.set("view engine", "ejs");
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

server.on("error", (err) => {
  console.log("Error starting server: ", err);
});

dbConnect();
