<template>
  <header class="header_wrapper" v-if="apidata.length !== 0" :class="[color, {blackmobile: ProjectPage}]">
    <SiteNav :compTitle="compTitle" :class="[{'hidden': $store.state.isProject}]"></SiteNav>
    <SiteWidget :class="[{'hidden': isNotStudio}]"></SiteWidget>
    <a class="header_news" :style="{color: studio.intros[count][2], borderColor: studio.intros[count][2]}" @click="updateCount" v-if="showNews && studio.intros.length !== 0 ">{{ studio.intros[count][1] }}</a>
    <a class="header_info" v-if="ProjectPage" :style="{color: $store.state.color}" :class="[{'hidden': $store.state.isProject}]" v-on:click="toggleMenu">Close</a>
  </header>
</template>

<script>
  import SiteWidget from '../library/SiteWidget.vue'
  import SiteNav from '../library/SiteNav.vue'
  import { mapMutations } from 'vuex'

  export default {
    name: 'SiteHeader',
    components: {
      SiteWidget,
      SiteNav
    },
    computed: {
      apidata () {
        return this.$store.state.apidata
      },
      studio () {
        return this.apidata['1-studio']
      },
      compTitle () {
        return this.studio.title
      },
      id () {
        return this.$store.state.route.params.id
      },
      num () {
        return this.$store.state.route.params.num
      },
      projects () {
        return this.apidata['2-projects']
      },
      project () {
        return this.projects[this.id]
      },
      image () {
        return this.project.images[this.num]
      },
      color () {
        return this.$store.state.color
      },
      count () {
        return this.$store.state.count
      },
      isNotStudio () {
        if (this.$store.state.route.name !== 'About' || 0) {
          return true
        }
      },
      showNews () {
        if (this.$store.state.route.name === 'Inventory') {
          return true
        }
      },
      ProjectPage () {
        if (this.id) {
          return true
        }
      }
    },
    methods: {
      updateCount () {
        const arrlength = this.studio.intros.length
        if (this.count < arrlength - 1) {
          this.$store.state.count += 1
        } else {
          this.$store.state.count = 0
        }
      },
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

  .header {
    &_wrapper {
      margin: @mp-c @mp-c 0 @mp-c;
      z-index: 99;
      position: relative;
      display: inline-block;
      .fs-l;
    }
    &_info {
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
    &_news {
      .fs-s;
      vertical-align: top;
      position: relative;
      display: inline-block;
      margin: -2px 0 0 @mp-e;
      padding: 4px 6px 0px 6px;
      border: solid 1px;
      cursor: pointer;
      user-select: none;
      color: @lightgrey;
      border-radius: 3px;
    }
  }

  @media only screen and (max-width: 1200px){
    .header {
      &_info {
        position: fixed;
        top: @mp-c;
        right: @mp-c;
      }
    }
  }

  @media only screen and (max-width:927px){
    .header {
      &_news {
        display: none;
      }
    }
  }

  @media only screen and (max-width:768px){
    .header {
      &_info {
        color: @black!important;
      }
      &_wrapper {
        &.white.blackmobile {
          color: @black!important;
        }
      }
    }
  }


  @media only screen and (max-width:595px){
    .header {
      &_wrapper {
        .fs-m;
        margin: @mp-b @mp-b 0 @mp-b;
      }
    }
  }
</style>
