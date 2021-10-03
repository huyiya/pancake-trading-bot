import winston from 'winston'

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.timestamp({
      format: 'HH:mm:ss.SSS A'
    }),
    winston.format.colorize(),
    winston.format.printf(log => {
      if (log.stack) {
        return `[${log.timestamp}] [${log.level}] ${log.stack}`
      }
      return `[${log.timestamp}] [${log.level}] ${log.message}`
    })
  ),
  transports: [
    new winston.transports.Console()
  ]
})

export default logger