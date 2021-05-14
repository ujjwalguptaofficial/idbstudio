import { BaseService } from "./base_service";
import { IResult } from "../interfaces/result";

export class MainService extends BaseService {

    public executeQry(query: string): Promise<IResult> {
        const con = this.connection;
        const isLogEnabled = con.logger.status
        if (isLogEnabled) {
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
                if (isLogEnabled === true) {
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