<template>
    <el-dialog title="添加标记" :visible.sync="isShowMarker" width="26%" @close="closeFn">
        <el-form :model="form" class="dialogWrap">
            <el-form-item label="描述" :label-width="formLabelWidth">
                <el-input v-model="form.desc" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="目标" :label-width="formLabelWidth">
                <el-input type="textarea" rows="4" resize="none" v-model="form.objective" auto-complete="off"></el-input>
            </el-form-item>
            <i class="changeIcon el-icon-location"></i>
            <i class="addTarget el-icon-circle-plus"></i>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="sendFn">发 送</el-button>
            <el-button type="primary" @click="saveFn">保 存</el-button>
            <el-button type="primary" @click="deleteFn">删 除</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import { mapActions } from 'vuex';
    export default {
        data() {
            return {
                form: {
                    desc: '',
                    objective: ''
                },
                formLabelWidth: '100px'
            };
        },
        props: ['isShowMarker', 'popMarkerMsg'],
        mounted() {
        },
        created() {
            this.form.desc = this.popMarkerMsg;
        },
        watch: {},
        methods: {
            sendFn() {
                this.$emit('receive', false)
            },
            saveFn() {
                this.$emit('saveReceive', this.form)
            },
            deleteFn() {
                this.$emit('receive', false)
            },
            closeFn() {
                this.$emit('receive', false)
            }
        }
    };
</script>

<style scoped lang="less">
    .dialogWrap {
        width: 90%;
        position: relative;
        .changeIcon {
            position: absolute;
            top: 6px;
            right: -34px;
            font-size: 26px;
            z-index: 1;
            color: red;
            cursor: pointer;
        }
        .addTarget {
            cursor: pointer;
            position: absolute;
            top: 70px;
            right: -34px;
            font-size: 24px;
            z-index: 1;
        }
    }
</style>
