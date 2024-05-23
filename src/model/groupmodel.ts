import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    adminId:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref :'User'
        }
    ],
    members:[ {
            type:mongoose.Schema.Types.ObjectId,
            ref :'User'
        }
    ]
})

const Group = mongoose.model('Group',groupSchema);
export = Group