
import { ServiceHelper } from './service_helper';
export class BaseService {

    public openDb(dbName: string, version?) {
        return this.connection.openDb(dbName, version);
    }


    protected get connection() {
        return ServiceHelper.idbCon;
    }

    public getDbList() {
        return this.connection.getDbList();
    }

    public select(tableName: string) {
        return this.connection.select({
            from: tableName
        });
    }

}