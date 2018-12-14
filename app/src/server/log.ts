
export class Log {

    public static log(message): void {
        let date = new Date();
        console.log("[" + date.toISOString() + "] " + message);
    }
}