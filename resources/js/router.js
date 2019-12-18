import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './views/Home'
import Login from './views/Login'
import Register from './views/Register'
import User from './views/User'
import Admin from './views/Admin'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/user',
            name: 'user',
            component: User
        },
        {
            path: '/admin',
            name: 'admin',
            component: Admin
        }
    ]
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/', '/calendar/public/', '/login', '/register'];
    const authRequired = publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    if (!authRequired && !loggedIn) {
      next('/login');
    }
    
    next();
})

export default router