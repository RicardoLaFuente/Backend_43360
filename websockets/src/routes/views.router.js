import Router from "express";

import productManager from "../manager/productManager.js";
const viewManager = new productManager("./src/db/products.json")

const router = Router();


router.get("/", async (req,res)=>{
    const products = await viewManager.getProducts()
    res.render("home", {products});
})

router.get("/realTimeProducts", (req,res)=>{
    res.render("realTimeProducts");
})

export default router
