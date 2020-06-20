import React, { Component } from 'react';
import { connect } from 'react-redux';
import Toast from '../../../components/common/toast/Toast';

class Personal extends Component {
  constructor(props){
    super(props);
    this.state = {
      isShow: false
    }
  }

  setIsShow = () => {
    this.setState({
      isShow: false
    })
  }
  
  render() {
    const user = this.props.data;
    const header = require(`../../../components/content/headers/${user.header}.png`);
    
    return (
      <div style={{
        height: "calc(100% - 49px - 44px)",
        position: "relative",
        top: 44,
        overflow: "auto"
      }}>
        <Toast isShow={this.state.isShow} setIsShow={this.setIsShow}></Toast>
        <div style={{
          height: 150,
          backgroundColor: "#fff",
          textAlign: "center",
          lineHeight: "100px"
        }}>
          <img src={header} style={{
            boxShadow: "2px -2px 5px 5px rgba(0,0,0,0.3)",
            borderRadius: "50%"
          }} alt=""/>
          <p style={{
           height: 20,
           transform: "translateY(-40px)",
           fontSize: 16
          }}>{user.username}</p>
        </div>
        <div style={{
          height: 40,
          lineHeight: 3.5,
          paddingLeft: 10
        }}>
        相关信息
        </div>
        <div style={{
          height: 140,
          backgroundColor: "#fff",
          padding: 10,
          fontSize: 14
        }}>
          <p style={{
            margin: "12px 0"
          }}>职位: {user.post}</p>
          <p className="info">简介: {user.info}</p>
         { user.company? <p>给定薪资: {user.company}</p> : null }
        </div>
        <button style={{
          width: "100%",
          backgroundColor: "red",
          color: "#fff",
          textAlign: "center",
          height: 40,
          lineHeight: 2.5,
          margin: 0,
          border: 0,
          borderRadius: 5,
          fontSize: 16
        }}
        onClick={() => {this.setState({isShow: true})}}>
          点击退出
        </button>
      </div>
    )
  }
}

export default connect((state) => {
  return{
    data: state.state2
  }
},null)(Personal)