const routers = [{
    path: '/',
    meta: {
        title: '系统状态'
    },
    name:"系统状态",
    component: (resolve) => require(['./views/baseInfo/status.vue'], resolve)
},
{
    path: '/imessage',
    meta: {
        title: '我的消息'
    },
    name:"我的消息",
    component: (resolve) => require(['./views/baseInfo/message.vue'], resolve)
},
{
    path: '/i',
    meta: {
        title: '个人信息'
    },
    name:"个人信息",
    component: (resolve) => require(['./views/baseInfo/personInfo.vue'], resolve)
},
{
    path: '/publishArticle',
    meta: {
        title: '发布文章'
    },
    name:"发布文章",
    component: (resolve) => require(['./views/baseInfo/message.vue'], resolve)
},
{
    path: '/articleManage',
    meta: {
        title: '文章管理'
    },
    name:"文章管理",
    component: (resolve) => require(['./views/baseInfo/message.vue'], resolve)
}
];
export default routers;