
import mongoose from "mongoose";
import { logger } from "../logger";
import dotenv from "dotenv";
dotenv.config();

export const mongoDb = async () => {
    try {
        if (process.env.MONGO_URL) {
            mongoose.connect(process.env.MONGO_URL).then(() => {
                logger.info('connected...')
                // console.log('connected...')
            }).catch((err) => {
                logger.info('mongo Db connection error', err)
            })
        }



    } catch (error) {
        logger.info('Db connection Error:', error)
    }
}
