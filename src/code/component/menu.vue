<template>
  <div class="row" id="divMenu">
    <div class="col-sm-1">
      {{$data._dbName}}
    </div>
    <div class="col-sm-1">
     <a href="#" @click="createNewQry">New Query</a>
    </div>
    <div class="col-sm-1">
      <span @click="executeQry">Execute <i class="fas fa-play"></i></span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { vue_event } from "../common_var";

@Component
export default class Menu extends Vue {
  _dbName: string = "";
  createNewQry() {
    vue_event.$emit("open_editor");
  }

  setDbName(dbName: string) {
    this.$data._dbName = dbName;
  }

  catchEvent() {
    vue_event.$on("db_selected", (dbName: string) => {
      console.log(dbName);
      this.setDbName(dbName);
    });
  }

  executeQry() {
    vue_event.$emit("execute_qry");
  }

  constructor() {
    super();
    this.catchEvent();
  }
}
</script>
<style lang="sass" scoped>
#divMenu {
    background-color: #d4d4f3;
    div a
    {
        color:white;
    }
    height:50px;
}
</style>


