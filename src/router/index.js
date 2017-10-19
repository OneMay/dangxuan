import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import index from '@/components/index'
import videoQuery from '@/components/videoQuery'
import videoList from '@/components/videoList'
import videoUpdate from '@/components/videoUpdate'
import bookQuery from '@/components/bookQuery'
import bookList from '@/components/bookList'
import sundQuery from '@/components/sundQuery'
import sundList from '@/components/sundList'
import feedbackList from '@/components/feedbackList'
import videoAdd from '@/components/videoAdd'
import welcome from '@/components/welcome'
import bookAdd from '@/components/bookAdd'
import bookPageAdd from '@/components/bookPageAdd'
import sundListAdd from '@/components/sundListAdd'
import sundPageAdd from '@/components/sundPageAdd'
import sundJpgAdd from '@/components/sundJpgAdd'
import feedbackDetail from '@/components/feedbackDetail'
import adminList from '@/components/adminList'
import adminList from '@/components/adminList'
import bookPeriodsAmend from '@/components/bookPeriodsAmend'
import bookPageAmend from '@/components/bookPageAmend'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        path: '/admin/login',
        name: 'login',
        component: login
    }, {
        path: '/admin',
        name: 'admin',
        component: index,
        redirect: '/admin/index',
        children: [
            { path: '/admin/index', component: welcome },
            { path: '/admin/videoQuery', component: videoQuery },
            { path: '/admin/videoList', component: videoList },
            { path: '/admin/bookQuery', component: bookQuery },
            { path: '/admin/bookList', component: bookList },
            { path: '/admin/sundQuery', component: sundQuery },
            { path: '/admin/sundList', component: sundList },
            { path: '/admin/feedbackList', component: feedbackList },
            { path: '/admin/videoAdd', component: videoAdd },
            { path: '/admin/bookAdd', component: bookAdd },
            { path: '/admin/bookPageAdd', component: bookPageAdd },
            { path: '/admin/sundListAdd', component: sundListAdd },
            { path: '/admin/sundPageAdd', component: sundPageAdd },
            { path: '/admin/sundJpgAdd', component: sundJpgAdd },
            { path: '/admin/feedbackDetail', component: feedbackDetail },
            { path: '/admin/adminList', component: adminList },
            { path: '/admin/videoUpdate', component: videoUpdate },
            { path: '/admin/bookPeriodsAmend', component: bookPeriodsAmend },
            { path: '/admin/bookPageAmend', component: bookPageAmend }
        ]
    }, {
        path: '/',
        redirect: '/admin/login'
    }]
})