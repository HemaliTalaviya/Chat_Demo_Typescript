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
const deleteGroup = (data, socket) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // logger.info('delete group event===',data.data.groupId);
        if (!data.data.groupId) {
            data = {
                eventName: eventName_1.default.DELETE_GROUP,
                data: { message: 'Id is not found' }
            };
            return (0, eventEmitter_1.sendToSocketEmitter)(socket.id, data);
        }
        let group = yield groupController_1.default.deleteGroup(data.data.groupId);
        // logger.info('delete group==',group)
        data = {
            eventName: eventName_1.default.DELETE_GROUP,
            data: { group }
        };
        return (0, eventEmitter_1.sendToALLSocketEmitter)(socket.id, data);
    }
    catch (error) {
        logger_1.logger.info('delete Group ===', error);
    }
});
module.exports = deleteGroup;
