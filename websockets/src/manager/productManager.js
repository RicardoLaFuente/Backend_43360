import fs from "fs";

class productManager {

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

    //Ver / Ver (ID) / Crear / Actualizar / Eliminar

    getProducts() {

        const products = this.readFile()
        return products

    }

    getProductsById(id) {
        const products = this.readFile()
        const product = products.find(product => +product.id === +id)

        return product
    }

    addProduct(product) {
        
        let productoAagregar = {
            title: product.title,
            description: product.description,
            price: product.price,
            thumbnail: product.thumbnail,
            code: product.code,
            stock: product.stock,
            id: this.generarID()
        };
        const products = this.readFile()
        
        let existe = products.find((p) => +p.code === +product.code);
        if (existe) {
            return console.log("El CODIGO  " + product.code + " Ya existe");
        }
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            return console.log("Falta llenar un campo")
        }

        else {
            
            products.push(productoAagregar);
            this.writeFile(products)
        }

    }

    deleteProduct(id) {

        const products = this.readFile()
        const productFilter = products.filter(product => +product.id !== +id)
        console.log(productFilter)
        this.writeFile(productFilter)

    }

    updateProduct(id, product) {

        const data = this.readFile()

        data.map(
            (element) => {
                if (+element.id === +id) {   
                        element.title = product.title || element.title,
                        element.description = product.description || element.description,
                        element.price = product.price || element.price,
                        element.thumbnail = product.thumbnail || element.thumbnail,
                        element.stock = product.stock || element.stock,
                        element.id = id
                }
            }
        )

        this.writeFile(data)
    }
}

export default productManager