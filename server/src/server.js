const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require("./routes/api/auth/auth.router");
const communityRouter = require("./routes/api/community/community.router");
const chatRouter = require("./routes/api/chat/chat.router");
const messageRouter = require("./routes/api/message/message.router");
const eventRouter = require('./routes/api/event/event.router');
const pollRouter = require('./routes/api/poll/poll.router');
const WebSocket = require('ws');
require('dotenv').config();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// Attach REST API routes
app.use('/api/event',eventRouter)
app.use('/api/chat', chatRouter);
app.use('/api/auth', authRoutes);
app.use('/api/community', communityRouter);
app.use('/api/chat', messageRouter);
app.use('/api/poll', pollRouter);

// Start HTTP server
const server = app.listen(PORT, () => {
    console.log(`Listening on : ${PORT}`);
});

// WebSocket Server
const wss = new WebSocket.Server({ server });

let clients = new Map();

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (data) => {
        try {
            const message = JSON.parse(data);

            switch (message.type) {
                case 'joinChat':
                    // Associate the client with a chat room
                    const { chatID } = message;
                    if (!clients.has(chatID)) {
                        clients.set(chatID, []);
                    }
                    clients.get(chatID).push(ws);
                    console.log(`Client joined chat room: ${chatID}`);
                    break;

                case 'sendMessage':
                    // Broadcast the message to all clients in the chat room
                    const { chatID: roomID, content, senderID } = message;
                    const payload = {
                        type: 'newMessage',
                        chatID: roomID,
                        content,
                        senderID,
                        timestamp: new Date().toISOString(),
                    };

                    if (clients.has(roomID)) {
                        clients.get(roomID).forEach(client => {
                            if (client.readyState === WebSocket.OPEN) {
                                client.send(JSON.stringify(payload));
                            }
                        });
                        console.log(`Message sent to chat room: ${roomID}`, payload);
                    }
                    break;

                default:
                    console.log('Unknown message type:', message.type);
            }
        } catch (error) {
            console.error('Error handling WebSocket message:', error.message);
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
        // Remove the disconnected client from all chat rooms
        clients.forEach((clientsList, chatID) => {
            clients.set(chatID, clientsList.filter(client => client !== ws));
        });
    });
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB is connected"))
    .catch((error) => console.error('MongoDB connection error:', error));
