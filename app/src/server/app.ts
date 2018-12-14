// server/app.ts

import * as express from "express";
import * as bodyParser from "body-parser";
import {createServer, Server} from "http";
import * as socketIo from 'socket.io';
import {Log} from "./log";
import {Socket} from "socket.io";

export class App {

    public app: express.Application;
    private server: Server;
    private io: SocketIO.Server;
    private port: number;

    constructor(port: number) {
        this.app = express();
        this.config();
        this.io = socketIo(this.server);
        this.server = createServer(this.app)
        this.port = port;
        this.listen();
    }

    private listen(): void {
        Log.log("Listen called");
        let port = this.port;
        this.server.listen({port: port, path: '/', serverClient: false}, () => {
            Log.log('Running server on port ' + port);
        });

        this.io.on('connection', (socket: Socket) => {
            Log.log('Connected client on port ' + this.port);
            console.log(socket);
            socket.on('message', (m: String) => {
                console.log('[server](message): %s', JSON.stringify(m));
                this.io.emit('message', m);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });

        this.io.on('connect', (socket: Socket) => {
            Log.log('Connected client on port ' + this.port);
            console.log(socket);
            socket.on('message', (m: String) => {
                console.log('[server](message): %s', JSON.stringify(m));
                this.io.emit('message', m);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({extended: false}));
    }

}

