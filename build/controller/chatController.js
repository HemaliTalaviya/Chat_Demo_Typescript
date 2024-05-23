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
const __1 = require("..");
const logger_1 = require("../logger");
const mongoose_1 = __importDefault(require("mongoose"));
const { ObjectId } = require('mongodb');
const chatmodel_1 = __importDefault(require("../model/chatmodel"));
const usermodel_1 = __importDefault(require("../model/usermodel"));
module.exports = {
    /* CHAT MODEL */
    chat: (data, socketId) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            let ChatData = yield chatmodel_1.default.create(data);
            // logger.info('chat Data===', ChatData)
            let msgId = yield chatmodel_1.default.findById(ChatData._id).populate('sender  receiver');
            logger_1.logger.info('msg ID=', msgId);
            if (!msgId)
                return __1.io.to(socketId).emit('SEND_MSG', { message: 'Data is not found' });
            let msgSocketId = [(_a = msgId === null || msgId === void 0 ? void 0 : msgId.sender) === null || _a === void 0 ? void 0 : _a.socketId, (_b = msgId === null || msgId === void 0 ? void 0 : msgId.receiver) === null || _b === void 0 ? void 0 : _b.socketId];
            return data = { msgSocketId, ChatData };
        }
        catch (error) {
            logger_1.logger.info(error);
        }
    }),
    findChat: (data, socketId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // logger.info('find chat log===', data,socketId)
            let receiverId = new mongoose_1.default.Types.ObjectId(data.receiverId);
            let sendId = new mongoose_1.default.Types.ObjectId(data.userId);
            let chatData = yield chatmodel_1.default.find({ $or: [{ "receiver": receiverId, "sender": sendId }, { "sender": receiverId, "receiver": sendId }] });
            let userData = yield usermodel_1.default.find({ $or: [{ "_id": receiverId }, { "_id": sendId }] });
            if (chatData === 0)
                return __1.io.to(socketId).emit('CHAT_HIS', { message: 'Data is not found' });
            let socketIdArray = [];
            if (userData.length > 0) {
                userData.forEach((element) => {
                    socketIdArray.push(element.socketId);
                    //  io.to(element.socketId).emit('CHAT_HIS',{message:"Ok",chatData})
                });
            }
            return data = { socketIdArray, chatData };
        }
        catch (error) {
            logger_1.logger.info('find chat =', error);
        }
    }),
    groupChat: (data, socketId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // logger.info('groupChat controller chat===', data)
            let ChatData = yield chatmodel_1.default.create(data);
            return ChatData;
        }
        catch (error) {
            logger_1.logger.info(error);
        }
    }),
    findGroupChat: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // logger.info('findGroupChat ======', data)
            const chatData = yield chatmodel_1.default.find(data);
            // logger.info('chatdata ===', chatData)
            return chatData;
            // logger.info('user group data ===', groupData);
        }
        catch (error) {
            logger_1.logger.info(error);
        }
    })
};
