import Vue from "vue";
import { Component } from "vue-property-decorator";
import Menu from "../component/menu.vue";
import DbInfo from "../component/db_info.vue";
import QueryExecutor from "../component/query_executor.vue";
import Start from "../component/start.vue";
import { vueEvent } from "../common_var";
import "../css/common.css";
import { Util } from "../util";
import { EVENTS } from "../enums/events";
import { store } from "../store/store";
import { ServiceHelper } from "../service/service_helper";
import { mapState } from "vuex";

declare var ace;
ace.config.set("workerPath", "assets/scripts");
ace.config.set("themePath", "assets/scripts");

@Component({
    components: {
        Menu,
        DbInfo,
        QueryExecutor,
        Start
    },
    computed:{
        ...mapState(['activeDbName'])
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
            ServiceHelper.idbCon.logStatus = true;
        }
    }

    private catchEvent() {
        vueEvent.$on(EVENTS.OnError, errMessage => {
            alert(errMessage);
        });
    }
}