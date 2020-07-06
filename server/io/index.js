export default function Svc(socket, io) {
  
  return Object.freeze({

    joinRoom(room)
    {
      if (!io.sockets.adapter.rooms[room])
      {
        socket.join(room);
        socket.in(room).on('disconnecting',function(){
          socket.broadcast.to(room).emit('isdisconnecting', {socket_id:socket.id,conversation_id:room});
        })
        /* consulto enseguida si alguien tiene la conversacion abierta */
        socket.broadcast.to(room).emit('checkTaken',room);
      }
    }, 
    
    sendNewMessage(data)
    {
      ///this.joinRoom(data.conversation_id)
      if(data.firstMessage){
        socket.broadcast.to('admins').emit('checkConversationInList', data.conversation_id);
      }
      socket.broadcast.to(data.conversation_id).emit('newMessage', data);
    },

    iSawHisMessages(data)
    {
     // this.joinRoom(data.conversation_id)
      socket.broadcast.to(data.conversation_id).emit('heSawMyMessages',data);
    },
    
    imWriting(data)
    {
      socket.broadcast.to(data.conversation_id).emit('hesWriting',data);
    },
    
    joinConversation(data)
    {
      socket.broadcast.to(data.conversation_id).emit('someoneJoined',data);
    },
    
    leaveConversation(data)
    {
      socket.broadcast.to(data.conversation_id).emit('someoneLeaved',data);
    },
    
    imInTheConversation(data)
    {
      socket.broadcast.to(data.conversation_id).emit('hesInTheConversation',data);
    },
    
    updateConversation(data)
    {
      socket.broadcast.to(data.conversation_id).emit('conversationUpdated',data);
    }

   
    
  })
}
