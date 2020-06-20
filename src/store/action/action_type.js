//注册成功
const REGISTER_DEFINE = "register_define";
//注册失败
const REGISTER_LOSE = "register_lose";
//登陆成功
const LOGIN_DEFINE = "login_define";
//登陆失败
const LOGIN_LOSE = "login_lose";
//完善用户个人列表成功
const PERFECT_INFO_DEFINE = "perfect_info_define";
//完善用户个人列表失败
const PERFECT_INFO_LOSE = "perfect_info_lose";
//退出登陆状态
const EXIT_LOGIN = "exit_login";
//根据type接收用户列表
const GETUSER_LIST = "getuser_list";
//获取所有相关消息列表
const RECEIVE_MSG_LIST = "receive_msg_list";
//接收一条消息
const RECEIVE_MSG = "receive_msg"
//阅读消息，清除未读消息数量。
const READ_MSG = "read_msg";

export {
  REGISTER_DEFINE,
  REGISTER_LOSE,
  LOGIN_DEFINE,
  LOGIN_LOSE,
  PERFECT_INFO_DEFINE,
  PERFECT_INFO_LOSE,
  EXIT_LOGIN,
  GETUSER_LIST,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG,
  READ_MSG
}