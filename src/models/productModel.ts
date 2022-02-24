import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
})
// Tạo index để sử dụng chứ năng tìm kiếm ở phần features
productSchema.index({ title: 'text', price: 'text' })

const Products = mongoose.model('Products', productSchema)

Products.createIndexes({ title: 'text', price: 'text' })

export default Products