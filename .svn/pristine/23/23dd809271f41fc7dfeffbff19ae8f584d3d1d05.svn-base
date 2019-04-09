import { setSen, clearKey } from '../../utils';
export default {
  //登录
  _userInfo(state, userInfo) {
    debugger;
    setSen('userInfo', userInfo);
    state.userInfo = userInfo;
  },
  //退出登陆
  _clearLogin(state) {
    state.userInfo = '';
    clearKey('userInfo', 'r');
  },
  //点击全选或取消选中按钮
  _setChecked(state, setChecked) {
    state.setChecked = setChecked;
  },
  _callMeFn(state, callMe) {
    state.callMe = callMe;
  },
  //数据采集列表里的值
  _dataInfo(state, dataInfo) {
    state.dataInfo = dataInfo;
  },
  //是否点击数据采集列表
  _clickDataList(state, clickDataList) {
    state.clickDataList = clickDataList;
  },
  //判断是不是视频
  _callMeVideoFn(state, callMeVideo) {
    state.callMeVideo = callMeVideo;
  },
  //左侧通讯录多选框存储选中数据
  _setCheckedArr(state, checkedArr) {
    state.checkedArr = checkedArr;
  },
  //地图上语音单独用户存储
  _setAloneUserVoiceSip(state, aloneUserVoiceSip) {
    state.aloneUserVoiceSip = aloneUserVoiceSip;
  },
  //地图上视频单独用户存储
  _setAloneUserVideoSip(state, aloneUserVideoSip) {
    state.aloneUserVideoSip = aloneUserVideoSip;
  },
  //新建组信息
  _createGroupData(state, createGroupData) {
    state.createGroupData = createGroupData;
  },
  //是否刷新对讲组列表
  _refreshGroupData(state, refreshGroupData) {
    state.refreshGroupData = refreshGroupData;
  },
  //左侧通讯录多选框存储选中的一组值
  _setCheckedItemArr(state, checkedItem) {
    state.checkedItem = checkedItem;
  },
  //左侧通讯录多选框存储选中的一组值
  _setAloneUserMsgSip(state, aloneUserMsgSip) {
    state.aloneUserMsgSip = aloneUserMsgSip;
  },
  //存储登陆用户的sip
  _currentSip(state, currentSip) {
    state.currentSip = currentSip;
    setSen('currentSip', currentSip);
  },
  //存储组的状态
  _currentGroup(state, currentGroup) {
    state.currentGroup = currentGroup;
  },
  //存储最新消息
  _newMsg(state, newMsg) {
    state.newMsg = newMsg;
    setSen('newMsg', newMsg);
  },
  //存储未点击的消息的数据
  _newMsgData(state, newMsgData) {
    state.newMsgData = newMsgData;
    setSen('newMsgData', newMsgData);
  },
  _setTabNumber(state, tabNumber) {
    state.tabNumber = tabNumber;
    setSen('tabNumber', tabNumber);
  },
  _test(state, test) {
    state.test = test;
  },
  //存储通知公告
  _setNotice(state, notice) {
    state.notice = notice;
    setSen('notice', notice);
  },
  //存储告警
  _setAlarm(state, alarm) {
    state.alarm = alarm;
    setSen('alarm', alarm);
  },
  //存储用户列表
  _setUserList(state, userList) {
    state.userList = userList;
    setSen('userList', userList);
  },
  //存储用户列表
  _setEnclosureArr(state, enclosureArr) {
    state.enclosureArr = enclosureArr;
    setSen('enclosureArr', enclosureArr);
  },
  //暂时
  _custom(state, custom) {
    state.custom = custom;
  },
  _breadListStateAdd(state, obj) {
    state.breadListState.push(obj);
  },
  _breadListStateRemove(state, num) {
    state.breadListState.splice(num, state.breadListState.length - num);
  },
  _uploadToken(state, uploadToken) {
    state.uploadToken = uploadToken;
  },
  //左侧菜单栏显示或隐藏
  _setLeftMenuBoolean(state, isShowLeftMenu) {
    state.isShowLeftMenu = isShowLeftMenu;
  },
  //ocx 接收用户信息
  _receiveUserName(state, receiveUserName) {
    state.receiveUserName = receiveUserName;
  },
  //callId
  _setCallId(state, getCallId) {
    state.getCallId = getCallId;
  },
  //圈选 选中的人员
  _setRectangle(state, getRectangle) {
    state.getRectangle = getRectangle;
  }
};
