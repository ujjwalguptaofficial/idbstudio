<template>
<div>
<div class="db-name">{{dbInfo._name}}</div>
  <table>
      <thead></thead>
      <tbody>
      <tr v-for="table in dbInfo.tables" :key="table.name">
      <td>
        <span v-b-toggle="table._name" class="table-name">{{table.name}} <i class="fas fa-plus"></i></span>
        <b-collapse v-bind:id="table.name" class="ml-4">
          <div v-for="column in table.columns" class="column-name" :key="column.name">
            <span v-b-toggle="column._name" >{{column.name}} <i class="fas fa-plus-square"></i></span>
           <b-collapse v-bind:id="column.name" class="ml-4">
            <div>Primary Key : <span class="column-schema">{{column.primaryKey}}</span></div>
            <div>Auto Increment : <span class="column-schema">{{column.autoIncrement}}</span></div>
            <div>Not Null: <span class="column-schema">{{column.notNull}}</span></div>
            <div>Data Type : <span class="column-schema">{{column.dataType}}</span></div>
            <div>Default : <span class="column-schema">{{column.default}}</span></div>
            <div>Unique : <span class="column-schema">{{column.unique}}</span></div>
            <div>Multi Entry : <span class="column-schema">{{column.multiEntry}}</span></div>
            <div>Enable Search : <span class="column-schema">{{column.enableSearch}}</span></div>
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

  getDbInfo(dbName: string) {
    new MainService().getDbSchema(dbName).then(result => {
      console.log(result);
      this.updateDbInfo(result);
    });
  }

  updateDbInfo(value: IDataBase) {
    this.dbInfo = value;
  }

  catchEvent() {
    vueEvent.$on("db_selected", (dbName: string) => {
      this.getDbInfo(dbName);
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
  font-family: monospace;
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
  border-right: 5px solid #777adb;
  display: block;
  width: 100%;
}
.db-name{
  background-color: #ec6f42;
    color: white;
    font-size: 20px;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 20px;
    padding: 10px;
}
</style>