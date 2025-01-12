import { useState,useEffect } from 'react'
import { ChatScreen } from '../components/chatScreen/chatScreen'
import { Sidebar } from '../components/sidebar/sidebar'


const initialGroups = [
  {
    id: '1',
    name: 'Team Alpha',
    image: '/placeholder.svg?height=40&width=40',
    lastMessage: {
      sender: 'Alice',
      content: 'Hey, when is our next meeting?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  },
  {
    id: '2',
    name: 'Project Beta',
    image: '/placeholder.svg?height=40&width=40',
    lastMessage: {
      sender: 'Bob',
      content: 'I\'ve updated the documentation',
      time: new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  },
]

const initialMessages = [
  {
    id: '1',
    content: 'Hello team!',
    sender: 'Alice',
    time: '10:00 AM',
    image: '/placeholder.svg?height=40&width=40'
  },
  {
    id: '2',
    content: 'Hi Alice, how are you?',
    sender: 'Bob',
    time: '10:05 AM',
    image: '/placeholder.svg?height=40&width=40'
  },
]

export default function ChatInterface() {
  const [groups, setGroups] = useState(initialGroups)
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [messages, setMessages] = useState(initialMessages);
  const [refreshGroups, setRefreshGroups] = useState(false);

  useEffect(() => {
    async function fetchGroups() {
      try {
        const response = await fetch('http://localhost:8000/api/chat/6780b95300ff81739896bb37');
        if (!response.ok) throw new Error('Failed to fetch groups');
        const data = await response.json();
        setGroups(data.chats); // Note: using data.chats instead of data
      } catch (error) {
        console.error('Error fetching groups:', error);
        setGroups([]); // Set empty array on error
      }
    }
  
    fetchGroups();
  }, [refreshGroups]);
  // Fetch messages for the selected group from the backend
  useEffect(() => {
    if (!selectedGroup) return

    async function fetchMessages() {
      try {
        const response = await fetch(`/api/groups/${selectedGroup.id}/messages`) // Replace with your backend endpoint
        if (!response.ok) throw new Error('Failed to fetch messages')
        const data = await response.json()
        setMessages(data)
      } catch (error) {
        console.error('Error fetching messages:', error)
      }
    }

    fetchMessages()
  }, [selectedGroup])

//   const handleSendMessage = async (content, file) => {
//     const newMessage = {
//       content,
//       sender: 'You',
//       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       file,
//     }

//     try {
//       const response = await fetch(`/api/groups/${selectedGroup.id}/messages`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newMessage),
//       })

//       if (!response.ok) throw new Error('Failed to send message')
//       const savedMessage = await response.json()

//       setMessages([...messages, savedMessage])

//       if (selectedGroup) {
//         const updatedGroups = groups.map(group =>
//           group.id === selectedGroup.id
//             ? {
//                 ...group,
//                 lastMessage: {
//                   sender: 'You',
//                   content: file ? `Sent a file: ${file.name}` : content,
//                   time: savedMessage.time,
//                 },
//               }
//             : group
//         )
//         setGroups(updatedGroups)
//       }
//     } catch (error) {
//       console.error('Error sending message:', error)
//     }
//   }



  const handleSendMessage = (content, file) => {
    const newMessage = {
      id: String(messages.length + 1),
      content,
      sender: 'You',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      image: '/placeholder.svg?height=40&width=40',
      file
    }
    setMessages([...messages, newMessage])

    if (selectedGroup) {
      const updatedGroups = groups.map(group => 
        group.id === selectedGroup.id 
          ? {
              ...group, 
              lastMessage: {
                sender: 'You',
                content: file ? `Sent a file: ${file.name}` : content,
                time: newMessage.time
              }
            }
          : group
      )
      setGroups(updatedGroups)
    }
  }

  const handleCreateGroup = (name) => {
    const newGroup = {
      id: String(groups.length + 1),
      name,
      image: '/placeholder.svg?height=40&width=40',
      lastMessage: {
        sender: 'System',
        content: 'Group created',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    }
    setRefreshGroups((prev) => !prev);
    setGroups([...groups, newGroup])
  }

  return (
    <div className="flex h-screen">
      <Sidebar 
        groups={groups} 
        onSelectGroup={setSelectedGroup} 
        onCreateGroup={handleCreateGroup}
      />
      <ChatScreen
        group={selectedGroup}
        messages={messages}
        onSendMessage={handleSendMessage}
      />
    </div>
  )
}