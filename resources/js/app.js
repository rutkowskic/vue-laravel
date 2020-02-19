import Vue from 'vue'

import router from './router'
import store from './store/store'
import i18n from './i18n'

import App from './views/App'

Vue.filter('uppercase', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.toUpperCase()
  })

const app = new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store,
    i18n
})