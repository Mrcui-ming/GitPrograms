import React, { Component } from 'react';
import NavBar from '../../components/common/navbar/NavBar';
import { List, Typography, Input, Button } from 'antd';
import HeaderSelector from '../../components/content/HeaderSelector';
import { perfectInfo } from '../../store/action/perfectaction';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const { TextArea } = Input;

class Boss extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: "",
      post: "",
      info: "",
      company: "",
      salary: ""
    }
  }

  inputChanged = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  textAreaChanged = (e) => {
    this.setState({
      salary: e.target.value
    })
  }

  headerChanged = (val) => {
    this.setState({
      header: val
    })
  }

  emitBossInfo = () => {
    this.props.perfectInfo(this.state);
  }

  render() {
   const {header,type} = this.props.data;
   if(header){
     const path = type == "Boss" ? "/boss" : "/jobhunter";
     return <Redirect to={path} />
   }

    const data = [
      '招聘岗位:',
      '公司名称:',
      '职位薪资:'
    ];
    const inputstate = ["post", "info", "company"];

    return (
      <div id="boss" style={{
        backgroundColor: "#fff",
        height: "100vh"
      }}>
        <NavBar title="Boss信息完善"></NavBar>
        <div className="container">
        <HeaderSelector headerChanged={this.headerChanged}></HeaderSelector>
        <List
          bordered
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item className="list-item">
              <Typography.Text mark></Typography.Text>
              {item}
              <input type="text" className="bossInput" name={inputstate[index]} onChange={this.inputChanged} />
            </List.Item>
          )}
        />
        <div style={{
          paddingLeft: 10,
          fontSize: 14,
          color: "rgba(0, 0, 0, 0.65)",
          marginBottom: 10
        }}>
          <span>职位需求</span>
          <TextArea name="salary" className="textarea" onChange={this.textAreaChanged}></TextArea>
        </div>
        <Button type="primary" className="login-form-button baocun" style={{
          width: "100%",
          marginLeft: 0,
          marginTop: 10
        }} onClick={this.emitBossInfo}>
          保存
    </Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.state2
  }
}

export default connect(mapStateToProps,{ perfectInfo })(Boss)