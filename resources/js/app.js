import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import PortalVue from 'portal-vue'
import Lang from 'lang.js';

import router from './router'
import store from './store/store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './views/App'

Vue.prototype.trans = new Lang({ 
    messages: window.messages, 
    locale: window.default_language, 
    fallback: window.fallback_locale
})

Vue.prototype.$langs = Object.keys(window.messages)

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
    store
})