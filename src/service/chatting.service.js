import { Server } from "socket.io";
import { findUserById } from "./user.service";
import Chat from "../models/Chat";
import Message from "../models/Message";
import { createMessage } from "./message.service";
  
function initializeChat(server) {
    const io = new Server(server, {
      cors: {
        origin: '*',
      },
    });
  
  io.on("connection", async(socket) => {

    socket.on("new-user-add",async (userId) => {
    const user = await findUserById(userId);
    socket.broadcast.emit(
      'update',
      user.firstname + ' joined the conversation'
    );
    });
  
    socket.on("disconnect", (username) => {
        socket.broadcast.emit('update', username + ' left the conversation');
    });
  
    // send message to a specific user
    socket.on("send-message",async (data) => {
      const { senderId,receiverId,text } = data;

    try{
        const chat=await Chat.findOne({members:{$all:[senderId,receiverId]}})
        if(chat){
            const newMessage=await createMessage(chat._id,senderId,text)
            const messageData = {
                _id: newMessage._id,
                chatId: newMessage.chatId,
                senderId: newMessage.senderId,
                text: newMessage.text,
              };
              const receiver = await findUserById(receiverId);

              io.to(socket.id).emit("receive-message", messageData);
              io.to(receiver.socketId).emit("receive-message", messageData);
        }
    }
    catch(error){
        console.log(error.message)
    }
    });
  });
}
export { initializeChat };