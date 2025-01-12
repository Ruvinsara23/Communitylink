module.exports = (io) => {
    io.on('connection', (socket) => {
      console.log('A user connected:', socket.id);
  
   
      socket.on('joinRoom', (chatID) => {
        socket.join(chatID);
        console.log(`User joined room: ${chatID}`);
      });
  
     
      socket.on('sendMessage', (data) => {
        const { chatID, message } = data;
        io.to(chatID).emit('receiveMessage', message);
      });
  

      socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
      });
    });
  };
  