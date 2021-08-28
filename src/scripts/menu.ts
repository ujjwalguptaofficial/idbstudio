import Vue from "vue";
import { Component } from "vue-property-decorator";
import { vueEvent } from "../common_var";
import { store } from "../store/store";
import { EVENTS } from "../enums/events";

@Component
export default class Menu extends Vue {
  get dbName() {
    return store.get('activeDbName');
  }

  createNewQry() {
    vueEvent.$emit(EVENTS.OpenEditor);
  }



  catchEvent() {

  }

  executeQry() {
    vueEvent.$emit(EVENTS.ExecuteQuery);
  }

  mounted() {
    this.catchEvent();
  }
}