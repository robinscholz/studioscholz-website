<template>
  <div class="multiselect_wrapper" v-if="apidata.length !== 0">
    <multiselect 
      v-model="filtervalue" 
      :options="options"
      :multiple="true"
      :max-height="260"
      :limit="4"
      :show-labels="false"
      placeholder="Search and Filter …"
      @input="UPDATE_FILTER"
    ></multiselect>
  </div>
</template>

<script>
  import Multiselect from 'vue-multiselect'
  import { mapActions } from 'vuex'
  import _ from 'underscore'

  export default {
    name: 'IndexSelect',
    components: {
      Multiselect
    },
    computed: {
      apidata () {
        return this.$store.state.apidata
      },
      studio () {
        return this.apidata['1-studio']
      },
      optionscount () {
        return this.studio.filters.length
      },
      options () {
        const filters = this.studio.filters
        const years = this.studio.years
        const places = this.studio.places
        const clients = _.flatten(this.studio.clients).sort()
        const collaborators = _.flatten(this.studio.collaborators).sort()
        const options = _.union(filters, clients, places, years, collaborators)
        return options
      },
      filtervalue () {
        return this.$store.state.filtervalue
      }
    },
    methods: {
      ...mapActions(['UPDATE_FILTER'])
    }
  }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="less">
  @import "../../less/variables.less";

  @bordercl: @midgrey;
  @backgroundcl: @lightgrey;

  .placeholder {
    &::-webkit-input-placeholder { 
      color: @black;
      letter-spacing: 0.78px;
    }
    &::-moz-placeholder {
      color: @black;
      letter-spacing: 0.78px;

    }
    &:-ms-input-placeholder { 
      color: @black;
      letter-spacing: 0.78px;
    }
    &:-moz-placeholder {
      color: @black;
      letter-spacing: 0.78px;
    };
  };

  //Wrapper
  .multiselect_wrapper {
    padding: 22px @mp-c 0 @mp-c;
    max-width: 1025px; 
    width: 70%;
  }

  .multiselect {
    .fs-m;
    line-height: 1;
    font-family: inherit; 
    color: @black;
    &__tags {
      background: @backgroundcl;
      border: 1px solid @bordercl;
      border-radius: 0px;
      min-height: 47px;
    }
    &__tag {
      background: @black;
      color: @white;
      border-radius: 0px;
      padding: 7px 32px 5px 10px;
      margin-right: 8px;
      &-icon {
        margin-left: 0px;
        width: 34px;
        text-align: center;
        font-weight: 400;
        &:after {
          color: @lightgrey;
          font-size: inherit;
          line-height: 31px;
        }
        &:hover {
          background: none;
          color: inherit;
        }
      }

    }
    &__input {
      background: inherit;
      font-size: inherit;
      min-height: auto;
      margin-top: 5px;
      margin-bottom: 4px;
      line-height: 20px;
      .placeholder;
    }
    &__content-wrapper {
      background: @backgroundcl;
      border: 1px solid @bordercl;
      border-top: none;
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
    }
    &__element {
      border-top: solid 1px @bordercl;
      &:first-child {
        border-top: none;
      }
    }
    &__option {
      &--selected {
        color: @midgrey;
        background: inherit;
      }
      &--highlight {
        background: @black;
        color: @lightgrey;
      }
      &--highlight.multiselect__option--selected {
        background: @lightgrey;
        color: @midgrey;
      }
    }
    &__strong {
      font-weight: normal;
      color: inherit;
      margin-top: 7px;
    }
    &__select {
      color: @black;
      margin-top: 0;
      height: 47px;
      padding: 0 8px;
      &::before {
        color: @black;
        border-color: @black transparent transparent transparent;
        top: 27px;
      }
    }
  }

  @media only screen and (max-width: 1024px){
    .multiselect_wrapper {
      display: block;
      width: auto;
    }
  } 

  @media only screen and (max-width: 595px){
    .multiselect_wrapper {
      padding-left: @mp-b;
      padding-right: @mp-b;
    }
  }  

</style>
