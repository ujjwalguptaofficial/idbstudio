<template src="../views/start.html"></template>

<script lang="ts" src="../scripts/start.ts">
</script>

<style lang="scss">
$loaderBackGroundColor: #bb5156;
.start-page {
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

  .loader {
    color: aliceblue;
    font-size: 20px;
    position: absolute;
    top: 45%;
    left: 45%;
    right: 0px;
    bottom: 0px;
    z-index: 10;
  }
}
</style>

