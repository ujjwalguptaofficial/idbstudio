import Vue from "vue";
import { Component } from "vue-property-decorator";
import { DemoService } from "../service/demo_service";
import { vueEvent } from "../common_var";
import { Util } from "../util";
import { STORE_MUTATION } from "../enums/store_mutation";
import { EVENTS } from "../enums/events";
import { mapState, mapGetters } from "vuex";
import InputDb from "../component/input_db.vue";

@Component({
    components: {
        InputDb
    },
    computed: {
        ...mapState(['isPageLoaded']),
        ...mapGetters({
            dbNames: 'dbNames'
        })
    }
})
export default class Start extends Vue {
    isDbListFailed = false;
    shouldShowInputDb = false;
    dbNames;
    get selectedDb() {
        return this.$store.state.activeDbName;
    }

    set selectedDb(value) {
        this.$store.commit(STORE_MUTATION.SetActiveDb, value);
    }



    async mounted() {
        var demoServiceInstance = new DemoService();
        try {
            const isExist = demoServiceInstance.createDemoDataBase();
            if (isExist) {
                if (Util.getParameterByName("drop") === "true") {
                    await demoServiceInstance.dropDb();
                    await demoServiceInstance.createDemoDataBase();
                }
                return new Promise<any>((res) => {
                    setTimeout(() => {
                        this.getDbList().then(res)
                    }, 1000);
                })

            } else {
                return this.getDbList();
            }
        } catch (error) {
            const msg = error.message || "Some error occured, please create an issue on github.";
            vueEvent.$emit(EVENTS.OnError, msg);
        }

    }

    setDbNameFromQryString(dbList: string[]) {
        var dbName = Util.getParameterByName("db");
        if (!Util.isNull(dbName)) {
            const index = dbList.findIndex(qry => qry === dbName);
            // console.log(index);
            if (index >= 0) {
                // console.log(dbName);
                this.selectedDb = dbName as string;
            }
        }
        this.$store.commit(STORE_MUTATION.SetPageLoaded, true);
    }

    async getDbList() {
        this.$store.dispatch("getDbList");
        this.setDbNameFromQryString(this.dbNames);
    }
    toggleInputDb() {
        this.shouldShowInputDb = !this.shouldShowInputDb;
    }

    onSelectDb(value) {
        this.$store.commit("ADD_DB", value);
        this.selectedDb = value.name;
    }
}