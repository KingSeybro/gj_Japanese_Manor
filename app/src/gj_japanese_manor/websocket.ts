import {Constants} from "./constants";
import * as socketIo from "socket.io-client";

export class Websocket {

    public static io: SocketIOClient.Socket;

    public static init(): string {
        this.io = socketIo(Constants.SERVER_URL, {secure: true, path: '/klujam18server/socket.io/', transports: ['websocket'], upgrade: false});
        this.io.connect();

        Websocket.io.on('message', function (p: any) {
            console.log('RECEIVE MESSAGE:', p);
        });
        return this.io.id;
    }

    public static isConnected(): boolean {
        return this.io.connected;
    }



}
