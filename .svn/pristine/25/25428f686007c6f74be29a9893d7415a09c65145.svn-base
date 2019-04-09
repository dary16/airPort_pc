<template>
    <div class="hello">
        <el-form ref="form" :model="form" label-width="80px" size="mini">
            <el-form-item label="日期">
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="开始时间" value-format = "timestamp" v-model="form.startDate" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="结束时间" value-format = "timestamp" v-model="form.endDate" style="width: 100%;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="部门/成员">
                <el-input v-model="form.name" @focus="createFn" placeholder="请选择部门/成员"></el-input>
            </el-form-item>
            <el-form-item label="文件类型">
                <el-select v-model="form.fileType" placeholder="请选择文件类型">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="视频" value="video"></el-option>
                    <el-option label="音频" value="audio"></el-option>
                    <el-option label="图片" value="picture"></el-option>
                    <el-option label="文件" value="file"></el-option>
                    <el-option label="录音" value="mp3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="描述">
                <el-input type="textarea" placeholder="请输入描述" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button @click="onReset">重置</el-button>
            </el-form-item>
        </el-form>
        <v-selection-staff v-if="isTransfer" v-bind:isTransfer="isTransfer" v-on:cancel="cancelFn" v-on:confirm="confirmFn"></v-selection-staff>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    name: '',
                    region: '1',
                    startDate: '',
                    endDate: '',
                    desc: ''
                },
                isTransfer: false
            }
        },
        methods: {
            onSubmit() {
                this.$emit('submit', this.form)
            },
            onReset(){
              this.form ={}
            },
            createFn(){
              this.isTransfer = true;
            },
            //关闭选人员的框
            cancelFn(val) {
                this.isTransfer = val;
            },
            //关闭选人员框，并取选中人员的值
            confirmFn(list) {
                this.isTransfer = false;
                var dataArr = [];
                list.forEach(item =>{
                  dataArr.push(item.sip);
                });
                this.form.name = dataArr.toString();
                this.form.startDate = this.util.getFormatDate(this.form.startDate);
                this.form.endDate = this.util.getFormatDate(this.form.endDate);
            }
        }
    }
</script>

<style scoped>
</style>
