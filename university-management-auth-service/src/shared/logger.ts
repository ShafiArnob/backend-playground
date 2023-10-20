/* eslint-disable no-undef */
import path from 'path';
import winston from "winston";

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(process.cwd(), "logs", "winston", "success.log"), 
      level: 'info' })
  ],
});

//only for logging errors
const errorlogger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ 
      filename: path.join(process.cwd(), "logs", "winston", "error.log"),
      level: 'error' 
    })
  ],
});

export { errorlogger, logger };

