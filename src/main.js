// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import Meta from 'vue-meta'
import VueTouch from 'vue-touch'
// import VueAnalytics from 'vue-analytics'

sync(store, router) // router sync

Vue.config.productionTip = false
Vue.use(Meta)
Vue.use(VueTouch, {name: 'v-touch'})
// Vue.use(VueAnalytics, { id: 'UA-112161846-1', router })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
