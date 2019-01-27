import * as express from 'express'
import * as path from 'path'
import * as bodyParser from 'body-parser'

class App {
    public express

    constructor () {
        this.express = express()
        this.mountRoutes()
    }

    private writeStructuredLog(logLevel : number, text : string, req : express.Request) {
        var entry = {
            severity: this.convertLogLevelToEnum(logLevel),
            text: text,
            httpRequest: this.convertHttpRequestToLogObject(req)
        }
        console.log(JSON.stringify(entry));
    }

    private writeLog(logLevel : number, text : string) {
        if (logLevel < 300) {
            console.log(`Logging text: ${text}`);
        }
        else if (logLevel < 500) {
            // warning
            console.log(`Logging warning: ${text}`);
        }
        else {
            console.log(`Logging error: ${text}`);
        }
    }

    private mountRoutes(): void {
        const router = express.Router();
        router.use(express.static("static"));
        router.use(bodyParser.urlencoded({'extended': true}));
        router.use(bodyParser.json());
        
        router.post('/log', (req, res) => {
            const logLevel = req.body.severity;
            const message = req.body.message;
            const structuredLogs = req.body.useStructuredLogs;

            if (structuredLogs.toLowerCase() == 'true') {
                this.writeStructuredLog(logLevel, message, req);
            } else {
                this.writeLog(logLevel, message);
            }
            
            res.json({
                type: this.convertLogLevelToEnum(logLevel),
                level: logLevel,
                message: message,
                useStructuredLogs: structuredLogs
            })
        })
        this.express.use('/', router)
    }

    private convertHttpRequestToLogObject(req : express.Request) {
        var jsonData = {
            requestMethod: req.method,
            requestUrl: req.url,
            userAgent: req.header('User-Agent'),
            remoteIp: req.ip
        }
        return jsonData
    }

    private convertLogLevelToEnum(logLevel) {
        if (logLevel < 100) {
            return "DEFAULT";
        }
        else if (logLevel < 200) {
            return "DEBUG"
        }
        else if (logLevel < 300) {
            return "INFO"
        }
        else if (logLevel < 400) {
            return "NOTICE"
        }
        else if (logLevel < 500) {
            return "WARNING"
        }
        else if (logLevel < 600) {
            return "ERROR"
        }
        else if (logLevel < 700) {
            return "CRITICAL"
        }
        else if (logLevel < 800) {
            return "ALERT"
        }
        else if (logLevel < 900) {
            return "EMERGENCY"
        }
        return "DEFAULT"
    }
}

export default new App().express