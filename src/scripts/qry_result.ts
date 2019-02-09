import Vue from "vue";
import { Component } from "vue-property-decorator";
import { vueEvent } from "../common_var";
import { Util } from "../util";
import { DATA_TYPE } from "jsstore";
import { EVENTS } from "../enums/events";

@Component
export default class QueryResult extends Vue {
    resultInnerHtml = "";
    errorMessage = "";
    constructor() {
        super();
        this.catchEvents();
    }

    printResult(result) {
        this.errorMessage = "";
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
                this.resultInnerHtml = JSON.stringify(result);
        }
    }

    printError(error) {
        this.errorMessage = JSON.stringify(error);
    }

    catchEvents() {
        vueEvent.$on(EVENTS.OnQueryResult, this.printResult);
        vueEvent.$on(EVENTS.OnQueryError, this.printError);
    }
}