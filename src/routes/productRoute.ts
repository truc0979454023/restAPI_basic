import express from 'express'
import productCtrl from '../controllers/productController'
import { checkProductData } from '../middleware/validate'

const router = express.Router()

router.get('/products', productCtrl.getProducts)

router.get('/product/:id', productCtrl.getProductById)

router.post('/product', checkProductData, productCtrl.createProduct)

router.put('/product/:id', checkProductData, productCtrl.updateProduct)

router.delete('/product/:id', productCtrl.deleteProduct)

export default router