import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import * as bcrypt from 'bcrypt';
import { AppConfig } from 'src/constants';
import { promisify } from 'util';

@Injectable()
export class SecurityService {
     private readonly iv: Buffer = randomBytes(16);
     private key: Buffer = null;

    /**
     * Encrypt a string
     * @param text String that will be process to be encrypted
     * @param key Buffer representing key to secure the encryption method
     * @returns Promise with buffer (encrypted data) as parameter
     */
    async encrypt(text: string): Promise<Buffer>{
        if(!this.key) this.key = (await promisify(scrypt)(AppConfig.cryptKey, 'salt', 32)) as Buffer;

        const cipher = createCipheriv('aes-256-ctr', this.key, this.iv);
        
        const textToEncrypt = text;
        return Buffer.concat([
          cipher.update(textToEncrypt),
          cipher.final(),
        ]);
    }

    /**
     * Decrypt a value
     * @param Decrypt a string 
     * @param key Buffer representing key to secure the encryption method
     * @returns Buffer decrypted password
     */
    async decrypt(encryptedText: Buffer): Promise<Buffer>{
        if(!this.key) this.key = (await promisify(scrypt)(AppConfig.cryptKey, 'salt', 32)) as Buffer;
        const decipher = createDecipheriv('aes-256-ctr', this.key, this.iv);
        return Buffer.concat([
            decipher.update(encryptedText),
            decipher.final(),
        ]);
    }

    /**
     * Hash a string
     * @param text
     * @returns Promise
     */
    async hash(text: string): Promise<any>{
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(text, saltOrRounds);
        return hash;
    }

    /**
     * Check if text is the same as hash
     * @param text 
     * @param hash 
     * @returns 
     */
    isTextEqualToHash(text: string, hash: string): Promise<boolean>{
        return bcrypt.compare(text, hash);
    }

    b64Encode(value: string, loop: number = 1): string{
        if(loop === 0) return value;
        else return this.b64Encode(btoa(value), --loop);
    }

    b64Decode(value: string, loop: number = 1): string{
        if(loop === 0) return value;
        else return this.b64Decode(atob(value), --loop);
    }
}
