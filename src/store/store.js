import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        login: 'islogin',
        adminMenu: []
    },
    getters: {
        getLoginData(state) {
            return state.login;
        },
        getMenuData(state) {
            return state.adminMenu;
        }
    },
    mutations: {
        //更改store中的状态的唯一方法，类似于事件
        setLoginData(state, payload) {
            state.login = payload;
        },
        setMenuData(state, payload) {
            state.adminMenu = payload;
        }
    },
    actions: {
        //类似于mutations，但它提交的是mutation,而不是直接更改状态，还可以包含任意异步操作
        change(context, payload) {
            // setTimeout(function() {
            context.commit('setLoginData', payload)
                // }, 1000)
        },
        setMenu(context, payload) {
            // setTimeout(function() {
            context.commit('setMenuData', payload)
                // }, 1000)
        }
    }
});