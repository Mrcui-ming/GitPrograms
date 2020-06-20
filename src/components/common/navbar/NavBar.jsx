import React, { Component } from 'react'

export default class NavBar extends Component {
  render() {
    return (
      <div className="nav-bar">
        <div className="center">{this.props.title}</div>
      </div>
    )
  }
}
