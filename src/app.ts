import * as express from 'express'
import * as path from 'path'

class App {
    public express

    constructor () {
        this.express = express()
        this.mountRoutes()
    }

    private mountRoutes(): void {
        const router = express.Router()
        router.get('/', (req, res) => {
            res.sendFile(path.join(__dirname+'/static/index.html'));
        })
        router.get('/log', (req, res) => {
            var logType = req.query.type;
            var text = req.query.text;
            switch(logType) {
                case "error": {
                    console.error(`Logging error: ${text}`);
                    break;
                }
                case "warn": {
                    console.warn(`Logging warning: ${text}`);
                    break;
                }

                case "log":
                default: 
                {
                    console.log(`Logging text: ${text}`);
                    break;
                }
            }
            res.json({
                type: logType,
                message: text
            })
        })
        this.express.use('/', router)
    }
}

export default new App().express