<template>
    <div>
      <b-modal no-enforce-focus @shown="shown" id="divLinkModal" ref="modalGetLink" title="IDBStudio">
          <p class="my-4" id="linkContent">
            <b-form-input type="text" id="txtLink" v-model="link"></b-form-input>
          </p>
          <div slot="modal-footer" class="w-100">
            <b-btn size="md" class="btn-copy float-right" variant="primary" @click="copy">
              Copy
            </b-btn>
          </div>
      </b-modal>
    </div>
</template>
<script lang="ts">
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
    this.link = `${window.location.origin}?db=${dbName}&query=${this.link}`;
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
</script>
