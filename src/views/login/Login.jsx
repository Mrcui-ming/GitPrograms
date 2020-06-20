import React, { Component } from 'react';
import { Form, Input, Button, Radio } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import * as logindefine from '../../store/action/loginaction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

class Login extends Component {

  histRegister = () => {
    this.props.history.replace("/register")
  }

  onFinish = (e) => {
    this.props.Acitons.logindefine(e);
    //数据异步没有更新到位
    setTimeout(() => {
      let url = this.props.state.redirect;
      if(url){
        this.props.history.replace(url)
      }
    },1000)
  }

  render() {
    let state = this.props.state;
    const ui =(
      <div className="errorprompt">
        {state.username ? <div>{state.username}</div> : null}
        {state.email ? <div>{state.email}</div> : null}
        {state.password ? <div>{state.password}</div> : null}
        {state.definepassword ? <div>{state.definepassword}</div> : null}
        {state.message ? <div>{state.message}</div> : null}
      </div>
    )
    return (
      <div id="register">
        <h2 className="programename">BOSS直聘</h2>
        <div className="form">
        {state.code == 0 ? null : ui}
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
          >

            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名"/>
             </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>

            <Form.Item
              name="definepassword"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="确认密码"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
          <Button type="primary" className="login-form-button login" onClick={ this.histRegister }>
            去注册
          </Button>
        </div>
        <p style={{textAlign: "center",
        fontSize: 14,
        color: "#fff",
        marginTop: 5}}>
          © 2020 BOSS直聘 All rights reserved
        </p>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    state: state.state2
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    Acitons: bindActionCreators(logindefine,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)