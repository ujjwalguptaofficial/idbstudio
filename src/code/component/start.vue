<template>
  <div class="start-page">
      <h1 class="title">IDBStudio</h1>
      <div v-if="dbList.length==0" class="cssload-preloader">
	<div class="cssload-preloader-box">		<div>L</div>		<div>o</div>		<div>a</div>		<div>d</div>		<div>i</div>		<div>n</div>		<div>g</div></div>
</div>
<form class="margin-top-100px" v-if="dbList.length>0">
  <div class="form-group row">
	  <div style="margin:0 auto;display:inherit;">
	  <div class="mb-2">
    <select id="selectDb" class="form-control" v-model="selectedDb">
       <option value="null">--Select Database--</option>
      <option v-for="db in dbList" :key="db"  :value="db">{{db}}</option>
    </select>
	</div>
	<button type="button" @click="connectDb" class="btn btn-primary mb-2" style="margin-left:50px;padding: 0 30px;">Connect</button>
	</div>
  </div>
</form>
  </div>
  
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { DemoService } from "../service/demo_service";
import { vueEvent } from "../common_var";
import { Util } from "../util";

@Component
export default class Start extends Vue {
  selectedDb = "null";
  dbList: string[] = [];

  mounted() {
    var demoServiceInstance = new DemoService();
    demoServiceInstance.isDemoDbExist().then(isExist => {
      if (isExist) {
        setTimeout(() => {
          this.getDbList();
        }, 1000);
      } else {
        demoServiceInstance.createDemoDataBase().then(() => {
          this.getDbList();
        });
      }
    });
  }

  setDbNameFromQryString(dbList: string[]) {
    var dbName = Util.getParameterByName("db");
    if (dbName != null && dbName.length > 0) {
      const index = dbList.findIndex(qry => qry === dbName);
      // console.log(index);
      if (index >= 0) {
        // console.log(dbName);
        this.selectedDb = dbName;
        this.connectDb();
      }
    }
  }

  getDbList() {
    var demoServiceInstance = new DemoService();
    demoServiceInstance.getDbList().then(list => {
      this.setDbNameFromQryString(list);
      this.dbList = list;
    });
  }

  connectDb() {
    if (this.selectedDb != "null") {
      vueEvent.$emit("page_loaded", this.selectedDb);
    } else {
      vueEvent.$emit("on_error", "Please select a valid database");
    }
  }
}
</script>


