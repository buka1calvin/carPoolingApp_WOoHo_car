import Chat from "../models/Chat";

export const createChatService = async (senderId,receiverId) => {
 const newChat = await Chat.create({
    members: [senderId, receiverId],
  });
  return newChat;
};
