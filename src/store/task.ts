import { DemoService } from "../service/demo_service";
import { Task } from "godam";
import { RootState } from "./states";

export class RootTask extends Task<RootState> {
    async getDbList() {
        var demoServiceInstance = new DemoService();
        let list = [{
            name: demoServiceInstance.dbName,
            version: demoServiceInstance.version
        }];
        try {
            list = await demoServiceInstance.getDbList();
        } catch (error) {

        }
        this.set("SET_DB_LIST", list);
    }
}