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
const __1 = require("..");
const logger_1 = require("../logger");
const groupmodel_1 = __importDefault(require("../model/groupmodel"));
module.exports = {
    /*
    GROUP MODEL FUNCTION
    
    */
    createGroup: (data, socketId) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, adminId, members } = data;
        try {
            // console.log('create Group ===',data)
            let existingGroup = yield groupmodel_1.default.findOne({ name: data.name });
            if (existingGroup) {
                return __1.io.to(socketId).emit('GROUP', { message: 'please enter group name unique' });
            }
            let groupData = yield groupmodel_1.default.create({
                name,
                adminId,
                members
            });
            return groupData;
            // return groupData;
        }
        catch (error) {
            logger_1.logger.info(error);
        }
    }),
    findGroup: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let groupId = data._id;
            const groupData = yield groupmodel_1.default.findById(groupId).populate('members');
            // console.log('user group data ===', groupData);
            let socketIdArray = [];
            groupData.members.forEach((element) => {
                // console.log('all member data ===',element)
                socketIdArray.push(element.socketId);
                // io.to(element.socketId).emit('GROUP', { message: "Ok", groupData })
            });
            return data = {
                socketIdArray, groupData
            };
        }
        catch (error) {
            logger_1.logger.info('find Group Error::', error);
        }
    }),
    findAllGroup: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const groups = yield groupmodel_1.default.find({ members: userId }).populate('members');
            return groups;
        }
        catch (error) {
            logger_1.logger.info(error);
        }
    }),
    deleteGroup: (groupId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // logger.info('group Id ==', groupId)
            if (!groupId) {
                logger_1.logger.info('group Id is not found');
            }
            const groups = yield groupmodel_1.default.findByIdAndDelete(groupId);
            return groups;
            // logger.info('DELETE  GROUP EVENT==',groups)
        }
        catch (error) {
            logger_1.logger.info(error);
        }
    }),
    findOneGroup: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // logger.info('findOneGroup ======', data)
            let groupId = data._id;
            const groupData = yield groupmodel_1.default.findById(groupId);
            return groupData;
            // logger.info('user group data ===', groupData);
        }
        catch (error) {
            logger_1.logger.info(error);
        }
    }),
    leaveGroup: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // logger.info('leave group data====',data)
            let allSender = yield groupmodel_1.default.find({
                $or: [
                    { members: data.sender }
                ]
            });
            return allSender;
        }
        catch (error) {
            logger_1.logger.info(error);
        }
    })
};
