<template src="../views/qry_result.html"></template>

<script lang="ts" src="../scripts/qry_result.ts">
</script>
<style lang="scss">
#divResult {
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
</style>


