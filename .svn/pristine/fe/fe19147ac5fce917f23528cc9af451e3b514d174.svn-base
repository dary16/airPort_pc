<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="标题">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="温度">
                <el-input v-model="form.temperature"></el-input>
            </el-form-item>
            <el-form-item label="天气">
                <el-input v-model="form.weather"></el-input>
            </el-form-item>
            <el-form-item label="风向">
                <el-input v-model="form.windDirection"></el-input>
            </el-form-item>
            <el-form-item label="风力">
                <el-input v-model="form.windPower"></el-input>
            </el-form-item>
            <el-form-item label="云量">
                <el-input v-model="form.cloudAmount"></el-input>
            </el-form-item>
            <el-form-item label="时间段">
                <el-input v-model="form.timestemp"></el-input>
            </el-form-item>
            <el-form-item label="内容">
                <el-input type="textarea" v-model="form.comment"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button type="" @click="addDataFn()">增加</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    export default {
        data() {
            return {
                form: {
                    title: '',
                    temperature: '',
                    weather: '',
                    windDirection: '',
                    windPower: '',
                    cloudAmount: '',
                    timestemp: '',
                    comment: ''
                },
                tempForm: {},
                dataGroup: []
            };
        },
        computed: {
            ...mapState(['userInfo'])
        },
        created() {

        },
        watch: {},
        methods: {
            ...mapActions(['_getInfo']),
            onSubmit() {
                if(!this.form.title && this.dataGroup.length == 0) {
                    this.message.error('请输入标题！');
                    return false;
                } else if(this.form.title) {
                    this.dataGroup.push(this.form);
                }
                this._getInfo({
                    ops: {
                        'content': this.dataGroup
                    },
                    api: 'weatherAdd',
                    callback: res => {
                        this.dataGroup = [];
                        this.message.error('新建成功！');
                        this.$emit('closeFn')
                    }
                });
            },
            addDataFn(form) {
                this.tempForm = JSON.parse(JSON.stringify(this.form))
                this.dataGroup.push(this.tempForm);
                this.form.title = "";
                this.form.temperature = "";
                this.form.weather = "";
                this.form.windDirection = ""
                this.form.windPower = "";
                this.form.cloudAmount = "";
                this.form.timestemp = "";
                this.form.comment = ""
            }
        }
    };
</script>

<style scoped lang="less">
    .setTime {
        h2 {
            text-align: center;
            margin: 10px 0px;
        }
        .time {
            dt {
                margin: 10px 20px;
            }
            dd {
                margin: 10px 20px;
            }
        }
    }
</style>
