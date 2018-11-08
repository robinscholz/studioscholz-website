<template>
  <div class="inner_wrapper">
    <div class="proj_background"></div>
    <div class="proj_flex">
      <ProjectInfo></ProjectInfo>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import ProjectInfo from './library/ProjectInfo.vue'
import { mapMutations } from 'vuex'

export default {
  name: 'Project',
  props: ['id'],
  components: {
    ProjectInfo
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
    images () {
      return this.project.images
    },
    nextimg () {
      const curr = parseInt(this.$route.params.num)
      const next = curr + 1
      const first = 1

      if (this.projects[this.id].images.hasOwnProperty(next)) {
        return next
      } else {
        return first
      }
    },
    previmg () {
      const curr = parseInt(this.$route.params.num)
      const prev = curr - 1
      const img = this.projects[this.id].images
      const last = Object.keys(img).length

      if (prev !== 0) {
        return prev
      } else {
        return last
      }
    },
    nexturl () {
      return '/' + this.project.uri + '/' + this.nextimg
    },
    prevurl () {
      return '/' + this.project.uri + '/' + this.previmg
    }
  },
  methods: {
    KeyListener: function (evt) {
      if (evt.keyCode === 27) {
        this.$router.push({path: '/inventory'})
        this.UPDATE_MENU(false)
      } else if (evt.keyCode === 37) {
        this.$router.push(this.prevurl)
      } else if (evt.keyCode === 39) {
        this.$router.push(this.nexturl)
      }
    },
    ...mapMutations([
      'UPDATE_MENU'
    ])
  },
  created () {
    document.addEventListener('keyup', this.KeyListener)
    this.UPDATE_MENU(true)
  },
  destroyed () {
    document.removeEventListener('keyup', this.KeyListener)
    this.UPDATE_MENU(false)
  }
}

</script>

<style lang="less">
  @import "../less/variables.less";

  .proj_background {
    background: @lightgrey;
    top: 0; 
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -1;
  }

  .proj_flex {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: stretch;
    align-content: stretch;
    flex-direction: column;
  }

  @media only screen and (max-width: 595px){
    .proj_flex {
      flex-direction: column-reverse;
    }
  }

</style>
