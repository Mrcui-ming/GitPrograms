import { REGISTER_DEFINE,REGISTER_LOSE } from './action_type';
import { register } from '../../network/register';
import getChatList from '../../common/getChatList';

const registerdefine = (payload) => {
  const { username,email,password } = payload;
  if(!username){
    return{
      type: REGISTER_LOSE,
      "payload": {
        code: "1",
        username: "用户名不能为空"
      }
    }
  }
  if(!email){
    return{
      type: REGISTER_LOSE,
      "payload": {
        code: "1",
        email: "邮箱不能为空"
      }
    }
  }
  if(!password){
    return{
      type: REGISTER_LOSE,
      "payload": {
        code: "1",
        password: "密码不能为空"
      }
    }
  }
  return async dispatch => {
    let response = await register(payload);
    let data = response.data;
    console.log(data);
    
    if(data.code == 0){
      getChatList(dispatch,data.data._id);
      dispatch({
        type: REGISTER_DEFINE,
        "payload": {...data.data,code: "0"}
      })
    }else{   
        dispatch({
          type: REGISTER_LOSE,
          "payload": data
        })
      }
  }
}

export {
  registerdefine
}