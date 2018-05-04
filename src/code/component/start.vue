<template>
  <div class="start-page">
      <h1 class="title">IDBStudio</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default class Start extends Vue{
  
}
</script>


<style lang="sass">
.start-page{
    background-color:#2c3e50;
    width:100%;
    height:100%;
    position: absolute;
    z-index: 1000;

    .title{
      font-family: Allerta;
      color:white;
      text-align:center;
      margin-top:150px;
    }
}
</style>

