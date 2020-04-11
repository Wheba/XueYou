import Vue from 'vue'
import '@/styles/index.scss' // global css
import App from './App.vue'
import router from './router'
import store from './store'

import 'mint-ui/lib/style.css'
/*Swiper*/
// import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/css/swiper.css'
// Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

Vue.config.productionTip = false

Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
