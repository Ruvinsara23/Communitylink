import { useState, useEffect,useContext } from 'react';
import { ChatScreen } from '../components/chatScreen/chatScreen';
import { Sidebar } from '../components/sidebar/sidebar';
import axios from 'axios';
import { useCommunity } from '../context/community.context';
import { useUser } from '../context/user.context';



export default function ChatInterface() {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [messages, setMessages] = useState([]);
  const [refreshGroups, setRefreshGroups] = useState(false);
  const [socket, setSocket] = useState(null);

 const {
    communityId
 } = useCommunity();

 const {
    currentUser
 }=useUser();

  useEffect(() => {
    
    const ws = new WebSocket('ws://localhost:8000');
    setSocket(ws);

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => ws.close();
  }, []);

  useEffect(() => {
    if (socket && selectedGroup) {
      const joinMessage = JSON.stringify({
        event: 'joinChat',
        data: { chatID: selectedGroup.id },
      });
      socket.send(joinMessage);
    }
  }, [selectedGroup, socket]);



  useEffect(() => {
    async function fetchGroups(communityId) {
      try {
        const response = await fetch(`http://localhost:8000/api/chat/6798836edab2a02f8899e7ba`);
        if (!response.ok) throw new Error('Failed to fetch groups');
        const data = await response.json();
        setGroups(data.chats);
      } catch (error) {
        console.error('Error fetching groups:', error);
        setGroups([]); 
      }
    }

    fetchGroups(communityId);
  }, [refreshGroups,communityId]);


  useEffect(() => {
    if (!selectedGroup) return;

    async function fetchMessages() {
      try {
        const response = await fetch(`http://localhost:8000/api/chat/messages/6798836edab2a02f8899e7ba`);
        console.log(response);
        if (!response.ok) throw new Error('Failed to fetch groups');
        const data = await response.json();
        console.log(data);
        setMessages(data.messages || []);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }

    fetchMessages();

    const handleNewMessage =(event) => {
      const message = JSON.parse(event.data);
      if (message.chatID === selectedGroup.id) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };

    if (socket) {
      socket.onmessage = handleNewMessage;
    }

    return () => {
      if (socket) socket.onmessage = null;
    };


  }, [selectedGroup,socket]);

  
  const handleSendMessage = async (content, file) => {
    if (!socket || !selectedGroup) return;

    try {
      const newMessage = {
        content,
        senderID:currentUser._id,
        chatID: '678355d4649ed6ac61aa15c0',
        type: 'sendMessage',
      };

      socket.send(JSON.stringify(newMessage));
//backend url ek dapan
      const response = await axios.post('http://localhost:8000/api/chat/messages', newMessage, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response data:hfhf', response.data);

      const updatedMessages = [...messages, response.data.data];
      setMessages(updatedMessages);

      const updatedGroups = groups.map((group) =>
        group.id === selectedGroup.id
          ? {
              ...group,
              lastMessage: {
                sender: 'You',//sender Id ek dapan
                content: file ? `Sent a file: ${file.name}` : content,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              },
            }
          : group
      );
      setGroups(updatedGroups);
    } catch (error) {
      console.error('Error sending message:', error.response || error.message);
    }
  };

  const handleCreateGroup = (name) => {
    const newGroup = {
      id: String(groups.length + 1),
      name,
      image: '/placeholder.svg?height=40&width=40',
      lastMessage: {
        sender: 'System',
        content: 'Group created',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    };
    setRefreshGroups((prev) => !prev);
    setGroups([...groups, newGroup]);
  };

  return (
    <div className="flex h-screen">
      <Sidebar groups={groups} setSelectedGroup={setSelectedGroup} onCreateGroup={handleCreateGroup} />
      <ChatScreen group={selectedGroup} messages={messages} handleSendMessage={handleSendMessage} />
    </div>
  );
}