<style lang="scss">
.start-page {
  background-color: #2c3e50;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1000;
  overflow: hidden;

  .title {
    font-family: Allerta;
    color: white;
    text-align: center;
    margin-top: 150px;
  }

  .cssload-preloader {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 10;
  }

  .cssload-preloader > .cssload-preloader-box {
    position: absolute;
    height: 29px;
    top: 50%;
    left: 50%;
    margin: -15px 0 0 -146px;
    perspective: 195px;
    -o-perspective: 195px;
    -ms-perspective: 195px;
    -webkit-perspective: 195px;
    -moz-perspective: 195px;
  }

  .cssload-preloader .cssload-preloader-box > div {
    position: relative;
    width: 29px;
    height: 29px;
    background: rgb(204, 204, 204);
    float: left;
    text-align: center;
    line-height: 29px;
    font-family: Verdana;
    font-size: 19px;
    color: rgb(255, 255, 255);
  }
  .cssload-preloader .cssload-preloader-box > div:nth-child(1) {
    background: #007bff;
    margin-right: 15px;
    animation: cssload-movement 690ms ease 0ms infinite alternate;
    -o-animation: cssload-movement 690ms ease 0ms infinite alternate;
    -ms-animation: cssload-movement 690ms ease 0ms infinite alternate;
    -webkit-animation: cssload-movement 690ms ease 0ms infinite alternate;
    -moz-animation: cssload-movement 690ms ease 0ms infinite alternate;
  }
  .cssload-preloader .cssload-preloader-box > div:nth-child(2) {
    background: #007bff;
    margin-right: 15px;
    animation: cssload-movement 690ms ease 86.25ms infinite alternate;
    -o-animation: cssload-movement 690ms ease 86.25ms infinite alternate;
    -ms-animation: cssload-movement 690ms ease 86.25ms infinite alternate;
    -webkit-animation: cssload-movement 690ms ease 86.25ms infinite alternate;
    -moz-animation: cssload-movement 690ms ease 86.25ms infinite alternate;
  }
  .cssload-preloader .cssload-preloader-box > div:nth-child(3) {
    background: #007bff;
    margin-right: 15px;
    animation: cssload-movement 690ms ease 172.5ms infinite alternate;
    -o-animation: cssload-movement 690ms ease 172.5ms infinite alternate;
    -ms-animation: cssload-movement 690ms ease 172.5ms infinite alternate;
    -webkit-animation: cssload-movement 690ms ease 172.5ms infinite alternate;
    -moz-animation: cssload-movement 690ms ease 172.5ms infinite alternate;
  }
  .cssload-preloader .cssload-preloader-box > div:nth-child(4) {
    background: #007bff;
    margin-right: 15px;
    animation: cssload-movement 690ms ease 258.75ms infinite alternate;
    -o-animation: cssload-movement 690ms ease 258.75ms infinite alternate;
    -ms-animation: cssload-movement 690ms ease 258.75ms infinite alternate;
    -webkit-animation: cssload-movement 690ms ease 258.75ms infinite alternate;
    -moz-animation: cssload-movement 690ms ease 258.75ms infinite alternate;
  }
  .cssload-preloader .cssload-preloader-box > div:nth-child(5) {
    background: #007bff;
    margin-right: 15px;
    animation: cssload-movement 690ms ease 345ms infinite alternate;
    -o-animation: cssload-movement 690ms ease 345ms infinite alternate;
    -ms-animation: cssload-movement 690ms ease 345ms infinite alternate;
    -webkit-animation: cssload-movement 690ms ease 345ms infinite alternate;
    -moz-animation: cssload-movement 690ms ease 345ms infinite alternate;
  }
  .cssload-preloader .cssload-preloader-box > div:nth-child(6) {
    background: #007bff;
    margin-right: 15px;
    animation: cssload-movement 690ms ease 431.25ms infinite alternate;
    -o-animation: cssload-movement 690ms ease 431.25ms infinite alternate;
    -ms-animation: cssload-movement 690ms ease 431.25ms infinite alternate;
    -webkit-animation: cssload-movement 690ms ease 431.25ms infinite alternate;
    -moz-animation: cssload-movement 690ms ease 431.25ms infinite alternate;
  }
  .cssload-preloader .cssload-preloader-box > div:nth-child(7) {
    background: #007bff;
    margin-right: 15px;
    animation: cssload-movement 690ms ease 517.5ms infinite alternate;
    -o-animation: cssload-movement 690ms ease 517.5ms infinite alternate;
    -ms-animation: cssload-movement 690ms ease 517.5ms infinite alternate;
    -webkit-animation: cssload-movement 690ms ease 517.5ms infinite alternate;
    -moz-animation: cssload-movement 690ms ease 517.5ms infinite alternate;
  }

  @keyframes cssload-movement {
    from {
      transform: scale(1) translateY(0px) rotateX(0deg);
      box-shadow: 0 0 0 rgba(0, 0, 0, 0);
    }
    to {
      transform: scale(1.5) translateY(-24px) rotateX(45deg);
      box-shadow: 0 24px 39px #007bff;
      background: #007bff;
    }
  }

  @-o-keyframes cssload-movement {
    from {
      -o-transform: scale(1) translateY(0px) rotateX(0deg);
      box-shadow: 0 0 0 rgba(0, 0, 0, 0);
    }
    to {
      -o-transform: scale(1.5) translateY(-24px) rotateX(45deg);
      box-shadow: 0 24px 39px #007bff;
      background: #007bff;
    }
  }

  @-ms-keyframes cssload-movement {
    from {
      -ms-transform: scale(1) translateY(0px) rotateX(0deg);
      box-shadow: 0 0 0 rgba(0, 0, 0, 0);
    }
    to {
      -ms-transform: scale(1.5) translateY(-24px) rotateX(45deg);
      box-shadow: 0 24px 39px #007bff;
      background: #007bff;
    }
  }

  @-webkit-keyframes cssload-movement {
    from {
      -webkit-transform: scale(1) translateY(0px) rotateX(0deg);
      box-shadow: 0 0 0 rgba(0, 0, 0, 0);
    }
    to {
      -webkit-transform: scale(1.5) translateY(-24px) rotateX(45deg);
      box-shadow: 0 24px 39px #007bff;
      background: #007bff;
    }
  }

  @-moz-keyframes cssload-movement {
    from {
      -moz-transform: scale(1) translateY(0px) rotateX(0deg);
      box-shadow: 0 0 0 rgba(0, 0, 0, 0);
    }
    to {
      -moz-transform: scale(1.5) translateY(-24px) rotateX(45deg);
      box-shadow: 0 24px 39px #007bff;
      background: #007bff;
    }
  }
}
</style>

