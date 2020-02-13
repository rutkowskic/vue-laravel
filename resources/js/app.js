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

let handleOutsideClick
Vue.directive('closable', {
  bind (el, binding, vnode) {

    handleOutsideClick = (e) => {
      e.stopPropagation()
      const { handler, exclude, dataModel } = binding.value
      let clickedOnExcludedEl = false
      console.log(dataModel)
      exclude.forEach(refName => {
        if (!clickedOnExcludedEl) {
          const excludedEl = vnode.context.$refs[refName]
          clickedOnExcludedEl = excludedEl.contains(e.target)
        }
      })
      if (!clickedOnExcludedEl) {
        vnode.context[handler](dataModel)
      }
    }
    document.addEventListener('click', handleOutsideClick)
    document.addEventListener('touchstart', handleOutsideClick)

  },
  unbind () {
    document.removeEventListener('click', handleOutsideClick)
    document.removeEventListener('touchstart', handleOutsideClick)
  },
  componentUpdated (el, binding, vnode, oldVnode){
    const { handler, exclude, dataModel } = binding.value
    let test = false;
    exclude.forEach(refName => {
      if (!vnode.context.$refs[refName]) {
        test = true;
      }
    })
    if(test){
      document.removeEventListener('click', handleOutsideClick)
      document.removeEventListener('touchstart', handleOutsideClick)
    }
  }
})

const app = new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store,
    i18n
})