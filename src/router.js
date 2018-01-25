const routers = [{
    path: '/',
    meta: {
        title: ''
    },
    name:"首页",
    component: (resolve) => require(['./views/index.vue'], resolve)
},{
    path: '/test',
    meta: {
        title: ''
    },
    name:"测试",
    component: (resolve) => require(['./views/index2.vue'], resolve)
}];
export default routers;