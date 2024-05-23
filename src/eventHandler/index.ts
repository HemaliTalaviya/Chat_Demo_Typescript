import EVENT_NAME from "../constant/eventName";
import { logger } from "../logger";
import chatHistory from "../playing/chatHistory";
import deleteGroup from "../playing/deleteGroup";
import group from "../playing/group";
import groupList from "../playing/groupList";
import makeGroup from "../playing/makeGroup";
import search from "../playing/search";
import sendMsg from "../playing/sendMsg";
import setUserName from "../playing/setUser";
import userList from "../playing/userList";

const eventHandler = async(socket:any) =>{

    try {
        socket.onAny((eventName:String,data:any)=>{
            logger.info(`event name is ${eventName} ::: data ===${JSON.stringify(data)}`)
            switch (eventName) {
                case EVENT_NAME.SET_USER_NAME:
                    setUserName(data.data,socket)
                    break;

                case EVENT_NAME.USER_LIST:
                    userList(data,socket)
                    break;
            
                case EVENT_NAME.CHAT_HIS:
                    chatHistory(data,socket)
                    break;

                case EVENT_NAME.SEND_MSG:
                    sendMsg(data,socket)
                    break;

                case EVENT_NAME.SEARCH_ITEM:
                    search(data,socket)
                    break;
                    
                case EVENT_NAME.MAKE_GROUP:
                    makeGroup(data,socket)
                    break;

                case EVENT_NAME.GROUP:
                    group(data,socket)
                    break;

                case EVENT_NAME.GROUP_LIST:
                    groupList(data,socket)
                    break;

                case EVENT_NAME.DELETE_GROUP:
                    deleteGroup(data,socket)
                    break;

                default:
                    break;
            }
        })

    } catch (error) {
        logger.info(error)
    }
}

export {eventHandler}