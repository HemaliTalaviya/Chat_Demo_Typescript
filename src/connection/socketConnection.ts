import { io } from ".."
import { logger } from "../logger"
import { Socket } from "socket.io"

import { eventHandler } from "../eventHandler";
import { disConnect } from "../playing/disConnect";
import { createAdapter } from "@socket.io/redis-adapter";
import { pubClient, subClient } from "./redisConnection";

const socketConnection = () => {
    try {
        Promise.all([pubClient.connect(), subClient.connect()])
        .then(() => {
            io.adapter(createAdapter(pubClient, subClient));
        }).catch((error) => {
            logger.error(`CATCH_ERROR socketConnection in ioAdapter :: ${error}`);
        })


        io.on('connection', async (socket :Socket) => {
            logger.info('user connected...' + socket.id)

            await eventHandler(socket)

            socket.on('disconnect',()=>{
                disConnect(socket);
            })
        })

    } catch (error) {
        logger.info('socket Connection',error)
    }

}

export {socketConnection}