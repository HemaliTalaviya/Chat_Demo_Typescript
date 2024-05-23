import { Socket } from "socket.io"

import userController from "../controller/userController"
import  EVENT_NAME  from "../constant/eventName";
import { logger } from "../logger";

const {sendToSocketEmitter} = require("../eventEmitter")

const setUserName = async (data:any,socket:any) =>{

    // logger.info(`set user name event ===${JSON.stringify(data)}  socket id:::====${socket.id}`)
    try {
        
        let {name} = data
        // logger.info('userData name====',name)
        if(!name){
            data = {
                eventName :EVENT_NAME.SET_USER_NAME,
                data:{
                    message:"please enter valid name"
                },
                
            }
           return sendToSocketEmitter(socket.id,data) 
        }

        let userData = {
            name: name,
            socketId: socket.id
        }

        let dataOfUser:any= await userController.createUSer(userData)
        // logger.info('userData id====',userData)
            socket.userId = dataOfUser?._id.toString()
        
        data = {
            eventName:EVENT_NAME.SET_USER_NAME,
            data:{userId :socket.userId}
            
        }

        return sendToSocketEmitter(socket.id,data)
        
    } catch (error) {
        logger.info('set user name event =',error)
    }
}

export = setUserName