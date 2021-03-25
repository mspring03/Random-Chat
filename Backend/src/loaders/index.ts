import express, { Request, Response, NextFunction, Application } from 'express'
import morgan from 'morgan'
import { ApiError, NotFoundError } from '../core/apiError';
import * as SocketIO from "socket.io";
import { Server as IO } from 'socket.io';
import cors from 'cors';
import Database from './database'
import Logger from '../core/Logger'
import router from '../routes';
import { Server, createServer } from 'http';
import socketConnet from '../socket'

class App{
    app: Application;
    httpServer: Server;
    io: IO;
    db: Database;

    constructor(){
        this.app = express();
        this.db = new Database();
        this.httpServer = createServer(this.app)
    }

    public initDb(): void {
        this.db.connection()
    }

    public initMiddlewares(): void {
        this.app.use(cors());
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: false}))
        this.app.use(morgan('dev'))
    }
    
    public initRoutes(): void {
        this.app.get('/', (req, res) => res.status(200).json({ message: 'Hello World' }));
        this.app.use('/', router);
    } 

    public errorHandler(): void {
        this.app.use((req, res, next) => next(new NotFoundError()));
        this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            if (err instanceof ApiError) {
                ApiError.handle(err, res);
            }
            else {
                Logger.error(err);
                return res.status(500).send(err.message);
            }
        });
    }

    public socketServer(): void {
        this.io = SocketIO.listen(this.httpServer, { origins: "*:*" });
        socketConnet(this.io);
    }

    public listen(port, callback: () => void): void {
        this.initDb();
        this.httpServer.listen(port);
        callback();

        this.initMiddlewares();
        this.initRoutes();
        this.socketServer();
        this.errorHandler();
    }
}

export default App