import { describe, it, expect } from "bun:test";
import Log, { Logger } from "./Logger";

describe("Logger Test", () => {
  it("should create a logger", () => {
    const logger = new Logger();
    expect(logger).toBeInstanceOf(Logger);
  });

  // example error logging
  it("should log an error", () => {
    const logger = new Logger().setLogger();
    logger.error("This is an error message");
  });

  // example info logging
  it("should log an info message", () => {
    Log.info("This is an info message");
  });
});
