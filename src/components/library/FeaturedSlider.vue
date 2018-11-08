<template>
  <div class="feat_img_wrapper">
    <FeaturedInfo :num="currentNumber"></FeaturedInfo>
    <v-touch 
      tag="a" 
      v-on:swipeleft="onSwipeLeft" 
      v-on:swiperight="onSwipeRight" 
      v-on:tap="onSwipeLeft"  
      v-bind:swipe-options="{ threshold: 20 }" 
      class="feat_next"
    >
    </v-touch>
    <v-touch 
      tag="a" 
      v-on:swipeleft="onSwipeLeft" 
      v-on:swiperight="onSwipeRight" 
      v-on:tap="onSwipeRight" 
      v-bind:swipe-options="{ threshold: 20 }" 
      class="feat_prev"
    >
    </v-touch>
    <div class="feat_img" v-for="number in [currentNumber]" :class="image.size">
      <div :style="{ 'background-image': 'url(' + image.url + ')' }"></div>
    </div>
  </div>
</template>

<script>
  import FeaturedInfo from './FeaturedInfo.vue'
  import { mapMutations } from 'vuex'

  export default {
    name: 'FeaturedSlider',
    components: {
      FeaturedInfo
    },
    data () {
      return {
        currentNumber: 0
      }
    },
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
      images () {
        return this.studio.featuredimg
      },
      image () {
        return this.images[this.currentNumber]
      },
      nextimgurl () {
        if (this.currentNumber !== this.images.length - 1) {
          return this.images[this.currentNumber + 1].url
        } else {
          return this.images[0].url
        }
      },
      previmgurl () {
        if (this.currentNumber > 0) {
          return this.images[this.currentNumber - 1].url
        } else {
          return this.images[this.images.length - 1].url
        }
      }
    },
    methods: {
      preloadimages (arr) {
        const newimages = []
        for (let i = 0; i < arr.length; i++) {
          newimages[i] = new Image()
          newimages[i].src = arr[i]
        }
      },
      onSwipeLeft: function () {
        if (this.currentNumber < this.images.length - 1) {
          this.currentNumber += 1
        } else {
          this.currentNumber = 0
        }
        this.UPDATE_COLOR(this.image.color)
        this.preloadimages([this.nextimgurl, this.previmgurl])
      },
      onSwipeRight: function () {
        if (this.currentNumber === 0) {
          this.currentNumber = this.images.length - 1
        } else {
          this.currentNumber -= 1
        }
        this.UPDATE_COLOR(this.image.color)
        this.preloadimages([this.nextimgurl, this.previmgurl])
      },
      KeyListener: function (evt) {
        if (evt.keyCode === 39) {
          this.onSwipeRight()
        } else if (evt.keyCode === 37) {
          this.onSwipeLeft()
        }
      },
      ...mapMutations([
        'UPDATE_COLOR'
      ])
    },
    mounted () {
      // Preloader
      if (this.projects) {
        this.preloadimages([this.nextimgurl, this.previmgurl])
      }
      this.UPDATE_COLOR(this.image.color)
    },
    created () {
      document.addEventListener('keyup', this.KeyListener)
    },
    destroyed () {
      document.removeEventListener('keyup', this.KeyListener)
    }
  }
</script>

<style lang="less">
  @import "../../less/variables.less";  

  .feat {
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
      display: block;
      z-index: -1;
      top: 0;
      left: 0;
      padding: 0;
      height: 100%;
      width: 100%;
      position: fixed;
      div {
        width: 100%;
        height: 100%;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: top center;
      }
      &.full {
        div {
          background-size: cover;
          background-position: center; 
        }
      }
      &.contained {
        div {
          width: 100%;
          height: 100%;
          background-size: contain;
          background-position: center; 
        }
      }
    }
  }

  .fade-transition {
    transition: all 3s ease;
    overflow: hidden;
    visibility: visible;
    opacity: 1;
    position: absolute;
  }
  .fade-enter, .fade-leave {
    opacity: 0;
    visibility: hidden;
  }

  @media only screen and (max-width:768px){
    .feat {
      &_img {
        &.contained {
          div {
            background-size: cover;
            background-position: center; 
          }
        }
      }
    }
  }

</style>
