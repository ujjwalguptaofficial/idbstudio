import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { vueEvent } from "../common_var";
import Editor from "../component/editor.vue";
import QueryResult from "../component/qry_result.vue";
import { MainService } from "../service/main_service";
import { QueryHelper } from "../helpers/query_helper";
import { IResult } from "../interfaces/result";
import { DomHelper } from "../helpers/dom_helper";
import { Util } from "../util";
import { DATA_TYPE } from "jsstore";
import QueryLink from "../component/query_link.vue";
import { EVENTS } from "../enums/events";

@Component({
    components: {
        QueryLink,
        Editor,
        QueryResult
    }
})
export default class QueryExecutor extends Vue {
    currentModalComponent = "";
    tabCount = 0;
    timeTaken = "";
    resultCount: number | string = "";
    showResultInfo = false;
    editorContainerHeight;
    resultContainerHeight;
    isResultVisible = false;
    isQueryExecuting = false;
    isSaveBtnClicked = false;

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
        this.editorContainerHeight = editorHeight + buttonHeight;
        this.resultContainerHeight = editorHeight - buttonHeight - 10;
        ($.qry("#divEditorContainer") as HTMLElement).style.height =
            this.getEditorContainerHeight() + "px";
        ($.qry("#divResult") as HTMLElement).style.height =
            this.resultContainerHeight + "px";
    }

    onFileOpened(event) {
        var input = event.target;
        var reader = new FileReader();
        reader.onload = function () {
            var text = reader.result;
            vueEvent.$emit("set_qry", text);
        };
        reader.readAsText(input.files[0]);
        event.target.value = null;
    }

    open() {
        var $ = new DomHelper();
        $.getById("inputFileOpener").click();
    }

    fireGetQry() {
        vueEvent.$emit("get_qry");
    }

    getEditorContainerHeight() {
        return this.isResultVisible
            ? this.editorContainerHeight
            : this.editorContainerHeight + this.resultContainerHeight;
    }

    createNewTab() {
        ++this.tabCount;
    }

    save() {
        this.isQueryExecuting = false;
        this.isSaveBtnClicked = true;
        this.fireGetQry();
    }

    saveQuery(qry) {
        const stringValue = "query_save_count";
        var count = Number(localStorage.getItem(stringValue));
        ++count;
        localStorage.setItem(stringValue, count.toString());
        var fileName = prompt("FileName", "idbstudio_qry_" + count);
        if (fileName != null) {
            const url = URL.createObjectURL(new Blob([qry], { type: "text/plain" }));
            const link = document.createElement("a");
            link.href = url;
            link.download = fileName + ".js";
            link.click();
        }
    }

    executeQry() {
        this.isQueryExecuting = true;
        this.isResultVisible = true;
        this.fireGetQry();
        const $ = new DomHelper();
        ($.qry("#divEditorContainer") as HTMLElement).style.height =
            this.getEditorContainerHeight() + "px";
        var resultContainer = $.qry("#divResult") as HTMLElement;
        resultContainer.style.height = this.resultContainerHeight + "px";
        resultContainer.classList.remove("hide");
        vueEvent.$emit("set_editor_height", this.editorHeight);
    }

    async evaluateAndShowResult(qry: string) {
        var queryHelperInstance = new QueryHelper(qry);
        if (queryHelperInstance.validateAndModifyQry()) {
            const query = queryHelperInstance.query;
            try {
                const qryResult = await new MainService()
                    .executeQry(query);
                this.showResultInfo = true;
                this.resultCount =
                    Util.getType(qryResult.result) === DATA_TYPE.Array
                        ? qryResult.result.length
                        : 0;
                this.timeTaken = qryResult.timeTaken.toString();
                vueEvent.$emit("on_qry_result", qryResult.result);
            }
            catch (err) {
                vueEvent.$emit("on_qry_error", err);
            }

        } else {
            vueEvent.$emit("on_error", queryHelperInstance.errMessage);
        }
    }

    takeQuery(qry: string) {
        if (this.isQueryExecuting) {
            this.evaluateAndShowResult(qry);
        } else if (this.isSaveBtnClicked) {
            this.saveQuery(qry);
        } else {
            this.showLinkModal(qry);
        }
    }

    get editorHeight() {
        return this.getEditorContainerHeight() - 90;
    }

    catchEvents() {
        vueEvent
            .$on(EVENTS.DbInfoLoaded, this.createNewTab)
            .$on(EVENTS.TakeQuery, this.takeQuery)
            .$on(EVENTS.GetEditorHeight, () => {
                vueEvent.$emit(EVENTS.SetEditorHeight, this.editorHeight);
            })
            .$on(EVENTS.RunQuery, this.executeQry);
    }

    showLinkModal(qry: string) {
        qry = encodeURIComponent(qry);
        setTimeout(() => {
            vueEvent.$emit(EVENTS.ShowGetLinkModal, qry);
        }, 200);
    }

    getLink() {
        this.currentModalComponent = "QueryLink";
        this.isQueryExecuting = false;
        this.isSaveBtnClicked = false;
        this.fireGetQry();
    }
}