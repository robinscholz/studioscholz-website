<template>
  <h2 class="entry_headline">
    <span class="nobr" v-if="project.title">
      <a :href="project.exturl" v-if="project.exturl" target="_blank">{{project.title}}</a>
    <template v-else>{{project.title}}</template>
    </span>
    <span v-if="project.client.length && project.client.join(', ') !== project.title">{{project.client.join(', ')}}</span> 
    <span class="nobr" v-if="project.year">{{project.year}}</span> 
    <span class="nobr" v-if="project.collaborator.join(' & ')">{{project.relation}} {{project.collaborator.join(' & ')}}</span>
  </h2>
</template>

<script>

export default {
  name: 'IndexInfo',
  props: ['project']
}
</script>

<style lang="less">
  @import "../../less/variables.less";

  .entry {
    &_headline {
      margin: 0 @mp-a @mp-a/2 @mp-a;
      .fs-m;
      width: calc(~"100% - 20px");
      float: left;
      span {
        text-decoration-skip: ink;
        text-decoration-skip-ink: auto;
        float: left;
      }
      span::after {
        content: ",\00a0";
      }
      span:first-child::after {
        content: "\00a0"
      }
      span:nth-child(2)::before {
        content: "(";
      }
      span:last-child::after {
        content: ")";
      }
      span a {
        &::after {
          content: " ↗\00FE0E";
        }
      }
    }
  }

  @media only screen and (max-width: 595px){
    .entry {
      &_headline {
        .fs-s;
        width: calc(~"100% - 20px");
      }
    }
  }
  
</style>
