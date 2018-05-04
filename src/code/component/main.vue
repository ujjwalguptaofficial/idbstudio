<template>
<div class="container-fluid">
   <Start></Start>
  <div class="row" id="divMain">
    <Menu></Menu>
    <div style="border-top:5px solid #777adb;width: 100%;"></div>
    <div class="col-sm-3">
      <DbInfo></DbInfo>
    </div>
    <div class="col" id="divQueryExecutorContainer">
      <QueryExecutor></QueryExecutor>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import DbList from "./db_list.vue";
import Menu from "./menu.vue";
import DbInfo from "./db_info.vue";
import QueryExecutor from "./query_executor.vue";
import Start from "./start.vue";
import { vueEvent } from "../common_var";
import "../assets/css/common.css";

declare var ace;
ace.config.set("workerPath", "/assets/scripts");
ace.config.set("themePath", "/assets/scripts");

@Component({
  components: {
    DbList,
    Menu,
    DbInfo,
    QueryExecutor,
    Start
  }
})
export default class Main extends Vue {
  constructor() {
    super();
    this.catchEvent();
  }

  private catchEvent() {
    vueEvent.$on("on_error", errMessage => {
      alert(errMessage);
    });
  }
}
</script>
<style lang="sass">
#divMain{
display:none;
}
</style>

