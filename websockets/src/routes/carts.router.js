import  Router  from "express";

import cartManager from "../manager/cartManager.js";
const cartMng = new cartManager("./src/db/carts.json")

const router = Router()

router.post("/", async(req,res)=>{
    cartMng.addCart()
    return res.status(200).send("carrito creado")
    
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
		return res.status(200).send(cart);
})

router.delete("/:cid", (req,res)=>{
    const cid = req.params.cid
    const deleteCart = cartMng.deleteCart(cid)
    return res.status(200).send(deleteCart);

})

export default router