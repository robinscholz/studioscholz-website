<template>
  <div>
    <router-link v-for="thumb in project.thumbs" :key="thumb.id" class="entry_thumb" :class="thumb.orientation" :to="{ path: '/' + project.uri + '/' + thumb.num }">
      <img :src="thumb.url"></img>
    </router-link>
  </div>
</template>

<script>

export default {
  name: 'IndexThumb',
  props: ['project']
}
</script>

<style lang="less">
  @import "../../less/variables.less";

  .entry {
    &_thumb {
      height: 130px;
      width: auto;
      margin: @mp-a;
      display: inline-block;
      img {
        height: 100%;
        width: auto;
      }
    }
  }

  @media only screen and (max-width:768px){
    .entry {
      &_thumb {
        width: calc(~"50% - 20px");
        height: auto;
        margin: @mp-a;
        vertical-align: top;
        img {
          height: auto;
          width: 100%;
        }
      }
      &_thumb.portrait {
        width: calc(~"25% - 20px");
      }
      &_thumb.landscape {
        width: calc(~"50% - 20px");
      }
      &_thumb.square {
        width: calc(~"50% - 20px");
      }
    }
  }

    @media only screen and (max-width:500px){
    .entry {
      &_thumb {
        width: calc(~"100% - 20px");
        height: auto;
        margin: @mp-a;
        vertical-align: top;
        img {
          height: auto;
          width: 100%;
          display: block;
        }
      }
      &_thumb.portrait {
        width: calc(~"50% - 20px");
      }
      &_thumb.landscape {
        width: calc(~"100% - 20px");
      }
      &_thumb.square {
        width: calc(~"100% - 20px");
      }
    }
  }

</style>
