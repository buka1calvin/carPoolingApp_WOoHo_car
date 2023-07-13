import Chat from "../models/Chat";
import { createChatService } from "../service/chat.service"

export const createChat=async(req,res)=>{
    const {senderId,receiverId}=req.body;
    const newChat=await createChatService(senderId,receiverId)
    try{
        res.status(200).json({chats:newChat})
    }
    catch(error){
        res.status(500).json(error.message)
    }
}

export const getChats=async(req,res)=>{
    try{
        const userId=req.params.userId
        const chats=await Chat.find({
            members:{$in:[userId]}
        })
        res.status(200).json({chats:chats})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}
export const findChat=async(req,res)=>{
    try{
    const {firstId,secondId}=req.params
    const chat=await Chat.findOne({
        members:{$all:[firstId,secondId]}
    })
    res.status(200).json({chat:chat})
}
catch(error){
    res.status(500).json({message:error.message})
}
}