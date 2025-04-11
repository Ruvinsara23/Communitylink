import React, { useState } from 'react';
import MessageInput from '@/components/messageInput/messageInput';

const Chat = () => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async (message, file) => {
    try {
      const formData = new FormData();
      formData.append('message', message);
      if (file) {
        formData.append('file', file);
      }

      const response = await fetch('http://localhost:8000/api/messages', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const newMessage = await response.json();
      setMessages([...messages, newMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      <MessageInput onSendMessage={handleSendMessage} />
      
    </div>
  );
};

export default Chat;
