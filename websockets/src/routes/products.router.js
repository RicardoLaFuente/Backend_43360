import  Router  from "express";

import productManager from "../manager/productManager.js";
const coderManager = new productManager("./src/db/products.json")

const router = Router();

router.get("/",async(req,res)=>{
    const products = await coderManager.getProducts()
    
    res.send({mensaje:"Objetos Devueltos", objetos:products})
})

router.get("/:id",(req,res)=>{
    const id = req.params.id
    const product = coderManager.getProductsById(id)
    res.send(product)
})

router.post("/",(req,res)=>{
    const body = req.body
    coderManager.addProduct(body)
    res.send("Un Objeto fue creado")
})

router.put("/:id",(req,res)=>{
    const id = req.params.id
    const body = req.body

    coderManager.updateProduct(id,body)

    const productActualizado = coderManager.getProductsById(id)
    res.send({mensaje:`Objeto ${id} Actualizado`, objeto:productActualizado})
})

router.delete("/:id",(req,res)=>{
    const id =req.params.id

    coderManager.deleteProduct(id)
    res.send(`El objeto ${id}, fue eliminado`)
})


export default router