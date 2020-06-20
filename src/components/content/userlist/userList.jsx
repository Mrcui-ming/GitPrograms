import React, { Component } from 'react';
import { Space, Card } from 'antd';
import { withRouter } from 'react-router-dom';
import QueueAnim from 'rc-queue-anim';

class userList extends Component {


  render() {
    let userList = this.props.userList;
    return (
      <div style={{
        height: "100%"
      }}>
        <Space direction="vertical" className="userlist">
          <QueueAnim type="scale">
          {userList ? userList.map(val => {
            return (
              <Card className="card" 
              key={val._id} 
              title={val.username} 
              style={{ width: "100%",borderRadius: 10 }}
              onClick={() => {this.props.history.push(`/chars/${val._id}`)}}
              >
                {val.header ? <img  src={require(`../headers/${val.header}.png`)} alt=""/> : null}
                {val.post ? <p>职位: {val.post}</p> : null}
                {/* 判断存在后 判断类型 显示俩个不同的标题名称 */}
                {val.info && val.type == "Boss" ? <p className="info">公司: {val.info}</p> : <p className="info">简介: {val.info}</p>}
                {val.company ? <p>月薪: {val.company}</p> : null}
                {val.salary ? <p className="info">描述: {val.salary}</p> : null}
              </Card>
            )
          }) : null}
          </QueueAnim>
          
        </Space>
      </div>
    )
  }
}

export default withRouter(userList)