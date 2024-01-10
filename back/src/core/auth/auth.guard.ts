
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppConfig } from '../../constants';
import { Request } from 'express';
import { SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SecurityService } from '../security/security.service';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
      private jwtService: JwtService, 
      private reflector: Reflector,
      private securityService: SecurityService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);

      if (isPublic) {
        return true;
      }

      if (!token) {
        throw new UnauthorizedException();
      }

      try {
        const decodedToken = this.securityService.b64Decode(token, AppConfig.encodingLoop);
        const payload = await this.jwtService.verifyAsync(decodedToken, { secret: AppConfig.jwtSecret, });
        request['user'] = payload;
      } catch {
        throw new UnauthorizedException();
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }
  
export const IS_PUBLIC_KEY = 'isPublic';
export const AllowAnonymous = () => SetMetadata(IS_PUBLIC_KEY, true);