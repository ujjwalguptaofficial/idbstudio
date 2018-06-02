import { BaseService } from "./base_service";
import { IResult } from "../interfaces/result";
export class MainService extends BaseService {
    constructor() {
        super();
    }

    public executeQry(query: string): Promise<IResult> {
        return new Promise((resolve, reject) => {
            var startTime = performance.now();
            this.evaluateQry_(query).then(qryResult => {
                // console.log(qryResult);
                const idbResult: IResult = {
                    timeTaken: (performance.now() - startTime) / 1000,
                    result: qryResult
                };
                resolve(idbResult);
            }).catch(err => {
                reject(err);
            });
            // console.log('api:' + api + 'option:' + option);
            // this.connection[api](option).then(qryResult => {
            //     // console.log(qryResult);
            //     const idbResult: IResult = {
            //         timeTaken: (performance.now() - startTime) / 1000,
            //         result: qryResult
            //     };
            //     resolve(idbResult);
            // }).catch(err => {
            //     reject(err);
            // });
        });
    }

    private evaluateQry_(query: string) {
        return eval(query);
    }
}