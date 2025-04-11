const Message = require('../../models/message/message.model'); 
const Chat = require('../../models/chat/chat.model'); 

// Create a new message

exports.createMessage = async (req, res) => {
    try {
      const { chatID, senderID, content } = req.body;
  
   
      if (!chatID || !senderID || !content) {
        return res.status(400).json({ 
          success: false, 
          message: 'Missing required fields' 
        });
      }
  
      // Create new message
      const newMessage = new Message({
        chatID,
        senderID,
        content
      });
  
      const savedMessage = await newMessage.save();
  
      // Send single response with saved message
      return res.status(200).json({
        success: true,
        message: 'Message created successfully',
        data: savedMessage
      });
  
    } catch (error) {
      console.error('Error creating message:', error);
      // Send single error response
      return res.status(500).json({
        success: false,
        message: 'Error creating message',
        error: error.message
      });
    }
  };
// Fetch messages by chat ID
exports.getMessagesByChatID = async (req, res) => {
    try {
        const { chatID } = req.params;

        if (!chatID) {
            return res.status(400).json({ message: 'chatID is required.' });
        }

        const messages = await Message.find({ chatID }).populate('senderID', 'name email');

        if (!messages || messages.length === 0) {
            return res.status(404).json({ message: 'No messages found for this chat.' });
        }

        res.status(200).json({
            success: true,
            messages,
        });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Delete a message by ID
exports.deleteMessage = async (req, res) => {
    try {
        const { messageID } = req.params;

        if (!messageID) {
            return res.status(400).json({ message: 'Message ID is required.' });
        }

        const deletedMessage = await Message.findByIdAndDelete(messageID);

        if (!deletedMessage) {
            return res.status(404).json({ message: 'Message not found.' });
        }

        res.status(200).json({
            success: true,
            message: 'Message deleted successfully',
            data: deletedMessage,
        });
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
