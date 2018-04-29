import {BaseService, idb_con} from "./base_service";
import {IResult} from "../interfaces";
export class MainService extends BaseService
{
    _dbName = "Demo";
    constructor()
    {
        super();
    }

    public openDb(dbName : string, onSuccess, onErr)
    {
        return idb_con.openDb(dbName, onSuccess, onErr);
    }

    public getDbInfo(dbName)
    {
        return new Promise((resolve, reject) => {
            this.getDbSchema(dbName, (schema) => {
                resolve(schema);
            });
        });
    }

    public executeQry(api : string, option : object)
    {
        var startTime = performance.now();
        return new Promise((resolve, reject) => {
            idb_con[api](option).then(qryResult => {
                const idbResult : IResult = {
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