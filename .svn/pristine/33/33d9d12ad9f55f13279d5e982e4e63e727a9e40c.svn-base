<template>
    <div id="">
        <div class="m-crumb">
            <span class="title">{{breadlist[1].name}}</span>
        </div>
        <div class="m-side">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item v-for="(item, index) in breadlist" :to="item.path" :key="index">{{item.name}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                breadlist: [] // 路由集合
            }
        },
        created() {
            this.breadcrumb();
        },
        watch: {
            $route() {
                this.breadcrumb();
            }
        },
        methods: {
            breadcrumb() {
                this.breadlist = [];
                this.$route.meta.breadcrumb.forEach(r => {
                    this.$router.options.routes[2].children.forEach(rs => {
                        if(('/' + r) == rs.path) {
                            this.breadlist.push({
                                name: rs.name,
                                path: rs.path
                            });
                        }
                    });
                });
            }
        }
    }
</script>