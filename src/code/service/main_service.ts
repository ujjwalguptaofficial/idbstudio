import { BaseService } from "./base_service";
import { IResult } from "../interfaces";
export class MainService extends BaseService {
    constructor() {
        super();
    }

    public openDb(dbName: string) {
        return this.connection.openDb(dbName);
    }

    public getDbSchema(dbName) {
        return this.connection.getDbSchema(dbName);
    }

    public executeQry(api: string, option: object) {
        var startTime = performance.now();
        return new Promise((resolve, reject) => {
            this.connection[api](option).then(qryResult => {
                const idbResult: IResult = {
                    timeTaken: (performance.now() - startTime) / 1000,
                    result: qryResult
                };
                resolve(idbResult);
            }).catch(err => {
                reject(err);
            });
        });
    }
}