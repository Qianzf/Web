<style scoped>
    .person-info-block {
        width: 100%;
        margin: 0 auto;
        border-radius: 4px;
        padding: 15px;
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
</style>
<template>
    <div class="person-info-block">
        <p class="name-p">{{name}}, {{$store.getters.currentTimeName}}以下是你的资料卡片。</p>
        <p class="role-p"><Icon type="ribbon-b"></Icon> {{role}}</p>
        <Row :gutter="16">
            <Col span="12">
                <Card :bordered="false">
                    <p slot="title">基本资料</p>
                    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                        <FormItem label="您的姓名" prop="name">
                            <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
                        </FormItem>
                        <FormItem label="电子邮件" prop="mail">
                            <Input v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>
                        </FormItem>
                        <FormItem label="出生日期">
                            <FormItem prop="date">
                                <DatePicker type="date" placeholder="Select date" style="width:100%" v-model="formValidate.date"></DatePicker>
                            </FormItem>
                        </FormItem>
                        <FormItem label="性别" prop="gender">
                            <RadioGroup v-model="formValidate.gender">
                                <Radio label="Male">男</Radio>
                                <Radio label="Female">女</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label="爱好" prop="interest">
                            <CheckboxGroup v-model="formValidate.interest">
                                <Checkbox label="吃饭"></Checkbox>
                                <Checkbox label="睡觉"></Checkbox>
                                <Checkbox label="CDOE"></Checkbox>
                                <Checkbox label="GAME"></Checkbox>
                            </CheckboxGroup>
                        </FormItem>
                        <FormItem label="描述" prop="desc">
                            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
                        </FormItem>
                        <FormItem>
                            <Button type="success" long>提交修改</Button>
                        </FormItem>
                    </Form>
                </Card>
            </Col>
            <Col span="12">
                <Card :bordered="false">
                    <p slot="title">更多操作</p>
                    <Button type="error" @click=" openPassDialog" long>密码变更</Button>
                    <br/><br/>
                    <Button type="primary" long>权限变更</Button>
                </Card>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                name:"钱仲飞",
                role:"超级管理员",
                email:"893613515@qq.com",
                formValidate: {
                    name: '',
                    mail: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                        { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                    city: [
                        { required: false, message: 'Please select the city', trigger: 'change' }
                    ],
                    gender: [
                        { required: false, message: 'Please select gender', trigger: 'change' }
                    ],
                    interest: [
                        { required: false, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
                        { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
                    ],
                    date: [
                        { required: false, type: 'date', message: 'Please select the date', trigger: 'change' }
                    ],
                    time: [
                        { required: false, type: 'date', message: 'Please select time', trigger: 'change' }
                    ],
                    desc: [
                        { required: false, message: 'Please enter a personal introduction', trigger: 'blur' },
                        { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleStart() {
                this.$Modal.info({
                    title: 'Bravo',
                    content: 'Now, enjoy the convenience of iView.'
                });
            },
            openPassDialog(){
                this.$store.commit('setPassDialog',true);
            },
            
        },
        mounted() {
           
        },
    };
</script>