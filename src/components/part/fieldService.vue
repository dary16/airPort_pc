<template>
  <div class="mask" id="borderTable">
    <dl class="popContent">
      <div class="popHeader">
        <h3>{{orgName}}</h3>
        <i class="el-icon-close" v-on:click="maskFn"></i>
      </div>
      <dd>
        <div class="tabWrap">
          <ul class="tab flex">
            <li v-for="(item,index) in title" v-on:click.stop="tabFn(index)" v-bind:class="{active:indexed==index}">{{item}}</li>
          </ul>
        </div>

        <div v-if="indexed==0" class="content">
          <el-table :data="userList" stripe height="258">
            <el-table-column align="center" prop="userName" label="姓名" width="100"></el-table-column>
            <el-table-column align="center" prop="roleName" label="职务" width="100"></el-table-column>
            <el-table-column align="center" prop="userRank" label="军衔" width="100"></el-table-column>
            <el-table-column align="center" prop="userProfession" label="专业" width="120"></el-table-column>
            <el-table-column align="center" prop="majorStatus" label="是否属于骨干"></el-table-column>
          </el-table>
        </div>
        <div v-if="indexed==1" class="content">
          <el-table :data="equipmentList" stripe height="258">
            <el-table-column align="center" prop="equipName" label="名称" width="200"></el-table-column>
            <el-table-column align="center" prop="equipType" label="装备类型" width="200"></el-table-column>
            <el-table-column align="center" prop="equipNum" label="数量"></el-table-column>
          </el-table>
        </div>
        <div v-if="indexed==2" class="content">
          <el-table :data="carList" stripe height="258">
            <el-table-column align="center" prop="carName" label="名称" width="200"></el-table-column>
            <el-table-column align="center" prop="carCode" label="车牌号" width="200"></el-table-column>
            <el-table-column align="center" prop="carType" label="型号"></el-table-column>
          </el-table>
        </div>
      </dd>
    </dl>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  export default {
    data() {
      return {
        title: ['人员', '装备', '车辆'],
        indexed: 0,
        userList: [],
        equipmentList: [],
        carList: []
      };
    },
    props: ['orgId', 'orgName'],
    created() {
      this.getOrgUserList();
      this.getOrgEquipList();
      this.getOrgCarList();
    },
    methods: {
      ...mapActions(['_getInfo']),
      tabFn(index) {
        this.indexed = index
      },
      getOrgUserList() {
        this._getInfo({
          ops: {
            orgId: this.orgId
          },
          api: 'orgUserList',
          callback: res => {
            this.userList = res;
          }
        });
      },
      getOrgEquipList() {
        this._getInfo({
          ops: {
            orgId: this.orgId
          },
          api: 'orgEquipList',
          callback: res => {
            this.equipmentList = res;
          }
        });
      },
      getOrgCarList() {
        this._getInfo({
          ops: {
            orgId: this.orgId
          },
          api: 'orgCarList',
          callback: res => {
            this.carList = res;
          }
        });
      },
      maskFn() {
        this.$emit('onClose');
      }
    }
  };
</script>

<style scoped lang="less">
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99999;
    .popContent {
      width: 622px;
      height: 390px;
      background: #fff;
      position: fixed;
      top: 0px;
      bottom: 0px;
      left: 0px;
      right: 0px;
      margin: auto;
      .popHeader {
        font-weight: 400;
        color: rgba(224, 224, 224, 1);
        text-align: left;
        font-size: 20px;
        line-height: 38px;
        cursor: pointer;
        z-index: 1001;
        width: 622px;
        height: 38px;
        background: linear-gradient(
          90deg,
          rgba(0, 65, 117, 1),
          rgba(15, 108, 178, 1)
        );
        box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.8);
        position: relative;
        h3 {
          display: inline-block;
          padding-left: 12px;
        }
        .el-icon-close {
          position: absolute;
          top: 10px;
          right: 12px;
        }
      }
      dt {
        text-align: center;
        height: 36px;
        line-height: 36px;
      }
      dd {
        background: #5389c4;
        height: 360px;
      }
      .tabWrap {
        height: 67px;
        .tab {
          width: 100%;
          background: #144368;
          align-items: flex-start;
          font-size: 18px;
          color: #e0e0e0;
          li {
            width: 157px;
            height: 45px;
            line-height: 45px;
            text-align: center;
            background: #144368;
            cursor: pointer;
            border: 2px solid #003763;
            color: #fff;
          }
          li:last-child {
            border-right: none;
          }
          .active {
            background: #5389c4;
            border: none;
          }
        }
      }
    }
  }

  .content {
    // height: 260px;
    max-height: 400px;
    overflow-y: auto;
    background: #3a6089;
    padding: 5px 12px;
    border-bottom: 1px solid #85dcff;
  }
  table {
    thead {
      tr {
        th {
          background: linear-gradient(
            0deg,
            rgba(18, 107, 175, 1),
            rgba(32, 119, 194, 1)
          ) !important;
          border: 2px solid rgba(20, 93, 151, 1) !important;
        }
      }
    }
  }
</style>
<style>
  #borderTable .el-tab--fit {
    padding: 5px 12px !important;
    background: #3a6089 !important;
  }
  #borderTable .el-table::before {
    background-color: #3a6089;
  }
  #borderTable .el-table th > .cell {
    background: linear-gradient(
      0deg,
      rgba(18, 107, 175, 1),
      rgba(32, 119, 194, 1)
    );
    border: 2px solid rgba(20, 93, 151, 1);
    height: 31px;
    line-height: 31px;
    color: #e0e0e0;
    font-size: 16px;
  }
  #borderTable .el-table td,
  #borderTable .el-table th {
    padding: 0 !important;
  }
  #borderTable .el-table .cell {
    line-height: 31px;
    height: 31px;
    background: #ccd6e0;
    border: 2px solid rgba(20, 93, 151, 1);
    font-weight: normal;
    font-size: 16px;
  }
  #borderTable .el-table td,
  #borderTable .el-table th.is-leaf {
    border-bottom: none !important;
  }
  #borderTable .el-table,
  .el-table__expanded-cell {
    background-color: #3a6089;
  }
  #borderTable .el-table th,
  #borderTable .el-table tr {
    background-color: #3a6089;
  }
  #borderTable .el-table__body {
    /* width: 598px !important; */
    color: #144368;
  }
  #borderTable .el-table th.gutter {
    display: table-cell !important;
  }
</style>

