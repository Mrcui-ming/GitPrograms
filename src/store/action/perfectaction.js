import { PERFECT_INFO_DEFINE,PERFECT_INFO_LOSE } from "./action_type";
import { perfect } from '../../network/perfect';

const perfectInfo = (payload) => {
  return async dispatch => {
    const response = await perfect(payload);
    const result = response.data;
    console.log(result);
    if(result.code == "0"){
      dispatch({
        type: PERFECT_INFO_DEFINE,
        "payload": {...result.data,code: "0"}
      })
    }else{
      dispatch({
        type: PERFECT_INFO_LOSE,
        "payload": result
      })
    }
  }
}

export{
  perfectInfo
}