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
        margin: 10px 15px;
        overflow: auto;
        background: #F5F7F9;
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 30px;
    }
    .layout-content-main{
        padding: 10px;
        
    }
    .layout-copy{
        text-align: center;
        padding: 0px 0 10px;
        color: #9ea7b4;
        position: absolute;
        bottom: 0px;
        width: 100%;
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
        min-width:200px !important;
    }
    .layout-header i{
        font-size: 24px !important;
        line-height: 60px !important;
        margin: 0 20px !important;
        cursor:pointer;
    }
    .right-icons {
        display: inline-block;
        float: right;
        cursor:pointer;
        color: burlywood;
    }
    .right-icons:hover{
        color: rgb(173, 143, 104);
    }
    .right-icons .name {
        text-align: right;
    }
    .name {
        font-size: 14px;
        position: relative;
        right: 16px;
        top: -1px;
    }
    .time {
        display: inline-block;
        font-size: 14px;
        position: relative;
        top: -3px;
        left: 0px;
        font-family: Verdana;
        color: #FAFAFA;
        background: #464C5B;
        padding: 2px 6px;
        border-radius: 4px;
        box-shadow: 0 0 12px #9E9E9E;
    }
    .place {
        display: inline-block;
        font-size: 14px;
        position: relative;
        top: -3px;
        left: 0px;
        color: #DEB887;
        margin-left: 10px;
    }
    .place .location {
        margin: 0 5px 0 15px!important;
        position: relative;
        font-size: 16px !important;
    }
    .no-width{
        width:0 !important;
        overflow: hidden;
    }
    .ivu-row-flex {
        position: relative;
        
    }
</style>
<template>
    <div class="layout">
        <Row type="flex">
            
            <Col :span="sideSpan" :class="sideSpan > 0?'':'no-width'" class="layout-menu-left">
                <Menu :accordion="true" @on-select="openLink" :active-name="active" theme="dark" width="auto" :open-names="getOpenMenus">
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
                    <span class="time">
                        {{hour}}<span :style="secFlag?'visibility: visible;':'visibility: hidden;'" >:</span>{{minute}} </span>
                    <span class="place" v-if="city != ''">
                        <Icon class="location" type="location"></Icon> {{city}}
                    </span>
                    <span class="right-icons">
                        <Dropdown>
                            <Icon type="person"></Icon>
                            <span class="name">超级管理员</span>
                            <DropdownMenu slot="list">
                                <DropdownItem>个人信息</DropdownItem>
                                <DropdownItem @click.native="openPassDialog">密码修改</DropdownItem>
                                <DropdownItem divided>登出系统</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
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
                <Modal
                    v-model="passDialog"
                    title="修改密码"
                    @on-ok="submitPass"
                    @on-cancel="cancel">
                    <div style="width:66%;margin:0 auto;">
                    <p style="margin-bottom:10px;">
                    <Input v-model="newPass" type="password">
                        <span slot="prepend">新的密码</span>
                    </Input>
                    </p>
                    <p style="margin-bottom:10px;">
                    <Input v-model="confimPass" type="password">
                        <span slot="prepend">确认密码</span>
                    </Input>
                    </p>
                    <p style="color: #9E9E9E;">* 您的密码将被加密存储。</p>
                    </div>
                </Modal>
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
                sideSpan:4,
                contentSpan:20,
                hour:0,
                minute:0,
                sec:0,
                city:'',
                newPass:'',
                confimPass:'',
            };
        },
        mounted() {
            
        },
        beforeDestroy() {

        },
        methods: {
            submitPass(){
                this.$store.commit('setPassDialog',false);
            },
            cancel(){
                this.$store.commit('setPassDialog',false);
            },
            openPassDialog(){
                this.$store.commit('setPassDialog',true);
            },
            openLink(link){
                if(typeof link == "string") {
                    this.$router.push({name: link});
                }
                
            },
            collapsedSider() {
                console.log("click");
                this.isCollapsed = !this.isCollapsed;
                this.sideSpan = this.sideSpan == 4 ? 0 : 4;
                this.contentSpan = this.contentSpan == 20 ? 24 : 20;
            },
            updateTime(){
                var that = this;
                var time = new Date();
                that.hour = time.getHours() > 9 ? time.getHours() : '0' + time.getHours();
                that.minute = time.getMinutes() > 9 ? time.getMinutes() : '0' + time.getMinutes();
                that.sec = time.getSeconds();
            },
            getLocation(){
                var that = this;
                var url = "/api/iplookup/iplookup.php?format=js";
                this.$http.get(url)
                .then(function (response) {
                    var str = response.data.replace("var remote_ip_info = ", "");
                    str = str.substring(0, str.length-1);
                    var remote_ip_info = JSON.parse(str);
                    // 当前城市
                    console.log(remote_ip_info.city);
                    that.city = remote_ip_info.city;
                })
                .catch(function (error) {
                    console.log(error);
                });
                 /*
                fetch('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js', {
                    method: 'GET',
                    mode: 'cors',
                    cache: 'default'
                }).then(function(res){
                    console.log(res.json());
                });
                var url = "http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js";
                fetch(url, {
                    method: "POST",
                    mode: "no-cors",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: ""
                    }).then(function(res) {
                        console.log("Response succeeded?", JSON.stringify(res.ok));
                        console.log(JSON.stringify(res));
                    }).catch(function(e) {
                        console.log("fetch fail", JSON.stringify(params));
                    });
                 **/
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
            },
            secFlag() {
                return (this.sec % 2 == 0);
            },
            passDialog:{
                get: function () {
                    return this.$store.getters.passDialog;
                },
                set: function () {
                }
            }
            
        },
        created () {
            this.menus = this.$store.getters.menus;
            this.getLocation();
            var that = this;
            that.updateTime();
            setInterval(function(){
                that.updateTime();
            },1000);
        }
    };
</script>