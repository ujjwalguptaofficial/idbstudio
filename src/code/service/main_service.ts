import { BaseService } from "./base_service";
import { IResult } from "../interfaces/result";
import { Config } from "jsstore";
export class MainService extends BaseService {
    constructor() {
        super();
    }

    public executeQry(query: string): Promise<IResult> {
        if (Config.isLogEnabled === true) {
            console.log("qry from service - " + query);
        }
        return new Promise((resolve, reject) => {
            var startTime = performance.now();
            this.evaluateQry_(query).then(qryResult => {
                const idbResult: IResult = {
                    timeTaken: (performance.now() - startTime) / 1000,
                    result: qryResult
                };
                resolve(idbResult);
                if (Config.isLogEnabled === true) {
                    console.log("result from service evaluated");
                }
            }).catch(err => {
                reject(err);
            });
        });
    }

    private evaluateQry_(query: string) {
        return eval(query);
    }
}