import os from 'node:os';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomLoggerService } from './logger/custom-logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: CustomLoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const rawResponse = res.write;
    const rawResponseEnd = res.end;
    const chunkBuffers = [];
    res.write = (...chunks) => {
      const resArgs = [];
      for (let i = 0; i < chunks.length; i++) {
        resArgs[i] = chunks[i];
        if (!resArgs[i]) {
          res.once('drain', res.write);
          i--;
        }
      }
      if (resArgs[0]) {
        chunkBuffers.push(Buffer.from(resArgs[0]));
      }
      return rawResponse.apply(res, resArgs);
    };
    res.end = (...chunk) => {
      const resArgs = [];
      for (let i = 0; i < chunk.length; i++) {
        resArgs[i] = chunk[i];
      }
      if (resArgs[0]) {
        chunkBuffers.push(Buffer.from(resArgs[0]));
      }
      const body = Buffer.concat(chunkBuffers).toString('utf8');
      res.setHeader('origin', 'restjs-req-res-logging-repo');
      const responseLog = {
        response: {
          statusCode: res.statusCode,
          body: JSON.parse(body) || body || {},
        },
      };
      const requestLog = {
        request: {
          url: req.baseUrl,
          method: req.method,
          query: req.query,
          body: req.body,
        },
      };
      this.logger.log({ ...requestLog, ...responseLog });
      rawResponseEnd.apply(res, resArgs);
      return responseLog as unknown as Response;
    };

    next();
  }
}
