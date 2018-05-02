
import { ServiceHelper } from './service_helper';
export class BaseService {

    private get connection() {
        return ServiceHelper.idbCon;
    }

    public getDbList() {
        return this.connection.getDbList();
    }

    protected isDbExist(dbName: string) {
        return this.connection.isDbExist(dbName);
    }

    protected getDbSchema(dbName: string) {
        this.connection.getDbSchema(dbName);
    }
}