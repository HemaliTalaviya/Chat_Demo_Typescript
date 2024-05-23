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
const userController_1 = __importDefault(require("../controller/userController"));
const index_1 = require("../eventEmitter/index");
const userList = (data, socket) => __awaiter(void 0, void 0, void 0, function* () {
    // logger.info('userlist function ====',data,socket.id)
    try {
        let userData = yield userController_1.default.findAllData();
        // logger.info('userName Data==',userData)
        let users = [];
        userData.forEach((allData) => {
            users.push(allData);
        });
        data = {
            eventName: eventName_1.default.USER_LIST,
            data: {
                users
            }
        };
        return (0, index_1.sendToALLSocketEmitter)(socket.id, data);
    }
    catch (error) {
        logger_1.logger.info('userList Error:', error);
    }
});
module.exports = userList;
