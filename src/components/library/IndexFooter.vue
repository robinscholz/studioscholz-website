<template>
  <footer v-if="apidata.length !== 0" class="index_footer">
    <div v-if="apidata.length !== 0" class="index_modified">Last edited: {{studio.modified}}</div>
    <div class="index_imprint" :class="{ 'padtop': imprintVisible }">
      <a  class="index_imprint_headline" v-on:click="imprintVisible = !imprintVisible">Legal Notice</a>
      <div v-if="imprintVisible" v-html="studio.imprint"></div>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'OverlayIntro',
    data () {
      return {
        imprintVisible: false,
        year: new Date().getFullYear()
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
  .index {
    &_modified {
      padding: @mp-c @mp-c 0 @mp-c;
    }
    &_imprint {
      max-width: 925px;
      .fs-m;
      padding: 0 @mp-c @mp-c @mp-c;
      &_headline {
        cursor: pointer;
      }
      p {
        padding:@mp-b 0 0 0;
      }
      &.padtop {
        padding-top: @mp-b;
      }
    }
  }

  @media only screen and (max-width: 595px){
    .index {
      &_modified {
        padding: @mp-b @mp-b 0 @mp-b;
        .fs-s;
      }
      &_imprint {
        padding-left: @mp-b;
        padding-right: @mp-b;
         .fs-s;
      }
    }
  }
</style>
