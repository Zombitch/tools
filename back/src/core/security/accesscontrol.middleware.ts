import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AccessControlMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey || apiKey !== process.env.apiKey) {
      throw new UnauthorizedException('Invalid API key');
    }

    if(req.headers.origin && !process.env.allowOrigin?.replaceAll('[',"").replaceAll(']',"").replaceAll(/\s+/g,"").split(",").includes(req.headers.origin)){
      console.warn(req.headers.origin + " non autorisé à accéder au site")
      throw new UnauthorizedException('Non autorisé');
    }

    next();
  }
}
