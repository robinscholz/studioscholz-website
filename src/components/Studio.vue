<template>
  <div class="inner_wrapper" v-if="apidata.length !== 0">
    <div class="studio_background"></div>
    <div class="studio_wrapper">
      <div class="studio_info" v-html="studio.info"></div>
      <StudioImage></StudioImage>
    </div>
    <IndexFooter></IndexFooter>
  </div>
</template>

<script>
import SiteHeader from './library/SiteHeader.vue'
import StudioImage from './library/StudioImage.vue'
import IndexFooter from './library/IndexFooter.vue'
import { mapMutations } from 'vuex'

export default {
  name: 'Studio',
  components: {
    SiteHeader,
    StudioImage,
    IndexFooter
  },
  computed: {
    apidata () {
      return this.$store.state.apidata
    },
    studio () {
      return this.apidata['1-studio']
    }
  },
  metaInfo () {
    // Check if data is loaded
    if (this.apidata.length !== 0) {
      return {
        title: this.studio.title + ': ' + this.$route.name,
        meta: [
          { name: 'application-name', content: this.studio.title + ': ' + this.$route.name },
          // Google+ / Schema.org
          { itemprop: 'name', content: this.studio.title + ': ' + this.$route.name },
          // Facebook / Open Graph
          { property: 'og:title', content: this.studio.title + ': ' + this.$route.name }
        ]
      }
    } else {
      return {
        title: 'Studio Scholz'
      }
    }
  },
  methods: {
    ...mapMutations([
      'UPDATE_COLOR'
    ])
  },
  mounted () {
    this.UPDATE_COLOR('black')
  }
}

</script>

<style lang="less">
  @import "../less/variables.less";

  .inner_wrapper {
    width: 100%;
    margin: 0 auto;
  }

  .studio {
    &_background {
      background: @lightgrey;
      top: 0; 
      left: 0;
      width: 100%;
      height: 100%;
      position: fixed;
      z-index: -1;
    }
    &_wrapper {
      .fs-l;
      padding: @mp-b @mp-c 0 @mp-c;
    }
    &_info {
      max-width: 1025px;
      p {
        padding-bottom: 26px;
      }
    }
    &_mail {
      padding: 0 @mp-c;
      .fs-l;
    }
  }

  @media only screen and (max-width: 595px){
    .studio {
      &_wrapper {
        .fs-m;
        padding: 16px @mp-b 0 @mp-b; 
      }
      &_mail {
         .fs-m;
         padding: 0 @mp-b;
      }
      &_info {
        p {
          padding-bottom: @mp-b;
        }
      }
    }
  }

</style>
