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
const search = (data, socket) => __awaiter(void 0, void 0, void 0, function* () {
    // logger.info('search data ===', data);
    try {
        const users = yield userController_1.default.searchUser(data.data.searchData);
        // logger.info('serach data =====', users)
        if (!users) {
            data = {
                eventName: eventName_1.default.SEARCH_ITEM,
                data: 'search data is not found'
            };
            return (0, eventEmitter_1.sendToSocketEmitter)(socket.id, data);
        }
        else {
            data = {
                eventName: eventName_1.default.SEARCH_ITEM,
                data: { users }
            };
            return (0, eventEmitter_1.sendToSocketEmitter)(socket.id, data);
        }
    }
    catch (error) {
        logger_1.logger.info('search user Error :', error);
    }
});
module.exports = search;
