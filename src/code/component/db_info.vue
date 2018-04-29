<template>
<div>
<div class="db-name">{{$data._dbInfo._name}}</div>
  <table>
      <thead></thead>
      <tbody>
      <tr v-for="table in $data._dbInfo._tables" :key="table._name">
      <td>
        <span v-b-toggle="table._name" class="table-name">{{table._name}} <i class="fas fa-plus"></i></span>
        <b-collapse v-bind:id="table._name" class="ml-4">
          <div v-for="column in table._columns" class="column-name" :key="column._name">
            <span v-b-toggle="column._name" >{{column._name}} <i class="fas fa-plus-square"></i></span>
           <b-collapse v-bind:id="column._name" class="ml-4">
            <div>Primary Key : <span class="column-schema">{{column._primaryKey}}</span></div>
            <div>Auto Increment : <span class="column-schema">{{column._autoIncrement}}</span></div>
            <div>Not Null: <span class="column-schema">{{column._notNull}}</span></div>
            <div>Data Type : <span class="column-schema">{{column._dataType}}</span></div>
            <div>Default : <span class="column-schema">{{column._default}}</span></div>
            <div>Unique : <span class="column-schema">{{column._unique}}</span></div>
            <div>Multi Entry : <span class="column-schema">{{column._multiEntry}}</span></div>
            <div>Enable Search : <span class="column-schema">{{column._enableSearch}}</span></div>
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
import { settings } from "cluster";
import { MainService } from "../service/main_service";
import { DemoService } from "../service/demo_service";
import { IformSelect } from "../interfaces/form_select";
import { Model } from "jsstore";
import { vue_event } from "../common_var";

@Component
export default class DbInfo extends Vue {
  _dbInfo: Model.DataBase = {
    _tables: []
  } as any;

  getDbInfo(dbName: string) {
    new MainService().getDbInfo(dbName).then((result: Model.DataBase) => {
      console.log(result);
      this.updateDbInfo(result);
    });
  }

  updateDbInfo(value: Model.DataBase) {
    this.$data._dbInfo = value;
  }

  catchEvent() {
    vue_event.$on("db_selected", (dbName: string) => {
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