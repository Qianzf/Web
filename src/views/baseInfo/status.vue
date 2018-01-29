<style scoped>
    .num-div {
        height: 90px;
        
    }
    .icon-num {
        width:30%;
        height:100%;
        display: inline-block;
        text-align: center;
        line-height: 90px;
        vertical-align: top;
        background: rgb(100, 213, 114);
        color:#ffffff;
        font-size: 38px;
    }
    .num-show {
        width: 68%;
        height: 100%;
        display: inline-block;
        text-align: center;
        margin: 18px 0 0 0;
        font-size: 26px;
    }
    .num-tip {
        display: block;
        font-size: 14px;
        color:#c8c8c8;
    }
    .ivu-div-body-fix {
        padding: 0px; 
        background: #ffffff;
        border-radius: 4px;
        overflow: hidden;
        box-shadow: 0 0 6px lightblue;
    }
    .log-block {
        height: 440px;
        overflow: auto;
    }
    .log-block p{
        border-bottom: 1px dashed lightblue;
        line-height: 20px;
        font-size: 12px;
        margin-bottom: 6px;
        color: #999;
    }
    .graph-view {
        height: 172px;
    }
</style>
<template>
    <div class="index">
        <Row :gutter="22">
            <Col span="6">
                <div  class="ivu-div-body-fix">
                    <div class="num-div">
                        <span class="icon-num" style="background:rgb(45, 140, 240)"><Icon type="ios-bookmarks-outline"></Icon></span>
                        <span class="num-show" style="color:rgb(45, 140, 240)">100+<span class="num-tip">文章收藏数</span></span></div>
                </div>
            </Col>
            <Col span="6">
                <div  class="ivu-div-body-fix">
                    <div class="num-div">
                        <span class="icon-num" ><Icon type="ios-pricetag-outline"></Icon></span> 
                        <span class="num-show" style="color:rgb(100, 213, 114)">250+<span class="num-tip">文章标签数</span></span>
                    </div>
                </div>
            </Col>
            <Col span="6">
                <div class="ivu-div-body-fix">
                    <div class="num-div">
                        <span class="icon-num" style="background:rgb(255, 213, 114)"><Icon type="ios-compose-outline"></Icon></span> 
                        <span class="num-show" style="color:rgb(255, 213, 114)">30+<span class="num-tip">原创文章数</span></span>
                    </div>
                </div>
            </Col>
            <Col span="6">
                <div class="ivu-div-body-fix">
                    <div class="num-div">
                        <span class="icon-num" style="background:rgb(242, 94, 67)"><Icon type="ios-cloud-download-outline"></Icon></span> 
                        <span class="num-show" style="color:rgb(242, 94, 67)">1000+<span class="num-tip">抓取资源数</span></span>
                    </div>
                </div>
            </Col>
        </Row>
        <Row :gutter="22">
            <Col span="12">
                <Card>
                    <p slot="title">系统计划日程</p>
                    <div class="log-block">
                        <p>正在准备计划...</p>
                        <p>系统数据分析完成！</p>
                        <p>系统启动已完成！</p>
                    </div>
                </Card>
            </Col>
            <Col span="12">
                <Row>
                    <Card>
                        <p slot="title">数据来源</p>
                        <div id="main" class="graph-view"></div>
                    </Card>
                </Row>
                <Card>
                    <p slot="title">数据计划</p>
                    <div id="main2" class="graph-view"></div>
                </Card>
            </Col>
        </Row>
    </div>
</template>
<script>
    import echarts from 'echarts';
    export default {

        methods: {
            
        },

        mounted() {
           var option = {
                title : {
                    text: '某站点用户访问来源',
                    subtext: '纯属虚构',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                },
                series : [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:[
                            {value:335, name:'直接访问'},
                            {value:310, name:'邮件营销'},
                            {value:234, name:'联盟广告'},
                            {value:135, name:'视频广告'},
                            {value:1548, name:'搜索引擎'}
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            var myChart = echarts.init(document.getElementById('main'));
            myChart.setOption(option);
            console.log(echarts);

        },
    };
</script>