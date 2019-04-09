import store from '../store';
//处理事件的辅助函数
function CmtWsClientHelper() {
  var wsUri = 'ws://127.0.0.1:8181/cmtclient';
  var websocket;
  var eventHandler = []; //是个数组
  //共有方法
  this.addCmtEventHandler = function(handler) {
    //添加事件监听
    eventHandler.push(handler);
  };

  this.removeCmtEventHandler = function(handler) {
    for (var i = 0; i < eventHandler.length; i++) {
      //找出本次需要处理的事件下标
      if (eventHandler[i] == handler) {
        //从事件处理数组里面删除
        eventHandler.splice(i, 1);
        break;
      }
    }
  };

  this.fireEvent = function(evt) {
    //在同一个事件类型下的可能存在多种处理事件，找出本次需要处理的事件
    for (var i = 0; i < eventHandler.length; i++) {
      //执行触发
      var objEvtdata = JSON.parse(evt.data);
      if (objEvtdata.cmdName && objEvtdata.cmdName == 'registerSip') {
        //登陆服务器成功、失败回调事件
        if (eventHandler[i].onEventRegistered != 'undefined') {
          eventHandler[i].onEventRegistered(objEvtdata);
        }
        // } else if (objEvtdata.event == 'onEventRegistered') {
        //   //登陆服务器成功、失败回调事件
        //   if (eventHandler[i].onEventRegistered != 'undefined') {
        //     eventHandler[i].onEventRegistered(objEvtdata.code);
        //   }
      } else if (objEvtdata.event == 'onEventConnected') {
        //电话接通状态事件
        if (eventHandler[i].onEventConnected != 'undefined') {
          eventHandler[i].onEventConnected(objEvtdata);
        }
      } else if (objEvtdata.event == 'onEventDisconnected') {
        //电话挂断状态事件
        if (eventHandler[i].onEventDisconnected != 'undefined') {
          eventHandler[i].onEventDisconnected(objEvtdata.callId);
        }
      } else if (objEvtdata.event == 'onEventIncomingCall') {
        //来电触发事件
        if (eventHandler[i].onEventIncomingCall != 'undefined') {
          eventHandler[i].onEventIncomingCall(objEvtdata.callNumber, objEvtdata.callId);
        }
      } else if (objEvtdata.event == 'onEventRinging') {
        //振铃触发事件
        if (eventHandler[i].onEventRinging != 'undefined') {
          eventHandler[i].onEventRinging(objEvtdata.callId);
        }
      } else if (objEvtdata.event == 'onEventRecvSMS') {
        //接收到短消息事件
        if (eventHandler[i].onEventRecvSMS != 'undefined') {
          eventHandler[i].onEventRecvSMS(objEvtdata.from, objEvtdata.content);
        }
      } else if (objEvtdata.event == 'onEventPttGroup') {
        //获取组成员
        if (eventHandler[i].onEventPttGroup != 'undefined') {
          eventHandler[i].onEventPttGroup(objEvtdata.nevent, objEvtdata.nIdgroup, objEvtdata.strgroup, objEvtdata.bdel);
        }
      } else if (objEvtdata.event == 'onEventPttTempGroup') {
        //获取临时组组成员
        if (eventHandler[i].onEventPttTempGroup != 'undefined') {
          eventHandler[i].onEventPttTempGroup(objEvtdata.nevent, objEvtdata.nidgroup, objEvtdata.strgroup);
        }
      } else if (objEvtdata.event == 'onEventSwitchGroup') {
        //回调收到切组成功
        if (eventHandler[i].onEventSwitchGroup != 'undefined') {
          eventHandler[i].onEventSwitchGroup(objEvtdata.stridgroup);
        }
      } else if (objEvtdata.event == 'onEventGooseneckMicClick') {
        //鹅颈麦克按下ptt按键
        if (eventHandler[i].onEventGooseneckMicClick != 'undefined') {
          eventHandler[i].onEventGooseneckMicClick(objEvtdata.nstate);
        }
      } else if (objEvtdata.event == 'onEventUserStatusUpdate') {
        //获取用户状态
        if (eventHandler[i].onEventUserStatusUpdate != 'undefined') {
          eventHandler[i].onEventUserStatusUpdate(objEvtdata.sipNum, objEvtdata.status);
        }
      } else if (objEvtdata.event == 'onEventURLPttGroupNotify') {
        //组操作结果返回
        if (eventHandler[i].onEventURLPttGroupNotify != 'undefined') {
          eventHandler[i].onEventURLPttGroupNotify(objEvtdata.strnotify);
        }
      } else if (objEvtdata.event == 'onEventStateNetWork') {
        //网络状态事件
        if (eventHandler[i].onEventStateNetWork != 'undefined') {
          eventHandler[i].onEventStateNetWork(objEvtdata.nstate);
        }
      } else if (objEvtdata.event == 'onEventAudioMeetLeave') {
        //离开语音会议
        if (eventHandler[i].onEventAudioMeetLeave != 'undefined') {
          eventHandler[i].onEventAudioMeetLeave(objEvtdata.strMeetID, objEvtdata.strActionSip);
        }
      } else if (objEvtdata.event == 'onEventAudioMeetJoin') {
        //加入语音会议
        if (eventHandler[i].onEventAudioMeetJoin != 'undefined') {
          eventHandler[i].onEventAudioMeetJoin(objEvtdata.strMeetID, objEvtdata.strActionSip, objEvtdata.bAdminFlag);
        }
      } else if (objEvtdata.event == 'onEventVideoMeetJoin') {
        //加入视频会议
        if (eventHandler[i].onEventVideoMeetJoin != 'undefined') {
          eventHandler[i].onEventVideoMeetJoin(objEvtdata.strMeetID, objEvtdata.strActionSip, objEvtdata.strUserNum, objEvtdata.bAdminFlag);
        }
      } else if (objEvtdata.event == 'onopen') {
        if (eventHandler[i].onopen != 'undefined') {
          eventHandler[i].onopen();
        }
      }
    }
  };

  this.sendCmd = function(cmd) {
    console.log('connect send message ' + cmd);
    websocket.send(cmd);
  };
  var that = this;
  var init = function() {
    //初始化构造函数
    websocket = new WebSocket(wsUri);
    websocket.onopen = function(evt) {
      console.log('connect onopen ' + evt);
      var evt = {
        data: '{"event":"onopen"}'
      };
      that.fireEvent(evt);
    };
    websocket.onclose = function(evt) {
      console.log('connect close ' + evt);
    };
    websocket.onmessage = function(evt) {
      console.log('connect got message ' + evt.data);
      if (JSON.parse(evt.data).result && JSON.parse(evt.data).result != 'undefined') {
        store.commit('_setCallId', JSON.parse(evt.data).result);
      }
      that.fireEvent(evt);
    };
    websocket.onerror = function(evt) {
      console.log('connect error ' + evt);
    };
  };

  this.tellWhoAmI = function(myName, cmdId) {
    var cmd = {
      cmdName: 'whoami',
      cmdParam: [myName, cmdId]
    };
    this.sendCmd(JSON.stringify(cmd));
  };

  this.registerSip = function(user, passwd, server, port) {
    //注册
    var cmd = {
      cmdName: 'registerSip',
      cmdParam: [user, passwd, server, port]
    };
    this.sendCmd(JSON.stringify(cmd));
  };

  this.setMute = function(callId, bMute) {
    //禁声功能
    var cmd = {
      cmdName: 'setMute',
      cmdParam: [callId, bMute]
    };
    this.sendCmd(JSON.stringify(cmd));
  };

  this.sendSMS = function(callNumber, msg) {
    //发送短消息
    var cmd = {
      cmdName: 'sendSMS',
      cmdParam: [callNumber, msg]
    };
    this.sendCmd(JSON.stringify(cmd));
  };

  this.getPhysicsHandCount = function() {
    //查询可用逻辑手柄数量
    var cmd = {
      cmdName: 'getPhysicsHandCount',
      cmdParam: []
    };
    this.sendCmd(JSON.stringify(cmd));
  };

  this.isVideoConversation = function(callId) {
    //音频视频会话
    var cmd = {
      cmdName: 'isVideoConversation',
      cmdParam: [callId]
    };
    this.sendCmd(JSON.stringify(cmd));
  };

  this.remoteControlLocation = function(strDestSip, bOpen) {
    //控制台遥控终端开启定位功能
    var cmd = {
      cmdName: 'remoteControlLocation',
      cmdParam: [strDestSip, bOpen]
    };
    this.sendCmd(JSON.stringify(cmd));
  };

  this.setVideoInfo = function(nDropeedFrame, nBuffer, nPlayMode) {
    //设置视频信息
    var cmd = {
      cmdName: 'setVideoInfo',
      cmdParam: [nDropeedFrame, nBuffer, nPlayMode]
    };
    this.sendCmd(JSON.stringify(cmd));
  };

  this.makeAudioCall = function(destNumber, nHand) {
    //拨打语音电话
    var cmd = {
      cmdName: 'makeAudioCall',
      cmdParam: [destNumber, nHand]
    };
    this.sendCmd(JSON.stringify(cmd));
  };

  this.answerCall = function(callId, nHand) {
    //接听来电
    var cmd = {
      cmdName: 'answerCall',
      cmdParam: [callId, nHand]
    };
    this.sendCmd(JSON.stringify(cmd));
  };

  this.makeVideoCall = function(destNumber, hWnd, nHand) {
    //拨打视频电话
    var cmd = {
      cmdName: 'makeVideoCall',
      cmdParam: [destNumber, hWnd, nHand]
    };
    this.sendCmd(JSON.stringify(cmd));
  };

  this.hangUpCall = function(callId) {
    //终止通话
    var cmd = {
      cmdName: 'hangUpCall',
      cmdParam: [callId]
    };
    this.sendCmd(JSON.stringify(cmd));
  };

  this.setVideoWnd = function(callId, hWnd) {
    //设置视频播放窗口
    var cmd = {
      cmdName: 'setVideoWnd',
      cmdParam: [callId, hWnd]
    };
    this.sendCmd(JSON.stringify(cmd));
  };

  this.callThroughConn = function(nCallId, strDestSip) {
    //转接
    var cmd = {
      cmdName: 'callThroughConn',
      cmdParam: [nCallId, strDestSip]
    };
    this.sendCmd(JSON.stringify(cmd));
  };

  this.ptzControl = function(strSip, strControlType, isDown) {
    //ptz云台控制
    var cmd = {
      cmdName: 'ptzControl',
      cmdParam: [strSip, strControlType, isDown]
    };
    this.sendCmd(JSON.stringify(cmd));
  };

  this.startVideoDispatch = function(strSrcNum, strDestNum) {
    //开始视频分发
    var cmd = {
      cmdName: 'startVideoDispatch',
      cmdParam: [strSrcNum, strDestNum]
    };
    this.sendCmd(JSON.stringify(cmd));
  };

  this.stopVideoDispatch = function(strChanName, strDestNum) {
    //结束视频分发
    var cmd = {
      cmdName: 'stopVideoDispatch',
      cmdParam: [strChanName, strDestNum]
    };
    this.sendCmd(JSON.stringify(cmd));
  };

  this.queryVideoDispatch = function() {
    //视频分发查询
    var cmd = {
      cmdName: 'queryVideoDispatch',
      cmdParam: []
    };
    this.sendCmd(JSON.stringify(cmd));
  };

  this.getDefaultGroup = function() {
    //获取默认组
    var cmd = {
      cmdName: 'getDefaultGroup',
      cmdParam: []
    };
    this.sendCmd(JSON.stringify(cmd));
  };

  this.getCurrentGroup = function() {
    //获取当前组
    var cmd = {
      cmdName: 'getCurrentGroup',
      cmdParam: []
    };
    this.sendCmd(JSON.stringify(cmd));
  };

  this.switchGroup = function(csGroupNum) {
    //切换对讲组
    var cmd = {
      cmdName: 'switchGroup',
      cmdParam: [csGroupNum]
    };
    this.sendCmd(JSON.stringify(cmd));
  };

  this.getGroupState = function(pttGroupNum) {
    //得到组状态
    var cmd = {
      cmdName: 'getGroupState',
      cmdParam: [pttGroupNum]
    };
    this.sendCmd(JSON.stringify(cmd));
  };

  this.requestPtt = function(opt) {
    //ptt申请，释放
    var cmd = {
      cmdName: 'requestPtt',
      cmdParam: [opt]
    };
    this.sendCmd(JSON.stringify(cmd));
  };

  this.getGroupState = function(pttGroupNum) {
    //获取组状态
    var cmd = {
      cmdName: 'getGroupState',
      cmdParam: [pttGroupNum]
    };
    this.sendCmd(JSON.stringify(cmd));
  };

  this.endPtt = function(csGroupNum) {
    //结束对讲
    var cmd = {
      cmdName: 'endPtt',
      cmdParam: [csGroupNum]
    };
    this.sendCmd(JSON.stringify(cmd));
  };

  this.makePttCall = function(dest, audioDev, join) {
    //发起ptt
    var cmd = {
      cmdName: 'makePttCall',
      cmdParam: [dest, audioDev, join]
    };
    this.sendCmd(JSON.stringify(cmd));
  };

  this.getPttGroupMemberState = function(strGroupID, strMemberID) {
    //获取组成员状态
    var cmd = {
      cmdName: 'getPttGroupMemberState',
      cmdParam: [strGroupID, strMemberID]
    };
    this.sendCmd(JSON.stringify(cmd));
  };

  this.setVideoTransmit = function(call_id, txFlag) {
    //打开关闭视频（视频回传）
    var cmd = {
      cmdName: 'setVideoTransmit',
      cmdParam: [call_id, txFlag]
    };
    this.sendCmd(JSON.stringify(cmd));
  };

  this.subscribeAllPttGroupInfo = function() {
    //订阅所有组信息
    var cmd = {
      cmdName: 'subscribeAllPttGroupInfo',
      cmdParam: []
    };
    this.sendCmd(JSON.stringify(cmd));
  };

  this.createPttGroupURL = function(strServer, nPort, groupID, strGroupName, strMySip, strMembers) {
    //创建对讲组
    var cmd = {
      cmdName: 'createPttGroupURL',
      cmdParam: [strServer, nPort, groupID, strGroupName, strMySip, strMembers]
    };
    this.sendCmd(JSON.stringify(cmd));
  };

  this.modifyPttGroupURL = function(strServer, nPort, groupID, strGroupName, strMySip, strMembers) {
    //更改对讲组
    var cmd = {
      cmdName: 'modifyPttGroupURL',
      cmdParam: [strServer, nPort, groupID, strGroupName, strMySip, strMembers]
    };
    this.sendCmd(JSON.stringify(cmd));
  };

  this.deletePttGroupURL = function(strServer, nPort, groupID, strMySip) {
    //删除对讲组
    var cmd = {
      cmdName: 'deletePttGroupURL',
      cmdParam: [strServer, nPort, groupID, strMySip]
    };
    this.sendCmd(JSON.stringify(cmd));
  };

  this.createAudioMeet = function(members, nHand) {
    //创建会议
    var cmd = {
      cmdName: 'createAudioMeet',
      cmdParam: [members, nHand]
    };
    this.sendCmd(JSON.stringify(cmd));
  };

  this.hangUpCall = function(callId) {
    //结束会议
    var cmd = {
      cmdName: 'hangUpCall',
      cmdParam: [callId]
    };
    this.sendCmd(JSON.stringify(cmd));
  };
  this.audioMeetAddMember = function(strMeetID, memberSip) {
    //追呼成员
    var cmd = {
      cmdName: 'audioMeetAddMember',
      cmdParam: [strMeetID, memberSip]
    };
    this.sendCmd(JSON.stringify(cmd));
  };

  this.onEventAudioMeetJoin = function(strMeetID, strActionSip, strUserNum, bAdminFlag) {
    //成员加入的通知
    var cmd = {
      cmdName: 'onEventAudioMeetJoin',
      cmdParam: [strMeetID, strActionSip, strUserNum, bAdminFlag]
    };
    this.sendCmd(JSON.stringify(cmd));
  };

  this.onEventAudioMeetLeave = function(strMeetID, strActionSip) {
    debugger;
    //成员离开的通知
    var cmd = {
      cmdName: 'onEventAudioMeetLeave',
      cmdParam: [strMeetID, strActionSip]
    };
    this.sendCmd(JSON.stringify(cmd));
  };

  this.createVideoMeet = function(memberSip, nHand) {
    //创建会议
    var cmd = {
      cmdName: 'createVideoMeet',
      cmdParam: [memberSip, nHand]
    };
    this.sendCmd(JSON.stringify(cmd));
  };

  this.endVideoMeet = function(nCallID) {
    //结束会议
    var cmd = {
      cmdName: 'endVideoMeet',
      cmdParam: [nCallID]
    };
    this.sendCmd(JSON.stringify(cmd));
  };

  this.videoMeetAddMember = function(strMeetID, memberSip) {
    //追呼成员
    var cmd = {
      cmdName: 'videoMeetAddMember',
      cmdParam: [strMeetID, memberSip]
    };
    this.sendCmd(JSON.stringify(cmd));
  };

  this.videoMeetDelMember = function(strMeetID, memberSip) {
    //踢出成员
    var cmd = {
      cmdName: 'videoMeetDelMember',
      cmdParam: [strMeetID, memberSip]
    };
    this.sendCmd(JSON.stringify(cmd));
  };

  this.videoMeetPlayVideo = function(hWnd, nCallId, strSipNum) {
    //设置播放窗口
    var cmd = {
      cmdName: 'videoMeetPlayVideo',
      cmdParam: [hWnd, nCallId, strSipNum]
    };
    this.sendCmd(JSON.stringify(cmd));
  };

  this.onEventVideoMeetJoin = function(strMeetID, strActionSip, strUserNum, bAdminFlag) {
    //成员加入的通知
    var cmd = {
      cmdName: 'onEventVideoMeetJoin',
      cmdParam: [strMeetID, strActionSip, strUserNum, bAdminFlag]
    };
    this.sendCmd(JSON.stringify(cmd));
  };

  this.onEventVideoMeetLeave = function(strMeetID, strActionSip) {
    //成员离开的通知
    var cmd = {
      cmdName: 'onEventVideoMeetLeave',
      cmdParam: [strMeetID, strActionSip]
    };
    this.sendCmd(JSON.stringify(cmd));
  };

  this.setServiceConfig = function(key, value) {
    //设置服务器的配置, 注意别设置冲突了
    var cmd = { cmdName: 'setServiceConfig', cmdParam: [key, value] };
    return this.sendCmd(JSON.stringify(cmd));
  };

  init(); //构造
}

export function cmtWsClientFn() {
  return new CmtWsClientHelper();
}
