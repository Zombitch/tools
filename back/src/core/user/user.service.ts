import { Injectable } from '@nestjs/common';
import { DataService } from '../abstract/data.service';

@Injectable()
export class UserService extends DataService{

    constructor() {
        super();
        this.databaseFilename = "users.json";
    }

    /**
     * Find one user by its name
     * @param username 
     * @returns 
     */
    async findOneBy(valueToLookFor: string, field: string = "id"): Promise<User | undefined> {
        return (super.findOneBy(valueToLookFor, field) as unknown as User);
    }

    /**
     * Create a new user
     * @param username
     * @returns 
     */
    async insert(newUser: User, save: boolean = true): Promise<void> {
        super.insert(newUser, save);
    }

    /**
     * Upsert a user
     * @param username 
     * @returns 
     */
    async upsert(user: User, save: boolean = true): Promise<void> {
        super.upsert(user, save);
    }
}
