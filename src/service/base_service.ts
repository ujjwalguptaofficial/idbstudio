
import { ServiceHelper } from './service_helper';
import { Config } from 'jsstore';
export class BaseService {

    constructor() {
        this.connection.setLogStatus(Config.isLogEnabled);
    }

    public openDb(dbName: string) {
        return this.connection.openDb(dbName);
    }

    public getDbSchema(dbName: string) {
        return this.connection.getDbSchema(dbName);
    }

    protected get connection() {
        return ServiceHelper.idbCon;
    }

    public getDbList() {
        return this.connection.getDbList();
    }

    public isDbExist(dbName: string) {
        return this.connection.isDbExist(dbName);
    }

}