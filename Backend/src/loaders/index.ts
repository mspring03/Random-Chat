import express, { Application } from 'express'
import morgan from 'morgan'
import { port } from '../config'
import cors from 'cors';
import Database from './database'
import Logger from '../core/Logger'
import router from '../routes';

//routes imp
// import indexRoutes from './routes/index.routes'
// import taskRoutes from './routes/tasks.routes'

class App{
    app: Application;
    db: Database;
    PORT: number | string;

    constructor(){
        this.app = express();
        this.db = new Database();
        this.PORT = port;
    }
    public async initDb(): Promise<void> {
        await this.db.connection()
    }
    public initMiddlewares(): void {
        this.app.use(cors());
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: false}))
        this.app.use(morgan('dev'))
    }
    public initRoutes(): void {
        this.app.get('/', (req, res) => res.status(200).json({ message: 'Hello World' }));
        // this.app.use('/', router);
    } 
    public async run(): Promise<void> {
        await this.app.listen(this.PORT)
        Logger.info('Server on port:', this.PORT)
    }
}

export default App