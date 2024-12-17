const express = require('express');
const mongoose= require('mongoose');
const authRoutes = require("./routes/api/auth/auth.router");
const communityRouter = require("./routes/api/community/community.router")
const { MongoClient, ServerApiVersion } = require('mongodb');
const multer = require("multer");


require('dotenv').config()
const cors = require("cors");

const app = express()
const PORT = process.env.PORT ||5000

app.use(express.json());


app.use(cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true
  }));
  app.use('/api/auth', authRoutes);
  app.use('/api/community',communityRouter)

mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log("mongoDB is connected"))
.catch((error)=>console.log(error));

app.listen(PORT,()=>{
    console.log(`Listning on : ${PORT}`)
});