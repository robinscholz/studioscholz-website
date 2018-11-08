<template>
  <div id="app">
    <SiteHead></SiteHead>
    <SiteHeader></SiteHeader>
    <router-view></router-view>
  </div>
</template>

<script>
import SiteHeader from './components/library/SiteHeader.vue'
import SiteHead from './components/library/SiteHead.vue'

export default {
  name: 'App',
  created () {
    this.$store.dispatch('LOAD_DATASET')
  },
  components: {
    SiteHeader,
    SiteHead
  }
}

</script>

<style lang="less">
  @import "less/global.less";
</style>
