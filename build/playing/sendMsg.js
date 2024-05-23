"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const eventName_1 = __importDefault(require("../constant/eventName"));
const chatController_1 = __importDefault(require("../controller/chatController"));
const groupController_1 = __importDefault(require("../controller/groupController"));
const eventEmitter_1 = require("../eventEmitter");
const logger_1 = require("../logger");
const sendMsg = (data, socket) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.info(' SEND_MSG event =', data);
    try {
        const chatObj = {
            sender: data.data.userId,
            receiver: data.data.receiver,
            msg: data.data.message
        };
        // logger.info('chat Object==',chatObj)
        let groupData = yield groupController_1.default.findOneGroup({ _id: data.data.receiver });
        // logger.info('groupData ====', groupData)
        if (groupData) {
            let allSender = yield groupController_1.default.leaveGroup({ sender: data.data.userId });
            // logger.info('all sender===', allSender)
            allSender.forEach((element) => __awaiter(void 0, void 0, void 0, function* () {
                yield socket.leave(element._id.toString());
            }));
            yield socket.join(chatObj.receiver);
            let groupSendMsg = yield chatController_1.default.groupChat(chatObj, socket.id);
            logger_1.logger.info('group send message===', groupSendMsg);
            if (!groupSendMsg) {
                data = {
                    eventName: eventName_1.default.SEND_MSG,
                    data: { message: 'data is not found' }
                };
                return (0, eventEmitter_1.sendToSocketEmitter)(socket.id, data);
            }
            data = {
                eventName: eventName_1.default.SEND_MSG,
                data: { groupchat: true, message: "Ok", groupSendMsg }
            };
            return (0, eventEmitter_1.sendToSocketEmitter)(chatObj.receiver, data);
        }
        else {
            let ChatData = yield chatController_1.default.chat(chatObj, socket.id);
            logger_1.logger.info('chatData ==', ChatData);
            if (!ChatData) {
                data = {
                    eventName: eventName_1.default.SEND_MSG,
                    data: {
                        message: "Data is not found"
                    }
                };
                return (0, eventEmitter_1.sendToSocketEmitter)(socket.id, data);
            }
            let chatData = ChatData.ChatData;
            data = {
                eventName: eventName_1.default.SEND_MSG,
                data: { chatData }
            };
            return (0, eventEmitter_1.sendToSocketEmitter)(ChatData.msgSocketId, data);
        }
    }
    catch (error) {
        logger_1.logger.info('send message event Error:', error);
    }
});
module.exports = sendMsg;
