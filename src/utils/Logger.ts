import { Logger, ILogObj } from "tslog";

class LoggerService {
    private _log: Logger<ILogObj> = new Logger();

    public silly(...args: unknown[]): void {
        this._log.silly(...args);
    }

    public debug(...args: unknown[]): void {
        this._log.debug(...args);
    }

    public trace(...args: unknown[]): void {
        this._log.trace(...args);
    }

    public info(...args: unknown[]): void {
        this._log.info(...args);
    }

    public fatal(...args: unknown[]): void {
        this._log.fatal(...args);
    }
}

export default new LoggerService();