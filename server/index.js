const express = require('express')
const mongoose = require('mongoose')
const app = express()
const { Schema } = mongoose;
const PORT = 8000

app.get('/',(req,res)=>{
    res.send('initial setup')
})

const connectDb = async()=> {
    try{
      const data = await mongoose.connect('mongodb://localhost:27017/DigiTec');
      if(data) console.log("connected to monngodb")
    }catch(err){
      console.log("Db Connection error", err)
    }
  }
  
connectDb()
const userSchema = new Schema({
  Title: { type: String },
  Model: { type: String },
  Brand: { type: String },
  Price: { type: Number },
})
const Users = mongoose.model('Users', userSchema);

app.post('/item', async (req, res) => {
  try{
    const data =  await Users.create(req.body)
    console.log()
    if(data){
      res.send('User Registered Successfully')
    }else{
      res.send('Regsitration failed')
    }
  }catch(err){
    console.log("err"+err)
  }
}) 


app.listen(PORT,()=>{
console.log(`Server running is port: ${PORT}`)
})