<template>
    <el-menu :router="true" :default-active="defaultIndex" :unique-opened="true" class="m-menu" :collapse="isCollapse">
        <template v-for="(menu1, index1) in menu">
            <el-menu-item v-if="!menu1.children" :index="menu1.path">
                <i class="el-icon-message"></i>
                <span slot="title">{{menu1.name}}</span>
            </el-menu-item>
            <el-submenu v-else :index="menu1.path">
                <template slot="title">
                    <i v-bind:class="icon[index1]"></i>
                    <span slot="title">{{menu1.name}}</span>
                </template>
                <template v-for="(menu2, index2) in menu1.children">
                    <el-menu-item v-if="!menu2.children" :index="menu2.path">{{menu2.name}}</el-menu-item>
                    <el-submenu v-else :index="menu2.path">
                        <span slot="title">{{menu2.name}}</span>
                        <el-menu-item v-for="(menu3, index3) in menu2.children" :index="menu3.path" :key="index3">{{menu3.name}}</el-menu-item>
                    </el-submenu>
                </template>
            </el-submenu>
        </template>
    </el-menu>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        data() {
            return {
                icon: ['el-icon-message', 'el-icon-edit', 'el-icon-view', 'el-icon-setting'],
                //通过path跳转
                menu: [{
                    name: '系统管理',
                    path: '/levelFirst',
                    children: [{
                        name: '用户管理',
                        path: '/user'
                    }, {
                        name: '角色管理',
                        path: '/role'
                    }, {
                        name: '组织管理',
                        path: '/organize'
                    }, {
                        name: '分机管理',
                        path: '/extension'
                    }]
                }, {
                    name: '业务管理',
                    path: '/levelSecond',
                    children: [{
                        name: '对讲组管理',
                        path: '/intercom'
                    }, {
                        name: '摄像头管理',
                        path: '/camera'
                    }, {
                        name: '通知管理',
                        path: '/notice'
                    },
                    // {
                    //     name: '驱鸟队数据管理',
                    //     path: '/bird'
                    // }, {
                    //     name: '汽车连数据管理',
                    //     path: '/car'
                    // }, {
                    //     name: '器材数据管理',
                    //     path: '/equipment'
                    // }, {
                    //     name: '灯数据管理',
                    //     path: '/lamp'
                    // }, {
                    //     name: '军械数据管理',
                    //     path: '/ordnance'
                    // }, {
                    //     name: '油库数据管理',
                    //     path: '/oilDepot'
                    // }, {
                    //     name: '道面数据管理',
                    //     path: '/road'
                    // }, {
                    //     name: '警卫数据管理',
                    //     path: '/guard'
                    // }, {
                    //     name: '飞行保障管理',
                    //     path: '/flight'
                    // },
                    {
                        name: '绑定装备管理',
                        path: '/bunding'
                    }, {
                        name: '告警数据管理',
                        path: '/alarm'
                    }, {
                        name: '签到数据管理',
                        path: '/signIn'
                    },
                    //  {
                    //     name: '添加小组数据管理',
                    //     path: '/addGroup'
                    // }, {
                    //     name: '飞行保障计划',
                    //     path: '/flightPlan'
                    // },
                    {
                        name: '预案配置',
                        path: '/planConfig'
                    }, {
                        name: '飞行计划管理',
                        path: '/flightPlanMgt'
                    }, {
                        name: '保障计划管理',
                        path: '/flightSupportMgt'
                    }, {
                        name: '预案人员配置',
                        path: '/planStaffConfig'
                    }, {
                        name: '图片管理',
                        path: '/screenShort'
                    }]
                }],
                defaultIndex: '/user'
            }
        },
        created() {
            this.defaultIndex = this.$route.path;
        },
        computed: {
            ...mapGetters(['custom']),
            isCollapse() {
                return this.custom.toggleMenuStatus == 1;
            }
        },
        watch: {
            $route() {
                if(this.aa(this.menu).length) {
                    this.defaultIndex = this.$route.path;
                }
            }
        },
        methods: {
            aa(menus) {
                return menus.filter(item => {
                    if(item.path == this.$route.path) {
                        return true;
                    } else if(item.children) {
                        return this.aa(item.children);
                    }
                });
            }
        }
    }
</script>
