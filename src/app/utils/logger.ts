import winston, { format, transports } from 'winston';
import moment from 'moment';

const { combine, colorize, printf } = format;

const myFormat = printf(({ level, message }) => {
  return `${moment()
    .format('YYYY-MM-DD HH:mm:ss')
    .trim()} [${level}] - ${message}`;
});

const winstonLogger = winston.createLogger({
  level: 'debug',
  format: combine(colorize(), myFormat),
  transports: [new transports.Console()],
});

export default winstonLogger;
