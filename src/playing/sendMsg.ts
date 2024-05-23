
import  EVENT_NAME  from "../constant/eventName";
import chatController from "../controller/chatController";
import groupController from "../controller/groupController";
import { sendToSocketEmitter } from "../eventEmitter";
import { logger } from "../logger";


const sendMsg = async (data:any,socket:any) => {
    logger.info(' SEND_MSG event =', data)
    try {

        const chatObj = {
            sender: data.data.userId,
            receiver: data.data.receiver,
            msg: data.data.message
        }

        // logger.info('chat Object==',chatObj)


        let groupData = await groupController.findOneGroup({ _id: data.data.receiver })
        // logger.info('groupData ====', groupData)

        if (groupData) {

            let allSender:any = await groupController.leaveGroup({ sender: data.data.userId })
            // logger.info('all sender===', allSender)
           

            allSender.forEach(async (element:any) => {
                await socket.leave(element._id.toString())
            });

            await socket.join(chatObj.receiver)
           let groupSendMsg =  await chatController.groupChat(chatObj, socket.id);
           logger.info('group send message===',groupSendMsg)

           if(!groupSendMsg) {
            data = {
                eventName : EVENT_NAME.SEND_MSG,
                data:{message:'data is not found'}
            }
            return sendToSocketEmitter(socket.id,data)
           }

             data = {
            eventName : EVENT_NAME.SEND_MSG,
            data : { groupchat: true, message: "Ok", groupSendMsg }

           }

           return sendToSocketEmitter(chatObj.receiver,data)

        } else {
            let ChatData:any = await chatController.chat(chatObj, socket.id);
            logger.info('chatData ==',ChatData)
            if (!ChatData) {

                data = {
                    eventName:EVENT_NAME.SEND_MSG,
                    data:{
                        message:"Data is not found"
                    }
                }
                return sendToSocketEmitter(socket.id,data)
            }
            let chatData = ChatData.ChatData
                data = {
                    eventName:EVENT_NAME.SEND_MSG,
                    data:{chatData}
                }
                return sendToSocketEmitter(ChatData.msgSocketId,data)
        }
    } catch (error) {
        logger.info('send message event Error:',error)
    }

}

export = sendMsg