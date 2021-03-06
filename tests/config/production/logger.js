
'use strict'

const winston = require('winston')
const logBaseDir = require('./index.js').logBaseDir
const rotate = require('winston-daily-rotate-file')
const path = require('path')
const pkg = require(path.join(process.cwd(),'package'))

module.exports={
    
}

const logFloodesh = winston.loggers.get("floodesh")
, logClient = winston.loggers.get("Client")
, logWorker = winston.loggers.get("Worker")
, logServer = winston.loggers.get("JobServer")
, logJob = winston.loggers.get("Job")
, logLB = winston.loggers.get("LBStrategy")
, logProtocol = winston.loggers.get("protocol");

logFloodesh.configure({
    level: 'info',
    transports: [
	new rotate({datePattern:'yyyy-MM-dd',filename: logBaseDir+`/${pkg.name}/floodesh.log`})
    ]
});

const gearmanRotate = new rotate({datePattern:'yyyy-MM-dd',filename: logBaseDir+`/${pkg.name}/gearman.log`});

logClient.configure({
    level:'debug',
    transports: [
	gearmanRotate
    ]
});

logWorker.configure({
    level:'debug',
    transports: [
	gearmanRotate
    ]
});

logServer.configure({
    level:'debug',
    transports: [
	gearmanRotate
    ]
});

logJob.configure({
    level:'debug',
    transports: [
	gearmanRotate
    ]
});

logLB.configure({
    level:'debug',
    transports: [
	gearmanRotate
    ]
});

logProtocol.configure({
    level:'debug',
    transports: [
	gearmanRotate
    ]
});


logClient.cli()
logWorker.cli()
logServer.cli()
logJob.cli()
logLB.cli()
logProtocol.cli()

