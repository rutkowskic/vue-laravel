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

const i18l = new VueI18n({
    locale: 'en',
    messages, 
})

export default i18l