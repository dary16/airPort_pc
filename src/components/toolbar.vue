<template>
    <div class="toolbarWrap">
        <dl class="clearfix">
            <dd>
                <div v-on:click="setNearbyFn">
                    <i class="el-icon-location"></i>附近</div>
            </dd>
            <dd>
                <div v-on:click="enclosureFn">围栏<span class="el-icon-caret-bottom"></span></div>
                <ul v-show="subEnclosure" class="dropdown-menu dropdown-menu-left" style="min-width: 110px; left:50px;">
                    <li class="widget-btn" v-on:click="setEnclosureFn">
                        <a href="javascript:;">
                            <i class="fa fa-map"></i>新建围栏</a>
                    </li>
                    <li class="widget-btn" v-on:click="setIsShowEnclosureFn">
                        <a href="javascript:;">
                            <i class="fa fa-map"></i><span v-html="enclosure?'隐藏围栏':'显示围栏'"></span></a>
                    </li>
                </ul>
            </dd>
            <dd>
                <div v-on:click="pointSelectionFn">
                    <i class="fa fa-map-marker"></i>点选
                </div>
            </dd>
            <dd>
                <div v-on:click="setRectangleFn">圈选</div>
            </dd>
            <dd>
                <div v-on:click="setMapFn">
                    <i class="fa fa-map"></i>地图
                </div>
            </dd>
            <dd>
                <div v-on:click="mapLayerFn">
                    <i class="fa fa-map"></i>图层
                </div>
            </dd>
            <dd>
                <div v-on:click="toolFn">
                    <i class="fa fa-cubes"></i>工具
                    <span class="el-icon-caret-bottom"></span>
                </div>
                <ul v-show="subTool" class="dropdown-menu dropdown-menu-right" style="min-width: 110px;">
                    <li class="widget-btn" v-for="(item,index) in subToolArr" v-on:click="getToolsFn(index)">
                        <a href="javascript:;">
                            <i class="fa" v-bind:class="item.icon"></i>{{item.title}}</a>
                    </li>
                </ul>
            </dd>
        </dl>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    export default {
        data() {
            return {
                subTool: false,
                subToolArr: [
                    { icon: 'fa-calculator', title: '测量' },
                    { icon: 'fa-edit', title: '标记' },
                    { icon: 'fa-map-pin', title: '坐标定位' },
                    { icon: 'fa-tags', title: '视角书签' },
                    { icon: 'fa-paper-plane', title: '地区导航' },
                    { icon: 'fa-columns', title: '卷帘对比' },
                    { icon: 'fa-object-group', title: '标绘' },
                    { icon: 'fa-print', title: '截图' }
                ],
                subEnclosure: false
            };
        },
        props: ['enclosure'],
        mounted() {
        },
        created() {

        },
        methods: {
            ...mapActions(['_getInfo']),
            //点选
            pointSelectionFn() {
                this.$emit('pointSelection')
            },
            //圈选
            setRectangleFn() {
                this.$emit('setRectangleClick')
            },
            //附近
            setNearbyFn() {
                this.$emit('setNearbyFn')
            },
            //围栏
            enclosureFn() {
                if(this.subEnclosure) {
                    this.subEnclosure = false;
                } else {
                    this.subEnclosure = true;
                }
            },
            //新建电子围栏
            setEnclosureFn() {
                this.$emit('setEnclosure');
                this.subEnclosure = false;
            },
            //是否显示电子围栏
            setIsShowEnclosureFn() {
                this.$emit('setIsShowEnclosure');
                this.subEnclosure = false;
            },
            //地图
            setMapFn() {
                L.widget.activate('static/map/widgets/manageBasemaps/widget.js');
            },
            //图层
            mapLayerFn() {
                this.$emit('isShowLayer')
            },
            //工具
            toolFn() {
                if(this.subTool) {
                    this.subTool = false;
                } else {
                    this.subTool = true;
                }
            },
            //子工具栏
            getToolsFn(index) {
                if(index == 0) {
                    //测量
                    L.widget.activate('static/map/widgets/measure/widget.js');
                } else if(index == 1) {
                    //标记
                    L.widget.activate('static/map/widgets/addmarker/widget.js');
                } else if(index == 2) {
                    //坐标定位
                    L.widget.activate('static/map/widgets/centerXY/widget.js');
                } else if(index == 3) {
                    //视角书签
                    L.widget.activate('static/map/widgets/bookmark/widget.js');
                } else if(index == 4) {
                    //地区导航
                    L.widget.activate('static/map/widgets/navXZQH/widget.js');
                } else if(index == 5) {
                    //卷帘对比
                    L.widget.activate('static/map/widgets/mapSwipe/widget.js');
                } else if(index == 6) {
                    //标绘
                    L.widget.activate('static/map/widgets/plot/widget.js');
                } else if(index == 7) {
                    //打印
                    L.widget.activate('static/map/widgets/print/widget.js');
                }
                this.subTool = false;
            }
        }
    };
</script>

<style scoped lang="less">
    .toolbarWrap {
        position: absolute;
        right: 10px;
        top: 106px;
        z-index: 1000;
        background: #fff;
        border-radius: 3px;
        box-shadow: 1px 2px 1px rgba(0, 0, 0, 0.15);
        i {
            padding-right: 5px;
        }
        dl {
            dd {
                float: left;
                cursor: pointer;
                border-right: solid 1px #eee;
                color: #575c6e;
                padding: 6px 12px;
                font-size: 14px;
                user-select: none;
            }
            dd:last-child {
                border-right: none;
            }
        }
    }
</style>
<style lang="less">
    .toolbarWrap {
        .dropdown-menu {
            display: block;
        }
    }
</style>
>

