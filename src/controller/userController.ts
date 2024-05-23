const usermodel = require('../model/usermodel');

export = {
    createUSer: async (userData:any) => {

        try {
            // console.log('userData ====',userData)
          
                const ckeckuserExistOrNot = await usermodel.findOne({ name: userData.name })
                if (!ckeckuserExistOrNot) {
                    userData = await new usermodel(userData);
                    // console.log('user connected454566===', userData)
                    await userData.save();
                    return userData;
                } else {
                    ckeckuserExistOrNot.socketId = userData.socketId
                    await ckeckuserExistOrNot.save({ validateBeforeSave: false });
                    return ckeckuserExistOrNot
                }
        } catch (error) {
            console.log(error);
        }
    },
    updateUser: async (data:any) => {

        try {
            // console.log('update data==', data)
            await usermodel.updateOne(data.condition, data.updateData)
            return true;

        } catch (error) {
            console.log(error);
        }
    },
    findAllData: async () => {
        try {
            return await usermodel.find();
        } catch (error) {
            console.log("Error Of Find All User :--", error)
        }
    },
    searchUser: async (data:any) => {

        try {
            // console.log('search User ===',data)
            const regexPattern = new RegExp(data, 'i');

            const matchedData = await usermodel.find({ name: { $regex: regexPattern } });
            return matchedData;

        } catch (error) {
            console.log(error);
        }
    }

}