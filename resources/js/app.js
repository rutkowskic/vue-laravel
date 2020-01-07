import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import PortalVue from 'portal-vue'

import router from './router'
import store from './store/store'
import i18n from './i18n'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './views/App'

Vue.filter('uppercase', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.toUpperCase()
  })

Vue.use(BootstrapVue)
Vue.use(PortalVue)

const app = new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store,
    i18n
})