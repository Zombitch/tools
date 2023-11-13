import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SecurityService {

    /**
     * Encrypt a string
     * @param text String that will be process to be encrypted
     * @param iv Buffer randomBytes(x)
     * @param key Buffer representing key to secure the encryption method
     * @returns Promise with buffer (encrypted data) as parameter
     */
    async encrypt(text: string, iv: Buffer, key: Buffer): Promise<Buffer>{
        //const iv = randomBytes(16);
        //const key = (await promisify(scrypt)(text, 'salt', 32)) as Buffer;

        const cipher = createCipheriv('aes-256-ctr', key, iv);
        
        const textToEncrypt = 'Nest';
        return Buffer.concat([
          cipher.update(textToEncrypt),
          cipher.final(),
        ]);
    }

    /**
     * Decrypt a value
     * @param Decrypt a string 
     * @param iv Buffer randomBytes(x)
     * @param key Buffer representing key to secure the encryption method
     * @returns Buffer decrypted password
     */
    decrypt(encryptedText: Buffer, iv: Buffer, key: Buffer): Buffer{
        const decipher = createDecipheriv('aes-256-ctr', key, iv);
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
}
