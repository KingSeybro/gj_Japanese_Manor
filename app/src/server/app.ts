// server/app.ts

import * as express from "express";
import * as bodyParser from "body-parser";
import {createServer, Server} from "http";
import * as socketIo from 'socket.io';
import {Socket} from 'socket.io';
import {Log} from "./log";
import {SharedConstants} from "../shared/sharedConstants";
import {PlayerInfo, Position} from "../shared/playerInfo";
import {CombatWrapper} from "../gj_japanese_manor/combatWrapper";
import {createPlayerCombatFromStructure, The_Naughty_Nerd} from "../shared/playerCombat";
import {CombatData} from "../shared/data";
import apply = Reflect.apply;

export class App {

    public app: express.Application;
    private server: Server;
    private io: SocketIO.Server;
    private port: number;

    private players: Map<string, PlayerInfo>;
    private sockets: Map<string, SocketIO.Socket>;

    constructor(port: number) {
        this.app = express();
        this.config();
        this.server = createServer(this.app);
        this.io = socketIo(this.server, {path: '/klujam18server/'});
        this.port = port;
        this.players = new Map<string, PlayerInfo>();
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
            let position = new Position(-10, -10);
            let player = new PlayerInfo(connId, position);
            player.id = connId;
            this.sockets.set(connId, socket);
            this.players.set(connId, player);

            socket.on('message', (m: String) => {
                Log.log('[server](message): ' + JSON.stringify(m));
                this.io.emit('message', m);
            });

            socket.on(SharedConstants.EVENT_PLAYER_MOVED, (m: PlayerInfo) => {
                // Log.log('Received movement update ' + JSON.stringify(m));
                player.position.x = m.position.x;
                player.position.y = m.position.y;
                this.io.emit(SharedConstants.EVENT_PLAYER_UPDATE, player)
            });

            socket.on(SharedConstants.EVENT_PLAYER_JOINED, (m: PlayerInfo) => {
                Log.log('Received player joined ' + JSON.stringify(m));
                player.position.x = m.position.x;
                player.position.y = m.position.y;
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
                if (!enemyPlayer) {
                    Log.log("Could not find player " + o.enemyId);
                    return;
                }
                this.sockets.get(o.enemyId).emit('send_event_to_other_player', {payload: 'blub'});

            });

            socket.on(SharedConstants.EVENT_PLAYER_COMBATACTION, (o: CombatWrapper) => {
                Log.log('received player combat event from id  ' + connId + ' to ' + o.attackerObject.id);
                // Log.log(JSON.stringify(o));
                let otherSocket = this.sockets.get(o.attackerObject.id);

                let newAttacker = createPlayerCombatFromStructure(o.attackerObject);
                let newDefender = createPlayerCombatFromStructure(o.defenderObject);

                if (newAttacker.finalSocialStanding > 0 && newAttacker.currentFocus > 0 && newDefender.finalSocialStanding > 0 && newDefender.currentFocus > 0) {
                    Log.log('no winner between ' + connId + ' and ' + o.attackerObject.id + ' yet');
                    otherSocket.emit(SharedConstants.EVENT_PLAYER_COMBATACTION, o);
                    return;
                }
                if(newAttacker.finalSocialStanding <= 0 || newAttacker.currentFocus <= 0){
                    socket.emit(SharedConstants.EVENT_STOP_BATTLE, o);
                    otherSocket.emit(SharedConstants.EVENT_STOP_BATTLE, o);
                    newAttacker.endOfCombatHouseKeeping();
                    newDefender.endOfCombatHouseKeeping();
                    return;
                }
                if(newDefender.finalSocialStanding <= 0 || newDefender.currentFocus <= 0){
                    socket.emit(SharedConstants.EVENT_STOP_BATTLE, o);
                    otherSocket.emit(SharedConstants.EVENT_STOP_BATTLE, o);
                    newAttacker.endOfCombatHouseKeeping();
                    newDefender.endOfCombatHouseKeeping();
                    return;
                }
                Log.log("something weird happened we should not come to here");

            });

            socket.on(SharedConstants.EVENT_PLAYER_START_BATTLE, (o: any) => {
                Log.log('Received start battle between ' + connId + ' and ' + o.otherPlayerId);
                let otherPlayer = this.players.get(o.otherPlayerId);
                if (!otherPlayer) {
                    //TODO: we could send back to the socket that we have no idea who the other id is
                    Log.log("ERROR - could not find other player");
                    return;
                }
                if(otherPlayer.inCombat) {
                    Log.log("ERROR other player in combat");
                    return;
                }
                if(player.inCombat) {
                    Log.log("ERROR player in combat");
                    return;
                }
                player.inCombat = true;
                otherPlayer.inCombat = true;
                this.io.emit(SharedConstants.EVENT_PLAYER_UPDATE, player);
                this.io.emit(SharedConstants.EVENT_PLAYER_UPDATE, otherPlayer);

                let player1Obj = new The_Naughty_Nerd(player.id);
                let player2Obj = new The_Naughty_Nerd(otherPlayer.id);

                let combat = new CombatWrapper(player1Obj, player2Obj, "You are first", "");
                let data1 = new CombatData();
                data1.combat = combat;
                data1.otherPlayer = otherPlayer;
                socket.emit(SharedConstants.EVENT_PLAYER_START_BATTLE, data1);

                let data2 = new CombatData();
                data2.combat = combat;
                data2.otherPlayer = player;
                this.sockets.get(otherPlayer.id).emit(SharedConstants.EVENT_PLAYER_START_BATTLE, data2);
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

