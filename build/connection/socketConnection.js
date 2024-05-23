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
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketConnection = void 0;
const __1 = require("..");
const logger_1 = require("../logger");
const eventHandler_1 = require("../eventHandler");
const disConnect_1 = require("../playing/disConnect");
const redis_adapter_1 = require("@socket.io/redis-adapter");
const redisConnection_1 = require("./redisConnection");
const socketConnection = () => {
    try {
        Promise.all([redisConnection_1.pubClient.connect(), redisConnection_1.subClient.connect()])
            .then(() => {
            __1.io.adapter((0, redis_adapter_1.createAdapter)(redisConnection_1.pubClient, redisConnection_1.subClient));
        }).catch((error) => {
            logger_1.logger.error(`CATCH_ERROR socketConnection in ioAdapter :: ${error}`);
        });
        __1.io.on('connection', (socket) => __awaiter(void 0, void 0, void 0, function* () {
            logger_1.logger.info('user connected...' + socket.id);
            yield (0, eventHandler_1.eventHandler)(socket);
            socket.on('disconnect', () => {
                (0, disConnect_1.disConnect)(socket);
            });
        }));
    }
    catch (error) {
        logger_1.logger.info('socket Connection', error);
    }
};
exports.socketConnection = socketConnection;
