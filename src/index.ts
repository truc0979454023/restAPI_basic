import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'

import routes from './routes'

// Tự động tải các biến môi trường từ file .env
dotenv.config()

const app = express()

// middlware
// các phần mềm trung gian

// cors() cho phép tất cả các tên miền truy cập vào server để lấy api 
app.use(cors())

app.use(morgan('dev'))
// sẽ chuyển dữ liệu api thành json 
app.use(express.json())
// nhận tất cả các kiểu dữ liệu html ví dụ <form action='api'></form>
app.use(express.urlencoded())

// Database
const URL = process.env.MONGODB_URL
mongoose.connect(URL, {
    autoIndex: false
}, (err) => {
    if (err) throw err
    console.log('MongoDB connection.')
})

// Routes
app.use('/api', routes)

// Start server listening
const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Express is listening on port ${port}`)
})