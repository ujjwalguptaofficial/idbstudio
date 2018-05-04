<template>
  <div id="divResult">
    <table v-html="resultInnerHtml" class="table"></table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { vueEvent } from "../common_var";
import { Util } from "../util";
import { DATA_TYPE } from "jsstore";

@Component
export default class QueryResult extends Vue {
  resultInnerHtml = "";
  constructor() {
    super();
    this.catchEvents();
  }

  printResult(result) {
    var resultType = Util.getType(result);
    switch (resultType) {
      case DATA_TYPE.Array:
        var rowsLength = result.length,
          htmlString = "<tr>",
          props: string[] = [];
        for (var prop in result[0]) {
          props.push(prop);
          htmlString += "<th>" + prop + "</th>";
        }
        htmlString += "</tr>";
        var Width = 100 / props.length;
        for (var i = 0; i < rowsLength; i++) {
          var tempHtml = "<tr>";
          for (var j = 0; j < props.length; j++) {
            if (result[0] && result[0][0]) {
              tempHtml += "<td>" + result[i][props[j]] + "</td>";
            } else {
              tempHtml +=
                "<td style=width:" +
                Width +
                "%>" +
                JSON.stringify(result[i][props[j]]) +
                "</td>";
            }
          }
          tempHtml += "</tr>";
          htmlString += tempHtml;
        }

        this.resultInnerHtml = htmlString;
        break;
      case DATA_TYPE.Object:
        result = JSON.stringify(result);
      case DATA_TYPE.String:
      case DATA_TYPE.Number:
        this.resultInnerHtml = result;
        break;
      default:
        alert("invalid result");
    }
  }

  catchEvents() {
    vueEvent.$on("on_qry_result", this.printResult);
  }
}
</script>
<style lang="sass">
#divResult
{
    overflow-y: scroll;
    overflow-x: hidden;
    min-height:200px;
    width: 99%;
    left: 5px;
    position: relative;
    right: 5px;
    background-color: white;

    .table tr td, .table tr th{
     border:1px inset;
     text-align:center;
    }
}

</style>


