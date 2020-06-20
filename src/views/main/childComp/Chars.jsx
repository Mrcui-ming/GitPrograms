import React, { Component } from 'react';
import NavBar from '../../../components/common/navbar/NavBar';
import { Input } from 'antd';
import { connect } from 'react-redux';
import { sendMsg,readMsgs } from '../../../store/action/loginaction';
import QueueAnim from 'rc-queue-anim';
import { Row, Col } from 'antd';

class Chars extends Component {

  constructor(props){
    super(props);
    this.emitRef = React.createRef();
  }

  state = {
    value: "",
    isShow: false
  };

  message = {
    from: this.props.data._id,
    to: this.props.match.params.userid,
    content: ""
  }
  
  componentWillMount() {
    const expression = ['😀','😄','😁','😆','😅','🤣','😂','🙂','🙃','😉','😊','😇','🥰','😍','🤩','😘','😗','😚','😙','😋','😛','😜','🤪','😝','🤑','🤗','🤭','🤫','😒','😷','🤬','🙄','😬'];
    this.expressions = expression.map(val => {
      return {text: val}
    });
  }

  //什么时候去表示已读。当然是进入这个聊天界面了呀。
  //所以需要更改的数据是别人发给我的。所以表示from为他 to为我
  componentDidMount() {
    const targetId = this.props.match.params.userid;
    const userId = this.props.data._id;
    this.props.readMsgs(targetId,userId);
  }

  componentWillUnmount() {
    const targetId = this.props.match.params.userid;
    const userId = this.props.data._id;
    this.props.readMsgs(targetId,userId);
  }

  toggleExpression = () => {
    this.setState({
      isShow: true
    })
    this.emitRef.current.style.bottom = "150px";
  }

  expressionChecked = (text) => {
    this.setState({
      isShow: false,
      value: this.state.value + text
    })
    this.emitRef.current.style.bottom = "0";
  }

  focusing = () => {
    this.setState({
      isShow: false
    })
    this.emitRef.current.style.bottom = "0px";
  }

  entryInput = (e) => {
    this.setState({
      value: e.target.value
    })

  }

  sendMsg = () => {
    //由于组件加载完后value是空，所以初始化message对象的时候不能对content赋值
    this.message.content = this.state.value;
    this.props.sendMsg(this.message);
    this.setState({value: ""});
  }

  render() {   

    const meId = this.props.data._id;
    const targetId = this.props.match.params.userid;
    const tsChat_id = [meId,targetId].sort().join("_");
    const { users,chatMsgs } = this.props.chat;
    const targetName = users && users[targetId] && users[targetId].username;
    
    let targeticon;
    //判断是否存在user 因为user是异步，组件加载的时候可能数据还没到
    if(users){
      for(let i in users){
        if (i == targetId){
          targeticon = users[i].header; 
        }   
      }
      targeticon = targeticon ? require(`../../../components/content/headers/${targeticon}.png`) : null;
    }
    
    const fitChatMsgs = chatMsgs.filter(val => val.chat_id == tsChat_id);
    return (
      <div className="char" style={{
        height: "calc(100% - 49px)",
        position: "relative"
      }}>
      {targetName ? <NavBar title={targetName}></NavBar> : null}
        <div className="backicon" onClick={() => {this.props.history.goBack()}}></div>

        <div style={{
        position: "fixed",
        height: "calc(100% - 44px)",
        top: 44,
        left: 0,
        right: 0,
        overflow: "auto",
        paddingBottom: 80
      }}
      onClick={this.focusing}
      >
        <QueueAnim delay={50}>
        {fitChatMsgs.map(msg => {
          if(msg.from == meId){
            return<div key={msg._id} className="charstyle">
                    <span className="fr">我</span>
                    <span className="fr" style={{color: "#000",marginRight: 10}}>
                      {msg.content}
                    </span>
                  </div>
          }else{
            return (
            <div key={msg._id} className="charstyle">
              <img src={targeticon} alt=""/>
              <span style={{color: "#000"}}>
                {msg.content}
              </span>
            </div>
            )
          }
        })}
        </QueueAnim>
        
        </div>

        <div className="charbottom" ref={this.emitRef}>
          <Input style={{width: "80%"}} value={this.state.value} onChange={this.entryInput} onFocus={this.focusing}/>
          <i style={{position: "relative",left: 15}} onClick={this.toggleExpression}>😀</i>
          <span className="fr" onClick={this.sendMsg}>发送</span>
        </div>
        {this.state.isShow ? 
        <Row style={{position: "fixed", bottom: 0,zIndex: 2,backgroundColor: "#fff",}}>
        {this.expressions.map(val => {
          return  <Col style={{height: 30,
            textAlign: "center",
            lineHeight: "30px"}}
            span={3}
            onClick={() => { this.expressionChecked(val.text) }}>{val.text}</Col>
        })
        }
    </Row> : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.state2,
    chat: state.state4
  }
}

export default connect(mapStateToProps,{ sendMsg,readMsgs })(Chars)