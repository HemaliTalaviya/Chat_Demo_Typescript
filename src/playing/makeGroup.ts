
import EVENT_NAME from "../constant/eventName";
import userController from "../controller/userController";
import { sendToSocketEmitter } from "../eventEmitter";
import { logger } from "../logger";


const makeGroup = async (data:any,socket:any) => {

    try {
        // logger.info('MAKE_GROUP==', data)
        const allUserData = await userController.findAllData();
        // logger.info('all user data make group ===', allUserData)

        if (!allUserData) {

            data = {
                eventName:EVENT_NAME.MAKE_GROUP,
                data:{
                     message: "Something wen't wrong !!!" 
                }
            }
            return sendToSocketEmitter(socket.id,data)
        }
        
        data = {
            
            eventName:EVENT_NAME.MAKE_GROUP,
            data:{message:"Ok",allUserData}
        }
        return sendToSocketEmitter(socket.id,data)
    } catch (error) {
        logger.info('make Group Error:', error);
    }
}

export = makeGroup