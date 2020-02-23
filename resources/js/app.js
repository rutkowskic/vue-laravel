import Vue from 'vue'

import './filters'
import router from './router'
import store from './store/store'
import i18n from './i18n'

import App from './views/App'

const app = new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store,
    i18n
})