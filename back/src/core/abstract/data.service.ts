import { Injectable } from '@nestjs/common';
const { join } = require('node:path');
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { SystemService } from '../system/system.service';
import { Logger } from '@nestjs/common';

@Injectable()
export class DataService {
    protected readonly logger = new Logger(DataService.name);
    protected lock: boolean = false;
    protected databaseFilename: string = "";
    protected dataDir: string = join(__dirname, '..', 'data/');
    protected data: DataElement[] = [];

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
        if(this.databaseFilename && (this.data.length === 0 || force)){
            const contents = await readFile(this.getFilepath(), { encoding: 'utf8' });
            this.data = JSON.parse(contents);
            return this.data;
        }
    }

    /**
     * Clear and remove data from memory
     */
    public clear(): void{
        this.data = [];
    }

    /**
     * Create a backup
     */
    public backup(): void{
        writeFile(this.getFilepath()+".backup", JSON.stringify(this.data), { encoding: 'utf8' });
    }

    /**
     * Persist data
     * @param data
     * @returns 
     */
    public saveAsJson(dataToSave: {}): Promise<void>{
        return writeFile(this.getFilepath(), JSON.stringify(dataToSave), { encoding: 'utf8' });
    }

    /**
     * Find one data by its name
     * @param username 
     * @returns 
     */
    public async findOneBy(valueToLookFor: string|number, field: string = "id"): Promise<DataElement | undefined> {
        return this.data.find(element => element[field] === valueToLookFor);
    }

    /**
     * Create a new data
     * @param data
     * @returns 
     */
    public async insert(newData: DataElement, save: boolean = true): Promise<void> {
        //Check if data exists (if it already has an id) before creating a new one
        if(newData.id) this.logger.debug("Existing data cannot be created");
        else if(!this.lock){
            this.lock = true;
            if(this.data.length > 0){
                this.data.sort((a, b) => a.id - b.id);
                newData.id = (this.data[this.data.length-1].id) + 1;
            }else{
                newData.id = 0;
            }
            this.data.push(newData);
            if(save) await this.saveAsJson(this.data);
            this.lock = false;
        }else{
            this.logger.debug("Data locked. The database is being processed and cannot manage new operation at the moment.");
        }
    }

    /**
     * Upsert a data
     * @param dataElement
     * @param save 
     * @returns 
     */
    public async upsert(newData: DataElement, save: boolean = true): Promise<void> {
        let existingData: DataElement = await this.findOneBy(newData.id);

        // If data exists update it, otherwise create it
        if(existingData){
            const dataId: number = existingData.id;
            existingData = newData;
            existingData.id = dataId;
        }
        else{
            this.data.push(newData);
        }

        if(save) await this.saveAsJson(this.data);
    }
}
