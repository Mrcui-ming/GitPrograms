import { LOGIN_DEFINE,LOGIN_LOSE } from './action_type';
import { getUser } from '../../network/getuser';
import getChatList from '../../common/getChatList';

const setUser = () => {
  return async dispatch => {
    const response = await getUser();
    const result = response.data;
    if(result.code == "0"){
      getChatList(dispatch,result.data._id)
      dispatch({
        type: LOGIN_DEFINE,
        payload: {...result.data,code: "0"}
      })
    }else{
      dispatch({
        type: LOGIN_LOSE,
        payload: result
      })
    }
  }
}

export {
  setUser
}