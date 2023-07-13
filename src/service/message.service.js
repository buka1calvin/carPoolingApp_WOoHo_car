import { text } from "body-parser";
import Message from "../models/Message";

export const createMessage=async(chatId,senderId,text)=>{

    const newMessage=await Message.create({
        chatId,
        senderId,
        text
    })
    return newMessage
}