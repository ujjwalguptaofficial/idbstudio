import Vue from "vue";
import { Component } from "vue-property-decorator";
import { MainService } from "../service/main_service";
import { IDataBase } from "jsstore";
import { vueEvent } from "../common_var";
import contextMenu from "vue-context-menu";
import { store } from "../store/store";
import { EVENTS } from "../enums/events";

@Component({

  components: {
    contextMenu
  }
})
export default class DbInfo extends Vue {
  get selectedDb() {
    return store.state.activeDbName;
  }
  dbInfo: IDataBase = { tables: [] } as any;

  dbList: string[] = [];
  menuData = {};

  constructor() {
    super();
    this.catchEvent();
  }
  mounted() {
    this.setDbInfo(true);
  }

  onCtxOpen(value) {
    this.menuData = value;
  }

  onCtxOff() {
    this.menuData = {};
  }

  setDbInfo(isFirstLoad: Boolean) {
    var mainService = new MainService();
    mainService.openDb(this.selectedDb);
    mainService.getDbSchema(this.selectedDb).then(result => {
      this.dbInfo = result;
    });
    mainService.getDbList().then(list => {
      this.dbList = list;
    });
    if (isFirstLoad === true) {
      vueEvent.$emit(EVENTS.DbInfoLoaded);
    }
  }

  catchEvent() {

  }

  select100() {
    var table = (this.menuData as any).table;
    var qry = `select({
      from:'${table}',
      limit:100\n})`;
    this.setAndRunQuery(qry);
  }

  countTotal() {
    var table = (this.menuData as any).table;
    var qry = `count({
      from:'${table}'\n})`;
    this.setAndRunQuery(qry);
  }

  exportJson() {
    var table = (this.menuData as any).table;
    var qry = `exportJson({
      from:'${table}'\n})`;
    this.setAndRunQuery(qry);
  }

  setAndRunQuery(qry: string) {
    vueEvent.$emit(EVENTS.SetQuery, qry);
    vueEvent.$emit(EVENTS.RunQuery);
  }

  onDbChange() {
    setTimeout(() => {
      if (this.selectedDb != "null") {
        this.setDbInfo(false);
      }
    }, 50);
  }
}