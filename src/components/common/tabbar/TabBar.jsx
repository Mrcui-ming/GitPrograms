import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class TabBar extends Component {

  navList = this.props.navList

  render() {
    const navList = this.navList;
    const path = this.props.location.pathname;
    const {unReadCount} = this.props.chat;

    function getIcon(item,iconpath){
      let pathn = (path == iconpath)
      if(pathn){
        return <img style={{
          width: 24,
          height: 24,
          verticalAlign: "midden",
          marginTop: 5
          }} 
          src={require(`../../../assets/images/nav/${item.icon}-selected.png`)}/>
      }else{
        return <img style={{
          width: 24,
          height: 24,
          verticalAlign: "midden",
          marginTop: 5
          }} 
          src={require(`../../../assets/images/nav/${item.icon}.png`)} alt="" 
          />
      }
    }

    return (
      <div id="tab-bar" style={{
        display: "flex",
        height: 49,
        backgroundColor: "#f6f6f6",
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        boxShadow: "0 -1px 2px rgba(0,0,0,0.1)"
      }}>
        {unReadCount == 0 ? null : <div className="messageicon2 tabbaricon">{unReadCount}</div>  }
        {navList.map((item, index) => {  
          return (<div key={index}
            path={item.path} 
            style={{
            flex: 1,
            textAlign: "center"
          }} 
          onClick={() => {this.props.history.replace(item.path)}}
          >
           {getIcon(item,item.path)}
            <div name='text'>
              {item.text}
            </div>
        </div>)
        })
        }
      </div >
    )
  }
}

const mapStateToProps = (state) => {
  return{
    chat: state.state4
  }
} 

export default withRouter(connect(mapStateToProps)(TabBar));