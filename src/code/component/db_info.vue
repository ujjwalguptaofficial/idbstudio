<template>
  <div>
    <!-- <div >{{dbInfo.name}}</div> -->
    <b-form-select v-model="selectedDb" class="mb-3 db-list" @change.native="onDbChange">
      <option value="null">--Select Database--</option>
      <option v-for="db in dbList" :key="db" :value="db">{{db}}</option>
    </b-form-select>
    <table>
      <thead></thead>
      <tbody>
        <tr v-for="table in dbInfo.tables" :key="table.name">
          <td>
            <span @contextmenu.prevent="$refs.ctxMenu.open($event, {table: table.name})" v-b-toggle="table.name" class="table-name">
              {{table.name}}
              <i class="fas fa-plus"></i>
            </span>
            <b-collapse v-bind:id="table.name" class="ml-4">
              <div v-for="column in table.columns" class="column-name" :key="column.name">
                <span v-b-toggle="column.name">{{column.name}}
                  <i class="fas fa-plus-square"></i>
                </span>
                <b-collapse v-bind:id="column.name" class="ml-4">
                  <div>Primary Key :
                    <span class="column-schema">{{column.primaryKey}}</span>
                  </div>
                  <div>Auto Increment :
                    <span class="column-schema">{{column.autoIncrement}}</span>
                  </div>
                  <div>Not Null:
                    <span class="column-schema">{{column.notNull}}</span>
                  </div>
                  <div>Data Type :
                    <span class="column-schema">{{column.dataType}}</span>
                  </div>
                  <div>Default :
                    <span class="column-schema">{{column.default}}</span>
                  </div>
                  <div>Unique :
                    <span class="column-schema">{{column.unique}}</span>
                  </div>
                  <div>Multi Entry :
                    <span class="column-schema">{{column.multiEntry}}</span>
                  </div>
                  <div>Enable Search :
                    <span class="column-schema">{{column.enableSearch}}</span>
                  </div>
                </b-collapse>
              </div>
            </b-collapse>
          </td>
        </tr>
      </tbody>
      <tfoot></tfoot>
    </table>
    <context-menu id="context-menu" ref="ctxMenu" @ctx-open="onCtxOpen" @ctx-cancel="onCtxOff">
      <li class="ctx-item" @click="select100">Select 100 Record</li>
      <li class="ctx-item" @click="countTotal">Count Total Record</li>
      <li class="ctx-item" @click="exportJson">Export As Json</li>
    </context-menu>
  </div>
</template>

<script lang="ts">
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
</script>
<style lang="scss" scoped>
#selectDb {
  option {
    text-align: center;
  }
}
.table-name {
  font-size: 20px;
  font-family: ABeeZee;
  padding-bottom: 5px;
  display: inline-block;
  cursor: pointer;
}
.column-name {
  font-size: 15px;
}
.column-schema {
  color: #372ae5;
}
table {
  margin-left: 15px;
  display: block;
  width: 100%;
}
.db-list {
  margin-top: 10px;
  margin-bottom: 20px;
}
</style>