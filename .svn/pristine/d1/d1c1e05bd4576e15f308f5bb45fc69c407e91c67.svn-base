<template>
    <div>
        <div class="mask"></div>
        <div class="popContent">
            <div class="popTitle">
                <h3>{{popData.titleTotal}}</h3>
                <i class="el-icon-close" v-on:click="onCancle"></i>
            </div>
            <div class="blueContent">
                <div class="subContent clearfix">
                    <ul v-for="(item,index) in popData.options" :key="index">
                        <li v-if="item.status == 1" class="popBox">
                            <span>{{item.title}}：</span>
                            <el-input v-model.trim="popReq[item.val]" size="mini" v-bind:placeholder="item.placeholder" :disabled="item.disabled" :suffix-icon="item.star">
                                <i v-if="item.visible" class="el-icon-star-off el-input__icon" slot="suffix"></i>
                                <i v-if="item.editable" class="el-icon-edit el-input__icon" slot="suffix"></i>
                            </el-input>
                        </li>
                        <li v-if="item.status == 2">
                            <span>{{item.title}}：</span>
                            <el-select class="popBox" v-model="popReq[item.val]" v-bind:placeholder="item.placeholder" size="mini">
                                <el-option v-for="itemSel in item.list" :key="itemSel.value" :label="itemSel.label" :value="itemSel.value"></el-option>
                            </el-select>
                        </li>
                        <li v-if="item.status == 3" class="popBox">
                            <span>{{item.title}}：</span>
                            <el-date-picker v-model="popReq[item.val]" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" type="datetime" v-bind:placeholder="item.placeholder" size="mini"></el-date-picker>
                        </li>
                        <li v-if="item.status == 4" class="popBox">
                            <span>{{item.title}}：</span>
                            <el-input v-model="popReq[item.val]" type="textarea" :rows="2" v-bind:placeholder="item.placeholder"></el-input>
                        </li>
                        <li v-if="item.status == 5" class="popBox">
                            <span>{{item.title}}：</span>
                            <el-date-picker v-model="popReq[item.val]" value-format="yyyy-MM-dd" type="date" v-bind:placeholder="item.placeholder" size="mini"></el-date-picker>
                        </li>
                        <!--部门选择-->
                        <li v-if="item.status == 11" class="popBox">
                            <span>{{item.title}}：</span>
                            <button class="chooseBtn" v-on:click="btnsFn(item.fn)">{{item.placeholder}}</button>
                        </li>
                        <li v-if="item.status == 11 && returnDeptsIds && returnDeptsIds.length != 0" class="popBox">
                            <span>已选部门：</span>
                            <el-tag class="delTag" v-for="(tag,index) in returnDeptsIds" :key="tag.label" closable @close="tagCloseFn(index)">
                                {{tag.label}}
                            </el-tag>
                        </li>
                    </ul>
                    <ul v-if="isUpload">
                        <li>
                            <span>上传文件：</span>
                            <el-upload class="upload-demo" :action="uploadUrl" :on-success="successFileFn" :before-upload="beforeFileUpload" :show-file-list="false">
                                <button class="chooseBtn">点击上传</button>
                            </el-upload>
                        </li>
                    </ul>
                </div>
                <div class="popBtn">
                    <a class="addBtn" href="javascript:;" v-on:click="onSubmit">确定</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapState, mapActions } from 'vuex';
    export default {
        data() {
            return {
                popReq: {},
                loading: false,
                optionsShow: [],
                treeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                uploadUrl: 'http://192.168.0.192:8080/airPortService/inter/upload',
                returnDeptsIds: []
            };
        },
        props: ['popData', 'formData', 'isUpload', 'deptsIds'],
        watch: {
            deptsIds() {
                if(this.deptsIds) {
                    this.returnDeptsIds = JSON.parse(JSON.stringify(this.deptsIds));
                }
            }
        },
        created() {
            this.popReq = JSON.parse(JSON.stringify(this.formData));
            this.getSysOrgFn();
        },
        methods: {
            ...mapActions(['_getInfo']),
            onSubmit() {
                this.$emit('save', this.popReq);
            },
            onCancle() {
                this.$emit('cancle', false);
            },
            btnsFn(val) {
                this.$emit('getBtnFn', val);
            },
            radio(data) {
                console.log(data);
            },
            createFn() {

            },
            //获取组织树
            getSysOrgFn() {
                this._getInfo({
                    method: 'get',
                    api: 'getSysOrg',
                    callback: res => {
                        this.treeData = JSON.parse(res.treeData);
                    }
                });
            },
            handleNodeClick(data) {
                this.popReq.orgName = data.label;
                this.popReq.orgCode = data.code;
                this.popReq.orgId = data.id;
            },
            //-------------上传-------------//
            //文件
            successFileFn(file) {
                // 通知文件
                this.popReq.noticeFile = file.url;
            },
            beforeFileUpload() {

            },
            tagCloseFn(index) {
                this.returnDeptsIds.splice(index, 1);
                this.$emit('returnDeptsIds', this.returnDeptsIds)
            }
        }
    };
