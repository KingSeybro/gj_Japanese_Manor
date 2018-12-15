import {Constants} from "./constants";
import * as socketIo from "socket.io-client";

export class Websocket {

    public static io: SocketIOClient.Socket;

    public static init(): void {
    this.io = socketIo(Constants.SERVER_URL, {secure: true, path: '/klujam18server/socket.io/', transports: ['websocket'], upgrade: false});
        this.io.connect();
    }

    public static isConnected(): boolean {
        return this.io.connected;
    }



}
