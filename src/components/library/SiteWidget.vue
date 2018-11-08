<template :count="count">
  <div class="site_widget" v-if="timestamp">
    <span class="site_widget_text" >{{ widget }}</span>
  </div>

</template>

<script>
import moment from 'moment-timezone'
import axios from 'axios'

export default {
  name: 'SiteWidget',
  data () {
    return {
      timestamp: null,
      weather: [],
      errors: [],
      widget: null
    }
  },
  computed: {
    apidata () {
      return this.$store.state.apidata
    },
    studio () {
      return this.apidata['1-studio']
    },
    timezone () {
      return this.studio.timezone
    },
    city () {
      return this.studio.city
    },
    count () {
      return this.$store.state.count
    }
  },
  mounted () {
    // Get Weather
    this.getWeather()
    // Update Clock
    setInterval(this.updateDateTime, 100)
    // Update Weather
    setInterval(this.getWeather, 60000)
  },
  watch: {
    weather: function () {
      if (this.weather.weather) {
        this.widget = this.city + ' (' + this.weather.weather[0].main + ', ' + this.timestamp + ')'
      }
    },
    timestamp: function () {
      if (this.weather.weather) {
        this.widget = this.city + ' (' + this.weather.weather[0].main + ', ' + this.timestamp + ')'
      }
    }
  },
  methods: {
    // Update Clock
    updateDateTime () {
      this.timestamp = moment().tz(this.timezone).format('h:mm a')
    },
    getWeather () {
      // Get Weather Data
      axios.get('http://api.openweathermap.org/data/2.5/weather?q=' + this.city + '&units=metric&appid=13d7b29f538140b2a8366edd0b8cde64')
      .then(response => {
        this.weather = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
  }
}
</script>

<style lang="less">
  @import "../../less/variables.less";

  .site_widget {
    z-index: -1;
    position: relative;
    display: inline-block;
    .fs-l;
    padding: 0 0 0 @mp-e;
    &_text {
      color: @black;
      user-select: none;
      float: left;
    }
  }

  @media only screen and (max-width:927px){
    .site_widget {
      display: none;
    }
  }

  
</style>
