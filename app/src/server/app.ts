// server/app.ts

import * as express from "express";
import * as bodyParser from "body-parser";
import {createServer, Server} from "http";
import * as socketIo from 'socket.io';
import {Socket} from 'socket.io';
import {Log} from "./log";
import {Player} from "./player";
import {SharedConstants} from "../shared/sharedConstants";
import {PlayerInfo} from "../shared/playerInfo";

export class App {

    public app: express.Application;
    private server: Server;
    private io: SocketIO.Server;
    private port: number;

    private players: Map<string, Player>;

    constructor(port: number) {
        this.app = express();
        this.config();
        this.server = createServer(this.app);
        this.io = socketIo(this.server);
        this.port = port;
        this.players = new Map<string, Player>();
        this.listen();
    }

    private listen(): void {
        Log.log("Listen called");
        let port = this.port;
        this.server.listen({port: port, path: '/', serverClient: false}, () => {
            Log.log('Running server on port ' + port);
        });

        this.io.on('connection', (socket: Socket) => {
            const connId = socket.conn.id;
            Log.log('Client connected ' + connId);
            let player = new Player();
            player.id = connId;
            this.players.set(connId, player);

            socket.on('message', (m: String) => {
                Log.log('[server](message): ' + JSON.stringify(m));
                this.io.emit('message', m);
            });

            socket.on(SharedConstants.EVENT_PLAYER_MOVED, (m: PlayerInfo) => {
                Log.log('Received movement update ' + JSON.stringify(m));
                player.x = m.position.x;
                player.y = m.position.y;
                this.io.emit(SharedConstants.EVENT_PLAYER_UPDATE, player)
            });

            socket.on('disconnect', () => {

                Log.log('Client disconnected ' + connId);
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

