<template>
  <div class="intro_overlay">
    <div style="background-image:url('/static/studioscholz.svg')"></div>
  </div>
</template>

<script>
  export default {
    name: 'OverlayIntro'
  }
</script>

<style lang="less">
  @import "../../less/variables.less";
  .intro_overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 99;
    top: 0;
    left: 0;
    div {
      margin: @mp-c;
      width: calc(~"100% - 60px");
      height: calc(~"100% - 60px");
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
</style>
