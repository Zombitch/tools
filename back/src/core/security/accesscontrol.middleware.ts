import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AppConfig } from '../../../assets/constants';

@Injectable()
export class AccessControlMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey || apiKey !== AppConfig.apiKey) {
      throw new UnauthorizedException('Invalid API key');
    }

    if(!AppConfig.allowOrigin.includes(req.headers.origin)){
      throw new UnauthorizedException('Non autorisé');
    }

    next();
  }
}
