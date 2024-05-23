import { logger } from "../logger";

import EVENT_NAME from '../constant/eventName';
import userController from '../controller/userController';
import  {sendToALLSocketEmitter} from  "../eventEmitter/index";


const userList = async(data:any,socket:any) =>{

    // logger.info('userlist function ====',data,socket.id)
    try {
        let userData = await userController.findAllData();
        // logger.info('userName Data==',userData)
        let users:any = [];
        userData.forEach((allData:any) => {
            users.push(allData);
        })
        data = {
            eventName : EVENT_NAME.USER_LIST,
            data:{
                users
            }
        }
    
        return sendToALLSocketEmitter(socket.id,data)
    } catch (error) {
        logger.info('userList Error:',error)
    }
       
}



export = userList