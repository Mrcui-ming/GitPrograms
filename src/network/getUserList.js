import request from './request';

const getUserList = (type) => {
  return request({
    method: "GET",
    url: "/api/userlist",
    params: type
  })
}

export {
  getUserList
}