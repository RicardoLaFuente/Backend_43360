import fs from "fs";
//import carts from "../../../primerosDesafios/prueba";

class cartManager {

    constructor(path) {
        this.pat = path
        //this.carts = []
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

    /*getCart() {
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
    }*/
    getCart() {
        carts = this.readFile()
        console.log(carts)
        return carts
    }

    getCartById(id) {
        const carts = this.readFile()
        const cart = carts.find(cart => +cart.id === +id)

        return cart
    }

    /*addCart() {
        
        try {
            const carts = this.getCart();
            const id = this.generarID();
            const newCart = {
                id: id,
                products: []
            };

            // Agregar carrito y escribir el archivo:
            carts.push(newCart);
            this.writeFile(carts);
            return `Cart added with ID ${id}`;
        } catch (err) {
            return `Writing error while adding the cart: ${err}`;
        };
    }*/
    addCart() {
        carts = this.getCart()
        //const products = []
        idGenerado = this.generarID()
        const newCart = {
            id: idGenerado,
            products:[]
        }
        carts.push(newCart)
        this.writeFile(carts)
    }

    addProductToCart (cartId, productId) {
        try {
			const carts = this.getCart();
			const cart = carts.find(cart => +cart.id === +cartId);
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
            this.writeFile(carts);
			return `Product ${productId} added to cart ${cartId}`;
		} catch (err) {
			return `Writing error while adding the product ${productId} to cart ${cartId}: ${err}`;
		};
    }

    deleteCart(id) {
		try {
			const carts = this.getCart();
			const cart = carts.find(cart => +cart.id === +id);

			// Validar ID:
			if (!cart) {
				return `There's no cart with ID ${id}`;
			};

			// Si es correcto, borrar carrito y escribir el archivo:
			cart.products = [];
			this.writeFile(carts);
			return `Cart ${id} deleted`;
		} catch (err) {
			return `Writing error while deleting the cart ${id}: ${err}`;
		};
	};


}
console.log("hola")

export default cartManager