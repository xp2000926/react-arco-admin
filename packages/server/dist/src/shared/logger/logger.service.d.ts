import { Logger } from 'winston';
export declare class AppLogger {
    private context?;
    private logger;
    setContext(context: string): void;
    constructor();
    error(ctx: any, message: string, meta?: Record<string, any>): Logger;
    warn(ctx: any, message: string, meta?: Record<string, any>): Logger;
    debug(ctx: any, message: string, meta?: Record<string, any>): Logger;
    info(ctx: any, message: string, meta?: Record<string, any>): Logger;
}
