import App from './loaders'
import { port } from './config'
import Logger from './core/Logger'

const app = new App

app.listen(port, ()=> {
    Logger.info(`Listening on port ${port}`)
})

// async function main():Promise<void>{
//     await app.run();
//     app.initMiddlewares();
//     app.initRoutes();
//     app.errorHandler();
//     await app.initDb();
// }
// main();