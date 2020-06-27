export default function Svc(socket, io) {
  
  return Object.freeze({

    joinRoom(room)
    {
      if (!io.sockets.adapter.rooms[room])
      {
        socket.join(room);        
      }
    }, 
    
    sendNewMessage(data)
    {
      socket.broadcast.to(data.conversation_id).emit('newMessage', data);
    },

    iSawHisMessages(data)
    {
      socket.broadcast.to(data.conversation_id).emit('heSawMyMessages',data);
    }

  })
}