</script>
<style lang="less" scoped>
    .mask {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1998;
    }
    .popContent {
        position: fixed;
        background: #fff;
        width: 622px;
        left: 50%;
        margin-left: -311px;
        top: 20%;
        z-index: 1999;
        overflow: hidden;
        .popTitle {
            font-weight: 400;
            color: rgba(224, 224, 224, 1);
            text-align: left;
            font-size: 20px;
            line-height: 38px;
            cursor: pointer;
            z-index: 1001;
            width: 622px;
            height: 38px;
            background: linear-gradient(90deg, rgba(0, 65, 117, 1), rgba(15, 108, 178, 1));
            box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.8);
            position: relative;
            h3 {
                display: inline-block;
                padding-left: 12px;
                font-weight: normal;
                font-size: 20px;
            }
            .el-icon-close {
                position: absolute;
                top: 10px;
                right: 12px;
                cursor: pointer;
            }
        }
        .blueContent {
            padding: 5px 0;
            background: linear-gradient(180deg, rgba(83, 137, 196, 1), rgba(83, 137, 196, 1));
            box-shadow: 1px 2px 5px 1px rgba(0, 0, 0, 0.45);
            .subContent {
                margin-top: 15px;
                ul {
                    li {
                        padding-left: 5px;
                        color: #e0e0e0;
                        margin-bottom: 8px;
                        overflow: hidden;
                        span {
                            float: left;
                            font-size: 18px;
                            height: 35px;
                            line-height: 35px;
                            width: 140px;
                            text-align: right;
                        }
                    }
                }
            }
            .popBtn {
                text-align: center;
                margin-top: 10px;
                margin-bottom: 15px;
                border-top: 2px solid #3f6794;
                a.addBtn {
                    display: block;
                    text-align: center;
                    color: #fff;
                    width: 85px;
                    height: 34px;
                    line-height: 34px;
                    border-radius: 10px;
                    margin: 0px auto;
                    margin-top: 20px;
                    background: #2a70a4;
                    box-shadow: 2px 3px 2px #619ee2 inset, 0px 3px 8px rgba(31, 79, 133, 0.8);
                }
            }
        }
    }
    .chooseBtn {
        background-color: #0c5e9e;
        padding: 7px 15px;
        border: 1px solid rgba(79, 110, 179, 1);
        border-radius: 6px 6px 6px 6px;
        color: #c0c4cc;
    }

    // // 分割线
    .el-input--mini {
        width: 440px;
        background: rgba(20, 67, 104, 0);
        border-bottom: 1px solid #85dcff;
        border-left: 1px solid #5f9de0;
        border-right: 1px solid #5f9de0;
        font-size: 16px;
    }
    .el-select--mini {
        width: 440px;
        background: rgba(20, 67, 104, 0);
        border-bottom: 1px solid #85dcff;
        border-left: 1px solid #5f9de0;
        border-right: 1px solid #5f9de0;
        font-size: 16px;
    }
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
        width: 440px;
        vertical-align: top;
        border-radius: 5px;
    }
    .el-textarea {
        width: 440px;
    }

    .el-input--mini .el-input__inner {
        height: 31px;
        line-height: 31px;
        border-radius: 0;
        background-color: #144368 !important;
        border-bottom: 1px solid #85dcff;
        border-left: 1px solid #5f9de0;
        border-right: 1px solid #5f9de0;
        font-size: 16px;
    }
    .el-tag {
        width: auto !important;
        background: rgba(0, 32, 57, 0.1);
        border: 1px solid rgba(79, 110, 179, 0.1);
        color: #fff;
        margin-right: 8px;
        height: 32px !important;
        line-height: 30px !important;
        font-size: 16px !important;
    }
</style>
<style>
    .el-tag .el-icon-close {
        color: #fff !important;
    }
    input[type='file'] {
        display: none !important;
    }
    .blueContent .el-input__inner {
        background-color: #3a6089 !important;
        border-bottom: 1px solid #85dcff;
        border-left: 1px solid #5f9de0;
        border-right: 1px solid #5f9de0;
        border-radius: 0;
        font-size: 16px;
        color: #c0c4cc;
    }
    .blueContent .el-textarea__inner {
        background-color: #3a6089 !important;
        border-bottom: 1px solid #85dcff;
        border-left: 1px solid #5f9de0;
        border-right: 1px solid #5f9de0;
        border-radius: 0;
        font-size: 16px;
        color: #c0c4cc;
    }
</style>
