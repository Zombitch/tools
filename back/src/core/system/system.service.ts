import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'node:path';

@Injectable()
export class SystemService {
    constructor(private configService: ConfigService) {}

    static getAppPath(): string{
        return join(__dirname, '..', '..', '..');
    }
}