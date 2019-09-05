import Vue from "vue";
import { Component } from "vue-property-decorator";
import { vueEvent } from "../common_var";
import { Util } from "../util";
import { DATA_TYPE, Config } from "jsstore";
import { EVENTS } from "../enums/events";
import { mapState } from "vuex";
import { IResult } from "../interfaces/result";

@Component({
    computed: mapState(['activeTab', 'resultContainerHeight']),
    props: {
        index: Number
    }
})
export default class QueryResult extends Vue {
    resultInnerHtml = "";
    errorMessage = "";
    index;
    timeTaken = "";
    resultCount: number | string = "";
    showResultInfo = false;

    mounted() {
        this.catchEvents();
    }

    shouldProcess() {
        return this.index === this.$store.state.activeTab + 1;
    }

    printResult(qryResult: IResult) {
        if (this.shouldProcess()) {
            this.errorMessage = "";
            var resultType = Util.getType(qryResult.result);
            this.resultCount =
                resultType === DATA_TYPE.Array
                    ? qryResult.result.length
                    : 0;
            this.timeTaken = qryResult.timeTaken.toString();
            this.showResultInfo = true;
            let result = qryResult.result;
            switch (resultType) {
                case DATA_TYPE.Array:
                    var rowsLength = result.length,
                        htmlString = "<tr>",
                        props: string[] = [];
                    for (var prop in result[0]) {
                        props.push(prop);
                        htmlString += "<th>" + prop + "</th>";
                    }
                    const propLength = props.length;
                    htmlString += "</tr>";
                    // var width = 100 / propLength;
                    for (var i = 0; i < rowsLength; i++) {
                        var tempHtml = "<tr>";
                        for (var j = 0; j < propLength; j++) {
                            if (result[0] && result[0][0]) {
                                tempHtml += "<td>" + result[i][props[j]] + "</td>";
                            } else {
                                tempHtml +=
                                    "<td>" +
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
                    this.resultInnerHtml = JSON.stringify(result);
            }
            if (Config.isLogEnabled) {
                console.table(result);
            }
        }
    }

    printError(error) {
        if (this.shouldProcess) {
            this.errorMessage = JSON.stringify(error);
        }
    }

    catchEvents() {
        vueEvent.$on(EVENTS.OnQueryResult, this.printResult);
        vueEvent.$on(EVENTS.OnQueryError, this.printError);
    }
}