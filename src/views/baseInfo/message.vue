<style scoped>
    .person-info-block {
        width: 100%;
        margin: 0 auto;
        border-radius: 4px;
        min-height: 580px;
    }
    .name-p {
        font-size: 22px;
        color: #000;
        padding-left: 10px;
        border-left: 5px solid burlywood;
        margin: 10px 0;
    }
    .role-p {
        font-size: 14px;
        color: #fff;
        background: #464C5B;
        padding: 1px 15px;
        margin-bottom: 12px;
    }
    .ivu-card {
        background: #fff;
        border-radius: 4px;
        font-size: 14px;
        position: relative;
        transition: all .2s ease-in-out;
        min-height: 500px;
    }
</style>
<template>
    <div class="person-info-block">
        <p class="name-p">查看你的消息。</p>
        <p class="role-p"><Icon type="information-circled"></Icon> {{tip}}</p>
        <Row :gutter="16">
            <Col span="8">
                <Card :bordered="false">
                   <Tabs :value="tabValue" type="card">
                    <TabPane label="未读消息" name="未读">
                        未读

                    </TabPane>
                    <TabPane label="已读消息" name="已读">
                        标签二的内容

                    </TabPane>
                </Tabs>
                </Card>
            </Col>
            <Col span="16">
                <Card :bordered="false">

                </Card>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                tip:"让你知道更多！",
                tabValue:'未读',
            }
        },
        methods: {
           
            
        },
        mounted() {
           
        },
    };
</script>