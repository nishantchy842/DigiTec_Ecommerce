const express = require('express')
const mongoose = require('mongoose')
const app = express()
const { Schema } = mongoose;
const PORT = 8000
const cors = require('cors')
const dotenv = require('dotenv')

//import all routes
const authRoute = require('./router/authRouter')
const createProduct = require('./router/productRouter')
const createCategory = require('./router/categoryRoute')

//configure env
dotenv.config();



app.use(express.json())
app.use(cors())
app.get('/', (req, res) => {
  res.send('initial setup')
})

const connectDb = async () => {
  try {
    const data = await mongoose.connect('mongodb://localhost:27017/DigiTec');
    if (data) console.log("connected to monngodb")
  } catch (err) {
    console.log("Db Connection error", err)
  }
}

connectDb()

//routes
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/product',createProduct)
app.use('/api/v1/category',createCategory)

app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});


app.listen(process.env.PORT, () => {
  console.log(`Server running is port: ${process.env.PORT}`)
})