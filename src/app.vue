<style scoped>
    .layout{
        background: #f5f7f9;
        position: relative;
        width: 1200px;
        min-height: 100px;
        margin: 50px auto;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 2px 2px 12px rgba(8, 8, 8, 0.3);
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 580px;
        margin: 10px;
        overflow: auto;
        background: #F5F7F9;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 0px 0 10px;
        color: #9ea7b4;
        position: relative;
        bottom: 0px;
    }
    .layout-menu-left{
        background: #464c5b;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
        line-height: 30px;
        color: #fff;
        text-align: center;
        font-size: 16px;
    }
    .menu-icon{
        transition: all .3s;
       
    }
    .rotate-icon{
        transform: rotate(-180deg);
        
    }
    .ivu-col{
        transition: width .3s ease-in-out;
        overflow: hidden;
    }
    .layout-menu-left ul {
        width:250px !important;
    }
    .layout-header i{
        font-size: 24px !important;
        line-height: 60px !important;
        margin: 0 20px !important;
        cursor:pointer;
    }
    .right-icons{
        display: inline-block;
        float: right;
        text-align: right;
        cursor:pointer;
        color: burlywood;
    }
    .name {
        font-size: 14px;
        position: relative;
        right: 16px;
        top: -1px;
    }
    .no-width{
        width:0 !important;
        overflow: hidden;
    }
</style>
<template>
    <div class="layout">
        <Row type="flex">
            
            <Col :span="sideSpan" :class="sideSpan > 0?'':'no-width'" class="layout-menu-left">
                <Menu @on-select="openLink" :active-name="active" theme="dark" width="auto" :open-names="getOpenMenus">
                    <div class="layout-logo-left"><Icon type="android-color-palette"></Icon> {{title}}</div>
                    <Submenu :name="menu.name" :key="index" v-for="(menu,index) in menus">
                        <template slot="title">
                            <Icon :type="menu.icon"></Icon>
                            {{menu.name}}
                        </template>
                        <MenuItem :key="index" v-for="(subMenu,index) in menu.subMenus" :name="subMenu.name">{{subMenu.name}}</MenuItem>
                    </Submenu>
                </Menu>
            </Col>
            
            <Col :span="contentSpan">
                <div class="layout-header">
                    <Icon @click.native="collapsedSider" :class="rotateIcon"  type="ios-arrow-back" size="24"></Icon>
                    <span class="right-icons">
                        <Icon type="person"></Icon>
                        <span class="name">超级管理员</span>
                    </span>
                </div>
                <!--
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <BreadcrumbItem :key="index" v-for="(link,index) in pageLinks" :href="link.link">{{link.name}}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                -->
                <div class="layout-content">
                    <router-view></router-view>
                </div>
                <div class="layout-copy" v-html="copyright">
                </div>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                title:"SCH",
                copyright:"2016-2018 &copy; SCH SYSTEM.",
                menus:null,
                isCollapsed:false,
                sideSpan:5,
                contentSpan:19,
            };
        },
        mounted() {
           
        },
        beforeDestroy() {

        },
        methods: {
            openLink(link){
                this.$router.push({name: link});
            },
            collapsedSider() {
                console.log("click");
                this.isCollapsed = !this.isCollapsed;
                this.sideSpan = this.sideSpan == 5 ? 0 : 5;
                this.contentSpan = this.contentSpan == 19 ? 24 : 19;
            }
        },
        computed: {
            pageLinks () {
                
                return this.$store.getters.pagelinks;
            },
            rotateIcon () {
                return [
                    'menu-icon',
                     this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            getOpenMenus(){
                var res = [];
                for (var i=0; i < this.menus.length; ++i) {
                    for(var j=0; j < this.menus[i].subMenus.length; ++j) {
                        if (this.active == this.menus[i].subMenus[j].name) {
                            res.push(this.menus[i].name)
                            return res;
                        }
                    }
                }
                return  res;
            },

            active(){
                
                return this.$store.getters.activeMenu;
            }
        },
        created () {
            this.menus = this.$store.getters.menus;
        }
    };
</script>