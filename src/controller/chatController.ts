import { io } from "..";
import { logger } from "../logger";
import mongoose from "mongoose";

const { ObjectId } = require('mongodb');
import Chat from "../model/chatmodel"
import usermodel from "../model/usermodel";

export = {
    /* CHAT MODEL */

    chat: async (data:any, socketId:any) => {

        try {
           
            let ChatData = await Chat.create(data);
            // logger.info('chat Data===', ChatData)

            let msgId:any = await Chat.findById(ChatData._id).populate('sender  receiver');
            logger.info('msg ID=', msgId)
            if (!msgId) return io.to(socketId).emit('SEND_MSG', { message: 'Data is not found' })

            let msgSocketId:any = [msgId?.sender?.socketId,msgId?.receiver?.socketId]

            return data = { msgSocketId,ChatData}

        } catch (error) {
            logger.info(error);
        }
    },
    findChat: async (data:any,socketId:any) => {

        try {
            // logger.info('find chat log===', data,socketId)
            let receiverId = new mongoose.Types.ObjectId(data.receiverId)
            let sendId = new mongoose.Types.ObjectId(data.userId)

            let chatData:any = await Chat.find({ $or: [{ "receiver": receiverId, "sender": sendId }, { "sender": receiverId, "receiver": sendId }] });
            let userData:any = await usermodel.find({ $or: [{ "_id": receiverId},{ "_id": sendId }]})

            if(chatData === 0) return io.to(socketId).emit('CHAT_HIS',{message:'Data is not found'})

            let socketIdArray:any = [];
            if(userData.length > 0){
                userData.forEach((element:any) => {
                    socketIdArray.push(element.socketId)
                    //  io.to(element.socketId).emit('CHAT_HIS',{message:"Ok",chatData})
                });
            }

            return data = { socketIdArray,chatData}
        } catch (error) {
           logger.info('find chat =',error)
        }
    },
    groupChat: async (data:any, socketId:any) => {

        try {
            // logger.info('groupChat controller chat===', data)

            let ChatData = await Chat.create(data);
            return ChatData;
        } catch (error) {
            logger.info(error);
        }
    },

    findGroupChat: async (data:any) => {
        try {
            // logger.info('findGroupChat ======', data)
            const chatData = await Chat.find(data)
            // logger.info('chatdata ===', chatData)
            return chatData;
            // logger.info('user group data ===', groupData);

        } catch (error) {
            logger.info(error)
        }
    }
} 