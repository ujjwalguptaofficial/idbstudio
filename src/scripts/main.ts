import Vue from "vue";
import { Component } from "vue-property-decorator";
import Menu from "../component/menu.vue";
import DbInfo from "../component/db_info.vue";
import QueryExecutor from "../component/query_executor.vue";
import Start from "../component/start.vue";
import { vueEvent } from "../common_var";
import "../css/common.css";
import { Util } from "../util";
import { Config } from "jsstore";

declare var ace;
ace.config.set("workerPath", "assets/scripts");
ace.config.set("themePath", "assets/scripts");

@Component({
    components: {
        Menu,
        DbInfo,
        QueryExecutor,
        Start
    }
})
export default class Main extends Vue {
    isPageLoaded = false;
    selectedDb;
    constructor() {
        super();
        this.catchEvent();
        this.setLogFromUrl();
    }

    setLogFromUrl() {
        var log = Util.getParameterByName("log");
        if (!Util.isNull(log)) {
            Config.isLogEnabled = log == "1" ? true : false;
        }
    }

    togglePageLoadedStatus() {
        this.isPageLoaded = !this.isPageLoaded;
    }

    private catchEvent() {
        vueEvent.$on("on_error", errMessage => {
            alert(errMessage);
        });

        vueEvent.$on("page_loaded", dbName => {
            this.selectedDb = dbName;
            this.togglePageLoadedStatus();
        });
    }
}