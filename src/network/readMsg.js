import request from './request';

function readMsg(context){
  return request({
    method: "POST",
    url: "/api/readmsg",
    data: context
  });
}

export {
  readMsg
}