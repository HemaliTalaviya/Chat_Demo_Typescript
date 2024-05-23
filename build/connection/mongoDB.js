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
exports.mongoDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = require("../logger");
const mongoDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        mongoose_1.default.connect('mongodb://localhost:27017/ts-chat').then(() => {
            logger_1.logger.info('connected...');
            // console.log('connected...')
        }).catch((err) => {
            logger_1.logger.info('mongo Db connection error', err);
        });
    }
    catch (error) {
        logger_1.logger.info('Db connection Error:', error);
    }
});
exports.mongoDb = mongoDb;
