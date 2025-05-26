import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SecurityService } from '../security/security.service';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private securityService: SecurityService) {}

    async login(username: string | undefined, password: string | undefined){
        if(!username || !password) throw new BadRequestException("Missing parameters");

        const user = await this.userService.findOneByUsername(username);
        const isPasswordCorrect = await this.securityService.isTextEqualToHash(password, user?.password);
        
        if (!isPasswordCorrect) throw new UnauthorizedException();

        const payload = { 
            username: user?.username,
            date: new Date()
        };
        
        console.log(process.env.jwtSecret)
        const accessToken = await this.jwtService.signAsync(payload);
        return { access_token: this.securityService.b64Encode(accessToken, (process.env.encodingLoop as unknown as number)) };
    }
}
