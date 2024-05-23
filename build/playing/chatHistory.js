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
const logger_1 = require("../logger");
const eventName_1 = __importDefault(require("../constant/eventName"));
const chatController_1 = __importDefault(require("../controller/chatController"));
const groupController_1 = __importDefault(require("../controller/groupController"));
const eventEmitter_1 = require("../eventEmitter");
const chatHistory = (data, socket) => __awaiter(void 0, void 0, void 0, function* () {
    // logger.info('chatHistory function ==',data,socket.id)
    try {
        let groupData = yield groupController_1.default.findOneGroup({ _id: data.data.receiver });
        if (groupData) {
            let allSender = yield groupController_1.default.leaveGroup(data.data);
            logger_1.logger.info('all sender===', allSender);
            allSender.forEach((element) => __awaiter(void 0, void 0, void 0, function* () {
                yield socket.leave(element._id.toString());
            }));
            yield socket.join(data.data.receiver);
            let Chat = yield chatController_1.default.findGroupChat({ receiver: data.data.receiver });
            //    logger.info('group chat receiver chat history ===',Chat)
            if (!Chat) {
                data = {
                    eventName: eventName_1.default.CHAT_HIS,
                    data: { message: 'chat Data is not found' }
                };
                return (0, eventEmitter_1.sendToSocketEmitter)(socket.id, data);
            }
            data = {
                eventName: eventName_1.default.CHAT_HIS,
                data: { groupchat: true, message: "Ok", Chat }
            };
            return (0, eventEmitter_1.sendToSocketEmitter)(socket.id, data);
        }
        else {
            let chatHis = yield chatController_1.default.findChat({ receiverId: data.data.receiver, userId: socket.userId }, socket.id);
            //    logger.info('chat history data ===',chatHis)
            data = {
                eventName: eventName_1.default.CHAT_HIS,
                data: { Chat: chatHis === null || chatHis === void 0 ? void 0 : chatHis.chatData }
            };
            return (0, eventEmitter_1.sendToSocketEmitter)(chatHis === null || chatHis === void 0 ? void 0 : chatHis.socketIdArray, data);
        }
    }
    catch (error) {
        logger_1.logger.info('chatHistory Error :::', error);
    }
});
module.exports = chatHistory;
