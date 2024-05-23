import { Socket } from "socket.io"
import { logger } from "../logger"
import { io } from ".."

const sendToSocketEmitter = (socketId:any,data:any) =>{
    try {
        logger.info(`sendTosocketEmitter data ==== ${JSON.stringify(data)}  socketID:====${JSON.stringify(socketId)}`)

        io.to(socketId).emit(data.eventName,data)
        
    } catch (error) {
        logger.info('sendTosocketEmitter Error :::::',error)
    }
}
    
const sendToALLSocketEmitter = (socketId:Socket,data:any) =>{
    logger.info(`sendToALLSocketEmitter==== ${JSON.stringify(socketId)} data==========${JSON.stringify(data)}` );
    try {
        io.emit(data.eventName,data)
    }catch(error){
        logger.info('sendToALLSocketEmitter Error',error);
    }
}

export  {sendToSocketEmitter,sendToALLSocketEmitter}
   
    // sendToALLSocketEmitter
