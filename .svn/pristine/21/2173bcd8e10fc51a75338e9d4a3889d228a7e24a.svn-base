<template>
    <div class="userDetails">
        <h3 class="title" v-on:click="closeFn">人员信息</h3>
        <el-button-group class="tagBtn">
            <el-button v-for="item in distance" v-on:click="getUserInfoFn(item)" type="primary" size="mini">{{item}}米</el-button>
        </el-button-group>
        <div class="list">
            <ul class="listUl">
                <li v-for="item in userList">
                    <h3>{{item.name}}</h3>
                    <span class="content">{{item.orgName}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapState, mapMutations } from 'vuex';
    export default {
        data() {
            return {
                userList: [],
                distance: [1000, 2000, 3000]
            };
        },
        props: ['circleIn', 'distancePoint'],
        watch: {
            distancePoint() {
                this.getNearbyUserFn();
            }
        },
        created() {
            this.getNearbyUserFn();
        },
        computed: {
        },
        methods: {
            ...mapActions(['_getInfo']),
            getNearbyUserFn() {
                this._getInfo({
                    ops: {
                        data: this.circleIn
                    },
                    api: 'getNearbyUser',
                    callback: res => {
                        this.userList = res
                        console.log(res);
                    }
                })
            },
            closeFn() {
                this.$emit('closeFn', false)
            },
            getUserInfoFn(distance) {
                this.$emit('setDistance', distance)
            }
        }
    };
</script>

<style scoped lang="less">
    .tagBtn {
        margin-top: 8px;
        margin-left: 20px;
    }
    .userDetails {
        width: 298px;
        position: fixed;
        right: 0px;
        bottom: 0px;
        background: linear-gradient(rgba(0, 74, 132, 0.9), rgba(53, 106, 146, 0.51));
        z-index: 9999;
        h3.title {
            color: #e0e0e0;
            text-align: left;
            font-size: 18px;
            line-height: 38px;
            background: linear-gradient(90deg, #004175, #0f6cb2);
            box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.8);
            padding-left: 22px;
        }
        div.list {
            ul.listUl {
                border-left: 30px solid rgba(0, 0, 0, 0.3);
                padding-bottom: 36px;
                li {
                    width: 224px;
                    height: 64px;
                    margin-left: 6px;
                    margin-top: 6px;
                    padding-left: 28px;
                    background: rgba(0, 0, 0, 0.3);
                    border: 1px solid rgba(0, 0, 0, 0.06);
                    box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.3);
                    color: #fff;
                    padding-top: 8px;
                    position: relative;
                    h3 {
                        font-size: 18px;
                        line-height: 24px;
                    }
                    span.content {
                        display: block;
                        font-size: 18px;
                        line-height: 24px;
                    }
                }
            }
        }
    }
</style>

