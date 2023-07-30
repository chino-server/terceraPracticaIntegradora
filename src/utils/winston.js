import winston from "winston";
import config from "../config.js";

const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: "red",
    error: "red",
    warning: "yellow",
    info: "blue",
    http: "blue",
    debug: "black",
  },
};

winston.addColors(customLevels.colors);

let transports = [];

if (config.node_env === "development") {
  transports.push(
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.simple()
      ),
    })
  );
} else if (config.node_env === "production") {
  transports.push(
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      level: "error",
      filename: "errors.log",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint()
      ),
    })
  );
}

export const logger = winston.createLogger({
  levels: customLevels.levels,
  transports: transports,
});


