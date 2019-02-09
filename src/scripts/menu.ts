import Vue from "vue";
import { Component } from "vue-property-decorator";
import { vueEvent } from "../common_var";

@Component
export default class Menu extends Vue {
  dbName: string = "";
  createNewQry() {
    vueEvent.$emit("open_editor");
  }

  setDbName(dbName: string) {
    this.dbName = dbName;
  }

  catchEvent() {
    vueEvent.$on("db_selected", (dbName: string) => {
      console.log(dbName);
      this.setDbName(dbName);
    });
  }

  executeQry() {
    vueEvent.$emit("execute_qry");
  }

  constructor() {
    super();
    this.catchEvent();
  }
}