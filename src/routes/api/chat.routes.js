import { Router } from "express";
import { createChat,getChats,findChat } from "../../controllers/chat.controller";

const router=Router()

router.post('/',createChat)
router.get('/:userId',getChats)
router.get('/find/:firstId/:secondId',findChat)

export default router