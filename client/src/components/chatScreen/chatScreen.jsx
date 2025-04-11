import MessageInput from '../messageInput/messageInput';

export function ChatScreen({ group, messages, handleSendMessage }) {
  if (!group) {
    return (
      <div className="flex-1  flex items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-500">Select a group to start chatting</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col w-full">
      <div className="bg-white border-b p-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">{group.name}</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Array.isArray(messages) && messages.map((message) => (
          <div key={message.id} className={`flex items-start ${message.sender === 'You' ? 'justify-end' : ''}`}>
            {message.senderID.name !== 'pansilu' && (
              <img
                src={message.image}
                alt={message.sender}
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <div className={`flex ${message.senderID.name === 'Pansilu' ? 'justify-end' : 'justify-start'} mb-3`}>
              <div className={`max-w-md ${message.senderID.name === 'You' ? 'text-right' : 'text-left'}`}>
                <p className="font-semibold">{message.senderID.name || 'Demo User'}</p>
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
            {message.senderID.name === 'You' && (
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
