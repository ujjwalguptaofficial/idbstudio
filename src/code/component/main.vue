<template>
<div class="container-fluid">
  <Menu></Menu>
  <div class="row">
    <div class="col-sm-3">
      <DbInfo></DbInfo>
    </div>
    <div class="col" >
      <QueryExecutor></QueryExecutor>
     <DbList></DbList>
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
import { vue_event } from "../common_var";

declare var ace;
ace.config.set("workerPath", "/assets/scripts");
ace.config.set("themePath", "/assets/scripts");

@Component({
  components: {
    DbList,
    Menu,
    DbInfo,
    QueryExecutor
  }
})
export default class Main extends Vue {
  constructor() {
    super();
    this.catchEvent();
  }

  private catchEvent() {
    vue_event.$on("on_error", errMessage => {
      alert(errMessage);
    });
  }
}
</script>
<style lang="sass" scoped>
#divEditorContainers
{
  background-color: rebeccapurple;
}
</style>
