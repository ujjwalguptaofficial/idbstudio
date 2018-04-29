<template>
  <div>
  <b-modal id="modal1" ref="db_list" title="Bootstrap-Vue">
    <b-form>
      <b-form-group id="exampleInputGroup1"
                    label="Email address:"
                    label-for="selectDb">
        <b-form-select id="selectDb" v-model="$data._selectedDb" :options="$data._dbList" class="mb-3" />
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
import { settings } from "cluster";
import { MainService } from "../service/main_service";
import { DemoService } from "../service/demo_service";
import { IformSelect } from "../interfaces/form_select";
import { vue_event } from "../common_var";

@Component
export default class DbList extends Vue {
  _dbList: IformSelect[] = [];
  _selectedDb: string = "null";

  // Lifecycle hook
  mounted() {
    //give some time to create the database
    setTimeout(() => {
      new MainService()
        .getDbList()
        .then(list => {
          this.updateDbList(list);
          this.$refs.db_list.show();
        })
        .catch(err => {
          console.log(err);
          alert(err._message);
        });
    }, 2000);
  }

  updateDbList(list: string[]) {
    var temp_list: IformSelect[] = [
      {
        text: "--Select Database--",
        value: "null"
      }
    ];
    list.forEach(val => {
      temp_list.push({
        text: val,
        value: val
      });
    });
    this.$data._dbList = temp_list;
  }

  setSelectedDb() {
    new MainService().openDb(
      this.$data._selectedDb,
      () => {
        this.$refs.db_list.hide();
        vue_event.$emit("db_selected", this.$data._selectedDb);
      },
      err => {
        alert(err._message);
      }
    );
  }

  constructor() {
    super();
    new DemoService().createDemoDataBase();
  }
}
</script>
<style>
#selectDb option {
  text-align: center;
}
</style>
