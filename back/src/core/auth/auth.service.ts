import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SecurityService } from '../security/security.service';
import { access } from 'fs';
import { AppConfig } from 'src/constants';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private securityService: SecurityService) {}

    async login(username: string, password: string){
        const user = await this.userService.findOneBy(username, "username");
        const isPasswordCorrect = await this.securityService.isTextEqualToHash(password, user.password);

        if (!isPasswordCorrect) throw new UnauthorizedException();

        const payload = { 
            userId: user.id, 
            username: user.username,
            date: new Date()
         };
        const accessToken = await this.jwtService.signAsync(payload);
        
        return { access_token: this.securityService.b64Encode(accessToken, AppConfig.encodingLoop) };

    }
}
