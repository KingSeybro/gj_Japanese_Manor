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
import {CombatWrapper} from "../gj_japanese_manor/combatWrapper";

export class App {

    public app: express.Application;
    private server: Server;
    private io: SocketIO.Server;
    private port: number;

    private players: Map<string, Player>;
    private sockets: Map<string, SocketIO.Socket>;

    constructor(port: number) {
        this.app = express();
        this.config();
        this.server = createServer(this.app);
        this.io = socketIo(this.server);
        this.port = port;
        this.players = new Map<string, Player>();
        this.sockets = new Map<string, Socket>()
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
            this.sockets.set(connId, socket);
            this.players.set(connId, player);

            socket.on('message', (m: String) => {
                Log.log('[server](message): ' + JSON.stringify(m));
                this.io.emit('message', m);
            });

            socket.on(SharedConstants.EVENT_PLAYER_MOVED, (m: PlayerInfo) => {
                // Log.log('Received movement update ' + JSON.stringify(m));
                player.x = m.position.x;
                player.y = m.position.y;
                this.io.emit(SharedConstants.EVENT_PLAYER_UPDATE, player)
            });

            socket.on(SharedConstants.EVENT_PLAYER_JOINED, (m: PlayerInfo) => {
                Log.log('Received movement update ' + JSON.stringify(m));
                player.x = m.position.x;
                player.y = m.position.y;
                for (const otherPlayerEntry of this.players.keys()) {
                    let otherPlayer = this.players.get(otherPlayerEntry);
                    Log.log('Update socket ' + connId + ' with info of other player ' + otherPlayer);
                    socket.emit(SharedConstants.EVENT_PLAYER_UPDATE, otherPlayer);
                }
                this.io.emit(SharedConstants.EVENT_PLAYER_UPDATE, player)
            });

            socket.on('generic_event', (o: any) => {
                Log.log('received generic event ' + JSON.stringify(o));
                let enemyPlayer = this.players.get(o.enemyId);
                Log.log(enemyPlayer);
                if(!enemyPlayer){
                    Log.log("Could not find player " + o.enemyId);
                    return;
                }
                this.sockets.get(o.enemyId).emit('send_event_to_other_player', {payload: 'blub'});

            });

            socket.on(SharedConstants.EVENT_PLAYER_COMBATACTION, (o: CombatWrapper) => {
                // Log.log('received player combat event ' + JSON.stringify(o));
                // let enemyPlayer = this.players.get(o.enemyId);
                // Log.log(enemyPlayer);
                // if(!enemyPlayer){
                //     Log.log("Could not find player " + o.enemyId);
                //     return;
                // }
                // this.sockets.get(o.enemyId).emit('send_event_to_other_player', {payload: 'blub'});

            });


            socket.on('disconnect', () => {

                Log.log('Client disconnected ' + connId);
                this.players.delete(connId);
                this.sockets.delete(connId);
                this.io.emit(SharedConstants.EVENT_PLAYER_DISCONNECTED, connId);
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

