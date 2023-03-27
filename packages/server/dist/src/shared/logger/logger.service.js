"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppLogger = void 0;
const winston_1 = require("winston");
class AppLogger {
    setContext(context) {
        this.context = context;
    }
    constructor() {
        this.logger = (0, winston_1.createLogger)({
            level: process.env.LOGGER_LEVEL,
            format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.prettyPrint()),
            transports: [
                new winston_1.transports.File({
                    filename: 'logs/error.log',
                    level: 'error',
                }),
                new winston_1.transports.File({ filename: 'logs/combined.log' }),
                new winston_1.transports.Console(),
            ],
        });
    }
    error(ctx, message, meta) {
        return this.logger.error(Object.assign({ message, contextName: this.context, ctx }, meta));
    }
    warn(ctx, message, meta) {
        return this.logger.warn(Object.assign({ message, contextName: this.context, ctx }, meta));
    }
    debug(ctx, message, meta) {
        return this.logger.debug(Object.assign({ message, contextName: this.context, ctx }, meta));
    }
    info(ctx, message, meta) {
        return this.logger.info(Object.assign({ message, contextName: this.context, ctx }, meta));
    }
}
exports.AppLogger = AppLogger;
//# sourceMappingURL=logger.service.js.map