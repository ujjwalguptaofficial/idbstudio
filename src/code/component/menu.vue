<template>
  <div id="divMenu">
    <span class="title"> IDBStudio </span>
    <ul class="right-menu">
      <li>
        <a href="https://github.com/ujjwalguptaofficial/JsStore">
          <i class="fas fa-star"></i> Star</a>
      </li>
      <li class="seperator">|</li>
      <li>
        <a title="fork on github" href="https://github.com/ujjwalguptaofficial/JsStore/fork">
          <svg version="1.1" width="10" height="18" style="fill: white;vertical-align: sub" viewBox="0 0 10 16" class="octicon octicon-repo-forked" aria-hidden="true">
            <path fill-rule="evenodd" d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path>
          </svg> Fork</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
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
</script>
<style lang="sass" scoped>
#divMenu {
    // background-color: #1f24ff;
    background-color:#2c3e50;
    width:100%;
    line-height:45px;
    color:white;
    a
    {
        color:white;
    }
    height:50px;
    ul li{
      display:inline-block;
    }
    .right-menu{
        float: right;
      position: relative;
      right: 10px;
    }
    .title{
      margin-left:15px;
      font-size:20px;
      line-height:50px;
      font-family: Allerta;
    }
}

</style>


