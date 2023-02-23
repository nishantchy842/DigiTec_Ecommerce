const express = require('express')
const mongoose = require('mongoose')
const app = express()
const { Schema } = mongoose;
const PORT = 8000
const cors = require('cors')

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
const userSchema = new Schema({
  title:{type:String},
  price: {type:Number},
  Quntity: {type:Number},
  brand: {type:String},
  model: {type:String},
  categories: {type:String},
  description: {type:String}
})
const Users = mongoose.model('Users', userSchema);

app.post('/item', async (req, res) => {
  try {
    const data = await Users.create(req.body)
    console.log(data)
    if (data) {
      res.send('User Registered Successfully')
    } else {
      res.send('Regsitration failed')
    }
  } catch (err) {
    console.log("err" + err)
  }
})


app.listen(PORT, () => {
  console.log(`Server running is port: ${PORT}`)
})