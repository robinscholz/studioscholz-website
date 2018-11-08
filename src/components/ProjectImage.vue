<template>
    <div class="project_img_wrapper" v-if="apidata.length !== 0">
      <router-link rel="prefetch" class="project_next" :to="{ path: '/projects/' + id + '/' + nextimg }"></router-link>
      <v-touch 
        tag="a" 
        v-on:swipeleft="onSwipeLeft" 
        v-on:swiperight="onSwipeRight" 
        v-on:swipeup="onSwipeBack" 
        v-on:tap="onSwipeLeft" 
        v-bind:swipe-options="{ threshold: 20 }" 
        class="project_next"
      ></v-touch>
      <v-touch 
        tag="a" 
        v-on:swipeleft="onSwipeLeft" 
        v-on:swiperight="onSwipeRight" 
        v-on:swipeup="onSwipeBack" 
        v-on:tap="onSwipeRight" 
        v-bind:swipe-options="{ threshold: 20 }" 
        class="project_prev"
      ></v-touch>
      <div class="project_img" :class="image.size">
        <div :style="{ 'background-image': 'url(' + image.url + ')' }"></div>
      </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'ProjectImage',
  props: ['id', 'num'],
  computed: {
    apidata () {
      return this.$store.state.apidata
    },
    studio () {
      return this.apidata['1-studio']
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
    image () {
      return this.images[this.num]
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
    nextimgurl () {
      return this.images[this.nextimg].url
    },
    previmgurl () {
      return this.images[this.previmg].url
    },
    nexturl () {
      return '/' + this.project.uri + '/' + this.nextimg
    },
    prevurl () {
      return '/' + this.project.uri + '/' + this.previmg
    }
  },
  metaInfo () {
    // Check if data is loaded
    if (this.apidata.length !== 0) {
      return {
        title: this.studio.title + ': ' + this.project.title,
        meta: [
          { name: 'application-name', content: this.studio.title + ': ' + this.$route.name },
          // Google+ / Schema.org
          { itemprop: 'name', content: this.studio.title + ': ' + this.$route.name },
          // Facebook / Open Graph
          { property: 'og:title', content: this.studio.title + ': ' + this.project.title },
          { property: 'og:image', content: this.images[this.num].url }
        ],
        link: [
          { rel: 'image_src', href: this.images[this.num].url }
        ]
      }
    } else {
      return {
        title: 'Studio Scholz'
      }
    }
  },
  methods: {
    // Preloader
    preloadimages (arr) {
      if (this.$route.params.id) {
        const newimages = []
        for (let i = 0; i < arr.length; i++) {
          newimages[i] = new Image()
          newimages[i].src = arr[i]
        }
      }
    },
    onSwipeLeft () {
      this.$router.push(this.nexturl)
    },
    onSwipeRight () {
      this.$router.push(this.prevurl)
    },
    onSwipeBack () {
      this.$router.push({path: '/'})
    },
    ...mapMutations([
      'UPDATE_COLOR'
    ])
  },
  mounted () {
    // Preloader
    if (this.projects) {
      this.preloadimages([this.nextimgurl, this.previmgurl])
      this.UPDATE_COLOR(this.image.color)
    }
  },
  updated () {
    // Preloader
    if (this.images[this.nextimg] && this.images[this.previmg]) {
      this.preloadimages([this.nextimgurl, this.previmgurl])
    }
  },
  beforeUpdate () {
    // Color Change on Load
    this.UPDATE_COLOR(this.image.color)
  },
  watch: {
    // Color Change
    '$route': function () {
      this.UPDATE_COLOR(this.image.color)
    }
  }
}

</script>

<style lang="less">
  @import "../less/variables.less";

  .project {
    &_next {
      width: 50%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 50%;
      cursor: url(/static/cursor.png), auto;
      -webkit-tap-highlight-color: transparent;
      z-index: 1;
    }
    &_prev {
      width: 50%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      cursor: url(/static/cursor_prev.png), auto;
      -webkit-tap-highlight-color: transparent;
      z-index: 1;
    }
    &_img {
      &_wrapper {
        width: 100%;
        position: relative;
        display: flex;
        align-items: stretch;
        flex-direction: column;
        flex-grow: 1;
      }
      display: flex;
      align-items: stretch;
      flex-direction: column;
      flex-grow: 1;
      padding: 24px @mp-c @mp-c @mp-c;
      div {
        width: 100%;
        flex-grow: 1;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: top center;
      }
      &.full {
        height: 100vh;
        width: 100vw;
        position: fixed;
        top: 0;
        left: 0;
        padding: 0;
        z-index: -1;
        div {
          background-size: cover;
          background-position: center; 
        }
      }
      &.contained {
        height: 100vh;
        width: 100vw;
        position: fixed;
        top: 0;
        left: 0;
        padding: 0;
        z-index: -1;
        div {
          width: 100%;
          height: 100%;
          background-size: contain;
          background-position: center; 
        }
      }
    }
  }

  .hiddenimg {
    display: none;
  }

  @media only screen and (max-width:768px){
    .project {
      &_img {
        &.full, &.contained {
          flex-grow: 1;
          width: auto;
          position: initial;
          display: flex;
          padding: 24px @mp-c @mp-c @mp-c;
          div {
            background-size: contain;
            background-position: top center; 
          }
        }
      }
    }
  }
  
  @media only screen and (max-width:595px){
    .project {
      &_img {
        padding: 76px @mp-b @mp-b @mp-b;
        &.full, &.contained {
          padding: 76px @mp-b @mp-b @mp-b;

        }
      }
    }
  }
  
</style>
