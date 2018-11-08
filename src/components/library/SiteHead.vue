<template>
</template>

<script>

export default {
  name: 'SiteHead',
  computed: {
    apidata () {
      return this.$store.state.apidata
    },
    studio () {
      return this.apidata['1-studio']
    }
  },
  metaInfo () {
    // Check if data is loaded
    if (this.apidata.length !== 0) {
      return {
        title: this.studio.title,
        meta: [
          { name: 'application-name', content: this.studio.title },
          { name: 'description', content: this.studio.shortinfo },
          { name: 'keywords', content: '' },
          { name: 'robots', content: 'index, follow' },
          // Google+ / Schema.org
          { itemprop: 'name', content: this.studio.title },
          { itemprop: 'description', content: this.studio.shortinfo },
          // Facebook / Open Graph
          { property: 'og:title', content: this.studio.title },
          { property: 'og:image', content: this.studio.infoimg },
          { property: 'og:description', content: this.studio.shortinfo }
        ],
        link: [
          { rel: 'image_src', href: this.studio.infoimg }
        ]
      }
    } else {
      return {
        title: 'Studio Scholz'
      }
    }
  }
}

</script>

<style lang="less">
</style>
