import { API } from "../enum";

export class QueryHelper {
    query: string;
    errMessage: string = "";
    constructor(query) {
        this.query = query;
    }

    validateAndModifyQry() {
        var qry;
        var isAnyApiFound = false;
        //console.log(this.allowedApi);
        this.allowedApi.forEach((api) => {
            // every api call will have a open paranthesis after
            const index = this.query.indexOf(api + "(");
            if (index >= 0) {
                isAnyApiFound = true;
                this.query = `${this.query.substring(0, index)}con.
                ${this.query.substring(index, this.query.length)}`;
            }
        });
        if (!isAnyApiFound) {
            this.errMessage = "No valid api was found";
        }
        return !this.errMessage.length;
    }

    get allowedApi() {
        return [
            API.Select,
            API.Insert,
            API.Remove,
            API.Update,
            API.IsDbExist,
            API.Clear,
            API.Count,
            API.DropDb,
            API.ExportJson,
            API.Transaction,
            API.RunSql,
            API.Union,
            API.Intersect
        ]
    }

    private isQryValid_() {
        const fn = eval(this.query);
        if (typeof fn.then === 'function') {
            return true;
        }
        else {
            this.errMessage = "The query should return a promise";
        }
        return false;
    }
} 