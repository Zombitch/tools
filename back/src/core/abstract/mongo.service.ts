import { Injectable } from '@nestjs/common';
const { join } = require('node:path');
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { SystemService } from '../system/system.service';
import { Logger } from '@nestjs/common';
import { DataService } from './data.service';

@Injectable()
export class MongoService extends DataService {
    protected readonly logger = new Logger(MongoService.name);

    /**
     * Get filepath to database entity
     * @returns
     */
    protected getFilepath(){
        return SystemService.getAppPath() + '/data/' + this.databaseFilename;
    }

    /**
     * Load users data in server memory
     * @param force Force to reload data
     */
    public async load(force: boolean = false): Promise<{}>{
        return;
    }

    /**
     * Create a backup
     */
    public backup(): void{

    }

    /**
     * Persist data
     * @param data
     * @returns 
     */
    public saveAsJson(dataToSave: {}): Promise<void>{
        return;
    }

    /**
     * Find one data by its name
     * @param username 
     * @returns 
     */
    public async findOneBy(valueToLookFor: string|number, field: string = "id"): Promise<DataElement | undefined> {
        return;
    }

    /**
     * Create a new data
     * @param data
     * @returns 
     */
    public async insert(newData: DataElement, save: boolean = true): Promise<void> {
        return;
    }

    /**
     * Upsert a data
     * @param data 
     * @returns 
     */
    public async upsert(newData: DataElement, save: boolean = true): Promise<void> {
        let existingData: DataElement = await this.findOneBy(newData.id);

        // If data exists update it, otherwise create it
        if(existingData){
            
        }
        else{
            
        }
    }
}
