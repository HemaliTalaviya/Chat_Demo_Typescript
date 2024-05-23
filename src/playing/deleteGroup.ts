import EVENT_NAME from "../constant/eventName";
import groupController from "../controller/groupController";
import { sendToALLSocketEmitter, sendToSocketEmitter } from "../eventEmitter";
import { logger } from "../logger";

const deleteGroup = async(data:any,socket:any) => {

    try {
        // logger.info('delete group event===',data.data.groupId);
        if(!data.data.groupId){
            data ={
                eventName : EVENT_NAME.DELETE_GROUP,
                data:{message:'Id is not found'}
            }
            return sendToSocketEmitter(socket.id,data)
        }
        let group = await groupController.deleteGroup(data.data.groupId);
        // logger.info('delete group==',group)
        data = {
            eventName:EVENT_NAME.DELETE_GROUP,
            data :{group}
        }
        return sendToALLSocketEmitter(socket.id,data)


    } catch (error) {
        logger.info('delete Group ===',error);
    }
}


export = deleteGroup