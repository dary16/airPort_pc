<template>
  <div>
    <div class="subClickList">
      <ul>
        <li v-for="(item,index) in list" v-on:click="getCompanyFn(index,item.id,item.name)" v-bind:class="{curFlightLine:companyIndex==index}">
          {{item.name}}
          <img v-if="companyIndex==index" src="../../assets/after.png" />
          <img v-else src="../../assets/before.png" />
        </li>
      </ul>
    </div>
    <!--专业-->
    <v-field-service v-on:onClose="closeFn" v-if="showTable" v-bind:orgId="orgId" v-bind:orgName="orgName"></v-field-service>
    <!--汽车专业-->
    <!-- <v-car-field v-on:onClose="closeFn" v-if="popIndex==1" v-bind:orgId="orgId" v-bind:orgName="orgName"></v-car-field> -->
    <!--警卫专业-->
    <!-- <v-guard-field v-on:onClose="closeFn" v-if="popIndex==2" v-bind:orgId="orgId" v-bind:orgName="orgName"></v-guard-field> -->
    <!--四站专业-->
    <!-- <v-szl-field v-on:onClose="closeFn" v-if="popIndex==3" v-bind:orgId="orgId" v-bind:orgName="orgName"></v-szl-field> -->
    <!--油料专业-->
    <!-- <v-oil-field v-on:onClose="closeFn" v-if="popIndex==4" v-bind:orgId="orgId" v-bind:orgName="orgName"></v-oil-field> -->
    <!--航材专业-->
    <!-- <v-material-field v-on:onClose="closeFn" v-if="popIndex==5" v-bind:orgId="orgId" v-bind:orgName="orgName"></v-material-field> -->
    <!--军械专业-->
    <!-- <v-weapon-field v-on:onClose="closeFn" v-if="popIndex==6" v-bind:orgId="orgId" v-bind:orgName="orgName"></v-weapon-field> -->
    <!--气象专业-->
    <!-- <v-weather-field v-on:onClose="closeFn" v-if="popIndex==7" v-bind:orgId="orgId" v-bind:orgName="orgName"></v-weather-field> -->
  </div>
</template>

<script>
  import { mapMutations, mapActions } from 'vuex';
  export default {
    data() {
      return {
        list: [],
        popIndex: -1,
        companyIndex: -1,
        orgId: '',
        orgName: '',
        showTable: false
      };
    },
    props: ['closeShow'],
    watch: {
      closeShow() {
        if(this.closeShow) {
          this.companyIndex = -1;
        }
      }
    },
    created() {
      this.getOrgList();
    },
    methods: {
      ...mapActions(['_getInfo']),
      getOrgList() {
        this._getInfo({
          ops: {},
          api: 'allOrgList',
          callback: res => {
            res.forEach(item => {
              this.list.push({ name: item.orgName, id: item.orgId });
            });
          }
        });
      },
      getCompanyFn(index, id, name) {
        this.showTable = true;
        this.companyIndex = index;
        this.popIndex = index;
        this.orgId = id;
        this.orgName = name;
      },
      closeFn() {
        // this.popIndex = '-1';
        this.showTable = false;
      }
    }
  }
</script>

<style scoped lang="less">
</style>
