import { GETUSER_LIST } from './action_type';
import { getUserList } from '../../network/getUserList';

const getUserLists = (type) => {
  return async dispatch => {
    const response = await getUserList(type);
    let result = response.data;
    if(result.code == "0"){
      dispatch({
        type: GETUSER_LIST,
        payload: result.data
      })
    }
  }
}

export {
  getUserLists
}