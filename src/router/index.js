import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/bookList'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        path: '/login',
        name: 'Hello',
        component: login
    }]
})