<template>
  <h2 class="featured_headline" v-if="apidata.length !== 0 && project" :class="$store.state.color">
    <span class="nobr">
      <a :href="'/inventory/' + image.uid + '/1'">{{project.title}}&nbsp;</a>
    </span>
    <span v-if="project.year">({{project.year}}</span> 
    <span class="" v-if="project.collaborator.join(' & ')">{{project.relation}} {{project.collaborator.join(' & ')}}</span>
  </h2>
</template>

<script>

export default {
  name: 'FeaturedInfo',
  props: ['num'],
  computed: {
    apidata () {
      return this.$store.state.apidata
    },
    studio () {
      return this.apidata['1-studio']
    },
    images () {
      return this.studio.featuredimg
    },
    projects () {
      return this.apidata['2-projects']
    },
    image () {
      return this.images[this.num]
    },
    uid () {
      return this.image.uid
    },
    project () {
      return this.projects[this.uid]
    }
  }
}
</script>

<style lang="less">
  @import "../../less/variables.less";

  .featured {
    &_headline {
      .fs-l;
      z-index: 10;
      position: fixed;
      top: @mp-c;
      left: 462px;
      width: calc(~"100vw - 552px");
      .fs-l;
      margin: 0 @mp-c 0 @mp-e; 
      span {
        float: left;
      }   
      span::after {
        content: ",\00a0";
      }
      span:last-child::after {
        content: ")";
      }
      span:first-child::after {
        content: "";
      }
    }
  }

  @media only screen and (max-width: 1200px){
    .featured {
      &_headline {
        top: auto;
        left: auto;
        width: calc(~"100vw - 60px");
        bottom: @mp-c;
        padding: 0 @mp-c;
        margin: 0;
      }
    }
  }

  @media only screen and (max-width: 595px){
    .featured {
      &_headline {
        .fs-m;
        width: 100%;
        padding: 0 @mp-b;
        bottom: @mp-b;
        top: auto;
        span:first-child {
          width: 100%;
          display: block;
        }
      }
    }
  }


</style>
