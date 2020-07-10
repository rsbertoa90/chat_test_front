export default function Svc(socket, io) {
  
  return Object.freeze({

    joinRoom(room)
    {
      if (!io.sockets.adapter.rooms[room])
      { 
        socket.join(room);
        socket.in(room).on('disconnecting',function(){
          socket.broadcast.to(room).emit('isdisconnecting', {socket_id:socket.id,conversation_id:room});
          socket.broadcast.to('admins').emit('isdisconnecting', {socket_id:socket.id, conversation_id:room});
        })
      }
    }, 
    
    checkConversationsTaken(data){
      socket.broadcast.to('admins').emit('checkTaken',data);
    },


    sendNewMessage(data)
    {
      ///this.joinRoom(data.conversation_id)
      if(data.firstMessage){
        socket.broadcast.to('admins').emit('checkConversationInList', data.conversation_id);
      }
      socket.broadcast.to(data.conversation_id).emit('newMessage', data);
      socket.broadcast.to('admins').emit('newMessage', data);
    },

    iSawHisMessages(data)
    {
    
      socket.broadcast.to(data.conversation_id).emit('heSawMyMessages',data);
      socket.broadcast.to('admins').emit('heSawMyMessages',data);
    },
    
    imWriting(data)
    {
        socket.broadcast.to(data.conversation_id).emit('hesWriting',data);
        socket.broadcast.to('admins').emit('hesWriting',data);
    },
    
    joinConversation(data)
    {
      socket.broadcast.to(data.conversation_id).emit('someoneJoined',data);
      socket.broadcast.to('admins').emit('someoneJoined', data);
      
    },
    
    leaveConversation(data)
    {
      socket.broadcast.to(data.conversation_id).emit('someoneLeaved',data);
      socket.broadcast.to('admins').emit('someoneLeaved', data);
      
    },
    
    imInTheConversation(data)
    {
      socket.broadcast.to('admins').emit('hesInTheConversation', data);
    },
    
    updateConversation(data)
    {
      socket.broadcast.to(data.conversation_id).emit('conversationUpdated',data);
      socket.broadcast.to('admins').emit('conversationUpdated', data);
    } 
  })
}
