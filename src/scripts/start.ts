import Vue from "vue";
import { Component } from "vue-property-decorator";
import { DemoService } from "../service/demo_service";
import { vueEvent } from "../common_var";
import { Util } from "../util";
import { store } from "../store/store";
import { STORE_MUTATION } from "../enums/store_mutation";
import { EVENTS } from "../enums/events";

@Component
export default class Start extends Vue {
    get selectedDb() {
        return store.state.activeDbName
    }

    set selectedDb(value) {
        store.commit(STORE_MUTATION.SetActiveDb, value);
    }

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
            store.commit(STORE_MUTATION.SetPageLoaded, true);

        } else {
            vueEvent.$emit(EVENTS.OnError, "Please select a valid database");
        }
    }
}