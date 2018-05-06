<template>
<div>
 <Start v-if="!isPageLoaded"></Start>
<div class="container-fluid">
  <div class="row" v-if="isPageLoaded" id="divMain">
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
    Menu,
    DbInfo,
    QueryExecutor,
    Start
  }
})
export default class Main extends Vue {
  isPageLoaded = false;
  constructor() {
    super();
    this.catchEvent();
    setTimeout(() => {
      // this.togglePageLoadedStatus();
    }, 1000);
  }

  togglePageLoadedStatus() {
    this.isPageLoaded = !this.isPageLoaded;
  }

  private catchEvent() {
    vueEvent.$on("on_error", errMessage => {
      alert(errMessage);
    });
    vueEvent.$on("db_selected", dbName => {
      this.togglePageLoadedStatus();
    });
  }

  mounted() {
    console.log("h");
  }
}
</script>
<style lang="scss">
// #divMain {
//   display: none;
// }
</style>

