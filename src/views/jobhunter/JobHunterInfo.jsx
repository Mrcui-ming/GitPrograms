import React, { Component } from 'react';
import NavBar from '../../components/common/navbar/NavBar';
import { List, Typography, Input, Button } from 'antd';
import HeaderSelector from '../../components/content/HeaderSelector';
import { connect } from 'react-redux';
import { perfectInfo } from '../../store/action/perfectaction';
import { Redirect } from 'react-router-dom';

const { TextArea } = Input;

class JobHunter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: "",
      post: "",
      info: ""
    }
  }

  inputChanged = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  textAreaChanged = (e) => {
    this.setState({
      info: e.target.value
    })
  }

  headerChanged = (val) => {
    this.setState({
      header: val
    })
  }

  emitJobHunterInfo = () => {
    this.props.perfectInfo(this.state);
  }

  render() {

  const {header,type} = this.props.data;
  if(header){
    const path = type == "Boss" ? "/boss" : "/jobhunter";
    return <Redirect to={path} />
  }

    const data = [
      '求职岗位:'
    ];
    const inputstate = ["post"];

    return (
      <div id="boss" style={{
        backgroundColor: "#fff"
      }}>
        <NavBar title="求职者信息完善"></NavBar>
        <div style={{
          marginTop: "44px"
        }}>
        <HeaderSelector headerChanged={this.headerChanged}></ HeaderSelector>
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
        </div>
        <div style={{
          paddingLeft: 10,
          fontSize: 14,
          color: "rgba(0, 0, 0, 0.65)"
        }}>
          <span>个人介绍</span>
          <TextArea name="salary" className="textarea" onChange={this.textAreaChanged}></TextArea>
        </div>
        <Button type="primary" className="login-form-button baocun" style={{
          width: "100%",
          marginLeft: 0,
          marginTop: 10
        }} onClick={this.emitJobHunterInfo}>
          保存
    </Button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.state2
  }
}

export default connect(mapStateToProps,{ perfectInfo })(JobHunter);

