import { Controller, Body, Post, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.guard';
import { promisify } from 'util';
import { scrypt } from 'crypto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    /**
     * Deal with authentication, login the user and return access_token
     * @param body
     * @returns 
     */
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() body: User) {
        return this.authService.login(body.username, body.password);
    }

    /**
     * Test function that return a string even if you're not logged in
     * @param body
     * @returns 
     */
    @Public()
    @HttpCode(HttpStatus.OK)
    @Get('test/anonymous')
    async testAnonymous() {
        return "OK";
    }

    /**
     * Test function that return a string only if you're logged in
     * @param body
     * @returns 
     */
    @HttpCode(HttpStatus.OK)
    @Get('test/guard')
    test() {
        return "OK";
    }
}
