"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subClient = exports.pubClient = exports.redisConnection = void 0;
const redis_1 = require("redis");
const logger_1 = require("../logger");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let options = {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST
};
const redisClient = (0, redis_1.createClient)(options);
let pubClient = (0, redis_1.createClient)(options);
exports.pubClient = pubClient;
let subClient = (0, redis_1.createClient)(options);
exports.subClient = subClient;
const redisConnection = () => {
    try {
        redisClient.connect();
        redisClient.on('connect', () => {
            console.log('connected redis');
        });
    }
    catch (error) {
        logger_1.logger.info('redis Connection Error:', error);
    }
};
exports.redisConnection = redisConnection;
/*

  try {
         redisClient = redis.createClient();
         pubClient = createClient({ url: "redis://localhost:6379" });
         subClient = pubClient.duplicate();

        redisClient.connect();
        pubClient.connect();
        subClient.connect();
        redisClient.on('connect', ()=> {
            console.log('connected redis');
        })

    } catch (error) {
        console.log('redis connection error',error);
    }



*/ 
