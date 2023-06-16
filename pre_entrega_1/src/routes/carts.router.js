import  Router  from "express";

import cartManager from "../manager/cartManager.js";
const cartMng = new cartManager("../pre_entrega_1/src/db/products.json")

const router = Router()

router.post("/", async(req,res)=>{
   // const body = req.body
    cartMng.addCart()
    res.send("Un carrito fue creado")
    
})

router.get("/:cid",(req,res)=>{
    const id = req.params.cid
    const cart = cartMng.getCartById(id)
    return res.status(200).json(cart)
})

router.post("/:cid/product/:pid", (req,res)=>{
    const cid = req.params.cid
    const pid = req.params.pid
    cartMng.addProductToCart(cid,pid)

    const cart =  cartMng.getCartById(cid);
		return res.status(200).json(cart);
})

router.delete("/:cid", (req,res)=>{
    const cid = req.params.cid
    const deleteCart = cartMng.deleteCart(cid)
    return res.status(200).send(deleteCart);

})
console.log(cartMng.getCart())

export default router