<style scoped>
    .person-info-block {
        width: 100%;
        margin: 0 auto;
        border-radius: 4px;
        min-height: 580px;
    }
    .role-p {
        font-size: 14px;
        color: #fff;
        background: #464C5B;
        padding: 1px 15px;
        margin-bottom: 12px;
    }
    .container{  
        width: 100%;
        min-height: 500px;
        height: 100%;
        border-radius: 5px;
        background:#fff;  
        overflow: hidden;
        position: relative;
        border: 1px solid #DDDEE1;
    }  
    .left{  
        height: 100%;
        margin-right: 20px;
        box-shadow: 3px 0px 6px rgba(0, 0, 0, 0.12);
        transition: all 0.3s ease-in-out;
        overflow: hidden;
        position: absolute;
        z-index: 99;
    }  
    .left .arrow{
        float: right;
        height: 100%;
        display: flex;
        display: -webkit-flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        width: 18px;
        padding-left: 8px;
        box-sizing: content-box;
        text-align: center;
        font-size: 18px;
        cursor: pointer;
        transition: all .8s;
        background: #F7F7F7;
        color: #000;
    }
    .left .arrow:hover {
        /** background: #80DEEA; **/
        color: #4CAF50;
    }

    .left .search-block {
        padding: 10px 30px 10px 10px;
        width: 400px;
        display: inline-block;
        height: 100%;
        overflow: auto;
        background: #fff;
    }
    .right{  
        padding: 20px 20px 20px 45px;
    }  
    .search-title {
        font-size: 18px;
        padding: 2px 7px 6px;
        border-bottom: 1px solid #E0E0E0;
        margin-bottom: 20px;
    }

</style>
<template>
    <div class="person-info-block">
        <p class="name-p">删除、添加或者修改网站用户信息。</p>
        <p class="role-p"><Icon type="person-stalker"></Icon>  轻松管理用户信息 </p>
        <div class="container">
            <div class="left" :style="leftBar?'':'transform: translate(-402px, 0px);'">
                <div class="search-block">
                    <p class="search-title">检索条件</p>
                    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                        <FormItem label="Name" prop="name">
                            <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
                        </FormItem>
                        <FormItem label="E-mail" prop="mail">
                            <Input v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>
                        </FormItem>
                        
                        <FormItem label="Gender" prop="gender">
                            <RadioGroup v-model="formValidate.gender">
                                <Radio label="male">Male</Radio>
                                <Radio label="female">Female</Radio>
                            </RadioGroup>
                        </FormItem>
                        
                        <FormItem label="Desc" prop="desc">
                            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" >检索</Button>
                            <Button type="ghost" style="margin-left: 8px">重置</Button>
                        </FormItem>
                    </Form>
                </div>
                <div class="arrow" @click="leftBar = !leftBar" >
                    <Icon :style="leftBar?'transform: rotate(-360deg);':''" type="android-search"></Icon>
                </div>
                
            </div>
            <div class="right">
                    <div style="margin-bottom:10px;">
                        <Button  icon="plus-round">新增</Button>
                    </div>
                    <Table stripe :columns="columns1" :data="data1"></Table>
                    <div style="margin-top:12px;text-align:right;">
                        <Page :total="40" size="small" show-elevator show-sizer></Page>
                    </div>
                    
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                leftBar:false,
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
                        { required: true, message: 'Please select the city', trigger: 'change' }
                    ],
                    gender: [
                        { required: true, message: 'Please select gender', trigger: 'change' }
                    ],
                    interest: [
                        { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
                        { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
                    ],
                    date: [
                        { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
                    ],
                    time: [
                        { required: true, type: 'date', message: 'Please select time', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
                        { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                    ]
                },
                columns1: [
                    {
                        title: '姓名',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.name)
                            ]);
                        }
                    },
                    {
                        title: '年龄',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data1: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park'
                    },
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park'
                    }
                ]
            }
        },
        methods: {
           
            
        },
        mounted() {
           
        },
    };
</script>