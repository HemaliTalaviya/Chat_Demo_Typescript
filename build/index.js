"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const mongoDB_1 = require("./connection/mongoDB");
const socket_io_1 = require("socket.io");
const redisConnection_1 = require("./connection/redisConnection");
const socketConnection_1 = require("./connection/socketConnection");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const io = new socket_io_1.Server(server);
exports.io = io;
(0, socketConnection_1.socketConnection)();
(0, redisConnection_1.redisConnection)();
(0, mongoDB_1.mongoDb)();
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../public/index.html'));
});
const port = process.argv[2] || process.env.PORT || 3000;
server.listen(port, () => console.log('Listening port on...!!!', port));
process
    .on('unhandledRejection', (reason, p) => {
    console.log(reason);
    console.log(p);
    console.log(reason, 'Unhandled Rejection at Promise >> ', new Date(), ' >> ', p);
})
    .on('uncaughtException', (err) => {
    console.log(err);
    console.log('Uncaught Exception thrown', new Date(), ' >> ', '\n', err);
});
