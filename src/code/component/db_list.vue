<template>
  <div>
    <b-modal id="modal1" ref="db_list" title="IDBStudio">
      <b-form>
        <b-form-group id="exampleInputGroup1">
          <b-form-select id="selectDb" v-model="selectedDb" :options="dbList" class="mb-3" />
        </b-form-group>
      </b-form>
      <div slot="modal-footer" class="w-100">
        <b-btn class="float-left" variant="primary" @click="setSelectedDb">
          Create Database
        </b-btn>
        <b-btn class="float-right" variant="primary" @click="setSelectedDb">
          Open
        </b-btn>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { MainService } from "../service/main_service";
import { DemoService } from "../service/demo_service";
import { IFormSelect } from "../interfaces/form_select";
import { vueEvent } from "../common_var";

@Component
export default class DbList extends Vue {
  dbList: IFormSelect[] = [];
  selectedDb: string = "null";

  // Lifecycle hook
  mounted() {
    //give some time to create the database
    setTimeout(() => { }, 2000);
  }

  openDbListModal() {
    new MainService().getDbList().then(list => {
      console.log(list);
      this.updateDbList(list);
      this.$refs.db_list.show();
    }).catch(err => {
      console.log(err);
      alert(err._message);
    });
  }

  updateDbList(list: string[]) {
    var tempList: IFormSelect[] = [
      {
        text: "--Select Database--",
        value: "null"
      }
    ];
    list.forEach(val => {
      tempList.push({
        text: val,
        value: val
      });
    });
    this.dbList = tempList;
  }

  setSelectedDb() {
    var service = new MainService();
    service
      .openDb(this.selectedDb)
      .then(() => {
        this.$refs.db_list.hide();
        vueEvent.$emit("db_selected", this.selectedDb);
      })
      .catch(err => {
        alert(err.message);
      });
  }

  constructor() {
    super();
    new DemoService().createDemoDataBase().then(() => {
      this.openDbListModal();
    });
  }

  
}
</script>
<style>
#selectDb option {
  text-align: center;
}
</style>
