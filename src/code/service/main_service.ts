import { BaseService } from "./base_service";
import { IResult } from "../interfaces/result";
export class MainService extends BaseService {
    constructor() {
        super();
    }

    public executeQry(api: string, option: object): Promise<IResult> {
        var startTime = performance.now();
        return new Promise((resolve, reject) => {
            // console.log('api:' + api + 'option:' + option);
            this.connection[api](option).then(qryResult => {
                // console.log(qryResult);
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