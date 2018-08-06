<template>
  <div class="idb-editor" v-bind:id="id">

  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { vueEvent } from "../common_var";
import { DomHelper } from "../helpers/dom_helper";
import { Util } from "../util";
import { js_beautify } from "js-beautify";

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
    this.editor.onPaste = value => {
      value = js_beautify(value);
      this.editor.setValue(value);
    };
  }

  mounted() {
    this.createEditor();
    vueEvent.$emit("get_editor_height");
    if (this.id === "editor1") {
      const query = Util.getParameterByName("query");
      if (query != null && query.length > 0) {
        this.setQry(query);
      }
    }
  }

  getQry() {
    var $ = new DomHelper();
    var el = $.getById(this.id);
    if (!$.isHidden($.parent(el))) {
      vueEvent.$emit("take_qry", this.editor.getValue());
    }
  }

  setQry(qry) {
    const $ = new DomHelper();
    const el = $.getById(this.id);
    // debugger;
    if (!$.isHidden($.parent(el))) {
      this.editor.setValue(qry);
    }
  }

  setHeight(height) {
    var $ = new DomHelper();
    $.getById(this.id).style.height = height + "px";
  }

  catchEvent() {
    vueEvent.$on("get_qry", this.getQry);
    vueEvent.$on("set_editor_height", this.setHeight);
    vueEvent.$on("set_qry", this.setQry);
  }
}
</script>
<style lang="scss">
.idb-editor {
  width: 100%;
  min-height: 200px;
}
</style>
