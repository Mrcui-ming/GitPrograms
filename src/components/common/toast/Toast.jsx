import React, { Component } from 'react';
import Cookie from 'js-cookie';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginAction from '../../../store/action/loginaction';


class Toast extends Component {
  
  //退出登录状态
  exitLogin = () => {
    //清除cookie
    Cookie.remove("userid");
    //清除redux中的登陆状态
    this.props.Action.exitLogin();
  }
  
  render() {
    const isShow = this.props.isShow;
    if(!isShow){
      return null
    }
    return (
      <div className="toast" style={{
        position: "fixed",
        zIndex: 999,
        top: "50%",
        left: "50%",
        borderRadius: 4,
        width: 220,
        height: 120,
        textAlign: "center",
        lineHeight: "40px",
        background: "rgba(0,0,0,0.7)",
        color: "#fff",
        transform: "translate(-50%,-50%)"
      }}>
        <div>
          <div>退出</div>
          <div style={{borderBottom: "1px solid #fff"}}>确定退出登录吗?</div>
        </div>
        <div>
          <div style={{float: "left",width: "50%",borderRight: "1px solid #fff",color: "skyblue"}} onClick={this.exitLogin}>确认</div>
          <div style={{float: "right",width: "50%"}} onClick={() => {this.props.setIsShow()}}>取消</div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    Action: bindActionCreators(loginAction,dispatch)
  }
} 

export default connect(null,mapDispatchToProps)(Toast);