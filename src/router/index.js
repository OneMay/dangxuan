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
import bookPeriodsAmend from '@/components/bookPeriodsAmend'
import bookPageAmend from '@/components/bookPageAmend'
import sundListAmend from '@/components/sundListAmend'
import sundPageAmend from '@/components/sundPageAmend'
import article from '@/components/article'
Vue.use(Router)

export default new Router({
    mode: 'history',
    hashbang: true,
    history: false, //这个参数改为false就可以了
    saveScrollPosition: true,
    suppressTransitionError: true,
    routes: [{
        path: '/admin/login',
        name: 'login',
        component: login,
        meta: {
            requiresAuth: true
        }
    }, {
        path: '/admin',
        name: 'admin',
        component: index,
        redirect: '/admin/index',
        meta: {
            requiresAuth: true
        },
        children: [{
                path: '/admin/index',
                component: welcome,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/admin/videoQuery',
                component: videoQuery,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/admin/videoList',
                component: videoList,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/admin/bookQuery',
                component: bookQuery,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/admin/bookList',
                component: bookList,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/admin/sundQuery',
                component: sundQuery,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/admin/sundList',
                component: sundList,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/admin/feedbackList',
                component: feedbackList,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/admin/videoAdd',
                component: videoAdd,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/admin/bookAdd',
                component: bookAdd,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/admin/bookPageAdd',
                component: bookPageAdd,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/admin/sundListAdd',
                component: sundListAdd,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/admin/sundPageAdd',
                component: sundPageAdd,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/admin/sundJpgAdd',
                component: sundJpgAdd,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/admin/feedbackDetail',
                component: feedbackDetail,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/admin/adminList',
                component: adminList,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/admin/videoUpdate',
                component: videoUpdate,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/admin/bookPeriodsAmend',
                component: bookPeriodsAmend,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/admin/bookPageAmend',
                component: bookPageAmend,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/admin/sundListAmend',
                component: sundListAmend,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/admin/sundPageAmend',
                component: sundPageAmend,
                meta: {
                    requiresAuth: true
                }
            }
        ]
    }, {
        path: '/',
        redirect: '/admin/login',
        meta: {
            requiresAuth: true
        }
    }, {
        path: '/admin/article',
        name: 'article',
        component: article,
        meta: {
            requiresAuth: true
        }
    }]
})