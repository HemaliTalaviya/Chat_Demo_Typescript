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
const userController_1 = __importDefault(require("../controller/userController"));
const eventEmitter_1 = require("../eventEmitter");
const logger_1 = require("../logger");
const makeGroup = (data, socket) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // logger.info('MAKE_GROUP==', data)
        const allUserData = yield userController_1.default.findAllData();
        // logger.info('all user data make group ===', allUserData)
        if (!allUserData) {
            data = {
                eventName: eventName_1.default.MAKE_GROUP,
                data: {
                    message: "Something wen't wrong !!!"
                }
            };
            return (0, eventEmitter_1.sendToSocketEmitter)(socket.id, data);
        }
        data = {
            eventName: eventName_1.default.MAKE_GROUP,
            data: { message: "Ok", allUserData }
        };
        return (0, eventEmitter_1.sendToSocketEmitter)(socket.id, data);
    }
    catch (error) {
        logger_1.logger.info('make Group Error:', error);
    }
});
module.exports = makeGroup;
