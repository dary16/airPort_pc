import store from '../store';
import { Notification } from 'element-ui';
function CallbackHandler() {
  this.onEventRegistered = function(code) {
    //登陆服务器成功、失败回调事件
    console.log('onEventRegistered code:' + code);
  };
  this.onEventConnected = function(callid) {
    //电话接通状态事件
    console.log('onEventConnected callid:' + callid);
  };
  this.onEventDisconnected = function(callid) {
    //电话挂断状态事件
    console.log('onEventDisconnected callid:' + callid);
  };
  this.onEventIncomingCall = function(callnumber, callid) {
    let data = {};
    data.callMe = false;
    data = {
      callnumber: callnumber,
      callId: callid,
      callMe: true
    };
    store.commit('_callMeFn', data);
    //来电触发事件
    console.log('onEventIncomingCall callnumber:' + callnumber);
    console.log('onEventIncomingCall callid:' + callid);
  };
  this.onEventRinging = function(callid) {
    //振铃触发事件
    console.log('onEventRinging :' + callid);
  };
  this.onEventRecvSMS = function(from, content) {
    let obj = {
      from: from,
      content: content
    };
    if (content.indexOf('$$replyText') != -1) {
      console.log(Notification, 'ElementUI');
      Notification.info({
        title: '提示',
        message: content.slice(content.indexOf('__') + 2, content.length)
      });
    } else {
      store.commit('_newMsg', obj);
    }
    // if (content.indexOf('sendNotice') != -1) {
    //   store.commit('_setNotice', true);
    // } else if (content.indexOf('sendAlerm') != -1) {
    //   store.commit('_setAlarm', true);
    // } else {
    //   store.commit('_newMsg', obj);
    // }
    //接收到短消息事件
    console.log('onEventRecvSMS from :' + from);
    console.log('onEventRecvSMS content :' + content);
  };
  this.onEventPttGroup = function(nevent, nidgroup, strgroup, bdel) {
    //返回的
    //获取组成员
    console.log('onEventPttGroup nevent :' + nevent);
    console.log('onEventPttGroup nidgroup :' + nidgroup);
    console.log('onEventPttGroup strgroup :' + strgroup);
    console.log('onEventPttGroup bdel :' + bdel);
  };
  this.onEventPttTempGroup = function(nevent, nidgroup, strgroup) {
    //获取临时组组成员
    console.log('onEventPttTempGroup nevent :' + nevent);
    console.log('onEventPttTempGroup nidgroup :' + nidgroup);
    console.log('onEventPttTempGroup strgroup :' + strgroup);
  };
  this.onEventSwitchGroup = function(stridgroup) {
    //回调收到切组成功
    console.log('onEventSwitchGroup stridgroup :' + stridgroup);
  };
  this.onEventGooseneckMicClick = function(nstate) {
    //鹅颈麦克按下ptt按键
    console.log('onEventGooseneckMicClick nstate :' + nstate);
  };
  this.onEventUserStatusUpdate = function(sipnum, status) {
    //获取用户状态
    store.commit('_receiveUserName', sipnum);
    console.log('onEventUserStatusUpdate sipnum :' + sipnum);
    console.log('onEventUserStatusUpdate status :' + status);
  };
  this.onEventURLPttGroupNotify = function(strnotify) {
    //组操作结果返回
    console.log('onEventURLPttGroupNotify strnotify :' + strnotify);
  };
  this.onEventStateNetWork = function(nstate) {
    //网络状态事件
    console.log('onEventStateNetWork nstate :' + nstate);
  };
  this.onEventAudioMeetLeave = function(meetId, actionSip) {
    //挂断语音会议
    console.log('onEventAudioMeetLeave meetId：' + meetId);
    console.log('onEventAudioMeetLeave actionSip：' + actionSip);
  };
  this.onEventAudioMeetJoin = function(meetId, actionSip, bAdminFlag) {
    //加入语音会议
    console.log('onEventAudioMeetJoin meetId：' + meetId);
    console.log('onEventAudioMeetJoin actionSip：' + actionSip);
    console.log('onEventAudioMeetJoin bAdminFlag' + bAdminFlag);
  };
  this.onEventVideoMeetJoin = function(strMeetID, strActionSip, strUserNum, bAdminFlag) {
    //加入视频会议
    console.log('onEventVideoMeetJoin strMeetID：' + strMeetID);
    console.log('onEventVideoMeetJoin strActionSip：' + strActionSip);
    console.log('onEventVideoMeetJoin strUserNum：' + strUserNum);
    console.log('onEventVideoMeetJoin bAdminFlag：' + bAdminFlag);
  };
  this.onopen = function() {
    console.log('onopen');
  };
}

export function callbackHandlerFn() {
  return new CallbackHandler();
}
