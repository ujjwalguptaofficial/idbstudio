import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { vueEvent } from "../common_var";
import { DomHelper } from "../helpers/dom_helper";
import { EVENTS } from "../enums/events";
import { mapState } from "godam-vue";
declare var ClipboardJS;

@Component
export default class QueryLink extends Vue {
    link = "";
    shouldShowlinkDialog = false;
    constructor() {
        super();
        this.catchEvents();
    }

    get dbName() {
        return this.$store.get('activeDbName');
    }

    showModal(qry: string) {
        this.link = `${location.origin}${location.pathname}?db=${this.dbName}&query=${
            qry
            }`;
        this.shouldShowlinkDialog = true;
    }

    copy() {
        ((this.$refs.txtLink as any).$el as HTMLTextAreaElement).getElementsByTagName('textarea')[0].select()
        document.execCommand("copy");
        this.shouldShowlinkDialog = false;
    }

    onCopyError() {
        vueEvent.$emit(EVENTS.OnError, "Failed to copy Link");
    }

    catchEvents() {
        vueEvent.$on(EVENTS.ShowGetLinkModal, this.showModal);
    }
}