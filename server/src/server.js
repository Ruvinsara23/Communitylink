const express = require('express');
const mongoose= require('mongoose');
const authRoutes = require("./routes/api/auth/auth.router")
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const cors = require("cors");

const app = express()
const PORT = process.env.PORT ||5000

app.use(express.json());


app.use(cors({
    origin: "http://localhost:5173", // Replace with your frontend's URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true // If you need to send cookies or authentication headers
  }));
  app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log("mongoDB is connected"))
.catch((error)=>console.log(error));

app.listen(PORT,()=>{
    console.log(`Listning on : ${PORT}`)
});