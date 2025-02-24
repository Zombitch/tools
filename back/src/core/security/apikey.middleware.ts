import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AppConfig } from '../../constants';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'];

    if (apiKey && apiKey === AppConfig.apiKey) {
      next();
    } else {
      throw new UnauthorizedException('Invalid API key');
    }
  }
}
