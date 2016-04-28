var winston = require('winston');
var fs = require('fs');
var _ = require('lodash');

winston.emitErrs = true;

var logDir = 'logs';
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

//add custom logging levels
var levels = _.clone(winston.config.syslog.levels);
var colors = _.clone(winston.config.syslog.colors);
colors.warning = 'yellow';

/*posibilities
    - debug
    - info
    - notice
    - warning
    - error
    - crit
    - alert
    - emerg
*/

var logger = new winston.Logger({
    levels: levels,
    colors: colors,
    exceptionHandlers: [
        new winston.transports.File({filename: 'logs/exceptions.log'}),
        new(winston.transports.Console)({
            colorize: true,
            timestamp: true
        })
    ],
    transports: [
        new(winston.transports.Console)({
            colorize: true,
            timestamp: true
        }),
        new winston.transports.File({
            name: 'info-file',
            level: 'info',
            filename: 'logs/all-logs.log',
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.File({
            name: 'error-file',
            level: 'error',
            filename: 'logs/error-logs.log',
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.File({
            name: 'request-file',
            level: 'request',
            filename: 'logs/requests.log',
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        })
    ],
    exitOnError: false
});

module.exports = logger;