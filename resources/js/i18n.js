import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
    en: {
        main: {
            calendar: 'Calendar'
        },
        auth: {
            login: 'Login',
            register: 'Register',
            password: 'Password',
            user: 'User',
            admin: 'Admin',
            logout: 'Logout',
            email: 'Email'
        }
    },
    pl: {
        main: {
            calendar: 'Kalendarz'
        },
        auth: {
            login: 'Zaloguj się',
            register: 'Zarejestruj się',
            password: 'Hasło',
            user: 'Twój profil',
            admin: 'Panel administracyjny',
            logout: 'Wyloguj',
            email: 'Email'
        }
    }
}

const i18l = new VueI18n({
    locale: 'en',
    messages, 
})

export default i18l