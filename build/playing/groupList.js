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
const groupController_1 = __importDefault(require("../controller/groupController"));
const eventEmitter_1 = require("../eventEmitter");
const logger_1 = require("../logger");
const groupList = (data, socket) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // logger.info('groupList event===',data)
        let allGroup = yield groupController_1.default.findAllGroup(data.data.userId);
        // logger.info('group=====',allGroup);
        if (!allGroup) {
            data = {
                eventName: eventName_1.default.GROUP_LIST,
                data: { message: 'group data is not found' }
            };
            return (0, eventEmitter_1.sendToSocketEmitter)(socket.id, data);
        }
        data = {
            eventName: eventName_1.default.GROUP_LIST,
            data: { allGroup }
        };
        return (0, eventEmitter_1.sendToSocketEmitter)(socket.id, data);
    }
    catch (error) {
        logger_1.logger.info('groupList Error::', error);
    }
});
module.exports = groupList;
