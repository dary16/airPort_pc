import {
  getSen
} from '../../utils';
/*
 * 参数说明:
 * @ischecked 全选或取消选中按钮标识
 * @callMeVide 判断是否是视频通话
 * @checkedArr 左侧通讯录选中数组
 * @aloneUserVoiceSip 地图语音单独用户
 * @aloneUserVideoSip 地图视频单独用户
 * @checkedItem 左侧通讯录选中的item
 * @aloneUserMsgSip
 * @currentSip 当前登陆用户的sip
 * @newMsg 当前用户收到的新消息
 * @newMsgData 当前用户收到的新消息，未点击之前的数组
 * @tabNumber 存储当前基础信息选项卡
 * @notice 通知公告
 * @alarm 告警
 * @userList  用户列表
 * @enclosureArr 电子围栏的数组
 * @isShowLeftMenu 左侧菜单栏显示或隐藏
 * @receiveUserName ocx接收用户的信息
 * @getCallId
 * @getRectangle 获取圈选的数据
 */

export default {
  userInfo: getSen('userInfo') || {},
  setChecked: false,
  callMe: {},
  setChecked: 3,
  dataInfo: {},
  clickDataList: false,
  callMeVideo: false,
  checkedArr: [],
  aloneUserVoiceSip: [],
  aloneUserVideoSip: [],
  createGroupData: false,
  refreshGroupData: false,
  checkedItem: [],
  aloneUserMsgSip: [],
  currentSip: getSen('currentSip') || {},
  getSipData: '',
  currentGroup: false,
  newMsg: getSen('newMsg') || {},
  newMsgData: getSen('newMsgData') || [],
  tabNumber: getSen('tabNumber') || 1,
  test: true,
  notice: false,
  alarm: false,
  userList: getSen('userList') || [],
  enclosureArr: getSen('enclosureArr') || [],
  //暂时
  uploadToken: '',
  custom: {
    toggleMenuStatus: 2
  },
  breadListState: [{
    name: '首页',
    path: '/'
  }],
  isShowLeftMenu: true,
  receiveUserName: '',
  getCallId: '',
  getRectangle: []
};
