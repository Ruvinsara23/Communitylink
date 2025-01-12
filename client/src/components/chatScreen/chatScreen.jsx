import { useState, useEffect } from 'react';
import MessageInput from '../messageInput/messageInput';
import axios from 'axios';

export function ChatScreen({ groupId, onSendMessage }) {
  const [group, setGroup] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!groupId) return;

    const fetchGroupData = async () => {
      try {
        const response = await axios.get(`/api/chat/6780b95300ff81739896bb37`);
        const { group, messages } = response.data;
        setGroup(group);
        setMessages(messages);
      } catch (error) {
        console.error('Failed to fetch group data:', error);
      }
    };

    fetchGroupData();
  }, [groupId]);

  const handleSendMessage = async (content, file) => {
    try {
      const formData = new FormData();
      formData.append('content', content);
      if (file) {
        formData.append('file', file);
      }

    //   const response = await axios.post(`/api/groups/${groupId}/messages`, formData);
    //   setMessages((prevMessages) => [...prevMessages, response.data]);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  if (!group) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-500">Select a group to start chatting</p>
      </div>
    );
  }
 
  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-white border-b p-4">
        <h2 className="text-xl font-semibold">{group.name}</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
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
            <div className={`ml-3 ${message.sender === 'You' ? 'mr-3 order-first' : ''}`}>
              <p className="font-semibold">{message.sender}</p>
              <div className={`p-3 rounded-lg ${message.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                <p>{message.content}</p>
                {message.file && (
                  <div className="mt-2">
                    <a href={message.file.url} download={message.file.name} className="text-sm underline">
                      {message.file.name}
                    </a>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">{message.time}</p>
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
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}
