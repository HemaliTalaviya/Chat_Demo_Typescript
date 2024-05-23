import EVENT_NAME from "../constant/eventName";
import userController from "../controller/userController";
import { sendToSocketEmitter } from "../eventEmitter";
import { logger } from "../logger";



const search = async (data:any, socket:any) => {

    // logger.info('search data ===', data);
    try {
        const users = await userController.searchUser(data.data.searchData);
        // logger.info('serach data =====', users)

        if (!users) {
            data = {
                eventName: EVENT_NAME.SEARCH_ITEM,
                data: 'search data is not found'
            }
            return sendToSocketEmitter(socket.id, data)
        } else {
            data = {
                eventName: EVENT_NAME.SEARCH_ITEM,
                data: { users }
            }
            return sendToSocketEmitter(socket.id, data)
        }


    } catch (error) {
        logger.info('search user Error :', error);
    }
}

export = search