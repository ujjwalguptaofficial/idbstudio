import Vue from "vue";
import { Component } from "vue-property-decorator";
import { DemoService } from "../service/demo_service";
import { vueEvent } from "../common_var";
import { Util } from "../util";

@Component
export default class Start extends Vue {
    selectedDb = "null";
    dbList: string[] = [];

    mounted() {
        var demoServiceInstance = new DemoService();
        demoServiceInstance.isDemoDbExist().then(isExist => {
            if (isExist) {
                setTimeout(() => {
                    this.getDbList();
                }, 1000);
            } else {
                demoServiceInstance.createDemoDataBase().then(() => {
                    this.getDbList();
                });
            }
        });
    }

    setDbNameFromQryString(dbList: string[]) {
        var dbName = Util.getParameterByName("db");
        if (!Util.isNull(dbName)) {
            const index = dbList.findIndex(qry => qry === dbName);
            // console.log(index);
            if (index >= 0) {
                // console.log(dbName);
                this.selectedDb = dbName as string;
                this.connectDb();
            }
        }
    }

    getDbList() {
        var demoServiceInstance = new DemoService();
        demoServiceInstance.getDbList().then(list => {
            this.setDbNameFromQryString(list);
            this.dbList = list;
        });
    }

    connectDb() {
        if (this.selectedDb != "null") {
            vueEvent.$emit("page_loaded", this.selectedDb);
        } else {
            vueEvent.$emit("on_error", "Please select a valid database");
        }
    }
}