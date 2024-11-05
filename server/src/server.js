const express = require('express');
const mongoose= require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

const app = express()
const PORT = process.env.PORT ||5000


mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log("mongoDB is connected"))
.catch((error)=>console.log(error));

app.listen(PORT,()=>{
    console.log(`Listning on : ${PORT}`)
});