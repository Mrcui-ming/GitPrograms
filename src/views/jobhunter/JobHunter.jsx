import React, { Component } from 'react';
import { getUserLists } from '../../store/action/getuserlistaction';
import { connect } from 'react-redux';
import UserList from '../../components/content/userlist/userList';

 class JobHunter extends Component {

  componentDidMount(){
    this.props.getUserLists({type: "Boss"});
  }

  render() {

    let userList = this.props.data;

    return (
      <div style={{
        height: "calc(100% - 49px - 44px)",
        position: "relative",
        top: 44,
        padding: "0 10px",
        overflow: "auto"
      }}>
        <UserList userList={ userList }></UserList>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.state3
  }
} 

export default connect(mapStateToProps,{ getUserLists })(JobHunter);


