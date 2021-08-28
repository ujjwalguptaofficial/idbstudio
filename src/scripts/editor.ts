import Vue from "vue";
import { Component } from "vue-property-decorator";
import { vueEvent } from "../common_var";
import { DomHelper } from "../helpers/dom_helper";
import { Util } from "../util";
import { js_beautify } from "js-beautify";
import { EVENTS } from "../enums/events";

declare var ace;
@Component({
    props: {
        id: String
    }
})
export default class Editor extends Vue {
    editor;
    id!: string;

    constructor() {
        super();
        this.catchEvent();
    }

    createEditor() {
        this.editor = ace.edit(this.id);
        this.editor.setTheme("ace/theme/eclipse");
        this.editor.session.setMode("ace/mode/javascript");
        vueEvent.$emit(EVENTS.SetEditorHeight);
    }

    onPaste() {
        setTimeout(this.formatQuery, 10);
    }

    mounted() {
        this.createEditor();
        if (this.id === "editor_1") {
            const query = Util.getParameterByName("query");
            if (query != null && query.length > 0) {
                this.setQry(query);
            }
        }
    }

    getQry() {
        // var $ = new DomHelper();
        // var el = $.getById(this.id);
        // if (!$.isHidden($.parent(el))) {
        //     vueEvent.$emit(EVENTS.TakeQuery, this.editor.getValue());
        // }
        if (this.isEditorActive) {
            vueEvent.$emit(EVENTS.TakeQuery, this.editor.getValue());
        }
    }

    get isEditorActive() {
        const index = Number(this.id.split("_")[1]) - 1;
        if (this.$store.get('activeTab') === index) {
            return true;
        }
        return false;
    }

    setQry(qry) {
        if (this.isEditorActive === true) {
            this.editor.setValue(qry);
        }
    }

    setHeight(height) {
        var $ = new DomHelper();
        $.getById(this.id).style.height = height + "px";
    }

    formatQuery() {
        var value: string = this.editor.getValue();
        value = js_beautify(value);
        this.editor.setValue(value);
    }

    catchEvent() {
        vueEvent.$on(EVENTS.GetQuery, this.getQry);
        vueEvent.$on(EVENTS.SetQuery, this.setQry);
        vueEvent.$on(EVENTS.FormatQuery, this.formatQuery);
    }
}