<template>
 <div class="idb-editor" v-bind:id="id">

 </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { vue_event } from "../common_var";
import { fail } from "assert";
import { DomHelper } from "../helpers/dom_helper";
declare var ace;
@Component({
  props: {
    id: String
  }
})
export default class Editor extends Vue {
  editor;
  id: string;
  constructor() {
    super();
    this.catchEvent();
  }

  createEditor() {
    this.editor = ace.edit(this.id);
    this.editor.setTheme("ace/theme/eclipse");
    this.editor.session.setMode("ace/mode/javascript");
  }

  mounted() {
    this.createEditor();
  }

  getQry() {
    var $ = new DomHelper();
    if (!$.isHidden($.parent($.getById(this.id)))) {
      vue_event.$emit("set_qry", this.editor.getValue());
    }
  }

  catchEvent() {
    vue_event.$on("execute_qry", this.executeJsStoreQry);
    vue_event.$on("get_qry", this.getQry);
  }

  executeJsStoreQry() {
    
  }
}
</script>
<style lang="sass">
.idb-editor{
   width:100%;
   min-height:200px;
}
</style>
