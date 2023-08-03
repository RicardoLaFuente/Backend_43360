//const mongoose = require("mongoose")
import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();


const dbConnect = async () => {
    const RUTADB = process.env.RUTADB

    mongoose.set('strictQuery', false);

    mongoose.connect(
        RUTADB,
        (err) => {
            if (!err) {
                console.log("CONEXION EXITOSA")
            } else {
                console.log("ERROR DE CONEXION")
            }
        }
    )
}

export default  dbConnect ;

//module.exports = dbConnect;