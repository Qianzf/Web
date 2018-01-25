<style>
    body{
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: #f5f7f9 !important;
    }
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        width:1200px;
        min-height:100px;
        margin: 11px auto;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 0 7px lightblue;  
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 580px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 0px 0 15px;
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
</style>
<template>
    <div class="layout">
        <Row type="flex">
            <Col span="5" class="layout-menu-left">
                <Menu @on-select="openLink" :active-name="active" theme="dark" width="auto" :open-names="getOpenMenus">
                    <div class="layout-logo-left"><Icon type="android-color-palette"></Icon> {{title}}</div>
                    <MenuItem name="首页"><Icon type="home"></Icon> 首页</MenuItem>
                    <Submenu :name="menu.name" :key="index" v-for="(menu,index) in menus">
                        <template slot="title">
                            <Icon :type="menu.icon"></Icon>
                            {{menu.name}}
                        </template>
                        <MenuItem :key="index" v-for="(subMenu,index) in menu.subMenus" :name="subMenu.name">{{subMenu.name}}</MenuItem>
                    </Submenu>
                </Menu>
            </Col>
            <Col span="19">
                <div class="layout-header"></div>
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <BreadcrumbItem :key="index" v-for="(link,index) in pageLinks" :href="link.link">{{link.name}}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div class="layout-content">
                    <div class="layout-content-main"><router-view></router-view></div>
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
            };
        },
        mounted() {
           
        },
        beforeDestroy() {

        },
        methods: {
            openLink(link){
                this.$router.push({name: link});
            }
        },
        computed: {
            pageLinks () {
                
                return this.$store.getters.pagelinks;
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