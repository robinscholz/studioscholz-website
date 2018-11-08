<template>
    <div class="nav_wrapper" v-on:mouseover="activeClass" v-on:mouseout="activeClass">
      <a class="nav_a">{{compTitle}}</a>
      <router-link class="nav_a" :class="[{active: active}]" :to="'/'" exact>Featured</router-link>
      <router-link class="nav_a" :class="[{active: active}]" :to="'/inventory'" exact>Inventory</router-link>
      <router-link class="nav_a" :class="[{active: active}]" :to="'/about'">About</router-link>
    </div>
</template>

<script>

export default {
  name: 'SiteNav',
  props: ['compTitle'],
  data () {
    return {
      active: false
    }
  },
  methods: {
    activeClass () {
      this.active = !this.active
    }
  }
}

</script>

<style lang="less">
  @import "../../less/variables.less";

  .nav {
    &_wrapper {
      position: relative;
      pointer-events: none;
      display: inline-block;
      z-index: 99;
      float: left;
    }
    &_a {
      padding: 0 6px 0 0;
      user-select: none;
      float: left;
      pointer-events: auto;
      &:after {
        content: ", ";
        display: inline-block;
        text-decoration: none;
      }
      &:last-child {
        padding: 0;
        &:after {
          content: "";
        }
      }
      &:first-child {
        cursor: default;
        opacity: 1;
        &:after {
          content: "";
        }
        padding: 0 @mp-c 0 0;
      }
      &.router-link-active {
        text-decoration: underline;
        text-decoration-skip: ink;
        text-decoration-skip-ink: auto;
        opacity: 1;
      }
      &.active {
        opacity: 1;
        &::after {
          opacity: 1;
        }
      }
    }
  }

  @media only screen and (max-width: 595px){
    .nav {
      &_a {
        &:first-child {
          width: 100%;
          padding: 0;
        }
      }
      &_wrapper {
        &.hidden {
          display:block!important;
        }
      }
    }
  }

</style>
