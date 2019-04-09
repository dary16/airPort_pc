<template>
    <div class="m-manage-left" :class="'menu-status' + custom.toggleMenuStatus">
        <v-manage-menu></v-manage-menu>
        <div @click="toggleLayoutMenu" :class="menuArrow" class="m-manage-left-arrow"></div>
    </div>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex'

    export default {
        data() {
            return {

            }
        },
        computed: {
            ...mapGetters(['custom']),
            menuArrow() {
                if(this.custom.toggleMenuStatus == 1) {
                    return 'el-icon-arrow-right posi';
                } else if(this.custom.toggleMenuStatus == 2) {
                    return 'el-icon-arrow-left';
                }
                return '';
            }
        },
        methods: {
            ...mapMutations(['_custom']),
            toggleLayoutMenu() {
                this.custom.toggleMenuStatus = !(this.custom.toggleMenuStatus - 1) + 1;
                this._custom(this.custom);
            }
        }
    }
</script>

<style scoped lang="less">
    .el-icon-arrow-right.posi {
        transition: all 0.3s ease-in-out;
        border-radius: 0 5px 5px 0;
        right: -32px;
        z-index: 100;
        background-color: #090723;
        color: #ffe;
    }
</style>

