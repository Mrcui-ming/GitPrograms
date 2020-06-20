import React, { Component } from 'react';
import { Result, Button } from 'antd';
import { withRouter } from 'react-router-dom';

 class NotFound extends Component {
  render() {
    return (
      <div>
        <Result
          status="404"
          title="404"
          subTitle="抱歉，没有找到您想要的页面"
          //请求根路径就会在main中判断，然后给出跳往的path地址
          extra={<Button type="primary" onClick={() => {this.props.history.replace("/")}}>去首页</Button>}
        />
      </div>
    )
  }
}

export default withRouter(NotFound);
