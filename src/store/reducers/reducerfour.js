import { RECEIVE_MSG_LIST,RECEIVE_MSG,READ_MSG } from '../action/action_type';

const initMaster = {
  users: {},
  chatMsgs: [],
  unReadCount: 0
}
//产生聊天状态
const reducerfour = (state = initMaster,action) => { 
  switch(action.type){
    case RECEIVE_MSG_LIST: //{users:{} ,chatMsgs: []}
      let { users, chatMsgs,userid } = action.payload;
      return {
        users,
        chatMsgs,
        unReadCount: chatMsgs.reduce((preTotal,msg) => preTotal+(!msg.read && msg.to == userid ? 1 : 0),0)
      }
    //因为上面那个方法只在登录/注册/自动登录的时候执行 所以当我们发送消息后需要对原有消息数据进行追加
    case RECEIVE_MSG: //{ form, to, chat_id... }
      let {Msg} = action.payload;
      return {
        users: state.users,
        chatMsgs: [...state.chatMsgs, Msg],
        unReadCount: Msg.to == action.payload.userid ? state.unReadCount + 1: state.unReadCount
      }
    case READ_MSG:
      let {from,to,count} = action.payload;
      return{
        users: state.users,
        chatMsgs: state.chatMsgs.map(val => {
          if(val.to == to && val.from == from && !val.read){
            return {...val,read: true}
          }else{
            return val
          }
        }),
        unReadCount: state.unReadCount - count
      }
    default: 
      return state
  }
}


export default reducerfour;