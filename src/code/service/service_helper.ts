import * as JsStore from 'jsstore';
import * as workerPath from "file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.min.js";

export class ServiceHelper {
    static idbCon = new JsStore.Instance(new Worker(workerPath));
}