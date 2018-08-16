import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/generate',
            name: 'generate',
            component: () => import('./views/Generate.vue')
        },
        {
            path: '/auxiliary',
            name: 'auxiliary',
            component: () => import('./views/Auxiliary.vue')
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('./views/About.vue')
        }
    ]
})
