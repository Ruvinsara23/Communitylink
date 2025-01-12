const express = require('express');
const router = express.Router();
const  {createMessage, getMessagesByChatID, deleteMessage} = require('../../../controllers/message/message.contoller');

// Route to create a new message
router.post('/messages',createMessage);

// Route to get all messages by chat ID
router.get('/messages/:chatID',getMessagesByChatID);

// Route to delete a message by ID
router.delete('/messages/:messageID',deleteMessage);

module.exports = router;
