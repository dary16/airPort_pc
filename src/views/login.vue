<template>
  <div class="g-login">
    <div class="g-login-view login" v-bind:class="{loginHeight:roleList.length!=0}">
      <h2 class="title">GIS调度系统登录</h2>
      <dl class="content" @keyup.enter="loginBtn">
        <dd><input type="text" placeholder="请输入用户名" v-model.trim="login.userLoginName" /></dd>
        <dd><input type="password" placeholder="请输入密码" v-model="login.userPwd" /></dd>
        <dd v-show="roleList.length!=0">
          <el-select class="select" v-model="roleId" placeholder="请选择登录的角色">
            <el-option v-for="item in roleList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </dd>
      </dl>
      <div class="loginCheck" @click="isCheckFn">
        <img v-if="isCheck" src="../assets/login/checkbox.png" />
        <img v-else src="../assets/login/c.png" /> 记住我
            </div>
        <button class="btn" type="button" @click="loginBtn">登录</button>
      </div>
    </div>
</template>

<script>
  import { mapActions, mapMutations } from 'vuex'
  import { setLoc, getLoc, clearKey } from '../utils';
  export default {
    data() {
      return {
        // 登陆信息
        login: {
          userLoginName: '',
          userPwd: ''
        },
        // 是否记住密码
        isCheck: true,
        roleId: '', //角色
        isRole: false, //是否展示角色下拉框
        roleList: [], //登录成功获取角色列表
        dataRes: {},
        accountId: ''
      }
    },
    created() {
      if(getLoc('login')) {
        this.login = getLoc('login')
      }
    },
    methods: {
      ...mapActions(['_getInfo']),
      ...mapMutations(['_userInfo', '_currentSip']),
      //是否记住登录信息
      isCheckFn() {
        this.isCheck = !this.isCheck;
      },
      //点击登录按钮
      loginBtn() {
        // if(this.roleList.length != 0) {
        //     if(!this.roleId) {
        //         this.message.error('请选择角色！');
        //         return false;
        //     }
        //     this._getInfo({
        //         ops: {
        //             'roleId': this.roleId
        //         },
        //         method: 'post',
        //         api: 'getLoginRole',
        //         callback: res => {
        //             this.loginCmtFn(this.dataRes)
        //         }
        //     })
        // } else {
        // if(!this.login.userLoginName) {
        //     this.message.warning('请输入用户名！');
        //     return false;
        // } else {
        //     var val = /[\d]{3,11}/;
        //     var vald = val.exec(this.login.userLoginName);
        //     if(vald == null) {
        //         this.message.warning("用户名格式不正确：应该由3到11为数字组成。请检查！");
        //         return false;
        //     } else {
        //         if(vald[0] != this.login.userLoginName) {
        //             this.message.warning("用户名格式不正确：应该由3到11为数字组成。请检查！");
        //             return false;
        //         }
        //     }
        // }

        // if(!this.login.userPwd) {
        //     this.message.warning("请输入密码！");
        //     return false;
        // } else {
        //     var val = /^[A-Za-z0-9]{0,16}$/;
        //     var vald = val.exec(this.login.userPwd);
        //     if(vald == null) {
        //         this.message.warning("密码格式不正确:应该由字母或数字组成,且密码长度小于16。请检查！");
        //         return false;
        //     } else {
        //         if(vald[0] != this.login.userPwd) {
        //             this.message.warning("密码格式不正确:应该由字母或数字组成,且密码长度小于16。请检查！");
        //             return false;
        //         }
        //     }
        // }


        if(this.isCheck) {
          setLoc('login', this.login)
        } else {
          clearKey('login', 'l')
        }

        this._getInfo({
          ops: this.login,
          method: 'post',
          api: 'getLogin',
          callback: res => {
            this.dataRes = res;
            this.accountId = res.user.id;
            //用户角色
            //if(res.roleList.length == 1) {
            this.loginCmtFn(res);
            // } else {
            //     this.message.warning('请选择角色！');
            //     this.roleList = res.roleList;
            // }
          }
        })
        // }
      },
      loginCmtFn(res) {
        //存储登陆用户的sip
        this._currentSip(res.user.userSip);
        var _this = this;
        //登录服务器
        //登录
        // this.cmtWsClient.registerSip('6001', '6001', res.cmt_ip, '6050');
        this.cmtWsClient.registerSip(res.user.userSip, res.user.userSip, res.cmt_ip, '6050');

        //处理回调
        this.callback.onEventRegistered = function(code) {
          console.log(code, 'code')
          if(code.result == 0) {
            //存入用户信息
            if(_this.accountId) {
              let userInfo = { 'accountId': _this.accountId, 'userId': res.user.id }
              _this._userInfo(userInfo);
            }
            _this.$router.push('/');
          } else {
            _this.message.error('登录失败，请重新尝试登录！')
          }
        }
      }
    }
  }
</script>

<style lang="less" scoped="scoped">
  .loginHeight {
    height: 400px !important;
  }
  .login {
    width: 500px;
    height: 360px;
    border-radius: 6px;
    background-color: rgba(50, 50, 50, 0.7);
    padding: 35px 48px;
    .title {
      color: #fee;
      font-size: 16px;
      font-weight: normal;
      margin: 0 0 30px;
      border-bottom: 1px solid #eee;
      padding-bottom: 20px;
    }
    .content {
      dd {
        margin-bottom: 20px;
        .select {
          width: 100%;
        }
      }
      input {
        width: 100%;
        border: none;
        height: 42px;
        color: #888;
        /*background-color: #f4f4f4;*/
        background-color: rgba(255, 255, 255, 0.8);
        padding: 0 20px;
        box-sizing: border-box;
        border-radius: 4px;
        border: 1px solid #ddd;
        font-size: 14px;
      }
    }
    button.btn {
      width: 100%;
      border: none;
      font-size: 16px;
      height: 42px;
      color: #fff;
      background-color: #67c23a;
      letter-spacing: 5px;
      /*border: 1px solid #eee;*/
      border-radius: 4px;
      text-align: center;
      cursor: pointer;
    }
    .loginCheck {
      line-height: 14px;
      font-size: 14px;
      color: #fee;
      margin-bottom: 12px;
      cursor: pointer;
      img {
        vertical-align: middle;
      }
    }
  }
</style>
