import { Connection } from 'jsstore';

const getWorkerPath = function () {
    if (process.env.NODE_ENV === 'development') {
        return require("file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.js");
    }
    else {
        return require("file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.ie.js");
    }
};

export class ServiceHelper {
    static idbCon = new Connection(new Worker(getWorkerPath()));
}

(window as any).con = ServiceHelper.idbCon;