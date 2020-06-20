import React, { Component } from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';

export default class HeaderSelector extends Component {
  constructor(props){
    super(props);
    this.state = { icon: null };
    this.imgs = []
    for(let i =0; i < 20; i++){
      this.imgs.push({
        text: "头像"+(i+1),
        icon: require(`./headers/头像${i+1}.png`)
      })
    }
  }

  //头像的选取
  headClick = ({icon,text}) => {  
    //改变当前state中的icon状态
    this.setState({
      icon: icon
    })

    //调用父元素方法传递text (数据库只需要存图片名称就ok，不需要存icon图片这个16进制数)
    this.props.headerChanged(text);
  }

  render() {
    
    const listHeader = !this.state.icon ? (<div className="filetouxiang">请选择头像</div>) : (<div className="filetouxiang">已选择头像:
   <img src={this.state.icon} alt=""/>
   </div>); 
    return (
      <>
     {listHeader}
      <Row>
        {this.imgs.map((val,i)=> {
          return <Col span={6} className="touxiang" key={i} onClick={() => { 
            this.headClick(val)
          }}>
            <img src={val.icon} alt=""/>
            <div>{val.text}</div>
          </Col>
        })}
    </Row>
      </>
    )
  }
}

HeaderSelector.propTypes = {
  headerChanged: PropTypes.func.isRequired
}