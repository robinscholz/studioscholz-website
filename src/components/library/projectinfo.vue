<template>
  <h2 class="project_headline" v-if="apidata.length !== 0" :class="[$store.state.color, {'transparent': !$store.state.isProject}]">
    <span class="nobr" v-if="project.title">
      <a :href="project.exturl" v-if="project.exturl" target="_blank">{{project.title}}</a>
    <template v-else>{{project.title}}</template>
    </span>
    <span v-if="project.client.length && project.client.join(', ') !== project.title">{{project.client.join(', ')}}</span> 
    <span class="nobr" v-if="project.year">{{project.year}}</span> 
    <span class="" v-if="project.collaborator.join(' & ')">{{project.relation}} {{project.collaborator.join(' & ')}}</span>
     <a class="header_bt" :style="{color: $store.state.color}" :class="[{'hidden': !$store.state.isProject}]"  v-on:click="toggleMenu">StSz&nbsp;&nbsp;&nbsp;F, I, A</a>
  </h2>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'ProjectInfo',
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
    projects () {
      return this.apidata['2-projects']
    },
    project () {
      return this.projects[this.id]
    },
    image () {
      return this.project.images[this.num]
    }
  },
  methods: {
    toggleMenu () {
      this.UPDATE_MENU(this.$store.state.isProject = !this.$store.state.isProject)
    },
    ...mapMutations([
      'UPDATE_MENU'
    ])
  }
}
</script>

<style lang="less">
  @import "../../less/variables.less";

  .project {
    &_headline {
      .fs-l;
      padding: @mp-c @mp-c 0 @mp-c;
      width: 100%;
      z-index: 99;
      span {
        float: left;
      }
      span::after {
        content: ",\00a0";
      }
      span:first-child {
        &::after {
          content: "\00a0";
        }
      }
      span:nth-last-child(2) {
        &::after {
          content: ")";
        }
      }
      span:nth-child(2) {
        &::before {
          content: "(";
        }
      }
      span a {
        &::after {
          content: " ↗\00FE0E";
        }
      }
    }
  }

  .header {
    &_bt {
      position: relative;
      .fs-s;
      vertical-align: top;
      position: relative;
      display: inline-block;
      margin: -2px 0 0 @mp-e;
      padding: 4px 6px 0px 6px;
      border: solid 1px;
      cursor: pointer;
      user-select: none;
      border-radius: 3px;
      z-index: 99;
      &.active {;
      }
    }
  }

  @media only screen and (max-width: 1200px){
    .header {
      &_bt {
        position: fixed;
        top: @mp-c;
        right: @mp-c;
      }
    }

    .project {
      &_headline {
        width: calc(~"100% - 186.7px")
      }
    }
  }

  @media only screen and (max-width: 768px){
    .header {
      &_bt {
        color: @black!important;
      }
    }
    .project {
      &_headline {
        &.white {
          color: @black;
        }
      }
    }
  }

  @media only screen and (max-width: 595px){
    .header {
      &_bt {
        display: none;
      }
    }
    .project {
      &_headline {
        padding: 0 @mp-b @mp-b @mp-b;
        width: 100%;
        .fs-m;
        span:first-child {
          width: 100%;
        }
      }
    }
  }

</style>
