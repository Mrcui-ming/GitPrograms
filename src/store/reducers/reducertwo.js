import { LOGIN_DEFINE,LOGIN_LOSE,PERFECT_INFO_DEFINE,PERFECT_INFO_LOSE ,EXIT_LOGIN} from '../action/action_type';
import { getPath } from '../../common/untils';

const initMaster = {
  username: "",
  type: "",
  code: ""
}

const reducertwo = (state = initMaster,action) => {
  switch(action.type){
    case LOGIN_DEFINE: //{username,email,_id,type}
      let { type, header } = action.payload
      return {
        ...action.payload,
        redirect: getPath(type,header)
      }
    case LOGIN_LOSE: // {code:1, username: '请输入..' }
      return {
        ...action.payload
      }
    case PERFECT_INFO_DEFINE: //{code:0 username: ...}
      return action.payload;

    case PERFECT_INFO_LOSE: //{code: 1 ;mes:""}
      return action.payload;
    case EXIT_LOGIN:
      return {
        ...initMaster
      };
    default: 
      return state
  }
}

export default reducertwo;