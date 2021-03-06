// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'babel-polyfill'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import { store } from './store/store'
Vue.config.productionTip = false
Vue.use(iView);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    store: store,
    router,
    template: '<App/>',
    components: { App }
})