import { io } from "..";
import { logger } from "../logger";
import Chat from "../model/chatmodel"
import Group from "../model/groupmodel"

export = {
    
    /* 
    GROUP MODEL FUNCTION
    
    */
    createGroup: async (data:any, socketId:any) => {

        const { name, adminId, members } = data;
        try {
            // console.log('create Group ===',data)
            let existingGroup = await Group.findOne({ name: data.name });
            if (existingGroup) {
                return io.to(socketId).emit('GROUP', { message: 'please enter group name unique' })
            }
            let groupData = await Group.create({
                name,
                adminId,
                members
            }
            );
            return groupData;

            // return groupData;
        } catch (error) {
            logger.info(error)
        }
    },

    findGroup: async (data:any) => {

        try {
            let groupId = data._id;
            const groupData:any = await Group.findById(groupId).populate('members');
            // console.log('user group data ===', groupData);
            let socketIdArray:any[] = [];
            
            groupData.members.forEach((element:any) => {
                // console.log('all member data ===',element)
                socketIdArray.push(element.socketId);
                // io.to(element.socketId).emit('GROUP', { message: "Ok", groupData })
            })
            return data = {
                socketIdArray,groupData
            }


        } catch (error) {
            logger.info('find Group Error::',error)
        }
    },

    findAllGroup: async (userId:any) => {

        try {

            const groups = await Group.find({ members: userId }).populate('members');
            return groups;


        } catch (error) {
            logger.info(error)
        }
    },

    deleteGroup: async (groupId:any) => {

        try {
            // logger.info('group Id ==', groupId)

            if(!groupId){
                logger.info('group Id is not found')
            }
            const groups = await Group.findByIdAndDelete(groupId);
            return groups;
            // logger.info('DELETE  GROUP EVENT==',groups)
           
        } catch (error) {
            logger.info(error)
        }
    },
    findOneGroup: async (data:any) => {

        try {
            // logger.info('findOneGroup ======', data)
            let groupId = data._id;
            const groupData = await Group.findById(groupId)
            return groupData
            // logger.info('user group data ===', groupData);

        } catch (error) {
            logger.info(error)
        }
    },
    leaveGroup : async (data:any) =>{
        try {
            // logger.info('leave group data====',data)
            let allSender = await Group.find({
                $or: [
                    { members: data.sender } 
                ]
            })
            return allSender;
        } catch (error) {
            logger.info(error)
        }

    }
}