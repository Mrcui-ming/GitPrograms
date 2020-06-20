import {reqChatMsgList,reqReadMsg} from '../network/getchatlist';
import { RECEIVE_MSG_LIST,RECEIVE_MSG } from '../store/action/action_type';
import { initSocket } from '../store/action/loginaction'

//获取聊天对话列表需要的信息 /这个方法应该在登录/注册/自动登录后执行
export default async function(dispatch,userid) {
  //单例对象 保障一个客户端只存在一个socket 在登录/注册/自动登录的时候就可以创建了。 如果在发送消息的时候创建，那么另一个用户就获取不到消息。
  initSocket(dispatch,userid)
  const response = await reqChatMsgList();
  const result = response.data;
  if(result.code == "0"){
    const {users,chatMsgs} = result.data;
    dispatch({
      type: RECEIVE_MSG_LIST,
      payload: {users,chatMsgs,userid}
    })
  }
}