import { REGISTER_DEFINE,REGISTER_LOSE } from '../action/action_type';
import { getPath } from '../../common/untils';

const initMaster = {
  username: "",
  type: "",
  code: ""
}

const reducerone = (state = initMaster,action) => {
  switch(action.type){
    case REGISTER_DEFINE: //{username,email,_id,type}
      let { type, header } = action.payload
      return {
        ...action.payload,
        redirect: getPath(type,header)
      }
    case REGISTER_LOSE: // {code:1, username: '请输入..' }
      return {
        ...action.payload
      }
    default: 
      return state
  }
}


export default reducerone;