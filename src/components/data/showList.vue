<template>
    <el-table :data="userList" border size="mini" style="width: 100%!important" @row-click="openDetails" v-on:submit="submitFn()">
        <el-table-column prop="fullName" label="用户名" width="100">
        </el-table-column>
        <el-table-column prop="dateTime" label="日期" width="100">
        </el-table-column>
        <el-table-column prop="fileType" label="类型">
            <template slot-scope="scope">
                <span v-html="scope.row.fileType=='picture'?'图片':'视频'"></span>
            </template>
        </el-table-column>
        <el-table-column prop="desInfo" label="描述">
        </el-table-column>
    </el-table>
</template>

<script>
  import { mapMutations, mapState } from 'vuex';
    export default {
        data() {
            return {}
        },
        props: ['userList'],
        created() {

        },
        computed:{
          //...mapState(['dataInfo'])
        },
        methods:{
          ...mapMutations(['_dataInfo','_clickDataList']),
          openDetails(row){
            this._clickDataList(true);
            this._dataInfo(row);
          },
          submitFn(){
            console.log(22);
          }
        }
    }
</script>

<style scoped>
</style>
<style lang="less">
    .el-table__header-wrapper {
        .el-table__header {
            width: auto !important;
        }
    }
    .el-table__body-wrapper {
        .el-table__body {
            width: auto !important;
        }
    }
</style>
>
