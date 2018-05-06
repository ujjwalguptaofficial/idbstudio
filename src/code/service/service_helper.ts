import * as JsStore from 'jsstore';
import * as workerPath from "file-loader?name=[name].js!jsstore/dist/jsstore.worker.js";
// import * as jsstoreWorker from 'jsstore/dist/jsstore.worker.js';
// import Worker from "worker-loader?publicPath=./scripts/&name=jsstore.worker.js!jsstore/dist/jsstore.worker.js";

// export class ServiceHelper {
//     static idbCon = new JsStore.Instance(new Worker(jsstoreWorker));
// }

export class ServiceHelper {
    static idbCon = new JsStore.Instance(new Worker(workerPath));
}