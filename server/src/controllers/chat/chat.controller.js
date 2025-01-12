const Chat = require('../../models/chat/chat.model');
const Community = require('../../models/community/community.model');


exports.createChat = async (req, res) => {
    const { communityID, participants, isGroupChat, groupName, groupAvatar } = req.body;

    try {

       

        if (!communityID ) {
            return res.status(400).json({ message: "Community ID and participants are required." });
        }


        const community = await Community.findById(communityID).populate('members');;
        if (!community) {
           
            return res.status(404).json({ message: "Community not found." });
        }

       
        const participantIDs = community.members.map(member => member._id);
       
        if (participantIDs.length === 0) {
            
          return res.status(404).json({ message: "No members found in this community." });
        }

  
        if (isGroupChat && !groupName) {
            return res.status(400).json({ message: "Group name is required for group chats." });
        }

        const chat = new Chat({
            communityID,
            participants:participantIDs,
            isGroupChat,
            groupName: isGroupChat ? groupName : null,
            groupAvatar: isGroupChat ? groupAvatar : null,
        });

        // Save the chat
        const savedChat = await chat.save();

        console.log("Chat saved successfully:", savedChat);

        res.status(201).json({
            message: "Chat created successfully.",
            chat: savedChat,
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating chat.", error: error.message });
    }
};



exports.fetchChatsByCommunityId = async (req, res) => {
    try {
      const { communityId } = req.params;
  
      // Find chats for the community and populate messages
      const chats = await Chat.find({ communityID: communityId })
        .populate({
          path: 'messages',
          options: { sort: { createdAt: -1 }, limit: 1 }, // Fetch only the latest message
          populate: { path: 'senderID', select: 'name email' },
        })
        .populate('participants', 'name email');
  
      if (!chats || chats.length === 0) {
        return res.status(404).json({ success: false, message: 'No chats found for this community.' });
      }
  
      // Format chats for the frontend
      const formattedChats = chats.map(chat => ({
        id: chat._id,
        name: chat.isGroupChat ? chat.groupName : 'Private Chat',
        image: chat.isGroupChat ? chat.groupAvatar : '/placeholder.svg?height=40&width=40',
        lastMessage: chat.messages.length > 0
          ? {
              sender: chat.messages[0].senderID.name,
              content: chat.messages[0].content,
              time: new Date(chat.messages[0].createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            }
          : null,
      }));
  
      res.status(200).json({ success: true, chats: formattedChats });
    } catch (error) {
      console.error("Error fetching chats by community ID:", error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
  
  exports.fetchChatsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

       
        const chats = await Chat.find({ participants: userId })
            .populate({
                path: 'messages',
                populate: { path: 'sender', select: 'name email' }, // Populate sender details within messages
            })
            .populate('community', 'name'); // Optionally populate community details

        if (!chats || chats.length === 0) {
            return res.status(404).json({ message: 'No chats found for this user' });
        }

        res.status(200).json({ success: true, chats });
    } catch (error) {
        console.error("Error fetching chats by user ID:", error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
