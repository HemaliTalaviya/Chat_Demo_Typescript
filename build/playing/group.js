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
const groupmodel_1 = __importDefault(require("../model/groupmodel"));
const group = (data, socket) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // logger.info('Group Event ====', data)
        let groupData = {
            name: data.data.group_name,
            adminId: data.data.userId,
            members: data.data.selectedUser
        };
        let existingGroup = yield groupmodel_1.default.findOne({ name: data.data.group_name });
        // logger.info('find group =',existingGroup)
        if (existingGroup) {
            data = {
                eventName: eventName_1.default.GROUP,
                data: {
                    message: 'please enter group name unique'
                }
            };
            return (0, eventEmitter_1.sendToSocketEmitter)(socket.id, data);
        }
        let group = yield groupController_1.default.createGroup(groupData, socket.id);
        // logger.info('groupdata index file==', groupData)
        groupData = yield groupController_1.default.findGroup(group);
        // logger.info('groupData ===',groupData)
        if (!groupData) {
            data = {
                eventName: eventName_1.default.GROUP,
                data: {
                    message: 'Group data is not found'
                }
            };
            return (0, eventEmitter_1.sendToSocketEmitter)(socket.id, data);
        }
        let groupAllData = groupData.groupData;
        data = {
            eventName: eventName_1.default.GROUP,
            data: { groupAllData }
        };
        return (0, eventEmitter_1.sendToSocketEmitter)(groupData.socketIdArray, data);
    }
    catch (error) {
        logger_1.logger.info('group create Error :', error);
    }
});
module.exports = group;
