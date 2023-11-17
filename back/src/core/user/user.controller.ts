import { Controller, Body, Post, HttpCode, HttpStatus, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { SecurityService } from '../security/security.service';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
        private securityService: SecurityService
    ) {}

    @HttpCode(HttpStatus.OK)
    @Post()
    async create(@Body() body: Record<string, any>) {
        if(!body.username || !body.password) throw new BadRequestException();
        let user: User = {
            username: body.username,
            password: await this.securityService.hash(body.password),
            email: body?.email
        }
        this.userService.insert(user, true);
    }
}
