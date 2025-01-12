const express = require('express');
const mongoose= require('mongoose');
const authRoutes = require("./routes/api/auth/auth.router");
const communityRouter = require("./routes/api/community/community.router")
const chatRouter = require("./routes/api/chat/chat.router")
const messageRouter = require("./routes/api/message/message.router")
const { MongoClient, ServerApiVersion } = require('mongodb');
const { Server } = require('socket.io');
const http = require('http');

require('dotenv').config()
const cors = require("cors");
const app = express()
const PORT = process.env.PORT ||5000
const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: "http://localhost:5174", 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true
  },
});

require('./socketHandlers')(io);


app.use(express.json());
app.use(cors({
    origin: "http://localhost:5174", 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true
  }));
  app.use('/api/chat',chatRouter)
  app.use('/api/auth', authRoutes);
  app.use('/api/community',communityRouter)
  app.use('/api/chat',messageRouter)

mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log("mongoDB is connected"))
.catch((error)=>console.log(error));

app.listen(PORT,()=>{
    console.log(`Listning on : ${PORT}`)
});