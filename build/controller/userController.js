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
const usermodel = require('../model/usermodel');
module.exports = {
    createUSer: (userData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // console.log('userData ====',userData)
            const ckeckuserExistOrNot = yield usermodel.findOne({ name: userData.name });
            if (!ckeckuserExistOrNot) {
                userData = yield new usermodel(userData);
                // console.log('user connected454566===', userData)
                yield userData.save();
                return userData;
            }
            else {
                ckeckuserExistOrNot.socketId = userData.socketId;
                yield ckeckuserExistOrNot.save({ validateBeforeSave: false });
                return ckeckuserExistOrNot;
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    updateUser: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // console.log('update data==', data)
            yield usermodel.updateOne(data.condition, data.updateData);
            return true;
        }
        catch (error) {
            console.log(error);
        }
    }),
    findAllData: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield usermodel.find();
        }
        catch (error) {
            console.log("Error Of Find All User :--", error);
        }
    }),
    searchUser: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // console.log('search User ===',data)
            const regexPattern = new RegExp(data, 'i');
            const matchedData = yield usermodel.find({ name: { $regex: regexPattern } });
            return matchedData;
        }
        catch (error) {
            console.log(error);
        }
    })
};
