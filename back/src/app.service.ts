import { Injectable } from '@nestjs/common';
import { join } from 'node:path';

@Injectable()
export class AppService {
  getHello(): string {
    return join(__dirname, '..', 'data');
  }
}
