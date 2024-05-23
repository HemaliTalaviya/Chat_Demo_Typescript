
import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    msg:{
        type:String
    }
})
const Chat = mongoose.model('Chat',chatSchema);

export = Chat


