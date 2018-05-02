import * as JsStore from 'jsstore';
import * as jsstoreWorker from 'jsstore/dist/jsstore.worker.js';
export class ServiceHelper {
    static idbCon = new JsStore.Instance(new Worker(jsstoreWorker));
}