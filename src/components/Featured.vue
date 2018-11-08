<template>
  <div class="inner_wrapper" v-if="apidata.length !== 0">
    <FeaturedSlider></FeaturedSlider>
  </div>
</template>

<script>
import SiteHeader from './library/SiteHeader.vue'
import FeaturedSlider from './library/FeaturedSlider.vue'

export default {
  name: 'Featured',
  components: {
    SiteHeader,
    FeaturedSlider
  },
  computed: {
    apidata () {
      return this.$store.state.apidata
    },
    studio () {
      return this.apidata['1-studio']
    }
  }
}

</script>

<style lang="less">
  @import "../less/variables.less";

</style>
