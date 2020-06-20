import request from './request';

const reqChatMsgList = () => {
  return request({
    url: "/api/msglist"
  })
}

const reqReadMsg = (from) => {
  return request({
    method: "POST",
    url: "/api/readmsg",
    data: from
  })
}

export{
  reqChatMsgList,
  reqReadMsg
}