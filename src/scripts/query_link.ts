import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { vueEvent } from "../common_var";
import { DomHelper } from "../helpers/dom_helper";
declare var ClipboardJS;

@Component
export default class QueryLink extends Vue {
    link = "";
    constructor() {
        super();
        this.catchEvents();
    }

    showModal(qry: string) {
        this.link = qry;
        vueEvent.$emit("get_current_db");
    }

    onGetDb(dbName: string) {
        (this.$refs.modalGetLink as any).show();
        this.link = `${location.origin}${location.pathname}?db=${dbName}&query=${
            this.link
            }`;
    }

    copy() {
        var $ = new DomHelper();
        ($.qry("#txtLink")! as HTMLInputElement).select();
        document.execCommand("copy");
        (this.$refs.modalGetLink as any).hide();
    }

    onCopyError() {
        vueEvent.$emit("on_error", "Failed to copy Link");
    }

    catchEvents() {
        vueEvent.$on("show_get_link_modal", this.showModal);
        vueEvent.$on("take_current_db", this.onGetDb);
    }
}