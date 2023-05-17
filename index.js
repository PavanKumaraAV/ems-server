require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/router')
require('./db/connection')


const server = express() 
const PORT = process.env.PORT || 4000

server.use(cors())
server.use(express.json())
server.use("/uploads",express.static("./uploads"))
server.use(router)

server.get('/',(req,res)=>{
    res.send('Hello World') 
})

server.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})  