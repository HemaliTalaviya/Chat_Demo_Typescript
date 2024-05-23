"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const chatSchema = new mongoose_1.default.Schema({
    sender: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    },
    receiver: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    },
    msg: {
        type: String
    }
});
const Chat = mongoose_1.default.model('Chat', chatSchema);
module.exports = Chat;
