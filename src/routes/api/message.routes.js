import { Router } from "express"; 
import { addMessage,getMessages } from "../../controllers/messageChat.controller";

const router=Router()

router.post('/',addMessage)
router.get('/:chatId',getMessages)

export default router
