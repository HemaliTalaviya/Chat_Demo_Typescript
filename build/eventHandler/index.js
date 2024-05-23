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
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventHandler = void 0;
const eventName_1 = __importDefault(require("../constant/eventName"));
const logger_1 = require("../logger");
const chatHistory_1 = __importDefault(require("../playing/chatHistory"));
const deleteGroup_1 = __importDefault(require("../playing/deleteGroup"));
const group_1 = __importDefault(require("../playing/group"));
const groupList_1 = __importDefault(require("../playing/groupList"));
const makeGroup_1 = __importDefault(require("../playing/makeGroup"));
const search_1 = __importDefault(require("../playing/search"));
const sendMsg_1 = __importDefault(require("../playing/sendMsg"));
const setUser_1 = __importDefault(require("../playing/setUser"));
const userList_1 = __importDefault(require("../playing/userList"));
const eventHandler = (socket) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        socket.onAny((eventName, data) => {
            logger_1.logger.info(`event name is ${eventName} ::: data ===${JSON.stringify(data)}`);
            switch (eventName) {
                case eventName_1.default.SET_USER_NAME:
                    (0, setUser_1.default)(data.data, socket);
                    break;
                case eventName_1.default.USER_LIST:
                    (0, userList_1.default)(data, socket);
                    break;
                case eventName_1.default.CHAT_HIS:
                    (0, chatHistory_1.default)(data, socket);
                    break;
                case eventName_1.default.SEND_MSG:
                    (0, sendMsg_1.default)(data, socket);
                    break;
                case eventName_1.default.SEARCH_ITEM:
                    (0, search_1.default)(data, socket);
                    break;
                case eventName_1.default.MAKE_GROUP:
                    (0, makeGroup_1.default)(data, socket);
                    break;
                case eventName_1.default.GROUP:
                    (0, group_1.default)(data, socket);
                    break;
                case eventName_1.default.GROUP_LIST:
                    (0, groupList_1.default)(data, socket);
                    break;
                case eventName_1.default.DELETE_GROUP:
                    (0, deleteGroup_1.default)(data, socket);
                    break;
                default:
                    break;
            }
        });
    }
    catch (error) {
        logger_1.logger.info(error);
    }
});
exports.eventHandler = eventHandler;
