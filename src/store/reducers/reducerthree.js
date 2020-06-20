import { GETUSER_LIST } from '../action/action_type';

const initUserList = [];

const reducerthree = (state = initUserList,action) => {
  switch(action.type){
    case GETUSER_LIST:
      return action.payload
    default: 
      return state
  }
}


export default reducerthree;