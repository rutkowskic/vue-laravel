import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
    en: {
        message: {
        hello: 'Hello'
        }
},
    pl: {
        message: {
        hello: 'Witaj'
        }
    }
}

export default i18n = new VueI18n({
    locale: 'en',
    messages, 
})