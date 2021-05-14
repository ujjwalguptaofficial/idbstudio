import Vue from "vue";
import { Component } from "vue-property-decorator";
import { MainService } from "../service/main_service";
import { IDataBase } from "jsstore";
import { vueEvent } from "../common_var";
import contextMenu from "vue-context-menu";
import { EVENTS } from "../enums/events";
import { STORE_MUTATION } from "../enums/store_mutation";
import { mapState, mapGetters } from "vuex";

@Component({

  components: {
    contextMenu
  },
  computed: {
    ...mapState({
      dbList: (state: any) => state.dbList
    }),
    ...mapGetters({
      dbNames: 'dbNames'
    })
  }
})
export default class DbInfo extends Vue {
  dbList;
  get selectedDb() {
    return this.$store.state.activeDbName;
  }

  set selectedDb(value) {
    this.$store.commit(STORE_MUTATION.SetActiveDb, value);
    this.onDbChange();
  }

  dbInfo: IDataBase = { tables: [] } as any;

  menuData = {};

  constructor() {
    super();
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

  async setDbInfo(isFirstLoad: Boolean) {
    var mainService = new MainService();
    const db = this.dbList.find(q => q.name === this.selectedDb);
    let version = 1;
    if (db) {
      version = db.version;
    }
    this.dbInfo = await mainService.openDb(this.selectedDb, version);
    if (isFirstLoad === true) {
      vueEvent.$emit(EVENTS.DbInfoLoaded);
    }
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

  async exportJson() {
    var table = (this.menuData as any).table;
    var mainService = new MainService();
    const result = await mainService.select(table);
    const url = URL.createObjectURL(new Blob([JSON.stringify(result)], {
      type: "text/json"
    }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${table}.json`;
    link.click();
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