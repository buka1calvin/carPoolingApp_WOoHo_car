import { createMessage } from "../service/message.service";
import Message from "../models/Message";

export const addMessage=async(req,res)=>{
    const {ChatId}=req.params
    const {senderId,text}=req.body
    try{
        const NewMessage=await createMessage(ChatId,senderId,text)
        res.status(201).json({message:NewMessage})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

export const getMessages=async(req,res)=>{
    const {ChatId}=req.params;
    try{
    const getMessage=await Message.find({ChatId})
    res.status(200).json({messages:getMessage})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }

}
