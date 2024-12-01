const express = require('express');
const mongoose= require('mongoose');
const authRoutes = require("./routes/api/auth/auth.router")
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

const app = express()
const PORT = process.env.PORT ||5000

app.use(express.json());

app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log("mongoDB is connected"))
.catch((error)=>console.log(error));

app.listen(PORT,()=>{
    console.log(`Listning on : ${PORT}`)
});