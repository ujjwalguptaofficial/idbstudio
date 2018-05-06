<template>
  <div id="divQueryExecutor">
    <div id="divButtonContainer">
      <b-button-group size="mg">
        <b-button variant="primary" @click="createNewTab">
          New Query
          <i class="fas fa-plus-circle"></i>
        </b-button>
        <b-button variant="primary" @click="createNewTab">
          Open
          <i class="fas fa-folder-open"></i>
        </b-button>
        <b-button variant="primary" @click="createNewTab">
          Save
          <i class="fas fa-save"></i>
        </b-button>
      </b-button-group>
      <b-button variant="success" @click="executeQry" class="float-right">
          Execute
          <i class="fas fa-play"></i>
        </b-button>
    </div>
    <b-card no-body id="divEditorContainer">
      <b-tabs card>
        <b-tab active v-for="(item) in $data.tabCount" :key="'tab'+item" v-bind:title="'Query '+item">
          <Editor v-bind:id="'editor' + item"></Editor>
        </b-tab>
      </b-tabs>
    </b-card>
    <QueryResult></QueryResult>
    <transition name="fade">
      <div id="divResultInfo" v-if="showResultInfo">
        <table>
          <tr>
            <td>
              <b>No of Record :</b>
              <span>{{resultCount}}</span>
              <b class="seperator">|</b>
              <b>Time Taken :</b>
              <span>{{timeTaken}} sec.</span>
            </td>
            <td>
              <i @click="showResultInfo=false" class="fas fa-times"></i>
            </td>
          </tr>
        </table>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { vueEvent } from "../common_var";
import Editor from "./editor.vue";
import QueryResult from "./qry_result.vue";
import { MainService } from "../service/main_service";
import { QueryChecker } from "../helpers/query_checker";
import { IResult } from "../interfaces/result";
import { DomHelper } from "../helpers/dom_helper";

@Component({
  components: {
    Editor,
    QueryResult
  }
})
export default class QueryExecutor extends Vue {
  tabCount = 0;
  timeTaken = "";
  resultCount: number | string = "";
  showResultInfo = false;
  constructor() {
    super();
    this.catchEvents();
  }

  mounted() {
    const $ = new DomHelper();
    const menuHeight = 50;
    const buttonHeight = ($.qry("#divButtonContainer") as HTMLElement)
      .clientHeight;
    const margin = 10;
    const editorHeight =
      (window.innerHeight - (menuHeight + buttonHeight + margin)) / 2;
    ($.qry("#divEditorContainer") as HTMLElement).style.height =
      editorHeight + buttonHeight + "px";
    ($.qry("#divResult") as HTMLElement).style.height =
      editorHeight - buttonHeight - 10 + "px";
  }

  createNewTab() {
    this.$data.tabCount++;
  }

  executeQry() {
    vueEvent.$emit("get_qry");
  }

  showResult(qry: string) {
    var queryCheckerInstance = new QueryChecker(qry);
    if (queryCheckerInstance.isQryValid()) {
      new MainService()
        .executeQry(queryCheckerInstance.api, queryCheckerInstance.option)
        .then(qryResult => {
          this.showResultInfo = true;
          this.resultCount = qryResult.result.length;
          this.timeTaken = qryResult.timeTaken.toString();
          vueEvent.$emit("on_qry_result", qryResult.result);
        })
        .catch(function(err) {
          vueEvent.$emit("on_error", err.message);
        });
    } else {
      vueEvent.$emit("on_error", queryCheckerInstance.errMessage);
    }
  }

  catchEvents() {
    vueEvent.$on("db_selected", this.createNewTab);
    vueEvent.$on("set_qry", this.showResult);
  }
}
</script>
<style lang="scss" scoped>
#divQueryExecutor {
  margin-top: 10px;
  background-color: rgb(241, 241, 241);
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
}
#divResultInfo {
  height: 50px;
  position: absolute;
  bottom: 0px;
  background: inherit;
  z-index: 100;
  width: 97%;
}
table {
  height: inherit;
  width: 100%;
}
table tr td {
  padding-left: 20px;
}
table tr td:last-child {
  text-align: right;
  padding-right: 20px;
  padding-left: 50px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
  bottom: 0px;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  bottom: -100px;
}
</style>


