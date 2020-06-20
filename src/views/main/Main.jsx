import React, { Component } from 'react';
import Boss from '../boss/Boss';
import BossInfo from '../boss/BossInfo';
import JobHunter from '../jobhunter/JobHunter';
import JobHunterInfo from '../jobhunter/JobHunterInfo';
import Message from './childComp/Message';
import Personal from './childComp/Personal';
import NavBar from '../../components/common/navbar/NavBar';
import TabBar from '../../components/common/tabbar/TabBar';
import NotFound from './childComp/NotFound';
import Chars from './childComp/Chars';
import { Route,Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import  Cookie from 'js-cookie';
import { getPath } from '../../common/untils';
import { setUser } from '../../store/action/getuseraction';

class Main extends Component {
  //因为我们注册就相当于注册 ，必须是既没有登陆又没有注册时，才不能访问二级路由。
  //组件加载完毕就判断 有cookie 但是没有处于登录状态（redux中没有_id）。我们就发送登录的请求
  componentDidMount(){
    const cookie = Cookie.get("userid");
    const {_id} = this.props.datatwo;
    if(cookie && !_id){
      //发送网络请求登录
      this.props.setUser();
    }
  }

  navList = [{
    path: "/boss",
    component: Boss,
    title: "求职者列表",
    text: "求职者",
    icon: "dashen"
  },
  {
    path: "/jobhunter",
    component: JobHunter,
    title: "Boss列表",
    text: "老板",
    icon: "laoban"
  },
  {
    path: "/message",
    component: Message,
    title: "消息列表",
    text: "消息",
    icon: "message"
  },
  {
    path: "/personal",
    component: Personal,
    title: "个人中心",
    text: "个人",
    icon: "personal"
  }]

  render() {
    //1.读取cookie中的userid 不存在就取登陆界面
    const cookie = Cookie.get("userid");
    if(!cookie){
      return <Redirect to="/login" />
    }
    //2.cookie存在就判断 redux中用户是否处于登录状态？
    //如果没有登陆就返回一个空白页面，而这个时候componentDidMount中会进行登录，登录之后数据发生改变，render重新渲染加载。
    //如果处于登录状态，并且路径是"/" 那么强制让他继续取info界面完善信息。该判断用于对用户处于完善信息界面后强行修改网页url结果的处理。
    const datatwo = this.props.datatwo;
    if(!datatwo._id){
      return null
    }else{
      const pathname = this.props.location.pathname;
      if(pathname=="/"){
        const url = getPath(datatwo.type,datatwo.header);
        return <Redirect to={url}></Redirect>
      }
    }

    let navList = this.navList;
    const path = this.props.location.pathname;
    const navListItem  = navList.find(val => val.path == path);
    const {type} = this.props.datatwo;
    
    if(type == "Boss"){
      navList[1].hide = true;
    }else{
      navList[0].hide = true;
    }
    //根据type渲染不同的tabbaritem
    navList = navList.filter(val => !val.hide == true)

    return (
      <div style={{backgroundColor: "#eee",height: "100vh"}}>
        {/* 通过当前路由与对象里面的路由比对，传递过去的列表头title 但是错误页面在数组中找不到对应的路由所以会报错没所以我们判断一下 在数组路由中有无对应的当前路由的路由 */}
        {navListItem? <NavBar title={navListItem.title}/> : null}
        <Switch>
          <Route path="/bossinfo" component={ BossInfo }></Route>         
          <Route path="/jobhunterinfo" component={ JobHunterInfo }></Route> 
          <Route path="/chars/:userid" component={ Chars }></Route>
          {
            navList.map((val,index) => {
              return <Route key={index} path={val.path} component={ val.component }></Route> 
            })
          }
          <Route path="/boss" component={ Boss }></Route> 
          <Route path="/boss" component={ Boss }></Route> 
          <Route component={ NotFound }></Route>
        </Switch>
        <TabBar navList={navList}></TabBar>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataone: state.state1,
    datatwo: state.state2
  }
}

export default connect(mapStateToProps,{ setUser })(Main)