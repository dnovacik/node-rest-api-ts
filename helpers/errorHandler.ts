
import { Request, Response, NextFunction } from 'express'
import logger from './logger'

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.log({
    level: 'error',
    message: err.message || err.name
  })

  if (typeof (err) === 'string') {
    return res.status(400).json({
      success: false,
      message: err
    })
  }

  if (err.name === 'ValidationError') {
    const splitted = err.message.split(':');
    const customMessage = splitted[splitted.length - 1].trim();

    return res.status(400).json({
      success: false,
      message: customMessage
    });
  }

  if (err.name === 'UnathorizedError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid Token'
    });
  }

  return res.status(500).json({
    success: false,
    message: err.message
  });
}