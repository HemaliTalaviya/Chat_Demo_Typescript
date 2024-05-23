import EVENT_NAME from "../constant/eventName";
import groupController from "../controller/groupController";
import { sendToSocketEmitter } from "../eventEmitter";
import { logger } from "../logger";

const groupList = async(data:any,socket:any) =>{
    try {
        // logger.info('groupList event===',data)
        let allGroup = await groupController.findAllGroup(data.data.userId);
        // logger.info('group=====',allGroup);

        if(!allGroup){
            data ={
                eventName:EVENT_NAME.GROUP_LIST,
                data:{message:'group data is not found'}
            }
            return sendToSocketEmitter(socket.id,data)
        }
        data = {
            eventName:EVENT_NAME.GROUP_LIST,
            data:{allGroup}
        }
        return sendToSocketEmitter(socket.id,data)

        
    } catch (error) {
        logger.info('groupList Error::',error)
    }
}

export = groupList;