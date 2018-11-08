<template>
  <div class="inner_wrapper">
    <div class="index_background"></div>
    <IndexSelect></IndexSelect>
    <section class="entry_section" v-if="apidata.length !== 0">
      <div class="entry_wrapper" v-for="project in filterItems(projects)" :key="project.id">
        <IndexInfo :project="project"></IndexInfo>
        <IndexThumb :project="project"></IndexThumb>
      </div>
    </section>
  </div>
</template>

<script>
  import IndexSelect from './library/IndexSelect.vue'
  import IndexInfo from './library/IndexInfo.vue'
  import IndexThumb from './library/IndexThumb.vue'
  import IndexFooter from './library/IndexFooter.vue'
  import _ from 'underscore'
  import { mapMutations } from 'vuex'

  export default {
    name: 'Index',
    components: {
      IndexSelect,
      IndexInfo,
      IndexThumb,
      IndexFooter
    },
    computed: {
      apidata () {
        return this.$store.state.apidata
      },
      projects () {
        return this.apidata['2-projects']
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
      filterItems: function (items) {
        const list = this.$store.state.filtervalue
        if (!Array.isArray(list) || !list.length) {
          return items
        } else {
          return _.values(items).filter(function (item) {
            const keywords = _.values(item.filter)
            const years = item.year.replace(/\D/g, '')
            const filter = _.union(keywords, item.client)
            filter.push(years)
            filter.push(item.collaborator)
            filter.push(item.place)
            const overlap = _.intersection(filter, _.values(list))
            if (!Array.isArray(overlap) || overlap.length) {
              console.log(filter)
              return item
            }
          })
        }
      },
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
    margin: 0 auto 0 auto;
  }

  .index_background {
    background: @lightgrey;
    top: 0; 
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -1;
  }

  .header_link {
    margin: 0 @mp-c;
    .fs-l;
  }

  .entry {
    &_section {
      max-width: 2000px;
    }
    &_wrapper {
      height: auto;
      overflow-y: auto;
      padding: @mp-c @mp-a @mp-a @mp-a;
      width: auto;
      overflow: hide;
      margin: @mp-b @mp-a 0 @mp-a;
      background: transparent;
      &:first-child {
        margin-top: @mp-d;
      }
      &:last-child {
        padding-bottom: @mp-c;
      }
    }
  }

  @media only screen and (max-width:595px){
    .header_link {
      .fs-m;
      margin: 0 @mp-b;
    }
    .entry_wrapper {
      padding-right: @mp-a;
      padding-left: @mp-a;
      margin-left: 0;
      margin-right: 0;
      margin-top: @mp-a;
      &:first-child {
        margin-top: @mp-a;
      }
    }
  }

</style>
