import Vue from "vue";
import { Component } from "vue-property-decorator";
import { vueEvent } from "../common_var";
import Editor from "../component/editor.vue";
import QueryResult from "../component/qry_result.vue";
import { MainService } from "../service/main_service";
import { QueryHelper } from "../helpers/query_helper";
import { DomHelper } from "../helpers/dom_helper";
import QueryLink from "../component/query_link.vue";
import { EVENTS } from "../enums/events";
import { STORE_MUTATION } from "../enums/store_mutation";

@Component({
    components: {
        QueryLink,
        Editor,
        QueryResult
    },
    // computed: mapState(['activeTab'])
})
export default class QueryExecutor extends Vue {
    currentModalComponent = "";
    tabCount = 0;
    editorContainerHeight;
    get resultContainerHeight() {
        return this.$store.get('resultContainerHeight');
    }
    set resultContainerHeight(value) {
        this.$store.set(STORE_MUTATION.SetResultContainerHeight, value);
    }
    isResultVisible = false;
    isQueryExecuting = false;
    isSaveBtnClicked = false;

    height = 0;

    get activeTab() {
        return this.$store.get('activeTab');
    }

    set activeTab(value: any) {
        this.$store.set(STORE_MUTATION.SetActiveTab, value);
    }

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
        vueEvent.$emit(EVENTS.GetQuery);
    }

    getEditorContainerHeight() {
        return this.isResultVisible
            ? this.editorContainerHeight
            : this.editorContainerHeight + this.resultContainerHeight;
    }

    createNewTab() {
        this.activeTab = this.tabCount++;
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
        this.setEditorHeight();
    }

    async evaluateAndShowResult(qry: string) {
        var queryHelperInstance = new QueryHelper(qry);
        if (queryHelperInstance.validateAndModifyQry()) {
            const query = queryHelperInstance.query;
            try {
                const qryResult = await new MainService()
                    .executeQry(query);
                vueEvent.$emit(EVENTS.OnQueryResult, qryResult);
            }
            catch (err) {
                vueEvent.$emit(EVENTS.OnQueryError, err);
            }

        } else {
            vueEvent.$emit(EVENTS.OnError, queryHelperInstance.errMessage);
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

    setEditorHeight() {
        this.height = this.getEditorContainerHeight() - 50;
    }

    catchEvents() {
        vueEvent
            .$on(EVENTS.DbInfoLoaded, this.createNewTab)
            .$on(EVENTS.TakeQuery, this.takeQuery)
            .$on(EVENTS.SetEditorHeight, this.setEditorHeight)
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