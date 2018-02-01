import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Vuex from 'vuex';
import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import './css/base.css';

import VueI18n from 'vue-i18n';
import Locales from './locale';
import zhLocale from 'iview/src/locale/lang/zh-CN';
import enLocale from 'iview/src/locale/lang/en-US';

import axios from 'axios';

Vue.prototype.$http = axios;

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
    // 更新导航
    store.commit('updateLink', to.name);
    next();
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

const menus = [
    {name:'基本信息',icon:'ios-navigate', subMenus:[
        {name:'系统状态'},
        {name:'个人信息'},
        {name:'我的消息'},
    ]},
    {name:'博客管理',icon:'ios-navigate', subMenus:[
        {name:'发布文章'},
        {name:'文章管理'},
        {name:'文章分类'},
        {name:'个性页面'},
        {name:'边栏设定'},
        {name:'模板管理'},
    ]},
    {name:'数据采集',icon:'ios-navigate', subMenus:[
        {name:'数据管理'},
        {name:'数据分析'},
        {name:'采集日志'},
        {name:'计划任务'},
    ]},
    {name:'权限管理',icon:'ios-navigate', subMenus:[
        {name:'用户管理'},
        {name:'角色管理'},
        {name:'接口管理'},
    ]},
    {name:'开发管理',icon:'ios-navigate', subMenus:[
        {name:'系统参数'},
        {name:'其它开发'},
    ]},
    
];


const store = new Vuex.Store({
    state: {
        pagelink:[
            {name:'测试页面集合',link:'#'},
            {name:'测试',link:'#'},
        ],
        // 所有的菜单项
        menus:menus,
        // 当前激活的菜单
        activeMenu:'',
        // 密码修改的弹出框
        passDialog:false,
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
        },
        passDialog:(state)=>{
            return state.passDialog;
        },
        currentTimeName:()=> {
            var date = new Date();
            var hours = date.getHours();
            if (hours >= 0 && hours < 5) {
                return '已经凌晨了！';
            }
            if (hours >= 5 && hours < 9) {
                return '早上好！';
            }
            if (hours >= 9 && hours < 12) {
                return '上午好！';
            }
            if (hours >= 12 && hours < 13) {
                return '中午好！';
            }
            if (hours >= 13 && hours < 18) {
                return '下午好！';
            }
            if (hours >= 18 && hours < 19) {
                return '傍晚好！';
            }
            if (hours >= 19) {
                return '晚上好！';
            }
        }
    },
    mutations: {
        pushLink(state, newLink){
            state.pagelink.push({name:newLink,link:'#'});
        },
        popLink(state){
            state.pagelink.pop();
        },
        updateLink(state, newLink){
            state.pagelink.pop();
            state.pagelink.push({name:newLink,link:'#'});
        },
        setActiveMenu(state, menuName){
            state.activeMenu = menuName;
        },
        setPassDialog(state, flag){
            state.passDialog = flag;
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