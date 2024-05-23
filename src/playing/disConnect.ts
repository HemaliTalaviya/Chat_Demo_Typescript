import { logger } from "../logger";
import  usercontroller from "../controller/userController";

const disConnect = async (socket:any) =>{
    try {
        
        await usercontroller.updateUser({ condition: { _id: socket.userId }, updateData: { $set: { socketId: "" } } })
    } catch (error) {
        logger.info('disconnect Error :',error)
    }
}

export {disConnect}