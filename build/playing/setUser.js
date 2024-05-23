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
const userController_1 = __importDefault(require("../controller/userController"));
const eventName_1 = __importDefault(require("../constant/eventName"));
const logger_1 = require("../logger");
const { sendToSocketEmitter } = require("../eventEmitter");
const setUserName = (data, socket) => __awaiter(void 0, void 0, void 0, function* () {
    // logger.info(`set user name event ===${JSON.stringify(data)}  socket id:::====${socket.id}`)
    try {
        let { name } = data;
        // logger.info('userData name====',name)
        if (!name) {
            data = {
                eventName: eventName_1.default.SET_USER_NAME,
                data: {
                    message: "please enter valid name"
                },
            };
            return sendToSocketEmitter(socket.id, data);
        }
        let userData = {
            name: name,
            socketId: socket.id
        };
        let dataOfUser = yield userController_1.default.createUSer(userData);
        // logger.info('userData id====',userData)
        socket.userId = dataOfUser === null || dataOfUser === void 0 ? void 0 : dataOfUser._id.toString();
        data = {
            eventName: eventName_1.default.SET_USER_NAME,
            data: { userId: socket.userId }
        };
        return sendToSocketEmitter(socket.id, data);
    }
    catch (error) {
        logger_1.logger.info('set user name event =', error);
    }
});
module.exports = setUserName;
