
import * as bodyParser from "body-parser";
import * as express from "express";
import { Request, Response } from "express";
import * as http from 'http';
import {App} from "./app";

var serverApp = new App();
var app:express.Application = serverApp.app;

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({status: "ok"});
});


const PORT = process.env.PORT || 3000;
app.set("port", PORT);
var httpServer = http.createServer(app);

//listen on provided portsXL
httpServer.listen(PORT, (data) => {
    console.log(`Listening on port ${PORT}`)
});

