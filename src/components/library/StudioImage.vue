<template>
  <div class="studio_img_wrapper">
  <img class="studio_img" :src="studio.infoimg">
  <div class="studio_img_capt" v-if="studio.infoimgcaption" v-html="studio.infoimgcaption"></div>
  </div>
</template>

<script>

export default {
  name: 'StudioImage',
  data () {
    return {
      id: this.$route.params.id,
      num: this.$route.params.num
    }
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
  @import "../../less/variables.less";

  .studio {
    &_img {
      max-width: 800px;
      width: 100%;
      padding: 5px 0;
      display: block;
      &_capt {
        .fs-m;
        padding: 15px 0;
      }
      &_wrapper {
        display: block;
        height: auto;
        overflow: hidden;
      }
    }
  }

  @media only screen and (max-width: 595px){
    .studio_img_capt {
      .fs-s;
    }
  }

</style>
