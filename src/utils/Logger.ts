import winston from "winston";
import "winston-daily-rotate-file";

export class Logger {
  private transport: winston.transport;

  /**
   * Initializes a new instance of the Logger class, setting up a transport
   * for logging to a daily rotated file. The log files are compressed and
   * retained for 14 days, with a maximum size of 1MB each. Logs with severity
   * level "error" and above are recorded, and exceptions are handled.
   */
  constructor() {
    this.transport = new winston.transports.DailyRotateFile({
      filename: "./logs/app-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "1m",
      maxFiles: "14d",
      level: "error",
      handleExceptions: true,
    });
  }

  /**
   * Sets up a logger for use in the application. The logger is configured
   * to log at the "silly" level, and logs are formatted in JSON format with
   * a timestamp and label. The logger logs to the transport set up in the
   * constructor, which is a daily rotated file.
   *
   * @returns {winston.Logger} The configured logger.
   */
  public setLogger(): winston.Logger {
    return winston.createLogger({
      level: "silly",
      format: winston.format.combine(
        winston.format.json({ space: 2 }),
        winston.format.timestamp({ format: "YYYY-MM-DD hh:mm:ss.SSS A" }),
        winston.format.label({ label: "[LOGGER]" }),
        winston.format.printf(
          (info) =>
            ` ${info.label} ${info.timestamp} ${info.level} : ${info.message}`
        )
      ),
      transports: [this.transport],
    });
  }
}

const Log = new Logger().setLogger();

export default Log;
