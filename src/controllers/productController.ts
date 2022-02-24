import Products from "../models/productModel"
import { APIfeatures } from "../lib/features"

const productCtrl = {
    getProducts: async (req, res) => {
        try {
            const features = new APIfeatures(Products.find(), req.query)
                .paginating()
                .sorting()
                .searching()
                .filtering()

            const products = await features.query
            return res.status(200).json(products)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getProductById: async (req, res) => {
        try {
            const product = await Products.findById(req.params.id)
            if (!product) return res.status(404).json({ msg: "This product does not exist." })
            return res.status(200).json(product)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createProduct: async (req, res) => {
        try {
            const { title, image, description, category, price } = req.body;

            const newProduct = new Products({
                title, image, description, category, price
            })
            await newProduct.save()

            return res.status(200).json(newProduct)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { title, image, description, category, price } = req.body;

            // new: true giup tra ve gia tri moi nhat
            const product = await Products.findByIdAndUpdate(req.params.id, {
                title, image, description, category, price
            }, { new: true })
            if (!product) return res.status(400).json({ msg: 'This product does not exist.' })


            return res.status(200).json(product)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteProduct: async (req, res) => {
        try {

            // new: true giup tra ve gia tri moi nhat
            const product = await Products.findByIdAndDelete(req.params.id)
            if (!product) return res.status(400).json({ msg: 'This product does not exist.' })

            return res.status(200).json({ msg: "Deleted success." })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }

}

export default productCtrl