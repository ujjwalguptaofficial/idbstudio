import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { vueEvent } from "../common_var";
import { DomHelper } from "../helpers/dom_helper";
import { EVENTS } from "../enums/events";
import { store } from "../store/store";
declare var ClipboardJS;

@Component
export default class QueryLink extends Vue {
    link = "";
    constructor() {
        super();
        this.catchEvents();
    }

    get dbName() {
        return store.state.activeDbName;
    }

    showModal(qry: string) {
        this.link = `${location.origin}${location.pathname}?db=${this.dbName}&query=${
            qry
            }`;
        (this.$refs.modalGetLink as any).show();
    }



    copy() {
        var $ = new DomHelper();
        ($.qry("#txtLink")! as HTMLInputElement).select();
        document.execCommand("copy");
        (this.$refs.modalGetLink as any).hide();
    }

    onCopyError() {
        vueEvent.$emit(EVENTS.OnError, "Failed to copy Link");
    }

    catchEvents() {
        vueEvent.$on(EVENTS.ShowGetLinkModal, this.showModal);
    }
}