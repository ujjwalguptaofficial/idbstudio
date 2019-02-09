import Vue from "vue";
import { Component } from "vue-property-decorator";
import { MainService } from "../service/main_service";
import { IFormSelect } from "../interfaces/form_select";
import { IDataBase } from "jsstore";
import { vueEvent } from "../common_var";
import contextMenu from "vue-context-menu";

@Component({
  props: {
    db: String
  },
  components: {
    contextMenu
  }
})
export default class DbInfo extends Vue {
  dbInfo: IDataBase = {
    tables: []
  } as any;
  db!: string;
  selectedDb: string = "";
  dbList: string[] = [];
  menuData = {};

  constructor() {
    super();
    this.catchEvent();
  }

  // set selectedDb(value) {
  //   this.selectedDb = value;
  // }

  mounted() {
    this.selectedDb = this.db;
    this.setDbInfo(true);
  }

  onCtxOpen(value) {
    this.menuData = value;
  }

  onCtxOff() {
    this.menuData = {};
  }

  setDbInfo(isFirstLoad: Boolean) {
    // debugger;
    var mainService = new MainService();
    mainService.openDb(this.selectedDb);
    mainService.getDbSchema(this.selectedDb).then(result => {
      this.dbInfo = result;
    });
    mainService.getDbList().then(list => {
      this.dbList = list;
    });
    if (isFirstLoad === true) {
      vueEvent.$emit("db_info_loaded");
    }
  }

  catchEvent() {
    vueEvent.$on("get_current_db", () => {
      vueEvent.$emit("take_current_db", this.selectedDb);
    });
  }

  select100() {
    var table = (this.menuData as any).table;
    var qry = `select({
      from:'${table}',
      limit:100\n})`;
    vueEvent.$emit("set_qry", qry);
    vueEvent.$emit("run_qry");
  }

  countTotal() {
    var table = (this.menuData as any).table;
    var qry = `count({
      from:'${table}'\n})`;
    vueEvent.$emit("set_qry", qry);
    vueEvent.$emit("run_qry");
  }

  exportJson() {
    var table = (this.menuData as any).table;
    var qry = `exportJson({
      from:'${table}'\n})`;
    vueEvent.$emit("set_qry", qry);
    vueEvent.$emit("run_qry");
  }

  onDbChange() {
    setTimeout(() => {
      console.log(this.selectedDb);
      if (this.selectedDb != "null") {
        this.setDbInfo(false);
      }
    }, 50);
  }
}