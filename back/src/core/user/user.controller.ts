import { Controller, Body, Post, HttpCode, HttpStatus, BadRequestException, ForbiddenException } from '@nestjs/common';
import { UserService } from './user.service';
import { SecurityService } from '../security/security.service';
import { AllowAnonymous } from '../auth/auth.guard';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
        private securityService: SecurityService
    ) {}

    @AllowAnonymous()
    @HttpCode(HttpStatus.OK)
    @Post()
    async create(@Body() body: Record<string, any>) {
        if(!body.username || !body.password) throw new BadRequestException("Empty values are not allowed.");
        let user: User = {
            username: body.username.toString(),
            password: await this.securityService.hash(body.password.toString()),
            email: body?.email.toString()
        }

        const usernameDoesExist = await this.userService.findOneBy(body.username, "username");
        if(usernameDoesExist) throw new ForbiddenException("Error while trying to create the account.");
        
        this.userService.insert(user, true);
    }
}
