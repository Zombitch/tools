import { Injectable } from '@nestjs/common';
import { join } from 'node:path';
import { access, constants, readFile } from 'node:fs/promises';
import { Logger } from '@nestjs/common';

@Injectable()
export class SystemService {
    logger = new Logger(SystemService.name);

    constructor() {}

    static getAppPath(): string{
        return join(__dirname, '..', '..', '..');
    }
}