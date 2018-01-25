import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Vuex from 'vuex';
import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';

import VueI18n from 'vue-i18n';
import Locales from './locale';
import zhLocale from 'iview/src/locale/lang/zh-CN';
import enLocale from 'iview/src/locale/lang/en-US';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueI18n);
Vue.use(iView);

// 自动设置语言
const navLang = navigator.language;
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false;
const lang = window.localStorage.getItem('language') || localLang || 'zh-CN';

Vue.config.lang = lang;

// 多语言配置
const locales = Locales;
const mergeZH = Object.assign(zhLocale, locales['zh-CN']);
const mergeEN = Object.assign(enLocale, locales['en-US']);
Vue.locale('zh-CN', mergeZH);
Vue.locale('en-US', mergeEN);


// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    // 根据名称设定初始菜单
    store.commit('setActiveMenu', to.name);
    next();
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});


const store = new Vuex.Store({
    state: {
        pagelink:[
            {name:'首页',link:'#'},
            {name:'测试',link:'#'},
        ],
        menus:[
            {name:'测试页面集合',icon:'ios-navigate', subMenus:[
                {name:'首页'},
                {name:'测试'},
            ]}
        ],
        activeMenu:'测试',
    },
    getters: {
        pagelinks:(state)=>{
            return state.pagelink;
        },
        menus:(state)=>{
            return state.menus;
        },
        activeMenu:(state)=>{
            return state.activeMenu;
        }
    },
    mutations: {
        pushLink(state, newLink){
            state.pagelink.push(newLink);
        },
        popLink(state){
            state.pagelink.pop();
        },
        updateLink(state, newLink){
            state.pagelink.push(newLink);
            state.pagelink.pop();
        },
        setActiveMenu(state, menuName){
            state.activeMenu = menuName;
        }
    },
    actions: {

    }
});


new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});