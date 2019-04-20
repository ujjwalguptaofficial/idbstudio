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
    font-size: 60px;
    position: absolute;
    top: 40%;
    text-align: center;
    width: 100%;
  }
}
</style>

