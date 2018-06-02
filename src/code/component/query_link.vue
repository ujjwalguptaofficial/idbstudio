<template>
    <div>
      <b-modal ref="modalGetLink" title="IDBStudio" ok-only>
        <p>
          Append this string to IDBStudio link -
        </p>
          <p class="my-4" id="linkContent">
          <b-form-input type="text" v-model="txtLink"></b-form-input>
          </p>
          <div slot="modal-footer" class="w-100">
            <b-btn size="md" class="float-right" variant="primary" 
             v-clipboard:copy="txtLink"
      v-clipboard:success="onCopy"
      v-clipboard:error="onCopyError">
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

@Component
export default class QueryLink extends Vue {
  txtLink = "";
  constructor() {
    super();
    this.catchEvents();
  }

  showModal(qry: string) {
    this.txtLink = qry;
    vueEvent.$emit("get_current_db");
  }

  onGetDb(dbName: string) {
    this.txtLink = `?db=${dbName}&query=${this.txtLink}`;
    (this.$refs.modalGetLink as any).show();
  }

  onCopy() {
    // var $ = new DomHelper();
    // $.copyToClipboard($.getById("linkContent").innerText);
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
