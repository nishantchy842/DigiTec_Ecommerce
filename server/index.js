const express = require('express')
const app = express()
const PORT = 8000

app.get('/',(req,res)=>{
    res.send('initial setup')
})

app.listen(PORT,()=>{
console.log(`Server running is port: ${PORT}`)
})