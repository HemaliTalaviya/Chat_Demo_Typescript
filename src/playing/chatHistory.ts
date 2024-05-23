import { logger } from "../logger"

import EVENT_NAME from '../constant/eventName';
import chatController from '../controller/chatController'
import groupController from '../controller/groupController'
import { sendToSocketEmitter } from "../eventEmitter";

const chatHistory = async(data:any,socket:any) =>{
    // logger.info('chatHistory function ==',data,socket.id)
    try {
        let groupData = await groupController.findOneGroup({ _id: data.data.receiver })
        if (groupData) {
            let allSender:any = await groupController.leaveGroup(data.data)

            logger.info('all sender===', allSender)
             allSender.forEach(async(element:any)=> {
                await socket.leave(element._id.toString())
            });
           
            await socket.join(data.data.receiver)
          
           let Chat =  await chatController.findGroupChat({ receiver: data.data.receiver })
        //    logger.info('group chat receiver chat history ===',Chat)


           if(!Chat){
            data = {
                eventName : EVENT_NAME.CHAT_HIS,
                data:{message :'chat Data is not found'}
               }
               return sendToSocketEmitter(socket.id,data)
           }
           data = {
            eventName : EVENT_NAME.CHAT_HIS,
            data:{ groupchat: true, message: "Ok", Chat}
           }

           return sendToSocketEmitter(socket.id,data)


        } else {
           let chatHis:any =  await chatController.findChat({ receiverId: data.data.receiver, userId: socket.userId }, socket.id);
        //    logger.info('chat history data ===',chatHis)

           data = {
                eventName : EVENT_NAME.CHAT_HIS,
                data:{Chat:chatHis?.chatData}
           }
           return sendToSocketEmitter(chatHis?.socketIdArray,data)
        }

    } catch (error) {
        logger.info('chatHistory Error :::',error);
    }
}

export = chatHistory