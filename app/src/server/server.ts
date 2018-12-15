import * as express from "express";
import {Request, Response} from "express";
import {App} from "./app";
import {Log} from "./log";

const PORT = 3000;
var serverApp = new App(PORT);
var app: express.Application = serverApp.app;

// app.get('/socket\.io/', (req: Request, res: Response) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://0.0.0.0:8080');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
//     res.setHeader('Access-Control-Allow-Credentials', 'true'); // If needed
//     res.status(200).json({status: "ok"});
// });
// app.post('/socket\.io/', (req: Request, res: Response) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://0.0.0.0:8080');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
//     res.setHeader('Access-Control-Allow-Credentials', 'true'); // If needed
//     res.status(200).json({status: "ok"});
// });
//
// let cors = require('cors')
// app.use(cors());
//
//
// app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', 'http://0.0.0.0:8080');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
//     res.setHeader('Access-Control-Allow-Credentials', 'true'); // If needed
//     next();
// });
