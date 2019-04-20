<template src="../views/query_executor.html"></template>

<script lang="ts" src="../scripts/query_executor.ts">
</script>
<style lang="scss" scoped>
#divButtonContainer .v-btn {
  margin: 5px 0px;
}

#divQueryExecutor {
  margin-top: 10px;
  background-color: rgb(241, 241, 241);
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
}
#divResultInfo {
  height: 50px;
  position: absolute;
  bottom: 0px;
  background: inherit;
  z-index: 100;
  width: 97%;
}
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


