import io from 'socket.io-client';
import { LOGIN_LOSE,LOGIN_DEFINE,EXIT_LOGIN,RECEIVE_MSG,READ_MSG } from './action_type';
import { login } from '../../network/login';
import getChatList from '../../common/getChatList';
import { readMsg } from '../../network/readMsg'

//单例对象 保障一个客户端只存在一个socket 在登录/注册/自动登录的时候就可以创建了。 如果在发送消息的时候创建，那么另一个用户就获取不到消息。
const initSocket = (dispatch,userid) => {
  if(!io.socket){
    //创建socket
    io.socket = io.connect("ws://localhost:3001");
    //监听事件 (我们要求消息是与我们有关的消息才进行redux储存)
    io.socket.on('receiveMsg', Msg => {
       // 接收到消息后判断后(与自己相关的信息,就是from或to与自己id相同)进行redux的提交。
      if(userid == Msg.from || userid == Msg.to){
        dispatch({
          type: RECEIVE_MSG,
          payload: {userid,Msg}
        })
      }
    })
  }
}

const logindefine = (payload) => {
  return async dispatch => {
    let response = await login(payload);
    let data = response.data;  
    
    if(data.code == 0){
      getChatList(dispatch,data.data._id);
      dispatch({
        type: LOGIN_DEFINE,
        "payload": {...data.data,code: "0"}
      })
    }else{    
        dispatch({
          type: LOGIN_LOSE,
          "payload": data
        })
      }
  }
}

const exitLogin = () => {
  return {
    type: EXIT_LOGIN
  }
}

const sendMsg = ({from,to,content}) => {
  return dispatch => {
    io.socket.emit("sendMsg",{from,to,content});
  } 
}

const readMsgs = (targetId,userId) => {
    return async dispatch => {
      const response = await readMsg({from: targetId});
      const result = response.data;
      console.log(result);
      
      if(result.code == 0){
        dispatch({
          type: READ_MSG,
          payload: {
            from: targetId,
            to: userId,
            count: result.data
          }
        })
      } 
    }
}


export {
  logindefine,
  exitLogin,
  sendMsg,
  initSocket,
  readMsgs
}