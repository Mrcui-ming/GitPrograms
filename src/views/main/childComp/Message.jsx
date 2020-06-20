import React, { Component } from 'react';
import { connect } from 'react-redux';

class Message extends Component {

  //1.找到每一组里面的lastMsg, 把他保存为一个对象 {chatId: lastMsgs}
  //2.把这个对象转为数组类型
  //3.对数组进行排序，为了显示消息列表中消息的顺序。
  getLastMsgs = (chatMsgs,userId) => {
    const lastMsgsObjs = {};
    chatMsgs.forEach(msg => {
      //消息未读的显示，必定是别人发给我的 并且是read为false的数据
      //并且把这个最后要显示的个数保存在lastMsgsObjs上面
      if(msg.to == userId && !msg.read){
        msg.unReadCount = 1;
      }else{
        msg.unReadCount = 0
      }
      let chatId = msg.chat_id;
      //试着取每一个列表里面的最后一条数据
      const lastMsg = lastMsgsObjs[chatId];
      //如果没有取到，就把当前这个对象当作这个集合的最后一条数据。
      if(!lastMsg){
        lastMsgsObjs[chatId] = msg;
      //如果取到了，就判断时间的大小，时间大的就表示是最新的时间 把这个当作最后一条数据
      }else{
        const oldUnReadMsg = lastMsg.unReadCount;
        if(lastMsg.create_time < msg.create_time){
          lastMsgsObjs[chatId] = msg;
        }
        //（这里必须要放在if的判断下面，让其执行最终的赋值）将unReadCount保存在最新的lastMsgs上面
        lastMsgsObjs[chatId].unReadCount = oldUnReadMsg + msg.unReadCount;
      }
    })
      //对象的方法，把对象出去属性名，保存成为一个数组。
      let lastMsgs = Object.values(lastMsgsObjs); 
      //对数组精选排序    
      lastMsgs.sort((a,b)=> {
        return b.create_time - a.create_time
      })
      return lastMsgs;
  }


  render() {

    const userId = this.props.user._id;
    const { users,chatMsgs } = this.props.chat;
    const lastMsgs = this.getLastMsgs(chatMsgs,userId);
    return (
      <div id="message" style={{
        height: "calc(100% - 49px - 44px)",
        position: "relative",
        top: 44,
        overflow: "auto"
      }}>

        {lastMsgs ? lastMsgs.map(msg => {
          const targetId = msg.from == userId ? msg.to : msg.from;
          const targetInfo = users[targetId]
          return (
            <div key={msg.chat_id}
              style={{
              height: 60,
              backgroundColor: "#fff"}}
              onClick={() => {this.props.history.push(`/chars/${targetId}`)}}>
              <div className="fl" style={{height: "100%",width: "20%",textAlign: "center"}}>
                <img src={require(`../../../components/content/headers/${targetInfo.header}.png`)} alt="" style={{
                  width: 40,height: 40,transform: "translateY(10px)"
                }}/>
              </div>
              <div className="fr" style={{height: "100%",width: "80%",borderBottom: "1px solid #eee",position:"relative"}}>
                <div style={{height: "50%",lineHeight: "30px",color:"#000",fontSize:"15px"}}>{targetInfo.username}</div>
                <div style={{height: "50%",lineHeight: "30px"}}>{msg.content}</div>
                <div className="messageicon"></div>
              {msg.unReadCount !== 0 ? <div className="messageicon2">{msg.unReadCount}</div> : null}
            </div>
          </div>
          )
        }) : null}

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.state2,
    chat: state.state4
  }
}

export default  connect(mapStateToProps)(Message);
