import {Constants} from "./constants";
import * as socketIo from "socket.io-client";

export class Websocket {

    public static io: SocketIOClient.Socket;
    public static connected = false;

    public static init(game: Phaser.Game): string {
        if(Websocket.connected){
            return this.io.id;
        }
        this.io = socketIo(Constants.SERVER_URL, {secure: true, path: '/klujam18server/socket.io/', transports: ['websocket'], upgrade: false});
        this.io.connect();
        Websocket.io.on('message', function (p: any) {
            console.log('RECEIVE MESSAGE:', p);
        });
        Websocket.io.on('connect', function (p: any) {
            console.log('connected to ws server');
            Websocket.connected = true;
        });
        Websocket.io.on('disconnect', function (p: any) {
            console.log('disconnect to ws server');
            Websocket.connected = false;
            game.scene.stop('StartScene');
        });
        Websocket.io.on('connect_error', function (p: any) {
            console.log('disconnect to ws server');
            Websocket.connected = false;
            game.scene.dump();
        });
        return this.io.id;
    }

    public static isConnected(): boolean {
        return this.connected;
    }



}
