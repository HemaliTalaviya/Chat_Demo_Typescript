
import express from "express";
import path from "path";
import http from "http";


const app = express()
const server = http.createServer(app);
import { mongoDb } from "./connection/mongoDB";


import { Server as SocketIOServer } from 'socket.io';
import { redisConnection } from "./connection/redisConnection";
import { socketConnection } from "./connection/socketConnection";
import dotenv  from "dotenv";
dotenv.config();
const  io = new SocketIOServer(server);
socketConnection()
redisConnection()
mongoDb();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})


const port = process.argv[2] || process.env.PORT || 3000
server.listen(port, () => console.log('Listening port on...!!!', port))

export {io}

process
    .on('unhandledRejection', (reason, p) => {
        console.log(reason)
        console.log(p)
        console.log(
            reason,
            'Unhandled Rejection at Promise >> ',
            new Date(),
            ' >> ',
            p,
        );
    })
    .on('uncaughtException', (err) => {
        console.log(err)
        console.log('Uncaught Exception thrown', new Date(), ' >> ', '\n', err);
    });


