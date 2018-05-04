<template>
  <div>
    <!-- <div >{{dbInfo.name}}</div> -->
  <b-form-select v-model="selectedDb" class="mb-3 db-list">
      <option value="null">--Select Database--</option>
      <option v-for="db in dbList" :key="db"  :value="db">{{db}}</option>
    </b-form-select>
    <table>
      <thead></thead>
      <tbody>
        <tr v-for="table in dbInfo.tables" :key="table.name">
          <td>
            <span v-b-toggle="table.name" class="table-name">{{table.name}}
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
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { MainService } from "../service/main_service";
import { DemoService } from "../service/demo_service";
import { IFormSelect } from "../interfaces/form_select";
import { IDataBase } from "jsstore";
import { vueEvent } from "../common_var";

@Component
export default class DbInfo extends Vue {
  dbInfo: IDataBase = {
    tables: []
  } as any;
  selectedDb = "Demo";
  dbList: string[] = [];

  mounted() {
    var demoServiceInstance = new DemoService();
    demoServiceInstance.createDemoDataBase().then(() => {
      this.getDbInfo();
      demoServiceInstance.getDbList().then(list => {
        this.dbList = list;
      });
    });
  }

  getDbInfo() {
    new MainService().getDbSchema(this.selectedDb).then(result => {
     
      this.dbInfo = result;
    });
  }

  updateDbInfo(value: IDataBase) {
    this.dbInfo = value;
  }

  catchEvent() {
    vueEvent.$on("db_selected", (dbName: string) => {
      this.selectedDb = dbName;
      this.getDbInfo();
    });
  }

  constructor() {
    super();
    this.catchEvent();
  }
}
</script>
<style lang="sass" scoped>
#selectDb{ 
  option {
    text-align: center;
  }
}
.table-name
{
  font-size:20px;
  font-family: ABeeZee;
}
.column-name
{
  font-size:15px;
}
.column-schema
{
  color:#372ae5;
}
table
{
  margin-left: 15px;
  display: block;
  width: 100%;
}
.db-list{
    margin-top: 10px;
    margin-bottom: 20px;
}
</style>