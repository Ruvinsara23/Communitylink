import { useState, useEffect } from 'react';
import MessageInput from '../messageInput/messageInput';
import axios from 'axios';

export function ChatScreen({ group, messages,handleSendMessage, onCreateGroup }) {

  // const handleSendMessage = async (message, file) => {
  //   // Ensure message or file is present before proceeding
  //   if (!message && !file) return;

  //   const newMessage = {
  //     chatID: '6780b95300ff81739896bb37', 
  //     senderID: "674bf3a07e5eb5e5968c12db", // This should be dynamically fetched from your user/auth state
  //     content: message || file.name || 'No content',
  //     file: file ? { url: 'path/to/file', name: file.name } : undefined, // Adjust as needed
  //     time: new Date().toISOString(),
  //   };
  
    
  //   onSendMessage(newMessage);
  //   console.log('Preparing to send message...',newMessage);
  // };


  if (!group) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-500">Select a group to start chatting</p>
      </div>
    );
  }
 
  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-white border-b p-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">{group.name}</h2>
       
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Array.isArray(messages) && messages.map((message) => (
          <div key={message.id} className={`flex items-start ${message.sender === 'You' ? 'justify-end' : ''}`}>
            {message.sender !== 'You' && (
              <img
                src={message.image}
                alt={message.sender}
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <div className={`flex ${message.senderID.name === 'Pansilu' ? 'justify-end' : 'justify-start'} mb-3`}>
            <div className={`max-w-md ${message.senderID.name === 'Pansilu' ? 'text-right' : 'text-left'}`}>
              <p className="font-semibold">{message.senderID.name || 'unknown sender'}</p>
              <div
                className={`p-3 rounded-xl ${
                  message.senderID.name === 'Pansilu'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200'
                }`}
              >
                <p>{message.content}</p>
                {message.file && (
                  <div className="mt-2">
                    <a
                      href={message.file.url}
                      download={message.file.name}
                      className="text-sm underline"
                    >
                      {message.file.name}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
                   
            {message.sender === 'You' && (
              <img
                src={message.image}
                alt={message.sender}
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
          </div>
        ))}
      </div>
      <MessageInput handleSendMessage={handleSendMessage} />

    </div>
  );
}
