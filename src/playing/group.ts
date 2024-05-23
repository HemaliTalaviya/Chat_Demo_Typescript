import EVENT_NAME from "../constant/eventName";
import groupController from "../controller/groupController";
import { sendToSocketEmitter } from "../eventEmitter";
import { logger } from "../logger";
import Group from "../model/groupmodel";



const group = async (data:any, socket:any) => {

    try {
        // logger.info('Group Event ====', data)

        let groupData :any = {
            name: data.data.group_name,
            adminId: data.data.userId,
            members: data.data.selectedUser
        }


        let existingGroup = await Group.findOne({ name: data.data.group_name });
        // logger.info('find group =',existingGroup)
        if (existingGroup) {
            data = {
                eventName: EVENT_NAME.GROUP,
                data: {
                    message: 'please enter group name unique'
                }
            }
            return sendToSocketEmitter(socket.id, data)
        }

        let group = await groupController.createGroup(groupData, socket.id);
        // logger.info('groupdata index file==', groupData)
        groupData = await groupController.findGroup(group);
        // logger.info('groupData ===',groupData)
        if(!groupData){
            data = {
                eventName:EVENT_NAME.GROUP,
                data:{
                    message :'Group data is not found'
                }
            }
            return sendToSocketEmitter(socket.id,data)
        }
        let groupAllData = groupData. groupData
        data = {
            eventName:EVENT_NAME.GROUP,
            data:{groupAllData}
        }
         return sendToSocketEmitter(groupData.socketIdArray,data)


    } catch (error) {
        logger.info('group create Error :', error)
    }
}

export = group