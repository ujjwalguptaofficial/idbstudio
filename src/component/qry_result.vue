<template src="../views/qry_result.html"></template>

<script lang="ts" src="../scripts/qry_result.ts">
</script>
<style lang="scss">
.divResult {
  overflow-y: scroll;
  overflow-x: hidden;
  min-height: 200px;
  width: 100%;
  left: 1px;
  position: relative;
  // right: 5px;
  background-color: white;

  .table tr td,
  .table tr th {
    border: 1px inset;
    text-align: center;
  }
}

#divResultInfo {
  height: 50px;
  position: absolute;
  bottom: 0px;
  background: rgb(241, 241, 241);
  z-index: 100;
  width: 100%;

  table {
    height: inherit;
    width: 100%;
  }
  table tr td {
    padding-left: 20px;
  }
  table tr td:last-child {
    text-align: right;
    padding-right: 20px;
    padding-left: 50px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
  bottom: 0px;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  bottom: -100px;
}
.card-body {
  padding-top: 2px;
  padding-left: 0px;
}
</style>


