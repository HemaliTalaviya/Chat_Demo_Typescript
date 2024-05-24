import {  createClient } from 'redis';
import { logger } from '../logger';
import dotenv  from "dotenv";
dotenv.config();


let options:any ={
    port :process.env.REDIS_PORT,
    host :process.env.REDIS_HOST
}
const redisClient:any = createClient(options);
let pubClient:any = createClient(options);
let subClient:any = createClient(options);
const redisConnection = () =>{
    try {
        redisClient.connect();
        redisClient.on('connect', ()=> {
            console.log('connected redis');
        })
        
    } catch (error) {
        logger.info('redis Connection Error:',error)
    }
}
export {redisConnection,pubClient,subClient}
