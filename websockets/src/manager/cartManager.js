import fs from "fs";
import productManager from "./productManager.js";

const coderManager = new productManager("../pre_entrega_1/src/db/products.json")

class cartManager {

    constructor(path) {
        this.path = path
    }

    //FileSystem

    writeFile(data) {
        fs.writeFileSync(`${this.path}`, JSON.stringify(data))
    }

    readFile() {
        const data = fs.readFileSync(`${this.path}`, "utf-8")
        return JSON.parse(data)
    }

    //Funcion generadora de IDs

    generarID() {

        const productos = this.readFile()

        const ultimoID = productos.pop()

        if (ultimoID) { return ultimoID.id + 1 } else { return 1 }

    }

    getCart() {
        // Validar si existe el archivo:
        if (!fs.existsSync(this.path)) {
            try {
                // Si no existe, crearlo:
                fs.writeFileSync(this.path, JSON.stringify(this.carts));
            } catch (err) {
                return `Writing error while getting carts: ${err}`;
            };
        };

        // Leer archivo y convertirlo en objeto:
        try {
            const data = fs.readFileSync(this.path, "utf8");
            const dataArray = JSON.parse(data);
            return dataArray;
        } catch (err) {
            return `Reading error while getting carts: ${err}`;
        };
    }
 
    getCartById(id) {
        const carts = this.readFile()
        const cart = carts.find(cart => +cart.id === +id)
        if (!cart) {
            return `There's no cart with ID ${id}`;
        }

        return cart
    }

    addCart() {
        const carts = this.getCart()
        const idGenerado = this.generarID()
        const newCart = {
            id: idGenerado,
            products: []
        }
        carts.push(newCart)
        this.writeFile(carts)
    }

    addProductToCart(cartId, productId) {
        try {
            const carts = this.getCart();
            const cart = carts.find(cart => +cart.id === +cartId);

            // Validar Cart:
            if (!cart) {
                return `There's no cart with ID ${id}`;
            } else {
    
                const prods = coderManager.getProducts();
                const valProd = prods.find(vP => +vP.id === +productId);
                //validar Product:
                if (!valProd) {
                    console.log(valProd)
                    return `There's no product with ID ${productId}`;
                    
                } else {
                    const product = cart.products.find(product => +product.product === +productId);         
                        // Validar si el producto ya está agregado:
                        if (product) {
                            product.quantity += 1;
                        } else {
                            // Si no, agregarlo:
                            const newProduct = {
                                product: productId,
                                quantity: 1,
                            };
                            cart.products.push(newProduct);
                        };
                    }
                }
            

            this.writeFile(carts);
            return `Product ${productId} added to cart ${cartId}`;
        } catch (err) {
            return `Writing error while adding the product ${productId} to cart ${cartId}: ${err}`;
        };
    }

    deleteCart(id) {
        try {
            const carts = this.readFile();
            const cart = carts.find(cart => +cart.id === +id);

            // Validar ID:
            if (!cart) {
                return `There's no cart with ID ${id}`;
            };

            // Si es correcto, borrar carrito y escribir el archivo:
            const cartFiltrado = carts.filter(cart => +cart.id != +id)
            this.writeFile(cartFiltrado)
            return `Cart ${id} deleted`;
        } catch (err) {
            return `Writing error while deleting the cart ${id}: ${err}`;
        };
    }


}
console.log("hola desde cartManager")

export default cartManager