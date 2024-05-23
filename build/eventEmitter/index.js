"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToALLSocketEmitter = exports.sendToSocketEmitter = void 0;
const logger_1 = require("../logger");
const __1 = require("..");
const sendToSocketEmitter = (socketId, data) => {
    try {
        logger_1.logger.info(`sendTosocketEmitter data ==== ${JSON.stringify(data)}  socketID:====${JSON.stringify(socketId)}`);
        __1.io.to(socketId).emit(data.eventName, data);
    }
    catch (error) {
        logger_1.logger.info('sendTosocketEmitter Error :::::', error);
    }
};
exports.sendToSocketEmitter = sendToSocketEmitter;
const sendToALLSocketEmitter = (socketId, data) => {
    logger_1.logger.info(`sendToALLSocketEmitter==== ${JSON.stringify(socketId)} data==========${JSON.stringify(data)}`);
    try {
        __1.io.emit(data.eventName, data);
    }
    catch (error) {
        logger_1.logger.info('sendToALLSocketEmitter Error', error);
    }
};
exports.sendToALLSocketEmitter = sendToALLSocketEmitter;
// sendToALLSocketEmitter
