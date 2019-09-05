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
import { EVENTS } from "../enums/events";
import { store } from "../store/store";

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
export default class App extends Vue {

    get isPageLoaded() {
        return store.state.isPageLoaded;
    }

    constructor() {
        super();
        this.catchEvent();
        this.setLogFromUrl();
    }

    setLogFromUrl() {
        var log = Util.getParameterByName("log");
        if (!Util.isNull(log)) {
            Config.isLogEnabled = true;
        }
    }

    private catchEvent() {
        vueEvent.$on(EVENTS.OnError, errMessage => {
            alert(errMessage);
        });
    }
}