let url = 'wss://v22018086769871922.ultrasrv.de/';
if (location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.hostname === "0.0.0.0") {
    url = "ws://localhost:3000";
}

export class Constants {
    public static readonly TILE_SIZE = 256;


    public static readonly SERVER_URL = url;
    public static readonly ACCELERATION = 32000;
    public static readonly DEFAULT_ZOOM = 0.5;

}
